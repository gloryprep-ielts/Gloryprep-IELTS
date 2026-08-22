/*
 * GLORYPREP — bundled static asset paths.
 *
 * Brand images are hosted on the platform's built-in storage so they survive
 * deployment, and the dev preview resolves the same URLs. Prefer these
 * constants over raw URL strings in the codebase.
 */
// Standalone builds (GitHub/Vercel) serve these from the project's own
// publicDir so nothing depends on the platform storage proxy at runtime.
const LOCAL = "/";
// Standalone builds (GitHub/Vercel): images live in client/public so no
// platform storage proxy is required at runtime.
const IMG = "/";
export const ASSETS = {
  logo: `${LOCAL}gloryprep-lockup-2x.png`,
  monogram: `${LOCAL}icon-512.png`,
  heroIllustration: `${IMG}study-texture_a1f38d63.webp`,
  studyDesk: `${IMG}study-desk_a745b245.webp`,
  studyTexture: `${IMG}study-texture_a1f38d63.webp`,
  ogImage: `${LOCAL}og-image.png`,
} as const;
/** Image intrinsic dimensions — used to set width/height and prevent CLS. */
export const ASSET_DIMS = {
  studyDesk: { w: 1600, h: 900 },
  studyTexture: { w: 1600, h: 900 },
  heroIllustration: { w: 1600, h: 900 },
  logo: { w: 1250, h: 300 },
  monogram: { w: 512, h: 512 },
} as const;
