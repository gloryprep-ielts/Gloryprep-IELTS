import type { RequestHandler } from "express";
import type { Request as ExpressRequest } from "express";

/**
 * Stores the exact raw request body on `req.rawBody` so the PayPal
 * verify-webhook-signature endpoint can verify the signature over the bytes
 * PayPal actually signed. Must be mounted BEFORE express.json().
 */
export function rawBodyMiddleware(): RequestHandler {
  return (req, _res, next) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => {
      // Webhook payloads are small; cap at 64 KiB to avoid abuse.
      if (Buffer.concat(chunks).length + chunk.length > 64 * 1024) {
        req.destroy(new Error("payload too large"));
        return;
      }
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    req.on("end", () => {
      (req as ExpressRequest & { rawBody: string }).rawBody = Buffer.concat(chunks).toString("utf-8");
      next();
    });
    req.on("error", next);
  };
}
