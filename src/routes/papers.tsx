import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { papers } from "@/lib/mock-data";
import { ExternalLink, Quote, Star } from "lucide-react";

export const Route = createFileRoute("/papers")({
  head: () => ({ meta: [{ title: "Research Papers · AIMastery" }] }),
  component: PapersPage,
});

function PapersPage() {
  return (
    <AppShell>
      <PageShell>
        <PageHeader
          eyebrow="Learn"
          title="Research Papers"
          description="Foundational and frontier papers, with summaries, code, and citation graphs."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {papers.map(p => (
            <div key={p.id} className="rounded-xl glass p-5 hover:bg-muted/20 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.venue} · {p.year}</div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Star key={i} className={`h-2.5 w-2.5 ${i < p.impact ? "text-amber-400 fill-amber-400" : "text-muted/40"}`} />
                  ))}
                </div>
              </div>
              <div className="text-sm font-semibold mb-1">{p.title}</div>
              <div className="text-xs text-muted-foreground mb-3">{p.authors}</div>
              <div className="text-xs leading-relaxed text-foreground/80 mb-3">{p.summary}</div>
              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Quote className="h-3 w-3" />{p.citations.toLocaleString()}</span>
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map(t => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/60">#{t}</span>)}
                  </div>
                </div>
                <button className="text-xs text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-1">
                  Read <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </PageShell>
    </AppShell>
  );
}
