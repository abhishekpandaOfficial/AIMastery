import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { notes } from "@/lib/mock-data";
import { Pin, Plus, NotebookPen } from "lucide-react";

export const Route = createFileRoute("/notes")({
  head: () => ({ meta: [{ title: "Notes · AIMastery" }] }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <AppShell>
      <PageShell>
        <PageHeader
          eyebrow="Learn"
          title="Notes"
          description="Your second brain. Markdown, LaTeX, code, diagrams — all auto-saved and versioned."
          actions={
            <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-400 text-white text-xs font-medium">
              <Plus className="h-3.5 w-3.5" /> New Note
            </button>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map(n => (
            <div key={n.id} className="group rounded-xl glass p-4 hover:bg-muted/20 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <NotebookPen className="h-4 w-4 text-cyan-400" />
                {n.pinned && <Pin className="h-3 w-3 text-amber-400 fill-amber-400" />}
              </div>
              <div className="text-sm font-medium mb-1">{n.title}</div>
              <div className="text-xs text-muted-foreground line-clamp-3 mb-3">{n.preview}</div>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {n.tags.map(t => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground">#{t}</span>
                  ))}
                </div>
                <div className="text-[10px] text-muted-foreground">{n.updatedAt}</div>
              </div>
            </div>
          ))}
        </div>
      </PageShell>
    </AppShell>
  );
}
