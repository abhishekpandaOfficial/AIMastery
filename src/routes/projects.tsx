import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { projects, type Project } from "@/lib/mock-data";
import { Star, Clock, Package } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects · AIMastery" }] }),
  component: ProjectsPage,
});

const tiers: (Project["tier"] | "all")[] = ["all", "mini", "medium", "enterprise", "capstone"];

function ProjectsPage() {
  const [tier, setTier] = useState<(typeof tiers)[number]>("all");
  const filtered = tier === "all" ? projects : projects.filter(p => p.tier === tier);
  return (
    <AppShell>
      <PageShell>
        <PageHeader
          eyebrow="Lab"
          title="Projects"
          description="Mini, medium, enterprise, and capstone projects to build a portfolio that gets you hired."
        />
        <div className="flex items-center gap-1 p-1 rounded-lg glass mb-4 w-fit">
          {tiers.map(t => (
            <button key={t} onClick={() => setTier(t)}
              className={cn("text-xs px-3 py-1.5 rounded-md capitalize transition-colors",
                tier === t ? "bg-primary/20 text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {t}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="rounded-xl glass p-5 hover:bg-muted/20 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <Package className="h-5 w-5 text-cyan-400" />
                <span className={cn("text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded",
                  p.tier === "mini" && "bg-emerald-500/10 text-emerald-300",
                  p.tier === "medium" && "bg-cyan-500/10 text-cyan-300",
                  p.tier === "enterprise" && "bg-violet-500/10 text-violet-300",
                  p.tier === "capstone" && "bg-amber-500/10 text-amber-300",
                )}>{p.tier}</span>
              </div>
              <div className="text-sm font-semibold mb-1">{p.title}</div>
              <div className="text-xs text-muted-foreground mb-3">{p.description}</div>
              <div className="flex flex-wrap gap-1 mb-3">
                {p.tags.map(t => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/60">#{t}</span>)}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/40 text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{p.hours}h</span>
                  <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 text-amber-400" />{p.stars}</span>
                </div>
                <span className={cn(
                  p.status === "done" && "text-emerald-400",
                  p.status === "in-progress" && "text-cyan-400",
                )}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </PageShell>
    </AppShell>
  );
}
