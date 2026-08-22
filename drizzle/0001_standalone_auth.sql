-- Standalone email+password auth migration (safe to run multiple times)

ALTER TABLE "users" ALTER COLUMN "openId" DROP NOT NULL;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'passwordHash'
  ) THEN
    ALTER TABLE "users" ADD COLUMN "passwordHash" varchar(255);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "idx_users_email" ON "users" ("email");
