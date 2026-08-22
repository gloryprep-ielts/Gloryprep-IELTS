CREATE TYPE "payment_status_enum" AS ENUM ('pending', 'approved', 'completed', 'failed', 'cancelled', 'refunded', 'reversed');
--> statement-breakpoint
CREATE TYPE "payment_verified_by_enum" AS ENUM ('capture_api', 'webhook');
--> statement-breakpoint
CREATE TYPE "paypal_order_status_enum" AS ENUM ('created', 'approved', 'completed', 'failed');
--> statement-breakpoint
CREATE TYPE "ticket_status_enum" AS ENUM ('open', 'in_progress', 'resolved', 'closed');
--> statement-breakpoint
CREATE TYPE "unlock_status_enum" AS ENUM ('pending', 'completed', 'refunded');
--> statement-breakpoint
CREATE TYPE "role_enum" AS ENUM ('user', 'admin');
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"paypal_order_id" varchar(64) NOT NULL,
	"capture_id" varchar(64),
	"sku" varchar(64) NOT NULL,
	"title" varchar(255) NOT NULL,
	"amount_usd" varchar(16) NOT NULL,
	"currency" varchar(16) DEFAULT 'USD',
	"status" "payment_status_enum" DEFAULT 'pending' NOT NULL,
	"verifiedBy" "payment_verified_by_enum" DEFAULT 'capture_api',
	"webhook_event_id" varchar(64),
	"webhook_event_type" varchar(128),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "paypal_orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"paypal_order_id" varchar(64) NOT NULL,
	"sku" varchar(64) NOT NULL,
	"title" varchar(255) NOT NULL,
	"amount_usd" varchar(16) NOT NULL,
	"email" varchar(320) NOT NULL,
	"status" "paypal_order_status_enum" DEFAULT 'created' NOT NULL,
	"capture_id" varchar(64),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "paypal_orders_paypal_order_id_unique" UNIQUE("paypal_order_id")
);
--> statement-breakpoint
CREATE TABLE "support_tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"name" varchar(256),
	"subject" varchar(512) NOT NULL,
	"message" text NOT NULL,
	"status" "ticket_status_enum" DEFAULT 'open',
	"adminNote" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "unlocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"sku" varchar(128) NOT NULL,
	"orderId" varchar(256),
	"amount" varchar(64),
	"currency" varchar(16) DEFAULT 'USD',
	"status" "unlock_status_enum" DEFAULT 'completed',
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" "role_enum" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId")
);
--> statement-breakpoint
CREATE INDEX "idx_payments_order" ON "payments" USING btree ("paypal_order_id");--> statement-breakpoint
CREATE INDEX "idx_payments_email" ON "payments" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_payments_capture" ON "payments" USING btree ("capture_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_payments_webhook_event" ON "payments" USING btree ("webhook_event_id");--> statement-breakpoint
CREATE INDEX "idx_paypal_order" ON "paypal_orders" USING btree ("paypal_order_id");--> statement-breakpoint
CREATE INDEX "idx_tickets_email" ON "support_tickets" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_tickets_status" ON "support_tickets" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_unlocks_email" ON "unlocks" USING btree ("email");