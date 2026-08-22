import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";
import { Users, CreditCard, Inbox, ShieldAlert, LayoutGrid, DollarSign, Lock, TrendingUp } from "lucide-react";

type Tab = "overview" | "payments" | "users" | "unlocks" | "tickets";

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>("overview");
  const [grantEmail, setGrantEmail] = useState("");
  const [grantSku, setGrantSku] = useState("full-library");

  const isAdmin = !authLoading && user?.role === "admin";

  useEffect(() => {
    if (!authLoading && !user) {
      // Not signed in
    }
  }, [user, authLoading]);

  const usersQuery = trpc.admin.users.list.useQuery(undefined, { enabled: isAdmin });
  const unlocksQuery = trpc.admin.unlocks.list.useQuery(undefined, { enabled: isAdmin });
  const ticketsQuery = trpc.admin.tickets.list.useQuery(undefined, { enabled: isAdmin });
  const dashboardQuery = trpc.admin.dashboard.stats.useQuery(undefined, { enabled: isAdmin });
  const paymentsQuery = trpc.admin.payments.list.useQuery(undefined, { enabled: isAdmin });

  const setRole = trpc.admin.users.setRole.useMutation({
    onSuccess: () => {
      toast.success("Role updated");
      usersQuery.refetch();
    },
    onError: (e) => toast.error(e.message),
  });

  const setStatus = trpc.admin.unlocks.setStatus.useMutation({
    onSuccess: () => unlocksQuery.refetch(),
    onError: (e) => toast.error(e.message),
  });

  const grant = trpc.admin.unlocks.grant.useMutation({
    onSuccess: () => {
      toast.success(`Unlocks granted to ${grantEmail}`);
      setGrantEmail("");
      unlocksQuery.refetch();
    },
    onError: (e) => toast.error(e.message),
  });

  const updateTicket = trpc.admin.tickets.update.useMutation({
    onSuccess: () => {
      toast.success("Ticket updated");
      ticketsQuery.refetch();
    },
    onError: (e) => toast.error(e.message),
  });

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Spinner className="h-6 w-6 text-ember" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-center">
        <ShieldAlert className="h-10 w-10 text-ember" />
        <h1 className="font-display text-2xl font-black">Sign in first</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          The admin panel is only available to signed-in accounts with the admin role.
        </p>
        <button
          onClick={() => startLogin()}
          className="ember-glow rounded-full bg-gradient-to-r from-ember to-papaya px-8 py-3 text-sm font-bold text-primary-foreground"
        >
          Sign in
        </button>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-center">
        <ShieldAlert className="h-10 w-10 text-muted-foreground" />
        <h1 className="font-display text-2xl font-black">Admin access required</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Your account does not have the admin role. Ask the site owner to promote you, or{" "}
          <Link href="/" className="font-semibold text-ember underline underline-offset-4">
            go back home
          </Link>.
        </p>
      </main>
    );
  }

  const openTickets = ticketsQuery.data?.filter((t) => t.status === "open").length ?? 0;
  const serverPaid = (verified: string | null) => verified === "capture_api" || verified === "webhook";
  const totalRevenue = paymentsQuery.data?.reduce(
    (sum, p) => sum + (serverPaid(p.verifiedBy) ? Number(p.amountUsd) : 0),
    0,
  ) ?? 0;

  const inputCls =
    "rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-ember focus:ring-2 focus:ring-ember/20";

  return (
    <main className="min-h-screen bg-background pb-24 pt-24">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Admin</p>
            <h1 className="mt-2 font-display text-3xl font-black">Control panel</h1>
          </div>
          <Link
            href="/"
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to site
          </Link>
        </div>

        <nav className="mt-6 flex flex-wrap gap-2">
          {(
            [
              ["overview", "Overview", LayoutGrid],
              ["payments", `Payments (${paymentsQuery.data?.length ?? "–"})`, DollarSign],
              ["users", `Users (${usersQuery.data?.length ?? "–"})`, Users],
              ["unlocks", `Unlocks (${unlocksQuery.data?.length ?? "–"})`, CreditCard],
              ["tickets", `Tickets (${openTickets} open)`, Inbox],
            ] as [Tab, string, any][]
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                tab === id
                  ? "border-ember bg-ember/10 text-ember"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        {tab === "overview" && (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Registered users", value: usersQuery.data?.length ?? "–", Icon: Users },
              { label: "Purchases unlocked", value: unlocksQuery.data?.length ?? "–", Icon: Lock },
              { label: "Open support tickets", value: openTickets, Icon: Inbox },
              {
                label: "Verified revenue (USD)",
                value: dashboardQuery.data?.revenueUsd ?? "–",
                Icon: TrendingUp,
              },
              {
                label: "Payments recorded",
                value: paymentsQuery.data?.length ?? "–",
                Icon: DollarSign,
              },
              { label: "Verified payments", value: dashboardQuery.data?.completedPayments ?? "–", Icon: ShieldAlert },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-paper p-6">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <s.Icon className="h-4 w-4 text-ember" />
                  {s.label}
                </p>
                <p className="mt-2 font-display text-4xl font-black text-ember">
                  {dashboardQuery.isLoading ? <Spinner className="h-6 w-6" /> : s.value}
                </p>
              </div>
            ))}
            <div className="rounded-2xl border border-dashed border-border bg-paper p-6 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Granting unlocks manually</p>
              <p className="mt-1">
                Use the <span className="font-mono text-xs">Unlocks</span> tab to look up or grant
                content to any email — useful when a payment succeeds but the unlock did not.
              </p>
            </div>
          </div>
        )}

        {tab === "users" && (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-paper">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-paper-deep text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Last sign-in</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {usersQuery.isLoading && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center">
                      <Spinner className="mx-auto h-5 w-5" />
                    </td>
                  </tr>
                )}
                {usersQuery.data?.map((u) => (
                  <tr key={u.id} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{u.name ?? "—"}</td>
                    <td className="px-4 py-3 font-mono text-xs">{u.email ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          u.role === "admin" ? "bg-ember/15 text-ember" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {u.lastSignedIn ? new Date(u.lastSignedIn).toLocaleString() : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        disabled={setRole.isPending}
                        onClick={() => setRole.mutate({ userId: u.id, role: u.role === "admin" ? "user" : "admin" })}
                        className="rounded-full border border-border px-3 py-1 text-xs font-semibold transition-colors hover:border-ember hover:text-ember disabled:opacity-50"
                      >
                        {u.role === "admin" ? "Demote" : "Promote to admin"}
                      </button>
                    </td>
                  </tr>
                ))}
                {!usersQuery.isLoading && (usersQuery.data?.length ?? 0) === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      No signed-in users yet — they appear here after their first login.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === "unlocks" && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-border bg-paper p-6">
              <h2 className="font-display text-lg font-bold">Grant unlock manually</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Grants content to an email — used when support resolves a payment issue.
              </p>
              <div className="mt-4 flex flex-wrap items-end gap-3">
                <div className="min-w-[220px] flex-1">
                  <label className="mb-1 block text-xs font-semibold">Email</label>
                  <input
                    type="email"
                    className={inputCls}
                    placeholder="customer@example.com"
                    value={grantEmail}
                    onChange={(e) => setGrantEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Content</label>
                  <select
                    className={inputCls}
                    value={grantSku}
                    onChange={(e) => setGrantSku(e.target.value)}
                  >
                    <option value="full-library">Full Practice Test Library ($3)</option>
                    <option value="mock-kit">Complete Mock Test Kit ($1.5)</option>
                    <option value="attempt-listening">Real Mock — Listening ($0.50)</option>
                    <option value="attempt-writing">Real Mock — Writing ($0.50)</option>
                    <option value="attempt-reading">Real Mock — Reading ($0.50)</option>
                    <option value="plan-scholar">Scholar monthly plan</option>
                    <option value="plan-scholar-annual">Scholar annual plan</option>
                    <option value="plan-scholar-plus">Scholar+ plan</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    if (!grantEmail.includes("@")) {
                      return toast.error("Enter a valid email first");
                    }
                    grant.mutate({ email: grantEmail.trim(), skus: [grantSku] });
                  }}
                  disabled={grant.isPending}
                  className="rounded-full bg-foreground px-6 py-2.5 text-sm font-bold text-background transition-transform active:scale-[0.97] disabled:opacity-50"
                >
                  {grant.isPending ? "Granting…" : "Grant unlock"}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border bg-paper">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-paper-deep text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Content (SKU)</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {unlocksQuery.isLoading && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center">
                        <Spinner className="mx-auto h-5 w-5" />
                      </td>
                    </tr>
                  )}
                  {unlocksQuery.data?.map((u) => (
                    <tr key={u.id} className="border-t border-border">
                      <td className="px-4 py-3 font-mono text-xs">{u.email}</td>
                      <td className="px-4 py-3">{u.sku}</td>
                      <td className="px-4 py-3 font-medium">
                        {u.amount ? `${u.amount} ${u.currency ?? "USD"}` : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            u.status === "completed"
                              ? "bg-emerald-500/10 text-emerald-600"
                              : u.status === "refunded"
                                ? "bg-rose-500/10 text-rose-600"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        {u.status === "completed" ? (
                          <button
                            disabled={setStatus.isPending}
                            onClick={() => setStatus.mutate({ id: u.id, status: "refunded" })}
                            className="rounded-full border border-border px-3 py-1 text-xs font-semibold hover:border-rose-400 hover:text-rose-600 disabled:opacity-50"
                          >
                            Refund
                          </button>
                        ) : (
                          <button
                            disabled={setStatus.isPending}
                            onClick={() => setStatus.mutate({ id: u.id, status: "completed" })}
                            className="rounded-full border border-border px-3 py-1 text-xs font-semibold hover:border-ember hover:text-ember disabled:opacity-50"
                          >
                            Restore
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {!unlocksQuery.isLoading && (unlocksQuery.data?.length ?? 0) === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                        No purchases yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "payments" && (
          <div className="mt-8 space-y-4">
            <div className="overflow-x-auto rounded-2xl border border-border bg-paper">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-paper-deep text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Content (SKU)</th>
                    <th className="px-4 py-3">Amount (USD)</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Verified by</th>
                    <th className="px-4 py-3">PayPal order</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentsQuery.isLoading && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center">
                        <Spinner className="mx-auto h-5 w-5" />
                      </td>
                    </tr>
                  )}
                  {paymentsQuery.data?.map((p) => (
                    <tr key={p.id} className="border-t border-border">
                      <td className="px-4 py-3 font-mono text-xs">{p.email}</td>
                      <td className="px-4 py-3">
                        {p.title} <span className="font-mono text-xs text-muted-foreground">({p.sku})</span>
                      </td>
                      <td className="px-4 py-3 font-medium">{p.amountUsd}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            p.status === "approved"
                              ? "bg-emerald-500/10 text-emerald-600"
                              : p.status === "refunded" || p.status === "reversed" || p.status === "failed"
                                ? "bg-rose-500/10 text-rose-600"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {p.verifiedBy ?? "—"}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {p.paypalOrderId.slice(0, 24)}…
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {new Date(p.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {!paymentsQuery.isLoading && (paymentsQuery.data?.length ?? 0) === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                        No payments recorded yet. All captures are logged here automatically —
                        verified server-side via PayPal's API and webhooks.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="rounded-2xl border border-dashed border-border bg-paper p-6 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Server-side payment verification</p>
              <p className="mt-1">
                This ledger is written only by the server after PayPal confirms the capture — it
                can't be faked from the browser. Refunds and reversals received through PayPal's
                webhooks revoke the customer's unlock automatically.
              </p>
            </div>
          </div>
        )}

        {tab === "tickets" && (
          <div className="mt-8 space-y-4">
            {ticketsQuery.isLoading && (
              <div className="rounded-2xl border border-border bg-paper p-10 text-center">
                <Spinner className="mx-auto h-6 w-6 text-ember" />
              </div>
            )}
            {!ticketsQuery.isLoading && (ticketsQuery.data?.length ?? 0) === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-paper p-10 text-center text-sm text-muted-foreground">
                No messages in the queue yet. Visitor submissions arrive here via the Contact page.
              </div>
            )}
            {ticketsQuery.data?.map((t) => (
              <div key={t.id} className="rounded-2xl border border-border bg-paper p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">
                      {t.subject}{" "}
                      <span className="ml-2 font-mono text-xs text-muted-foreground">
                        {t.email} {t.name ? `· ${t.name}` : ""}
                      </span>
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {new Date(t.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                  <select
                    value={t.status ?? "open"}
                    onChange={(e) =>
                      updateTicket.mutate({
                        id: t.id,
                        status: e.target.value as any,
                      })
                    }
                    className={`${inputCls} py-1.5`}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm">{t.message}</p>
                {t.adminNote ? (
                  <p className="mt-3 rounded-lg bg-ember/10 p-3 text-sm">
                    <span className="font-bold text-ember">Note:</span> {t.adminNote}
                  </p>
                ) : null}
                <div className="mt-3 flex gap-2">
                  <input
                    placeholder="Add an internal note…"
                    className={`${inputCls} flex-1`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
                        updateTicket.mutate({
                          id: t.id,
                          adminNote: (e.target as HTMLInputElement).value.trim(),
                        });
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
