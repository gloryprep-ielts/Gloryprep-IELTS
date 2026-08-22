/*
 * GLORYPREP — bundled static asset paths.
 *
 * All brand images are bundled into `client/public/images/` (real WebP files
 * with correct extensions) so they load directly from the same origin as the
 * build output. This removes the runtime dependency on the
 * `/manus-storage/...` rewrite shim, which meant the hero background and
 * other imagery could silently fail to render on slow or unreliable loads.
 *
 * Prefer these constants over raw `/manus-storage/...` URL strings in the
 * codebase. The files are already optimized (WebP, sized for their usage).
 */

const IMG = "/images";

export const ASSETS = {
  logo: `/gloryprep-lockup-2x.png`,
  monogram: `${IMG}/icon-512.png`,
  heroIllustration: `${IMG}/gloryprep-hero-illustration_5ddb8708.webp`,
  studyDesk: `${IMG}/gloryprep-study-desk_ad9c6439.webp`,
  studyTexture: `${IMG}/gloryprep-study-texture_f06bfd63.webp`,
  studentPhoto: `${IMG}/gloryprep-student-photo_9536aeb3.webp`,
  mentorPhoto: `${IMG}/gloryprep-mentor-photo_f19a727c.webp`,
  ogImage: `/og-image.webp`,
} as const;

/** Image intrinsic dimensions — used to set width/height and prevent CLS. */
export const ASSET_DIMS = {
  studyDesk: { w: 1600, h: 900 },
  studyTexture: { w: 1600, h: 900 },
  heroIllustration: { w: 960, h: 720 },
  studentPhoto: { w: 270, h: 360 },
  mentorPhoto: { w: 270, h: 360 },
  logo: { w: 1250, h: 300 },
  monogram: { w: 512, h: 512 },
} as const;
