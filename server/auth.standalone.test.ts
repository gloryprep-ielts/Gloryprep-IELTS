import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./_core/password";

// Hashing sanity: the server-side scrypt helpers must round-trip.
describe("standalone auth password hashing", () => {
  it("hashes and verifies a password", async () => {
    const password = "SuperSecret-2026";
    const hash = await hashPassword(password);
    expect(hash).toBeTruthy();
    expect(hash).toContain(":");
    const ok = await verifyPassword(password, hash);
    expect(ok).toBe(true);
    const wrong = await verifyPassword("wrong-password", hash);
    expect(wrong).toBe(false);
  });
});
