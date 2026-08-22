import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import { COOKIE_NAME } from "@shared/const";
import { parse as parseCookieHeader } from "cookie";
import { getUserById, getUserByOpenId } from "../db";
import * as jose from "jose";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // Authentication is optional for public procedures.
    user = null;
  }

  // Standalone email+password auth fallback (Vercel/Neon deployment).
  // If OAuth auth failed, try to verify the JWT session cookie instead.
  if (!user) {
    try {
      const cookies = parseCookieHeader(opts.req.headers.cookie ?? "");
      const token = cookies[COOKIE_NAME];
      if (token) {
        const jwtUser = await authenticateJwtCookie(token);
        if (jwtUser) user = jwtUser;
      }
    } catch (error) {
      // JWT verification failed — treat as logged out.
      user = null;
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}

async function authenticateJwtCookie(token: string): Promise<User | null> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "change-me-in-production");
  let payload: { sub?: string; email?: string; name?: string; role?: string };
  try {
    const { payload: verified } = await jose.jwtVerify(token, secret);
    payload = verified as { sub?: string; email?: string; name?: string; role?: string };
  } catch {
    return null;
  }
  if (!payload.sub) return null;
  // JWT was minted for a standalone account (has email) — look up by email.
  if (payload.email) {
    return (await getUserById(Number(payload.sub))) ?? null;
  }
  return null;
}
