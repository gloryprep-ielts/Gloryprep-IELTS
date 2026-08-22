import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { createPaymentRouter } from "../paypal";
// Vite and static serving are imported dynamically in buildApp to avoid
// loading development dependencies (like Vite/Rollup) in production.

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

let cachedApp: express.Express | undefined;

/**
 * Build the Express app without listening on any socket. Used by both
 * the standalone `npm start` flow and the Vercel serverless handler.
 */
export async function buildApp(server: import("http").Server): Promise<express.Express> {
  if (cachedApp) return cachedApp;
  const app = express();
  // Capture the exact raw request body for PayPal webhook signature
  // verification — must run BEFORE express.json consumes the stream.
  const { rawBodyMiddleware } = await import("../rawbody");
  app.use("/api/pay/webhook", rawBodyMiddleware());
  // Reasonable body limits for this app; PayPal webhooks are never large.
  // Skip body parsing on the PayPal webhook path — the rawBodyMiddleware
  // above consumes the stream for signature verification, and re-parsing
  // would throw "stream is not readable".
  app.use((req, _res, next) => {
    if (req.path.startsWith("/api/pay/webhook")) return next();
    express.json({ limit: "1mb" })(req, _res, next);
  });
  app.use((req, _res, next) => {
    if (req.path.startsWith("/api/pay/webhook")) return next();
    express.urlencoded({ limit: "1mb", extended: true })(req, _res, next);
  });
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  // PayPal payment endpoints + unlock ledger (demo mode when credentials missing).
  app.use("/api/pay", createPaymentRouter());
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development" && !process.env.VERCEL) {
    const { setupVite } = await import("./vite");
    await setupVite(app, server);
  } else {
    const { serveStatic } = await import("./vite");
    serveStatic(app);
  }

  // Security headers for every response (static assets included).
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), payment=()",
    );
    // HSTS only when behind TLS (production) so local HTTP dev still works.
    if (process.env.NODE_ENV === "production") {
      res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
    }
    next();
  });

  cachedApp = app;
  return app;
}

async function startServer() {
  const server = createServer();
  const app = await buildApp(server);
  // Route every incoming HTTP request to the Express app — without this the
  // server accepts connections but never responds.
  server.on("request", app);

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

// Standalone mode: boot the listening server. In serverless environments
// (Vercel) the `handler` export handles requests instead — booting a socket
// there is neither allowed nor needed.
if (!process.env.VERCEL && !process.env.AWS_LAMBDA_JS_RUNTIME && !process.env.VERCEL_ENV) {
  startServer().catch((err) => {
    console.error("GloryPrep start failed", err);
    process.exit(1);
  });
}

/**
 * Vercel serverless entry. api/index.js re-exports this for every /api/*
 * rewrite. It boots the same Express app once (no listening socket) and
 * invokes it directly — an Express app accepts (req, res, next), which is
 * a perfectly valid serverless handler shape.
 */
export async function handler(
  req: import("http").IncomingMessage,
  res: import("http").ServerResponse,
): Promise<void> {
  const dummyServer = createServer();
  const app = await buildApp(dummyServer);
  app(req, res);
}
