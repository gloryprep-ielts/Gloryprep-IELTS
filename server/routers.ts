import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import * as jose from "jose";
import type { Request as ExpressRequest } from "express";
import { updateUser } from "./db";
import { systemRouter } from "./_core/systemRouter";
import { hashPassword, verifyPassword } from "./_core/password";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  bulkGrantUnlocks,
  createTicket,
  getCompletedPaymentsByEmail,
  getDashboardMetrics,
  getUserByEmail,
  getUnlocksByEmail,
  listPayments,
  listTickets,
  listUnlocks,
  listUsers,
  setUserRole,
  setUnlockStatus,
  updateTicket,
  upsertUser,
} from "./db";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  /* ------------------------------------------------------------------ */
  /* Standalone email + password auth (Vercel/Neon standalone deploy)    */
  /* ------------------------------------------------------------------ */
  auth: router({
    me: publicProcedure.query(({ ctx }) => {
      const user = ctx.user;
      if (!user) return null;
      const { passwordHash, ...safe } = user as {
        passwordHash?: string | null;
        id: number;
        openId: string | null;
        email: string | null;
        name: string | null;
        loginMethod: string | null;
        role: string;
        lastSignedIn: Date | null;
        createdAt: Date;
        updatedAt: Date;
      };
      return safe;
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req as unknown as ExpressRequest);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    // Student: their own completed payments (used by Dashboard "My purchases")
    myPurchases: publicProcedure.query(async ({ ctx }) => {
      const email = ctx.user?.email;
      if (!email) return [] as unknown as ReturnType<typeof getCompletedPaymentsByEmail> extends Promise<infer R> ? R : never;
      return getCompletedPaymentsByEmail(email);
    }),
    register: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(128),
          email: z.string().email().max(320),
          password: z.string().min(8).max(128),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const email = input.email.toLowerCase().trim();
        const existing = await getUserByEmail(email);
        if (existing) {
          throw new TRPCError({ code: "CONFLICT", message: "An account with this email already exists" });
        }
        const passwordHash = await hashPassword(input.password);
        await upsertUser({
          email,
          name: input.name.trim(),
          passwordHash,
          loginMethod: "password",
          lastSignedIn: new Date(),
        });
        const user = await getUserByEmail(email);
        if (!user) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Registration failed" });
        await setSessionCookie(ctx, user);
        return { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } } as const;
      }),
    login: publicProcedure
      .input(
        z.object({
          email: z.string().email().max(320),
          password: z.string().min(1).max(128),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const email = input.email.toLowerCase().trim();
        const user = await getUserByEmail(email);
        if (!user || !user.passwordHash) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
        }
        const ok = await verifyPassword(input.password, user.passwordHash);
        if (!ok) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
        }
        await updateUser(user.id, { lastSignedIn: new Date() });
        await setSessionCookie(ctx, user);
        return { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } } as const;
      }),
  }),

  // ---------------------------------------------------------------
  // Admin panel — role-gated moderation & management
  // ---------------------------------------------------------------
  admin: router({
    users: router({
      list: adminProcedure.query(async () => listUsers()),
      setRole: adminProcedure
        .input(z.object({ userId: z.number(), role: z.enum(["user", "admin"]) }))
        .mutation(async ({ input }) => {
          await setUserRole(input.userId, input.role);
          return { success: true } as const;
        }),
    }),
    unlocks: router({
      list: adminProcedure.query(async () => listUnlocks()),
      lookup: adminProcedure
        .input(z.object({ email: z.string().email().max(320) }))
        .query(async ({ input }) => getUnlocksByEmail(input.email)),
      grant: adminProcedure
        .input(z.object({ email: z.string().email().max(320), skus: z.array(z.string().min(1)) }))
        .mutation(async ({ input }) => {
          await bulkGrantUnlocks(input.email, input.skus);
          return { success: true } as const;
        }),
      setStatus: adminProcedure
        .input(z.object({ id: z.number(), status: z.enum(["completed", "refunded", "pending"]) }))
        .mutation(async ({ input }) => {
          await setUnlockStatus(input.id, input.status);
          return { success: true } as const;
        }),
    }),
    tickets: router({
      list: adminProcedure.query(async () => listTickets()),
      update: adminProcedure
        .input(
          z.object({
            id: z.number(),
            status: z.enum(["open", "in_progress", "resolved", "closed"]).optional(),
            adminNote: z.string().max(4000).optional(),
          }),
        )
        .mutation(async ({ input }) => {
          await updateTicket(input.id, input);
          return { success: true } as const;
        }),
    }),
    dashboard: router({
      stats: adminProcedure.query(async () => getDashboardMetrics()),
    }),
    payments: router({
      list: adminProcedure.query(async () => listPayments()),
    }),
  }),

  // Support ticket submission — open to everyone (Contact page)
  support: router({
    submit: publicProcedure
      .input(
        z.object({
          email: z.string().email().max(320),
          name: z.string().max(256).optional(),
          subject: z.string().min(2).max(512),
          message: z.string().min(10).max(4000),
        }),
      )
      .mutation(async ({ input }) => {
        await createTicket(input);
        return { success: true } as const;
      }),
  }),
});

/* ---------- standalone auth helpers ---------- */

async function setSessionCookie(ctx: { req: unknown; res: import("express").Response }, user: { id: number; email: string | null; name: string | null; role: string }) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "change-me-in-production");
  const token = await new jose.SignJWT({
    sub: String(user.id),
    email: user.email ?? undefined,
    name: user.name ?? undefined,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1y")
    .sign(secret);
  const cookieOptions = getSessionCookieOptions(ctx.req as unknown as ExpressRequest);
  ctx.res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
}

export type AppRouter = typeof appRouter;
