/*
 * GLORYPREP "Paper & Ember" shared primitives
 * BandRing (signature motif), CountUp, Reveal (scroll-triggered rise-in),
 * SkillBadge, Folio eyebrow, ThemeToggle. All motion uses GPU-friendly
 * transform/opacity only with cubic-bezier(0.23,1,0.32,1) easings.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export const SKILL_COLORS: Record<string, { color: string; label: string }> = {
  listening: { color: "var(--skill-listen)", label: "Listening" },
  reading: { color: "var(--skill-read)", label: "Reading" },
  writing: { color: "var(--skill-write)", label: "Writing" },
  speaking: { color: "var(--skill-speak)", label: "Speaking" },
};

/**
 * The Band Ring — GloryPrep's signature motif.
 * SVG circular progress; animates stroke-dashoffset on first view / score change.
 * motion notes: 1.2s ease-out draw-in, 300ms delay, re-animates on prop change.
 */
export function BandRing({
  score,
  max = 9,
  size = 200,
  strokeWidth = 12,
  color = "var(--ember)",
  className = "",
  animate = true,
}: {
  score: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}) {
  const ref = useRef<SVGCircleElement>(null);
  const [draw, setDraw] = useState(true);
  const r = (size - strokeWidth) / 2;
  const C = 2 * Math.PI * r;
  const pct = Math.min(score / max, 1);
  const offset = C * (1 - pct);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDraw(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate, score]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ transform: "rotate(-90deg)" }}
    >
      {/* track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--border)"
        strokeWidth={strokeWidth}
      />
      {/* glow underlay */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth + 8}
        opacity={0.12}
        style={{ filter: "blur(6px)" }}
      />
      {/* fill */}
      <circle
        ref={ref}
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={draw ? offset : C}
        className={animate ? "ring-draw" : ""}
        style={{
          transition: "stroke-dashoffset 1.2s cubic-bezier(0.23,1,0.32,1)",
        }}
      />
    </svg>
  );
}

/**
 * CountUp — animates a numeric value once visible (900ms).
 */
export function CountUp({
  value,
  decimals = 1,
  duration = 900,
  className = "",
}: {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const from = value;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(from + (value - from) * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
    </span>
  );
}

/**
 * Reveal — scroll-triggered fade+rise container (14px, 560ms, stagger support).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 560ms cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 560ms cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function Folio({ children }: { children: ReactNode }) {
  return <div className="folio">{children}</div>;
}

export function SkillDot({ skill, size = 10 }: { skill: string; size?: number }) {
  return (
    <span
      className="inline-block rounded-full shrink-0"
      style={{
        width: size,
        height: size,
        background: SKILL_COLORS[skill]?.color,
      }}
    />
  );
}

/**
 * FolioToggle — global light/dark switch styled as a paper-cut pill.
 */
export function FolioToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="press paper-card-hover paper-card flex h-9 w-9 items-center justify-center rounded-full"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-papaya" />
      ) : (
        <Moon className="h-4 w-4 text-ember" />
      )}
    </button>
  );
}
