import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { allRoadmapLessons } from "@/lib/roadmap-data";
import { useProgressStore } from "@/lib/progress-store";
import { Clock, Star, Filter, Play, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lessons")({
  head: () => ({ meta: [{ title: "Lessons · AIMastery" }] }),
  component: LessonsPage,
});

const filters = ["All", "In Progress", "Available", "Completed"];

function LessonsPage() {
  const store = useProgressStore();
  const [f, setF] = useState("All");

  const filtered = allRoadmapLessons.filter(l => {
    if (f === "In Progress") return store.isInProgress(l.id);
    if (f === "Completed") return store.isCompleted(l.id);
    if (f === "Available") return !store.isCompleted(l.id) && !store.isInProgress(l.id);
    return true;
  });

  return (
    <AppShell>
      <PageShell>
        <PageHeader
          eyebrow="Learn"
          title="Lessons"
          description={`${allRoadmapLessons.length} lessons across the entire AI roadmap. ${store.completedCount} completed.`}
          actions={
            <div className="flex items-center gap-1 p-1 rounded-lg glass">
              <Filter className="h-3.5 w-3.5 text-muted-foreground ml-1.5" />
              {filters.map(x => (
                <button key={x} onClick={() => setF(x)}
                  className={cn("text-xs px-2.5 py-1 rounded-md transition-colors",
                    f === x ? "bg-primary/20 text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
                  {x}
                </button>
              ))}
            </div>
          }
        />
        <div className="rounded-xl glass overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <th className="px-4 py-3 font-medium">Lesson</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Phase</th>
                <th className="px-4 py-3 font-medium">Difficulty</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Importance</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => {
                const done = store.isCompleted(l.id);
                const inProg = store.isInProgress(l.id);
                return (
                  <tr key={l.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => done ? store.unmarkComplete(l.id) : store.markComplete(l.id)}
                          className="shrink-0"
                        >
                          {done ? <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            : inProg ? <div className="h-4 w-4 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
                            : <Play className="h-3.5 w-3.5 text-muted-foreground hover:text-violet-400 transition-colors" />}
                        </button>
                        <div>
                          <div className={cn("text-sm font-medium", done && "line-through text-muted-foreground")}>{l.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{l.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs text-muted-foreground">{l.phaseTitle}</td>
                    <td className="px-4 py-3">
                      <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium",
                        l.difficulty === "beginner" && "bg-emerald-500/10 text-emerald-300",
                        l.difficulty === "intermediate" && "bg-cyan-500/10 text-cyan-300",
                        l.difficulty === "advanced" && "bg-violet-500/10 text-violet-300",
                        l.difficulty === "expert" && "bg-rose-500/10 text-rose-300")}>
                        {l.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">
                      <Star className="inline h-3 w-3 text-amber-400 mr-1" />{l.importance}/10
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground"><Clock className="inline h-3 w-3 mr-1" />{l.duration}m</td>
                    <td className="px-4 py-3 text-right">
                      {!done && (
                        <button
                          onClick={() => store.markComplete(l.id)}
                          className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          Done ✓
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No lessons match this filter.
            </div>
          )}
        </div>
      </PageShell>
    </AppShell>
  );
}
