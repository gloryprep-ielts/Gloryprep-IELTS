// Standalone email+password auth: navigate to the /login page.
export const startLogin = () => {
  window.location.href = "/login";
};

export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// NOTE: The original Manus OAuth flow (app-auth portal) is not available in the
// standalone Vercel/Neon deployment. Email+password login at /login replaces it.
// The Manus OAuth callback route (/api/oauth/callback) is kept server-side but is
// unreachable on standalone builds, so it can never be abused.
