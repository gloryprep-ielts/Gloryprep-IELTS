import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { PageShell } from "@/components/SiteChrome";
import { toast } from "sonner";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: data => {
      toast.success("Account created — you are signed in!");
      utils.auth.me.setData(undefined, undefined as never);
      utils.auth.me.invalidate();
      const role = data.user.role;
      // Small delay + clear cache hint to ensure redirect works
      setTimeout(() => {
        const target = role === "admin" ? "/admin" : "/";
        window.location.replace(target);
      }, 150);
    },
    onError: error => {
      toast.error(error.message || "Registration failed");
    },
  });

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: data => {
      toast.success("Welcome back!");
      utils.auth.me.setData(undefined, undefined as never);
      utils.auth.me.invalidate();
      const role = data.user.role;
      // Small delay + clear cache hint to ensure redirect works
      setTimeout(() => {
        const target = role === "admin" ? "/admin" : "/";
        window.location.replace(target);
      }, 150);
    },
    onError: error => {
      toast.error(error.message || "Login failed");
    },
  });

  const isPending = registerMutation.isPending || loginMutation.isPending;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;
    if (mode === "register") {
      if (form.name.trim().length < 1) {
        toast.error("Please enter your name");
        return;
      }
      registerMutation.mutate({ name: form.name.trim(), email: form.email, password: form.password });
    } else {
      loginMutation.mutate({ email: form.email, password: form.password });
    }
  };

  return (
    <PageShell>
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-ember/10">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl text-ember">
              {mode === "login" ? "Sign in to GloryPrep" : "Create your account"}
            </CardTitle>
            <CardDescription>
              {mode === "login"
                ? "Enter your email and password to continue."
                : "Sign up to track your progress and access your purchases."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your full name"
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder={mode === "register" ? "At least 8 characters" : "Your password"}
                  minLength={8}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-ember text-primary-foreground font-semibold hover:bg-ember/90" disabled={isPending}>
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Spinner className="size-4" />
                    Please wait…
                  </span>
                ) : mode === "login" ? (
                  "Sign in"
                ) : (
                  "Create account"
                )}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                {mode === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button type="button" className="font-medium text-ember underline-offset-4 hover:underline" onClick={() => setMode("register")}>
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button type="button" className="font-medium text-ember underline-offset-4 hover:underline" onClick={() => setMode("login")}>
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
