import { index, integer, pgEnum, pgTable, serial, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: serial("id").primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }),
  /** Standalone email+password auth (Vercel/standalone deployment). */
  email: varchar("email", { length: 320 }).unique(),
  passwordHash: varchar("passwordHash", { length: 255 }),
  name: text("name"),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: pgEnum("role_enum", ["user", "admin"])("role").default("user").notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Purchase unlocks — email-tied records created when a payment completes.
 * The payment flow writes here so unlocks persist across devices for a
 * signed-in user and remain verifiable in the admin panel.
 */
export const unlocks = pgTable(
  "unlocks",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    sku: varchar("sku", { length: 128 }).notNull(),
    orderId: varchar("orderId", { length: 256 }),
    amount: varchar("amount", { length: 64 }),
    currency: varchar("currency", { length: 16 }).default("USD"),
    status: pgEnum("unlock_status_enum", ["pending", "completed", "refunded"])("status").default("completed"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (t) => [index("idx_unlocks_email").on(t.email)],
);

export type Unlock = typeof unlocks.$inferSelect;
export type InsertUnlock = typeof unlocks.$inferInsert;

/**
 * Support/contact tickets submitted through the Contact page — the moderation
 * & support queue the admin panel manages.
 */
export const supportTickets = pgTable(
  "support_tickets",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    name: varchar("name", { length: 256 }),
    subject: varchar("subject", { length: 512 }).notNull(),
    message: text("message").notNull(),
    status: pgEnum("ticket_status_enum", ["open", "in_progress", "resolved", "closed"])("status").default("open"),
    adminNote: text("adminNote"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (t) => [index("idx_tickets_email").on(t.email), index("idx_tickets_status").on(t.status)],
);

export type SupportTicket = typeof supportTickets.$inferSelect;
export type InsertSupportTicket = typeof supportTickets.$inferInsert;

/**
 * PayPal order tracking — links a PayPal order ID to the sku/email/amount we
 * requested, so captures can be validated before granting unlocks.
 */
export const paypalOrders = pgTable(
  "paypal_orders",
  {
    id: serial("id").primaryKey(),
    paypalOrderId: varchar("paypal_order_id", { length: 64 }).notNull().unique(),
    sku: varchar("sku", { length: 64 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    amountUsd: varchar("amount_usd", { length: 16 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    status: pgEnum("paypal_order_status_enum", ["created", "approved", "completed", "failed"])("status").default("created").notNull(),
    captureId: varchar("capture_id", { length: 64 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (t) => [index("idx_paypal_order").on(t.paypalOrderId)],
);

export type PaypalOrder = typeof paypalOrders.$inferSelect;
export type InsertPaypalOrder = typeof paypalOrders.$inferInsert;

/**
 * Payment records — the auditable source of truth for every purchase. Written
 * by both the capture endpoint and the PayPal webhook processor. Idempotency:
 * `webhookEventId` carries a unique index so the same PayPal webhook event can
 * never grant the same purchase twice; refunds/reversals are reconciled by
 * capture id, not by trusting a client-side success signal.
 */
export const payments = pgTable(
  "payments",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    paypalOrderId: varchar("paypal_order_id", { length: 64 }).notNull(),
    captureId: varchar("capture_id", { length: 64 }),
    sku: varchar("sku", { length: 64 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    amountUsd: varchar("amount_usd", { length: 16 }).notNull(),
    currency: varchar("currency", { length: 16 }).default("USD"),
    status: pgEnum("payment_status_enum", [
      "pending",
      "approved",
      "completed",
      "failed",
      "cancelled",
      "refunded",
      "reversed",
    ])("status")
      .default("pending")
      .notNull(),
    verifiedBy: pgEnum("payment_verified_by_enum", ["capture_api", "webhook"])("verifiedBy").default("capture_api"),
    webhookEventId: varchar("webhook_event_id", { length: 64 }),
    webhookEventType: varchar("webhook_event_type", { length: 128 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (t) => [
    index("idx_payments_order").on(t.paypalOrderId),
    index("idx_payments_email").on(t.email),
    index("idx_payments_capture").on(t.captureId),
    uniqueIndex("uq_payments_webhook_event").on(t.webhookEventId),
  ],
);

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;
