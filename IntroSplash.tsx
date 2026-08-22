/*
 * GLORYPREP intro splash — plays ONCE per session (sessionStorage key
 * "gp:seen-splash"). Pure CSS keyframes, no JS animation libraries.
 *
 * Timeline (~2.4s total, all durations tuned to stay < 2.5s):
 *   0.00–0.55s  backdrop navy settles, monogram draws itself in (stroke)
 *   0.55–0.95s  monogram stroke fills to solid (fill-in), slight ease-out pop
 *   0.95–1.45s  wordmark "GloryPrep" fades + slides up below the mark
 *   1.30–1.85s  gold light-sweep crosses the wordmark (accent flourish)
 *   1.85–2.40s  curtain wipe: background splits/fades to reveal homepage
 *
 * Kept outside PageShell so it renders above everything (z-50 portal-like
 * div); the homepage is mounted underneath from the start (no delayed mount,
 * so nothing blocks routing or first paint).
 */
import { useEffect, useState } from "react";

const SESSION_KEY = "gp:seen-splash";

export function shouldPlaySplash(): boolean {
  if (typeof window === "undefined") return false;
  if (sessionStorage.getItem(SESSION_KEY) === "1") return false;
  // Skip when the visitor arrives with a deep link fragment like a
  // payment callback — don't interrupt that flow.
  if (window.location.pathname.startsWith("/thank-you")) return false;
  return true;
}

/** SVG monogram paths (from gp-monogram-icon.svg v6) drawn with strokes for
 * the "letterforms draw themselves" effect. Two stroke layers: the navy G+P
 * ring/spine and the gold crossbar/arc. Solid fills fade in right after. */
function IntroMark() {
  return (
    <svg
      viewBox="0 0 512 512"
      className="intro-mark"
      aria-hidden="true"
    >
      {/* Stroke layers (draw-in) */}
      <path
        className="intro-stroke-gp"
        d="M 408.3 146.3 A 180 180 0 1 0 408.3 365.7 L 364.6 339.5 A 120 120 0 1 1 364.6 172.5 Z M 238 70 L 278 70 L 278 442 L 238 442 Z M 278 70 L 336 70 A 80 80 0 0 1 416 150 L 416 270 A 80 80 0 0 1 336 350 L 278 350 Z M 278 102 L 336 102 A 48 48 0 0 1 384 150 L 384 270 A 48 48 0 0 1 336 318 L 278 318 Z"
      />
      <path className="intro-stroke-gold" d="M 278 256 L 427 256" />
      <path className="intro-stroke-gold-arc" d="M 336 70 A 80 80 0 0 1 416 150" />

      {/* Solid layers (fill-in) */}
      <path className="intro-fill-gp" d="M 408.3 146.3 A 180 180 0 1 0 408.3 365.7 L 364.6 339.5 A 120 120 0 1 1 364.6 172.5 Z M 238 70 L 278 70 L 278 442 L 238 442 Z M 278 70 L 336 70 A 80 80 0 0 1 416 150 L 416 270 A 80 80 0 0 1 336 350 L 278 350 Z M 278 102 L 336 102 A 48 48 0 0 1 384 150 L 384 270 A 48 48 0 0 1 336 318 L 278 318 Z" />
      <path className="intro-fill-gold" d="M 278 246 L 420 246 A 15 15 0 0 1 435 261 A 15 15 0 0 1 420 276 L 278 276 Z M 336 70 A 80 80 0 0 1 416 150" />
    </svg>
  );
}

export function IntroSplash() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (shouldPlaySplash()) {
      // Start on the next frame so the browser captures the initial
      // (hidden) state before animating — avoids a flash on slow devices.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPlay(true);
          sessionStorage.setItem(SESSION_KEY, "1");
        });
      });
      timer = setTimeout(() => setPlay(false), 2450);
    }
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Skip-friendly build: a single click ends the intro immediately.
  const endEarly = () => {
    setPlay(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  };

  if (!play) return null;

  return (
    <div
      className="intro-splash"
      aria-hidden="true"
      data-testid="intro-splash"
    >
      {/* Glow backdrop — subtle radial gradient in brand navy */}
      <div className="intro-backdrop" />

      <div className="intro-stage">
        <div className="intro-mark-wrap">
          <IntroMark />
        </div>
        <div className="intro-word-wrap">
          <p className="intro-wordmark">
            <span className="intro-word-glory">Glory</span>
            <span className="intro-word-prep">Prep</span>
          </p>
          {/* Gold light-sweep crossing the wordmark */}
          <span className="intro-sweep" />
        </div>
        <p className="intro-tagline">IELTS prep, mastered.</p>
      </div>

      {/* Thin gold progress bar along the top */}
      <div className="intro-progress-wrap">
        <div className="intro-progress" />
      </div>

      {/* Skip button */}
      <button
        type="button"
        onClick={endEarly}
        className="intro-skip"
        aria-label="Skip intro animation"
      >
        Skip
      </button>

      {/* Curtain: two halves sliding apart at the end */}
      <div className="intro-curtain intro-curtain--left" />
      <div className="intro-curtain intro-curtain--right" />
    </div>
  );
}
