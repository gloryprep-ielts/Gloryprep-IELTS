import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Mail, MessageSquare, ShieldCheck } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const submit = trpc.support.submit.useMutation({
    onSuccess: () => {
      toast.success("Message received");
      setForm({ name: "", email: "", subject: "", message: "" });
    },
    onError: (e) => toast.error(e.message || "Something went wrong"),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email.trim().length < 5) {
      return toast.error("Please add your email so we can reply.");
    }
    if (form.message.trim().length < 10) {
      return toast.error("Please write a bit more about your question.");
    }
    submit.mutate({
      email: form.email.trim(),
      name: form.name.trim() || undefined,
      subject: form.subject.trim() || "General question",
      message: form.message.trim(),
    });
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container max-w-3xl pb-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
        <h1 className="mt-3 font-display text-4xl font-black md:text-5xl">
          Questions? We reply by <span className="text-accent">email.</span>
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
          Support, billing, or a suggestion for new content — leave a message below and it goes
          straight into our moderation queue. We respond within two working days.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-2xl border border-border bg-paper p-6 shadow-sm md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Name (optional)</label>
              <input
                className={inputCls}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Email *</label>
              <input
                type="email"
                className={inputCls}
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Subject</label>
            <input
              className={inputCls}
              placeholder="Billing, a bug, a feature idea…"
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Message *</label>
            <textarea
              rows={5}
              className={inputCls}
              placeholder="Tell us what you need help with…"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            disabled={submit.isPending}
            className="ember-glow rounded-full bg-gradient-to-r from-ember to-papaya px-8 py-3.5 text-sm font-bold text-primary-foreground transition-transform active:scale-[0.97] disabled:opacity-60"
          >
            {submit.isPending ? "Sending…" : "Send message"}
          </button>
          <p className="text-xs text-muted-foreground">
            Your message is handled only by our team — never shared, never used for marketing.
          </p>
        </form>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-paper p-5">
            <Mail className="h-5 w-5 text-accent" />
            <h2 className="mt-2 font-display text-lg font-bold">Prefer email?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Write to <span className="font-mono">support@gloryprep.com</span> with your account
              email and we will find you.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-paper p-5">
            <ShieldCheck className="h-5 w-5 text-accent" />
            <h2 className="mt-2 font-display text-lg font-bold">Report a problem</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Found broken content or a payment issue? Describe it above — our team sees every
              report in the admin queue.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-paper p-6 text-center">
          <MessageSquare className="mx-auto h-6 w-6 text-accent" />
          <p className="mt-2 font-display text-lg font-bold">Not sure where to start?</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            The <Link href="/faq" className="font-semibold text-accent underline underline-offset-4">FAQ</Link> answers
            most questions about pricing and mock tests.
          </p>
        </div>
      </div>
    </main>
  );
}
