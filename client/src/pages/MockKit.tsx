import { Link } from "wouter";
import { hasKit } from "../lib/store";
import { buildKitPdfs } from "../lib/practice/kitPdf";
import { KIT_PDFS } from "../lib/practice/kitAssets";
import { useSeo } from "../components/ShellExtras";

export default function MockKit() {
  useSeo("Mock Test Kit — GloryPrep IELTS", "Printable exam-condition materials: answer sheets, writing sheets, cue cards and schedules.");

  const unlocked = hasKit();

  function downloadFile(file: string) {
    const kit = buildKitPdfs();
    const found = kit.find((k) => k.name === file);
    if (found) found.doc.save(file);
  }

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-3xl px-5 py-12">
        <Link href="/store" className="text-sm text-taupe hover:text-ink">&larr; Back to store</Link>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink">Complete Mock Test Kit</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Every PDF is generated fresh and prints cleanly on A4. Use them for unlimited mock sessions —
          no setup, no stationery hunt, exam conditions in five minutes.
        </p>

        <div className="mt-8 space-y-4">
          {KIT_PDFS.map((pdf) => (
            <div key={pdf.id} className="flex items-start justify-between gap-4 rounded-2xl border border-ink/10 bg-paper-soft p-5">
              <div>
                <h2 className="font-semibold text-ink">{pdf.name}</h2>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">{pdf.desc}</p>
              </div>
              <button
                onClick={() => downloadFile(pdf.file)}
                disabled={!unlocked}
                className={`shrink-0 rounded-full px-5 py-2 text-xs font-bold transition-colors ${
                  unlocked
                    ? "bg-ink text-paper hover:bg-ink/90"
                    : "cursor-not-allowed bg-ink/10 text-ink-soft/60"
                }`}
              >
                Download PDF
              </button>
            </div>
          ))}
        </div>

        {!unlocked && (
          <div className="mt-10 rounded-2xl border border-ember/25 bg-ember/[0.05] p-6 text-center">
            <p className="font-display text-lg font-bold text-ink">Unlock the kit to download these PDFs</p>
            <p className="mt-1 text-xs text-ink-soft">$1.50 one-time — print once, mock forever.</p>
            <Link href="/store/checkout/lex-mock-kit" className="mt-4 inline-block rounded-full bg-ember px-6 py-2.5 text-sm font-bold text-paper hover:bg-ember/90">
              Unlock the kit →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
