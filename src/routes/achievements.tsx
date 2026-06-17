import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { achievements } from "@/lib/mock-data";
import { milestones, roadmapPhases } from "@/lib/roadmap-data";
import { useProgressStore } from "@/lib/progress-store";
import { Lock, Trophy, Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const Route = createFileRoute("/achievements")({
  head: () => ({ meta: [{ title: "Achievements · AIMastery" }] }),
  component: AchievementsPage,
});

const rarityStyle: Record<string, string> = {
  common: "from-slate-400/30 to-slate-500/20 border-slate-400/30",
  rare: "from-cyan-400/30 to-blue-500/20 border-cyan-400/40",
  epic: "from-violet-500/40 to-fuchsia-500/20 border-violet-400/50",
  legendary: "from-amber-400/40 to-orange-500/20 border-amber-400/60",
};

const rarityColor: Record<string, string> = {
  common: "text-slate-300",
  rare: "text-cyan-300",
  epic: "text-violet-300",
  legendary: "text-amber-300",
};

function AchievementsPage() {
  const store = useProgressStore();
  const unlocked = achievements.filter(a => a.unlocked).length;

  return (
    <AppShell>
      <PageShell>
        <PageHeader
          eyebrow="Hub"
          title="Achievements"
          description={`${unlocked} static · ${store.unlockedMilestoneCount} milestones unlocked. Complete phases to earn milestone badges.`}
        />

        {/* ── Static achievements ── */}
        <div className="text-sm font-semibold mb-4 inline-flex items-center gap-1.5">
          <Trophy className="h-4 w-4 text-amber-400" /> Achievements
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {achievements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={cn(
                "relative rounded-xl p-5 border bg-gradient-to-br",
                a.unlocked ? rarityStyle[a.rarity] : "from-muted/20 to-muted/10 border-border/40 opacity-60"
              )}
            >
              {!a.unlocked && (
                <div className="absolute top-3 right-3">
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              )}
              <div className="text-3xl mb-3">{a.unlocked ? "🏆" : "🔒"}</div>
              <div className="text-sm font-semibold mb-1">{a.title}</div>
              <div className="text-xs text-muted-foreground mb-3">{a.description}</div>
              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <span className={cn("text-[10px] uppercase tracking-wider font-semibold", rarityColor[a.rarity])}>
                  {a.rarity}
                </span>
                <span className="text-xs font-medium">+{a.xp} XP</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Milestone achievements (one per phase) ── */}
        <div className="text-sm font-semibold mb-4 inline-flex items-center gap-1.5">
          <Star className="h-4 w-4 text-violet-400" /> Roadmap Milestones
          <span className="text-xs font-normal text-muted-foreground">
            — unlock by completing all lessons in each phase
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestones.map((ms, i) => {
            const unlocked = store.isMilestoneUnlocked(ms.id);
            const phase = roadmapPhases.find(p => p.id === ms.phaseId)!;
            const progress = store.getPhaseProgress(ms.phaseId);

            return (
              <motion.div
                key={ms.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  "relative rounded-xl p-5 border transition-all overflow-hidden",
                  unlocked ? rarityStyle[ms.rarity] : "border-border/40 opacity-70"
                )}
                style={unlocked ? {
                  background: `linear-gradient(135deg, ${ms.color}20, ${ms.color}08)`,
                  borderColor: `${ms.color}40`,
                } : {}}
              >
                {/* Glow background for unlocked */}
                {unlocked && (
                  <div
                    className="absolute -top-8 -right-8 h-20 w-20 rounded-full blur-2xl opacity-30"
                    style={{ background: ms.color }}
                  />
                )}

                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{ms.badge}</div>
                    {unlocked
                      ? <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      : <Lock className="h-4 w-4 text-muted-foreground" />
                    }
                  </div>

                  <div className="text-sm font-bold mb-1">{ms.title}</div>
                  <div className="text-xs text-muted-foreground mb-1">{ms.description}</div>
                  <div className="text-[10px] text-muted-foreground mb-3">
                    Phase {phase.phase} · Days {phase.dayRange[0]}–{phase.dayRange[1]}
                  </div>

                  {/* Progress toward milestone */}
                  {!unlocked && (
                    <div className="mb-3">
                      <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${progress}%`, background: ms.color }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-border/30">
                    <span className={cn("text-[10px] uppercase tracking-wider font-semibold", rarityColor[ms.rarity])}>
                      {ms.rarity}
                    </span>
                    <span className="text-xs font-bold" style={{ color: ms.color }}>
                      +{ms.xp.toLocaleString()} XP
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </PageShell>
    </AppShell>
  );
}
