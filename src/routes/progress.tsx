import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { weeklyActivity, skillRadar } from "@/lib/mock-data";
import { roadmapPhases, TOTAL_LESSONS, milestones } from "@/lib/roadmap-data";
import { useProgressStore } from "@/lib/progress-store";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { CheckCircle2, Lock, Trophy, Clock, Zap, TrendingUp, BookOpen, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/progress")({
  head: () => ({ meta: [{ title: "Progress · AIMastery" }] }),
  component: ProgressPage,
});

function ProgressPage() {
  const store = useProgressStore();

  // Heatmap (12 weeks × 7 days — uses actual data in prod, visual here)
  const heatmap = Array.from({ length: 12 }, () =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
  );
  const intensity = ["bg-muted/30", "bg-violet-500/20", "bg-violet-500/40", "bg-violet-500/60", "bg-violet-500/90"];

  const daysElapsed = Math.floor(
    (Date.now() - new Date(store.startDate).getTime()) / 86400000
  ) + 1;

  return (
    <AppShell>
      <PageShell>
        <PageHeader eyebrow="Hub" title="Progress" description="Your real-time learning progress — updated instantly as you complete lessons." />

        {/* Top stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Stat icon={Clock} label="Hours Studied" value={`${store.totalHoursStudied}h`} color="text-cyan-400" />
          <Stat icon={BookOpen} label="Lessons Done" value={`${store.completedCount}`} color="text-violet-400" sub={`of ${TOTAL_LESSONS}`} />
          <Stat icon={TrendingUp} label="Streak" value={`${store.streak}d`} color="text-orange-400" />
          <Stat icon={Zap} label="Total XP" value={store.totalXp.toLocaleString()} color="text-amber-400" sub={`Level ${store.level}`} />
        </div>

        {/* Overall progress bar */}
        <div className="rounded-xl glass p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">Journey to Chief AI Architect</div>
            <div className="text-2xl font-bold gradient-text">{store.overallProgress}%</div>
          </div>
          <div className="h-4 rounded-full bg-muted/40 overflow-hidden mb-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 transition-all duration-700"
              style={{ width: `${store.overallProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Day {daysElapsed} of 365</span>
            <span>{TOTAL_LESSONS - store.completedCount} lessons remaining</span>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="rounded-xl glass p-5 mb-6">
          <div className="text-sm font-semibold mb-1">Activity Heatmap</div>
          <div className="text-xs text-muted-foreground mb-4">Last 12 weeks</div>
          <div className="flex gap-1">
            {heatmap.map((week, i) => (
              <div key={i} className="flex flex-col gap-1">
                {week.map((v, j) => (
                  <div key={j} className={`h-3 w-3 rounded-sm ${intensity[v]}`} />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground">
            Less
            {intensity.map((c, i) => <div key={i} className={`h-2.5 w-2.5 rounded-sm ${c}`} />)}
            More
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Weekly hours bar chart */}
          <div className="rounded-xl glass p-5">
            <div className="text-sm font-semibold mb-3">Weekly Hours</div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" />
                  <XAxis dataKey="day" stroke="oklch(0.66 0.012 270)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.66 0.012 270)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "oklch(0.17 0.007 285)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="hours" fill="oklch(0.62 0.22 295)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Phase progress */}
          <div className="rounded-xl glass p-5">
            <div className="text-sm font-semibold mb-3">Phase Progress</div>
            <div className="space-y-3 overflow-y-auto max-h-56 scrollbar-thin pr-1">
              {roadmapPhases.map(phase => {
                const pct = store.getPhaseProgress(phase.id);
                return (
                  <div key={phase.id}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="flex items-center gap-1.5 truncate">
                        <span
                          className="h-2 w-2 rounded-full shrink-0"
                          style={{ background: phase.color }}
                        />
                        P{phase.phase} · {phase.title}
                      </span>
                      <span className="font-medium shrink-0 ml-2" style={{ color: pct > 0 ? phase.color : undefined }}>
                        {pct}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: phase.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Milestones tracker */}
        <div className="rounded-xl glass p-5 mb-6">
          <div className="text-sm font-semibold mb-4 inline-flex items-center gap-1.5">
            <Trophy className="h-4 w-4 text-amber-400" /> Milestone Tracker
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {milestones.map(ms => {
              const unlocked = store.isMilestoneUnlocked(ms.id);
              const phase = roadmapPhases.find(p => p.id === ms.phaseId)!;
              return (
                <div
                  key={ms.id}
                  className={cn(
                    "rounded-xl p-3 border transition-all",
                    unlocked
                      ? "border-opacity-30 shadow-sm"
                      : "border-border/30 opacity-50"
                  )}
                  style={unlocked ? {
                    background: `${ms.color}10`,
                    borderColor: `${ms.color}30`,
                  } : {}}
                >
                  <div className="text-2xl mb-2">{ms.badge}</div>
                  <div className="text-xs font-semibold leading-tight mb-1">{ms.title}</div>
                  <div className="text-[10px] text-muted-foreground mb-2">Phase {phase.phase}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium" style={{ color: ms.color }}>+{ms.xp.toLocaleString()} XP</span>
                    {unlocked
                      ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      : <Lock className="h-3 w-3 text-muted-foreground" />
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skill breakdown */}
        <div className="rounded-xl glass p-5">
          <div className="text-sm font-semibold mb-3">Skill Breakdown</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {skillRadar.map(s => (
              <div key={s.skill} className="rounded-lg bg-muted/30 p-3">
                <div className="text-xs text-muted-foreground">{s.skill}</div>
                <div className="mt-1 text-lg font-semibold">{s.score}<span className="text-xs text-muted-foreground">/100</span></div>
                <div className="h-1 rounded-full bg-muted mt-2 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${s.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageShell>
    </AppShell>
  );
}

function Stat({
  icon: Icon, label, value, color, sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; value: string; color: string; sub?: string;
}) {
  return (
    <div className="rounded-xl glass p-4">
      <div className={cn("text-[10px] uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1")}>
        <Icon className={cn("h-3 w-3", color)} /> {label}
      </div>
      <div className={cn("mt-1 text-2xl font-semibold", color)}>{value}</div>
      {sub && <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  );
}
