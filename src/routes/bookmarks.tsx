import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { interviewQuestions, allLessons, papers } from "@/lib/mock-data";
import { Bookmark } from "lucide-react";

export const Route = createFileRoute("/bookmarks")({
  head: () => ({ meta: [{ title: "Bookmarks · AIMastery" }] }),
  component: BookmarksPage,
});

function BookmarksPage() {
  const qs = interviewQuestions.filter(q => q.bookmarked);
  const ls = allLessons.slice(0, 4);
  const ps = papers.slice(0, 3);
  return (
    <AppShell>
      <PageShell>
        <PageHeader eyebrow="Learn" title="Bookmarks" description="Saved lessons, papers, and interview questions." />
        <div className="space-y-6">
          <Section title="Interview Questions" count={qs.length}>
            {qs.map(q => (
              <div key={q.id} className="rounded-lg glass p-3 hover:bg-muted/30">
                <div className="text-sm">{q.question}</div>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="px-1.5 py-0.5 rounded bg-muted/60">{q.category}</span>
                  <span>{q.companies.join(", ")}</span>
                </div>
              </div>
            ))}
          </Section>
          <Section title="Lessons" count={ls.length}>
            {ls.map(l => (
              <div key={l.id} className="rounded-lg glass p-3 hover:bg-muted/30">
                <div className="text-sm font-medium">{l.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{l.description}</div>
              </div>
            ))}
          </Section>
          <Section title="Research Papers" count={ps.length}>
            {ps.map(p => (
              <div key={p.id} className="rounded-lg glass p-3 hover:bg-muted/30">
                <div className="text-sm font-medium">{p.title}</div>
                <div className="text-xs text-muted-foreground">{p.authors} · {p.year}</div>
              </div>
            ))}
          </Section>
        </div>
      </PageShell>
    </AppShell>
  );
}

function Section({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Bookmark className="h-4 w-4 text-amber-400 fill-amber-400" />
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">({count})</div>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
