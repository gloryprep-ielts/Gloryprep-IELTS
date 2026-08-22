/**
 * GloryPrep Vercel Serverless Entry
 * This file re-exports the Express handler from the bundled server.
 * Vercel's build process compiles the TypeScript server into a single file
 * under dist/server/index.js, which we import here.
 */
import { handler } from "../dist/server/index.js";

export default async (req, res) => {
  try {
    // Invoke the handler exported from the built server bundle.
    await handler(req, res);
  } catch (err) {
    console.error("Vercel Serverless Error:", err);
    res.status(500).json({ 
      error: "Internal Server Error", 
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
  }
};
