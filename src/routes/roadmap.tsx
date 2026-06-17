import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, CheckCircle2, Circle, Clock, Star, Search,
  Flame, TrendingUp, BookOpen, Target, Sparkles, Trophy,
  Play, Lock, ChevronDown, Zap, Crown,
} from "lucide-react";
import { useState, useMemo } from "react";
import { AppShell, PageShell, PageHeader } from "@/components/app-shell";
import { roadmapPhases, allRoadmapLessons, TOTAL_LESSONS, TOTAL_HOURS, TOTAL_PHASES, type RoadmapPhase, type RoadmapChapter, type RoadmapLesson } from "@/lib/roadmap-data";
import { useProgressStore } from "@/lib/progress-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/roadmap")({
  head: () => ({ meta: [{ title: "AI Roadmap · AIMastery" }] }),
  component: RoadmapPage,
});

// ─── Sub-lesson row ─────────────────────────────────────────

function SubLessonRow({ sub }: { sub: NonNullable<RoadmapLesson["subLessons"]>[0] }) {
  const typeColors: Record<string, string> = {
    concept: "bg-violet-500/20 text-violet-300",
    code: "bg-cyan-500/20 text-cyan-300",
    paper: "bg-amber-500/20 text-amber-300",
    project: "bg-emerald-500/20 text-emerald-300",
    quiz: "bg-rose-500/20 text-rose-300",
  };
  return (
    <div className="flex items-center gap-2.5 py-1.5 px-2 rounded hover:bg-muted/30 transition-colors group/sub">
      <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 shrink-0 ml-1" />
      <span className="flex-1 text-xs text-muted-foreground group-hover/sub:text-foreground transition-colors">{sub.title}</span>
      <span className={cn("text-[10px] px-1.5 py-0.5 rounded-sm font-medium", typeColors[sub.type] ?? "bg-muted/30 text-muted-foreground")}>{sub.type}</span>
      <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" />{sub.duration}m</span>
    </div>
  );
}

// ─── Lesson row ─────────────────────────────────────────────

function LessonRow({
  lesson, phaseColor, store,
}: {
  lesson: RoadmapLesson;
  phaseColor: string;
  store: ReturnType<typeof useProgressStore>;
}) {
  const [subsOpen, setSubsOpen] = useState(false);
  const completed = store.isCompleted(lesson.id);
  const inProgress = store.isInProgress(lesson.id);

  const difficultyColors: Record<string, string> = {
    beginner: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    intermediate: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
    advanced: "bg-violet-500/15 text-violet-300 border-violet-500/20",
    expert: "bg-rose-500/15 text-rose-300 border-rose-500/20",
  };

  return (
    <div className={cn(
      "rounded-lg border transition-all",
      completed
        ? "border-emerald-500/30 bg-emerald-500/5"
        : inProgress
        ? "border-violet-500/30 bg-violet-500/5"
        : "border-border/40 bg-card/20 hover:border-border/60"
    )}>
      <div className="flex items-start gap-3 px-3 py-2.5">
        {/* Status icon */}
        <button
          onClick={() => completed ? store.unmarkComplete(lesson.id) : store.markComplete(lesson.id)}
          className="mt-0.5 shrink-0 transition-transform hover:scale-110 focus:outline-none"
          title={completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {completed ? (
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" style={{ width: 18, height: 18 }} />
          ) : inProgress ? (
            <div className="h-4 w-4 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
          ) : (
            <Circle className="h-4 w-4 text-muted-foreground/50 hover:text-muted-foreground transition-colors" style={{ width: 18, height: 18 }} />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className={cn(
            "text-sm font-medium leading-snug",
            completed && "line-through text-muted-foreground"
          )}>
            {lesson.title}
            {lesson.day && (
              <span className="ml-2 text-[10px] font-normal text-muted-foreground/50">Day {lesson.day}</span>
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{lesson.description}</div>

          {/* Tags */}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded border", difficultyColors[lesson.difficulty])}>
              {lesson.difficulty}
            </span>
            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
              <Clock className="h-2.5 w-2.5" />{lesson.duration}m
            </span>
            <span className="text-[10px] text-amber-400 flex items-center gap-0.5">
              <Star className="h-2.5 w-2.5 fill-current" />{lesson.xp} XP
            </span>
            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
              <TrendingUp className="h-2.5 w-2.5" />Demand {lesson.industryDemand}/10
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {!completed && (
            <button
              onClick={() => store.markInProgress(lesson.id)}
              className="hidden md:flex items-center gap-1 px-2 py-1 rounded text-[10px] text-muted-foreground hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors border border-transparent hover:border-cyan-500/20"
            >
              <Play className="h-2.5 w-2.5" /> Start
            </button>
          )}
          {!completed && (
            <button
              onClick={() => store.markComplete(lesson.id)}
              className="hidden md:flex items-center gap-1 px-2 py-1 rounded text-[10px] text-muted-foreground hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors border border-transparent hover:border-emerald-500/20"
            >
              <CheckCircle2 className="h-2.5 w-2.5" /> Done
            </button>
          )}
          {lesson.subLessons && lesson.subLessons.length > 0 && (
            <button
              onClick={() => setSubsOpen(o => !o)}
              className="flex items-center gap-0.5 px-2 py-1 rounded text-[10px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown className={cn("h-3 w-3 transition-transform", subsOpen && "rotate-180")} />
              {lesson.subLessons.length}
            </button>
          )}
        </div>
      </div>

      {/* Sub-lessons */}
      <AnimatePresence initial={false}>
        {subsOpen && lesson.subLessons && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-2 space-y-0.5 border-t border-border/30 pt-1.5">
              {lesson.subLessons.map(sub => (
                <SubLessonRow key={sub.id} sub={sub} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Chapter block ───────────────────────────────────────────

function ChapterBlock({
  chapter, phaseColor, store,
}: {
  chapter: RoadmapChapter;
  phaseColor: string;
  store: ReturnType<typeof useProgressStore>;
}) {
  const [open, setOpen] = useState(false);
  const done = chapter.lessons.filter(l => store.isCompleted(l.id)).length;
  const pct = chapter.lessons.length > 0 ? Math.round((done / chapter.lessons.length) * 100) : 0;

  return (
    <div className="rounded-xl border border-border/50 bg-card/30 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors text-left"
      >
        <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform shrink-0", open && "rotate-90")} />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold">{chapter.title}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{chapter.description}</div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <div className="h-1 w-20 rounded-full bg-muted/50 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: phaseColor }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{done}/{chapter.lessons.length}</span>
          </div>
          {pct === 100 && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2 border-t border-border/30 pt-3">
              {chapter.lessons.map(lesson => (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  phaseColor={phaseColor}
                  store={store}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Phase card ──────────────────────────────────────────────

function PhaseCard({
  phase, store, defaultOpen,
}: {
  phase: RoadmapPhase;
  store: ReturnType<typeof useProgressStore>;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const progress = store.getPhaseProgress(phase.id);
  const totalLessons = phase.chapters.reduce((s, c) => s + c.lessons.length, 0);
  const doneLessons = phase.chapters.reduce(
    (s, c) => s + c.lessons.filter(l => store.isCompleted(l.id)).length, 0
  );
  const msId = `ms-${phase.id}`;
  const msUnlocked = store.isMilestoneUnlocked(msId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: phase.phase * 0.04 }}
      className={cn(
        "rounded-2xl overflow-hidden border transition-all",
        msUnlocked
          ? "border-emerald-500/30 shadow-[0_0_30px_-10px] shadow-emerald-500/20"
          : "border-border/50 hover:border-border/80"
      )}
    >
      {/* Phase header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full p-5 flex items-center gap-5 hover:bg-muted/10 transition-colors text-left"
      >
        {/* Phase number badge */}
        <div
          className="relative h-16 w-16 rounded-2xl grid place-items-center shrink-0 shadow-lg text-white"
          style={{ background: `linear-gradient(135deg, ${phase.color}cc, ${phase.color}55)`, border: `1px solid ${phase.color}44` }}
        >
          {msUnlocked ? (
            <Crown className="h-7 w-7 text-white" />
          ) : (
            <span className="text-2xl font-bold">{phase.phase}</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: `${phase.color}25`, color: phase.color }}
            >
              Phase {phase.phase}
            </span>
            <span className="text-[10px] text-muted-foreground">
              Days {phase.dayRange[0]}–{phase.dayRange[1]}
            </span>
            <span className="text-[10px] text-muted-foreground">
              · {phase.estimatedHours}h
            </span>
          </div>
          <div className="text-lg font-bold leading-tight">{phase.title}</div>
          <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{phase.subtitle}</div>
        </div>

        {/* Progress */}
        <div className="hidden lg:flex flex-col items-end gap-2 mr-3 shrink-0">
          <div className="text-xs font-medium text-right">
            {doneLessons}/{totalLessons} lessons
          </div>
          <div className="h-1.5 w-36 rounded-full bg-muted/50 overflow-hidden">
            <motion.div
              className="h-full rounded-full transition-all duration-700"
              style={{ background: `linear-gradient(90deg, ${phase.color}, ${phase.color}80)` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs font-semibold" style={{ color: phase.color }}>
            {progress}%
          </div>
        </div>

        {/* Milestone badge */}
        {msUnlocked && (
          <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium shrink-0">
            <CheckCircle2 className="h-3 w-3" /> Complete
          </div>
        )}

        <ChevronRight className={cn("h-5 w-5 text-muted-foreground transition-transform shrink-0", open && "rotate-90")} />
      </button>

      {/* Progress bar (mobile) */}
      <div className="h-0.5 bg-muted/30 lg:hidden">
        <div
          className="h-full transition-all duration-700"
          style={{ width: `${progress}%`, background: phase.color }}
        />
      </div>

      {/* Chapters */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-3 space-y-3 border-t border-border/30">
              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed">{phase.description}</p>

              {/* Milestone */}
              <div
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg border"
                style={{ background: `${phase.color}10`, borderColor: `${phase.color}30` }}
              >
                <span className="text-xl">{getMilestoneBadge(phase.phase)}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold" style={{ color: phase.color }}>
                    Milestone: {phase.milestone}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    +{phase.milestoneXp.toLocaleString()} XP · Complete all lessons to unlock
                  </div>
                </div>
                {msUnlocked
                  ? <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  : <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                }
              </div>

              {/* Chapter blocks */}
              <div className="space-y-3">
                {phase.chapters.map(chapter => (
                  <ChapterBlock
                    key={chapter.id}
                    chapter={chapter}
                    phaseColor={phase.color}
                    store={store}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function getMilestoneBadge(phase: number): string {
  const badges = ["🌱", "📐", "🐍", "🤖", "🗄️", "🧠", "💬", "👁️", "✨", "🚀", "🏗️", "👑"];
  return badges[phase] ?? "⭐";
}

// ─── Main Page ───────────────────────────────────────────────

function RoadmapPage() {
  const store = useProgressStore();
  const [search, setSearch] = useState("");
  const [filterPhase, setFilterPhase] = useState<number | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);

  // Filter phases/lessons by search
  const filteredPhases = useMemo(() => {
    if (!search && filterPhase === null && showCompleted) return roadmapPhases;

    return roadmapPhases
      .filter(p => filterPhase === null || p.phase === filterPhase)
      .map(phase => ({
        ...phase,
        chapters: phase.chapters.map(chapter => ({
          ...chapter,
          lessons: chapter.lessons.filter(lesson => {
            if (!showCompleted && store.isCompleted(lesson.id)) return false;
            if (!search) return true;
            const q = search.toLowerCase();
            return (
              lesson.title.toLowerCase().includes(q) ||
              lesson.description.toLowerCase().includes(q) ||
              lesson.topics.some(t => t.toLowerCase().includes(q))
            );
          }),
        })).filter(c => c.lessons.length > 0),
      })).filter(p => p.chapters.length > 0);
  }, [search, filterPhase, showCompleted, store]);

  const daysElapsed = Math.floor(
    (Date.now() - new Date(store.startDate).getTime()) / 86400000
  ) + 1;
  const daysLeft = Math.max(0, 365 - daysElapsed);

  return (
    <AppShell>
      <PageShell>
        <PageHeader
          eyebrow="Learn"
          title="AI Roadmap"
          description={`Your complete 365-day path from Python fundamentals to Chief AI Architect. ${TOTAL_PHASES} phases, 70+ chapters, 400+ lessons — every concept, every technology.`}
        />

        {/* ── Hero stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            {
              icon: TrendingUp, label: "Overall Progress",
              value: `${store.overallProgress}%`,
              color: "text-violet-400",
              sub: `${store.completedCount}/${TOTAL_LESSONS} lessons`
            },
            {
              icon: Flame, label: "Streak",
              value: `${store.streak}d`,
              color: "text-orange-400",
              sub: `${daysLeft}d left in 365`
            },
            {
              icon: Zap, label: "Total XP",
              value: store.totalXp.toLocaleString(),
              color: "text-amber-400",
              sub: `Level ${store.level}`
            },
            {
              icon: Trophy, label: "Milestones",
              value: `${store.unlockedMilestoneCount}/${TOTAL_PHASES}`,
              color: "text-emerald-400",
              sub: `${Math.round((store.unlockedMilestoneCount / TOTAL_PHASES) * 100)}% of phases done`
            },
          ].map(({ icon: Icon, label, value, color, sub }) => (
            <div key={label} className="rounded-xl glass p-4 gradient-border">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                <Icon className={cn("h-3 w-3", color)} /> {label}
              </div>
              <div className={cn("text-2xl font-bold", color)}>{value}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {/* ── Overall XP progress bar ── */}
        <div className="rounded-xl glass p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-semibold">Journey to Chief AI Architect</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {TOTAL_HOURS}h total curriculum · {TOTAL_PHASES} phases · 365 days
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold gradient-text">{store.overallProgress}%</div>
              <div className="text-xs text-muted-foreground">complete</div>
            </div>
          </div>
          <div className="h-3 rounded-full bg-muted/40 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${store.overallProgress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
          {/* Phase milestones on bar */}
          <div className="flex mt-2">
            {roadmapPhases.map(p => (
              <div
                key={p.id}
                className="flex-1 flex justify-center"
                title={`Phase ${p.phase}: ${p.title}`}
              >
                <div
                  className={cn(
                    "h-2 w-2 rounded-full border transition-all",
                    store.isMilestoneUnlocked(`ms-${p.id}`)
                      ? "bg-emerald-400 border-emerald-400"
                      : "bg-muted border-muted-foreground/30"
                  )}
                />
              </div>
            ))}
          </div>
          <div className="flex mt-1">
            {roadmapPhases.map(p => (
              <div key={p.id} className="flex-1 text-center">
                <span className="text-[8px] text-muted-foreground/60">P{p.phase}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Filters & Search ── */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search lessons, topics, concepts…"
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-muted/40 border border-border/50 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 focus:bg-muted/60 transition-all"
            />
          </div>

          {/* Phase filter chips */}
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => setFilterPhase(null)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                filterPhase === null
                  ? "bg-violet-500/20 text-violet-300 border-violet-500/30"
                  : "text-muted-foreground border-border/40 hover:border-border/60"
              )}
            >
              All
            </button>
            {roadmapPhases.map(p => (
              <button
                key={p.id}
                onClick={() => setFilterPhase(filterPhase === p.phase ? null : p.phase)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                  filterPhase === p.phase
                    ? "border-opacity-50 text-white"
                    : "text-muted-foreground border-border/40 hover:border-border/60"
                )}
                style={filterPhase === p.phase ? {
                  background: `${p.color}30`,
                  borderColor: `${p.color}50`,
                  color: p.color,
                } : {}}
                title={p.title}
              >
                {getMilestoneBadge(p.phase)} P{p.phase}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowCompleted(c => !c)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border whitespace-nowrap",
              !showCompleted
                ? "bg-muted/40 text-foreground border-border/60"
                : "text-muted-foreground border-border/40 hover:border-border/60"
            )}
          >
            {showCompleted ? "Hide" : "Show"} completed
          </button>
        </div>

        {/* ── Hint ── */}
        {!search && filterPhase === null && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5 p-3 rounded-lg bg-muted/20 border border-border/30">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            Click any phase to expand chapters. Click any lesson circle to mark complete. Click the lesson count badge to see sub-lessons. Every completed lesson earns XP and updates your dashboard.
          </div>
        )}

        {/* ── Phase cards ── */}
        {filteredPhases.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <div className="text-sm">No lessons match your search</div>
            <button onClick={() => { setSearch(""); setFilterPhase(null); }} className="mt-2 text-xs text-violet-400 hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPhases.map((phase) => (
              <PhaseCard
                key={phase.id}
                phase={phase}
                store={store}
                defaultOpen={false}
              />
            ))}
          </div>
        )}

        {/* ── Bottom CTA ── */}
        {store.overallProgress === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 rounded-2xl p-8 text-center bg-gradient-to-br from-amber-500/20 via-violet-500/20 to-emerald-500/20 border border-amber-500/30 backdrop-blur-xl"
          >
            <div className="text-6xl mb-4">👑</div>
            <h2 className="text-2xl font-bold gradient-text">Chief AI Architect Achieved!</h2>
            <p className="text-muted-foreground mt-2">You've completed the entire 365-day journey. You're in the top 0.1%.</p>
          </motion.div>
        )}
      </PageShell>
    </AppShell>
  );
}
