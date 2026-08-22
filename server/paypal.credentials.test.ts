import { describe, expect, it } from "vitest";

/**
 * Validates that the configured PayPal credentials (PAYPAL_CLIENT_ID /
 * PAYPAL_SECRET) can obtain an OAuth2 access token from the PayPal API.
 * This is the minimal handshake that proves the secret is live and correct.
 */
describe("PayPal credentials", () => {
  it("obtains an OAuth2 access token with the configured client id and secret", async () => {
    const clientId = process.env.PAYPAL_CLIENT_ID ?? "";
    const secret = process.env.PAYPAL_SECRET ?? "";
    expect(clientId.length).toBeGreaterThan(20);
    expect(secret.length).toBeGreaterThan(20);

    const res = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });

    expect(res.status).toBe(200);
    const data = (await res.json()) as { access_token?: string; token_type?: string };
    expect(data.access_token).toBeTruthy();
    expect(data.token_type).toBe("Bearer");
  }, 30000);
});
