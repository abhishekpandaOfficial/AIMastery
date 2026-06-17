import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { pdfs, notes } from "@/lib/mock-data";
import { Library as LibIcon, FileText, NotebookPen, Bookmark } from "lucide-react";

export const Route = createFileRoute("/library")({
  head: () => ({ meta: [{ title: "Library · AIMastery" }] }),
  component: LibraryPage,
});

function LibraryPage() {
  const items = [
    { icon: FileText, label: "PDFs", count: pdfs.length, color: "from-violet-500 to-fuchsia-500" },
    { icon: NotebookPen, label: "Notes", count: notes.length, color: "from-cyan-400 to-blue-500" },
    { icon: Bookmark, label: "Bookmarks", count: 28, color: "from-amber-400 to-orange-500" },
    { icon: LibIcon, label: "Books", count: 12, color: "from-emerald-400 to-teal-500" },
  ];
  return (
    <AppShell>
      <PageShell>
        <PageHeader eyebrow="Learn" title="My Library" description="Everything you've collected, in one place." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {items.map(i => (
            <div key={i.label} className="rounded-xl glass p-5">
              <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${i.color} grid place-items-center mb-3`}>
                <i.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-2xl font-semibold">{i.count}</div>
              <div className="text-xs text-muted-foreground">{i.label}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl glass p-5">
          <div className="text-sm font-semibold mb-3">Recently added</div>
          <div className="space-y-2">
            {pdfs.slice(0, 3).map(p => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30">
                <div className="h-9 w-9 rounded-lg bg-muted grid place-items-center text-base">{p.thumb}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.pages} pages · {p.size}</div>
                </div>
                <div className="text-xs text-muted-foreground">{p.uploadedAt}</div>
              </div>
            ))}
          </div>
        </div>
      </PageShell>
    </AppShell>
  );
}
