import { desc, eq, inArray } from "drizzle-orm"; // eq duplicated below merged
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
let _pool: Pool | null = null;

function getPool() {
  if (!_pool && process.env.DATABASE_URL) {
    // Neon serverless + Vercel: single pooled connection works fine for the
    // plan sizes this app will run at. Keep it lazy so tooling without a DB
    // (typecheck, tests, static builds) doesn't crash.
    _pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
  }
  return _pool;
}

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db) {
    const pool = getPool();
    if (!pool) return null;
    try {
      _db = drizzle(pool);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.passwordHash !== undefined) {
      values.passwordHash = user.passwordHash;
      updateSet.passwordHash = user.passwordHash;
    }
    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    // PostgreSQL equivalent of MySQL's ON DUPLICATE KEY UPDATE — conflict on
    // openId when provided, otherwise on email (standalone auth).
    const target = user.openId ? users.openId : (values.email ? users.email : undefined);
    if (!target) {
      await db.insert(users).values(values);
    } else if (Object.keys(updateSet).length === 0) {
      // Conflict exists but nothing to update — no-op.
      return;
    } else {
      await db.insert(users).values(values).onConflictDoUpdate({ target, set: updateSet });
    }
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.email, email.toLowerCase().trim())).limit(1);
  return result[0];
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

export async function updateUser(id: number, patch: { lastSignedIn?: Date }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(users).set(patch).where(eq(users.id, id));
}

// TODO: add feature queries here as your schema grows.

/* ------------------------------------------------------------------ */
/* Admin / moderation helpers                                          */
/* ------------------------------------------------------------------ */

import { InsertSupportTicket, InsertUnlock, supportTickets, unlocks } from "../drizzle/schema";

export async function listUsers() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      id: users.id,
      openId: users.openId,
      name: users.name,
      email: users.email,
      loginMethod: users.loginMethod,
      role: users.role,
      createdAt: users.createdAt,
      lastSignedIn: users.lastSignedIn,
    })
    .from(users)
    .orderBy(desc(users.lastSignedIn))
    .limit(500);
}

export async function setUserRole(userId: number, role: "user" | "admin") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(users).set({ role }).where(eq(users.id, userId));
}

export async function createUnlock(data: InsertUnlock) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create unlock: database not available");
    return;
  }
  await db.insert(unlocks).values(data);
}

export async function listUnlocks(limit = 200) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(unlocks).orderBy(desc(unlocks.createdAt)).limit(limit);
}

export async function setUnlockStatus(id: number, status: "completed" | "refunded" | "pending") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(unlocks).set({ status }).where(eq(unlocks.id, id));
}

/** Email-tied unlock lookup used by the payment/checkout flow. */
export async function getUnlocksByEmail(email: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(unlocks).where(eq(unlocks.email, email.toLowerCase().trim()));
}

export async function bulkGrantUnlocks(email: string, skus: string[]) {
  const db = await getDb();
  if (!db) return;
  const existing = await db
    .select({ sku: unlocks.sku })
    .from(unlocks)
    .where(inArray(unlocks.sku, skus));
  const existingSkus = new Set(existing.map((r) => r.sku));
  const toInsert = skus.filter((s) => !existingSkus.has(s));
  for (const sku of toInsert) {
    await db.insert(unlocks).values({ email: email.toLowerCase().trim(), sku, status: "completed" });
  }
}

export async function createTicket(data: InsertSupportTicket) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // PostgreSQL has no insertId — use RETURNING to get the created id.
  const result = await db.insert(supportTickets).values(data).returning({ id: supportTickets.id });
  return result[0]?.id;
}

export async function listTickets() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(supportTickets).orderBy(desc(supportTickets.createdAt)).limit(300);
}

export async function updateTicket(id: number, patch: { status?: string; adminNote?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(supportTickets).set(patch as any).where(eq(supportTickets.id, id));
}

/* ------------------------------------------------------------------ */
/* Payments — auditable purchase records (capture + webhook writes)   */
/* ------------------------------------------------------------------ */

import { and, asc, sql } from "drizzle-orm";
import { InsertPayment, payments } from "../drizzle/schema";

export type PaymentStatus =
  | "pending"
  | "approved"
  | "completed"
  | "failed"
  | "cancelled"
  | "refunded"
  | "reversed";

/** Insert a payment row. Caller must set status/verification fields. */
export async function createPayment(data: InsertPayment) {
  const db = await getDb();
  if (!db) return;
  await db.insert(payments).values(data);
}

export async function getPaymentByOrderId(paypalOrderId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db
    .select()
    .from(payments)
    .where(eq(payments.paypalOrderId, paypalOrderId))
    .limit(1);
  return rows[0];
}

/** Find the payment by PayPal order+sku+status — used by the capture path. */
export async function getPendingPayment(paypalOrderId: string, sku: string) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db
    .select()
    .from(payments)
    .where(
      and(
        eq(payments.paypalOrderId, paypalOrderId),
        eq(payments.sku, sku),
        eq(payments.status, "pending"),
      ),
    )
    .limit(1);
  return rows[0];
}

export async function markPaymentPaid(id: number, captureId: string, verifiedBy: "capture_api" | "webhook") {
  const db = await getDb();
  if (!db) return;
  await db
    .update(payments)
    .set({ status: "completed", captureId, verifiedBy })
    .where(eq(payments.id, id));
}

export async function updatePaymentStatus(id: number, status: PaymentStatus, extra: { webhookEventId?: string; webhookEventType?: string } = {}) {
  const db = await getDb();
  if (!db) return;
  await db
    .update(payments)
    .set({ status, ...extra })
    .where(eq(payments.id, id));
}

/** Idempotent find-or-create used by the webhook processor. */
export async function upsertPaymentForEvent(data: {
  email: string;
  paypalOrderId: string;
  captureId?: string;
  sku: string;
  title: string;
  amountUsd: string;
  currency?: string;
  status: PaymentStatus;
  verifiedBy: "capture_api" | "webhook";
  webhookEventId?: string;
  webhookEventType?: string;
}) {
  const db = await getDb();
  if (!db) return;
  // If this webhook event already landed, return early — the unique index on
  // webhook_event_id plus this pre-check guarantees idempotency.
  if (data.webhookEventId) {
    const existing = await db
      .select()
      .from(payments)
      .where(eq(payments.webhookEventId, data.webhookEventId))
      .limit(1);
    if (existing.length > 0) return;
  }
  await db.insert(payments).values({
    email: data.email.toLowerCase().trim(),
    paypalOrderId: data.paypalOrderId,
    captureId: data.captureId,
    sku: data.sku,
    title: data.title,
    amountUsd: data.amountUsd,
    currency: data.currency ?? "USD",
    status: data.status,
    verifiedBy: data.verifiedBy,
    webhookEventId: data.webhookEventId,
    webhookEventType: data.webhookEventType,
  });
}

/** Find completed payments by email — used to reconcile unlock grants. */
export async function getCompletedPaymentsByEmail(email: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(payments)
    .where(and(eq(payments.email, email.toLowerCase().trim()), eq(payments.status, "completed")))
    .orderBy(asc(payments.createdAt));
}

/** Admin: full payment history (recent-first). */
export async function listPayments(limit = 300) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(payments).orderBy(desc(payments.createdAt)).limit(limit);
}

/** Admin dashboard metrics computed straight from the database. */
export async function getDashboardMetrics() {
  const db = await getDb();
  if (!db) {
    return {
      totalUsers: 0,
      paidUsers: 0,
      completedPayments: 0,
      failedPayments: 0,
      revenueUsd: "0.00",
      recentPayments: [],
      recentUsers: [],
    };
  }
  const totalUsers = await db
    .select({ count: sql<number>`count(*)` })
    .from(users);
  const paidEmails = await db
    .select({ email: payments.email })
    .from(payments)
    .where(eq(payments.status, "completed"))
    .groupBy(payments.email);
  const completed = await db
    .select({ count: sql<number>`count(*)` })
    .from(payments)
    .where(eq(payments.status, "completed"));
  const failed = await db
    .select({ count: sql<number>`count(*)` })
    .from(payments)
    .where(eq(payments.status, "failed"));
  const revenue = await db
    .select({ total: sql<string>`COALESCE(SUM(amount_usd::numeric), 0)` })
    .from(payments)
    .where(eq(payments.status, "completed"));
  const recentPayments = await db
    .select()
    .from(payments)
    .orderBy(desc(payments.createdAt))
    .limit(15);
  const recentUsers = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
      lastSignedIn: users.lastSignedIn,
    })
    .from(users)
    .orderBy(desc(users.createdAt))
    .limit(15);
  return {
    totalUsers: Number(totalUsers[0]?.count ?? 0),
    paidUsers: paidEmails.length,
    completedPayments: Number(completed[0]?.count ?? 0),
    failedPayments: Number(failed[0]?.count ?? 0),
    revenueUsd: String(revenue[0]?.total ?? "0.00"),
    recentPayments,
    recentUsers,
  };
}
