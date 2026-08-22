/*
 * GLORYPREP "Paper & Ember" — site chrome
 * Transparent glass nav over hero → opaque paper-cut bar on scroll.
 * Wordmark: Archivo ExtraBold lowercase + Band Ring glyph logo.
 */
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight, LogOut } from "lucide-react";
import { FolioToggle } from "./primitives";
import { StickyCta } from "./ShellExtras";
import { ASSETS } from "@/lib/assets";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const LOGO = ASSETS.logo;

function AccountDropdown({
  name,
  onLogout,
}: {
  name: string | null | undefined;
  onLogout: () => Promise<void>;
}) {
  const initials = (name || "U").trim().charAt(0).toUpperCase();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="press flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 transition-colors hover:border-ember">
          <Avatar className="h-7 w-7 border">
            <AvatarFallback className="text-xs font-bold">{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden text-xs font-semibold sm:inline">{name || "Account"}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={async () => {
            try {
              await onLogout();
              toast.success("Signed out");
            } catch {
              toast.error("Failed to sign out");
            }
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const NAV = [
  { label: "Home", href: "/" },
  { label: "Lessons", href: "/lessons" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Mock Test", href: "/test" },
  { label: "Results", href: "/results" },
  { label: "Pricing", href: "/pricing" },
  { label: "Store", href: "/store" },
];

export function SiteHeader({ overHero = false }: { overHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !overHero || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_1px_12px_-4px_oklch(0.3_0.03_60/0.12)]"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/gloryprep-lockup-2x.png" alt="GloryPrep logo" className="h-9 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = location === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`press rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {loading ? null : user ? (
            <AccountDropdown name={user.name} onLogout={logout} />
          ) : (
            <Link
              href="/login"
              className="press rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-foreground transition-colors hover:border-ember hover:text-ember"
            >
              Sign in
            </Link>
          )}
          <FolioToggle />
          <Link
            href="/test"
            className="press ember-glow hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-ember to-papaya px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all duration-200 hover:shadow-lg md:inline-flex"
          >
            Start free test
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            className="press paper-card-hover paper-card flex h-9 w-9 items-center justify-center md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && !loading && (
        <>
          <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
            <nav className="container flex flex-col gap-1 py-3">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    location === n.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
            <div className="container flex items-center justify-between gap-3 py-3">
              {user ? (
                <AccountDropdown name={user.name} onLogout={logout} />
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="press rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-foreground transition-colors hover:border-ember hover:text-ember"
                >
                  Sign in
                </Link>
              )}
              <span className="text-xs text-muted-foreground">
                {user ? user.email : "Guest"}
              </span>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-paper-deep">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/gloryprep-lockup-2x.png" alt="GloryPrep logo" className="h-9 w-auto object-contain" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Band 7 isn't luck. It's a system. GloryPrep turns IELTS preparation
            into a measurable, coachable journey — built for students
            worldwide.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Online — anywhere in the world
          </p>
        </div>
        <FooterCol title="Learn" links={[["Lessons", "/lessons"], ["Mock Tests", "/test"], ["Results", "/results"], ["Dashboard", "/dashboard"]]} />
        <FooterCol title="Store" links={[["Practice Library", "/store#library"], ["Mock Test Kit", "/store#kit"], ["Real Mock Exams", "/store#attempts"], ["Checkout", "/store"]]} />
        <FooterCol title="Company" links={[["About", "/about"], ["Pricing", "/pricing"], ["FAQ", "/faq"], ["Contact", "/contact"], ["Sign in", "/login"]]}
        />
        <FooterCol title="Legal" links={[["Terms", "/terms"], ["Privacy", "/privacy"], ["User Agreement", "/agreement"], ["Refund Policy", "/refund"]]}
        />
      </div>
      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <span>© 2026 GloryPrep. All rights reserved.</span>
          <span className="font-mono uppercase tracking-widest">Made for Students Worldwide</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="folio">{title}</div>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="press text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PageShell({
  children,
  overHero,
}: {
  children: ReactNode;
  overHero?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader overHero={overHero} />
      <main className="flex-1 pt-16">{children}</main>
      <SiteFooter />
      <StickyCta />
    </div>
  );
}
