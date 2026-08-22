/*
 * GLORYPREP "Paper & Ember" — shell extras
 * Seo (per-route meta title/description), StickyCta (mobile-first bottom bar),
 * CookieBanner (one-time consent stored in localStorage), Skeleton rows.
 * All motion GPU-only (transform/opacity), respecting prefers-reduced-motion.
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Cookie, X } from "lucide-react";
import { trackEvent } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

import { ASSETS } from "@/lib/assets";

const LOGO = ASSETS.logo;

/** Set per-page meta title + description (SEO requirement: unique per route).
 * Also keeps the Open Graph title/description and Twitter card data in sync
 * with each page so social shares always show page-specific text. The shared
 * OG image, canonical URL and site name stay in index.html. */
export function useSeo(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const setMeta = (sel: string, attr: "name" | "property", content: string) => {
      let meta = document.querySelector<HTMLMetaElement>(`meta[${attr}="${sel}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, sel);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    setMeta("description", "name", description);
    setMeta("og:title", "property", title);
    setMeta("og:description", "property", description);
    setMeta("twitter:title", "name", title);
    setMeta("twitter:description", "name", description);
    return () => {
      /* leave previous values — next page sets its own */
    };
  }, [title, description]);
}

/** Sticky mobile CTA — visible under sm, appears after hero scroll, dismissible. */
export function StickyCta({
  href = "/lessons",
  label = "Start learning free",
  visible = true,
}: {
  href?: string;
  label?: string;
  visible?: boolean;
}) {
  const [location] = useLocation();
  const [dismissed, setDismissed] = useState(false);
  const [belowHero, setBelowHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setBelowHero(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't compete with the primary CTA already visible above the fold, and
  // stay off pages where a bottom bar adds no value (legal / success pages).
  const hidesOnPage = [
    "/test",
    "/thank-you",
    "/privacy",
    "/terms",
    "/agreement",
    "/faq",
  ].includes(location);

  if (!visible || dismissed || belowHero === false || hidesOnPage) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 translate-y-full transition-transform duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] sm:hidden",
        belowHero ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center gap-3 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-xl" style={{ minHeight: "calc(3.75rem + env(safe-area-inset-bottom))" }}>
        <img src={LOGO} alt="" className="h-7 w-7 object-contain" />
        <p className="min-w-0 flex-1 truncate text-xs font-semibold">
          Your {location === "/lessons" ? "next lesson" : "free mock test"} is
          waiting
        </p>
        <Link
          href={href}
          onClick={() => trackEvent("sticky_cta_click", { from: location })}
          className="press inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-ember to-papaya px-4 py-2 text-xs font-bold text-primary-foreground"
        >
          {label} <ArrowRight className="h-3 w-3" />
        </Link>
        <button
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="press flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/** Cookie consent banner — persists choice; never re-shows after accept/decline. */
export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("gloryprep-cookie-consent");
    if (!consent) setShow(true);
  }, []);

  if (!show) return null;

  const decide = (choice: string) => {
    localStorage.setItem("gloryprep-cookie-consent", choice);
    setShow(false);
    trackEvent("cookie_consent", { choice });
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 sm:bottom-4">
      <div className="container sm:max-w-xl">
        <div className="sheet-lift flex flex-col gap-4 rounded-2xl border border-border bg-background p-4 shadow-xl sm:p-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
              <Cookie className="h-4 w-4 text-ember" />
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">We use cookies</span>{" "}
              to remember your progress, improve your experience and measure
              how the platform performs. Analytics are anonymous.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => decide("accept")}
              className="press rounded-full bg-gradient-to-r from-ember to-papaya px-5 py-2 text-xs font-bold text-primary-foreground"
            >
              Accept all
            </button>
            <button
              onClick={() => decide("decline")}
              className="press rounded-full border border-border bg-background px-5 py-2 text-xs font-bold text-muted-foreground hover:text-foreground"
            >
              Decline analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Generic animated skeleton bar — matches paper-cut system. */
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-busy="true"
      className={cn("animate-pulse rounded-lg bg-muted", className)}
    />
  );
}
