import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { roadmapPhases, TOTAL_LESSONS, TOTAL_HOURS } from "@/lib/roadmap-data";
import { useProgressStore } from "@/lib/progress-store";
import { motion } from "framer-motion";
import { BookOpen, Clock, ChevronRight, CheckCircle2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/curriculum")({
  head: () => ({ meta: [{ title: "Curriculum · AIMastery" }] }),
  component: CurriculumPage,
});

function CurriculumPage() {
  const store = useProgressStore();

  return (
    <AppShell>
      <PageShell>
        <PageHeader
          eyebrow="Learn"
          title="Curriculum"
          description={`Complete reference of all ${TOTAL_LESSONS} lessons across ${roadmapPhases.length} phases and ${TOTAL_HOURS} hours — your complete path to Chief AI Architect.`}
        />

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="rounded-xl glass p-4 text-center">
            <div className="text-2xl font-bold gradient-text">{roadmapPhases.length}</div>
            <div className="text-xs text-muted-foreground mt-1">Phases</div>
          </div>
          <div className="rounded-xl glass p-4 text-center">
            <div className="text-2xl font-bold gradient-text">{TOTAL_LESSONS}</div>
            <div className="text-xs text-muted-foreground mt-1">Lessons</div>
          </div>
          <div className="rounded-xl glass p-4 text-center">
            <div className="text-2xl font-bold gradient-text">{TOTAL_HOURS}h</div>
            <div className="text-xs text-muted-foreground mt-1">Total Hours</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roadmapPhases.map((phase, i) => {
            const progress = store.getPhaseProgress(phase.id);
            const totalLessons = phase.chapters.reduce((s, c) => s + c.lessons.length, 0);
            const doneLessons = phase.chapters.reduce(
              (s, c) => s + c.lessons.filter(l => store.isCompleted(l.id)).length, 0
            );
            const msUnlocked = store.isMilestoneUnlocked(`ms-${phase.id}`);

            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  "rounded-xl glass p-5 hover:bg-muted/20 transition-colors border",
                  msUnlocked ? "border-emerald-500/30" : "border-border/30"
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="h-12 w-12 rounded-xl grid place-items-center shrink-0 text-white font-bold text-lg"
                    style={{ background: `linear-gradient(135deg, ${phase.color}cc, ${phase.color}55)` }}
                  >
                    {msUnlocked ? "✓" : phase.phase}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Phase {phase.phase} · Days {phase.dayRange[0]}–{phase.dayRange[1]}
                      </div>
                    </div>
                    <div className="text-base font-semibold">{phase.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{phase.description}</div>

                    <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      <span className="inline-flex items-center gap-1"><BookOpen className="h-3 w-3" />{totalLessons} lessons</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{phase.estimatedHours}h</span>
                      <span className="inline-flex items-center gap-1"><Trophy className="h-3 w-3" />{phase.milestoneXp.toLocaleString()} XP</span>
                      {msUnlocked && <span className="inline-flex items-center gap-1 text-emerald-400"><CheckCircle2 className="h-3 w-3" />Complete</span>}
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{doneLessons}/{totalLessons} done</span>
                        <span className="font-medium" style={{ color: progress > 0 ? phase.color : undefined }}>{progress}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full transition-all duration-700"
                          style={{ width: `${progress}%`, background: phase.color }}
                        />
                      </div>
                    </div>

                    {/* Chapter list */}
                    <div className="mt-3 space-y-1">
                      {phase.chapters.map(c => (
                        <div key={c.id} className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                          <div className="h-1 w-1 rounded-full shrink-0" style={{ background: phase.color }} />
                          {c.title}
                          <span className="ml-auto text-[10px]">{c.lessons.length} lessons</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  to="/roadmap"
                  className="mt-4 flex items-center justify-center gap-1 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors border border-border/30"
                >
                  Open in Roadmap <ChevronRight className="h-3 w-3" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </PageShell>
    </AppShell>
  );
}
