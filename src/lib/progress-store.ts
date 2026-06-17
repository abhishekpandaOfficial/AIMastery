// ============================================================
// AIMastery — Progress Store (localStorage-backed)
// Tracks lesson completion, XP, milestones across sessions
// ============================================================

import { useState, useEffect, useCallback } from "react";
import { roadmapPhases, allRoadmapLessons, milestones, TOTAL_LESSONS } from "./roadmap-data";

const STORAGE_KEY = "aimastery_progress_v2";

interface ProgressState {
  completedLessons: Record<string, boolean>;  // lessonId -> true
  inProgressLessons: Record<string, boolean>; // lessonId -> true
  unlockedMilestones: Record<string, boolean>;// milestoneId -> true
  totalXp: number;
  streak: number;
  lastActiveDate: string;
  startDate: string;
}

function defaultState(): ProgressState {
  return {
    completedLessons: {},
    inProgressLessons: {},
    unlockedMilestones: {},
    totalXp: 0,
    streak: 1,
    lastActiveDate: new Date().toISOString().split("T")[0],
    startDate: new Date().toISOString().split("T")[0],
  };
}

function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

function saveState(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* quota exceeded */ }
}

// ─── Computed from state ──────────────────────────────────────

function computePhaseProgress(phaseId: string, completed: Record<string, boolean>): number {
  const phase = roadmapPhases.find(p => p.id === phaseId);
  if (!phase) return 0;
  const lessons = phase.chapters.flatMap(c => c.lessons);
  if (!lessons.length) return 0;
  const done = lessons.filter(l => completed[l.id]).length;
  return Math.round((done / lessons.length) * 100);
}

function computeOverallProgress(completed: Record<string, boolean>): number {
  const done = Object.values(completed).filter(Boolean).length;
  return Math.round((done / TOTAL_LESSONS) * 100);
}

function checkNewMilestones(
  completed: Record<string, boolean>,
  unlocked: Record<string, boolean>,
): Record<string, boolean> {
  const updated = { ...unlocked };
  for (const ms of milestones) {
    if (updated[ms.id]) continue;
    const phase = roadmapPhases.find(p => p.id === ms.phaseId);
    if (!phase) continue;
    const lessons = phase.chapters.flatMap(c => c.lessons);
    const allDone = lessons.every(l => completed[l.id]);
    if (allDone) updated[ms.id] = true;
  }
  return updated;
}

// ─── Hook ────────────────────────────────────────────────────

export function useProgressStore() {
  const [state, setStateRaw] = useState<ProgressState>(() => loadState());

  // Persist on every change
  useEffect(() => { saveState(state); }, [state]);

  const setState = useCallback((updater: (prev: ProgressState) => ProgressState) => {
    setStateRaw(prev => {
      const next = updater(prev);
      saveState(next);
      return next;
    });
  }, []);

  // ── Actions ──────────────────────────────────────────────

  const markComplete = useCallback((lessonId: string) => {
    setState(prev => {
      const lesson = allRoadmapLessons.find(l => l.id === lessonId);
      if (!lesson || prev.completedLessons[lessonId]) return prev;

      const completedLessons = { ...prev.completedLessons, [lessonId]: true };
      const inProgressLessons = { ...prev.inProgressLessons };
      delete inProgressLessons[lessonId];

      const unlockedMilestones = checkNewMilestones(completedLessons, prev.unlockedMilestones);
      const gainedXp = lesson.xp;

      return {
        ...prev,
        completedLessons,
        inProgressLessons,
        unlockedMilestones,
        totalXp: prev.totalXp + gainedXp,
        lastActiveDate: new Date().toISOString().split("T")[0],
      };
    });
  }, [setState]);

  const markInProgress = useCallback((lessonId: string) => {
    setState(prev => {
      if (prev.completedLessons[lessonId]) return prev;
      return {
        ...prev,
        inProgressLessons: { ...prev.inProgressLessons, [lessonId]: true },
      };
    });
  }, [setState]);

  const unmarkComplete = useCallback((lessonId: string) => {
    setState(prev => {
      if (!prev.completedLessons[lessonId]) return prev;
      const lesson = allRoadmapLessons.find(l => l.id === lessonId);
      const completedLessons = { ...prev.completedLessons };
      delete completedLessons[lessonId];
      return {
        ...prev,
        completedLessons,
        totalXp: Math.max(0, prev.totalXp - (lesson?.xp ?? 0)),
      };
    });
  }, [setState]);

  // ── Computed ─────────────────────────────────────────────

  const isCompleted = useCallback((lessonId: string) => !!state.completedLessons[lessonId], [state]);
  const isInProgress = useCallback((lessonId: string) => !!state.inProgressLessons[lessonId], [state]);
  const isMilestoneUnlocked = useCallback((msId: string) => !!state.unlockedMilestones[msId], [state]);

  const getPhaseProgress = useCallback((phaseId: string) =>
    computePhaseProgress(phaseId, state.completedLessons), [state]);

  const overallProgress = computeOverallProgress(state.completedLessons);
  const completedCount = Object.values(state.completedLessons).filter(Boolean).length;
  const inProgressCount = Object.values(state.inProgressLessons).filter(Boolean).length;
  const unlockedMilestoneCount = Object.values(state.unlockedMilestones).filter(Boolean).length;

  // Approximate hours: avg 90 min / lesson
  const totalHoursStudied = Math.round((completedCount * 90) / 60);

  // Level based on XP
  const level = Math.floor(state.totalXp / 500) + 1;
  const xpToNextLevel = (level * 500) - state.totalXp;

  return {
    // Actions
    markComplete,
    markInProgress,
    unmarkComplete,
    // Queries
    isCompleted,
    isInProgress,
    isMilestoneUnlocked,
    getPhaseProgress,
    // Stats
    overallProgress,
    completedCount,
    inProgressCount,
    unlockedMilestoneCount,
    totalXp: state.totalXp,
    level,
    xpToNextLevel,
    streak: state.streak,
    totalHoursStudied,
    startDate: state.startDate,
    // Raw
    completedLessons: state.completedLessons,
    unlockedMilestones: state.unlockedMilestones,
  };
}

export type ProgressStore = ReturnType<typeof useProgressStore>;
