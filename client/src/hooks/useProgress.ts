/*
 * GLORYPREP "Paper & Ember" — learning progress
 * localStorage-backed progress persistence (easily swappable for a backend API):
 * completed lessons, streaks, current-lesson resume point, quiz results.
 * Exposes events for analytics hooks downstream (analytics.track if available).
 */
import { useCallback, useEffect, useState } from "react";
import type { Lesson, SkillId } from "@/lib/lessons";
import { getLessonsBySkill } from "@/lib/lessons";

const KEY = "gloryprep-progress-v1";

interface ProgressState {
  completed: string[]; // lesson ids
  startedAt: string; // ISO date first lesson started
  lastCompletedAt: string; // ISO datetime
  streak: number;
  lastActiveDay: string; // YYYY-MM-DD
  current: Record<SkillId, string>; // resume point per skill
  quizResults: Record<string, { correct: boolean; date: string }>; // lessonId -> result
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    /* corrupted storage — start fresh */
  }
  return DEFAULT_STATE;
}

const DEFAULT_STATE: ProgressState = {
  completed: [],
  startedAt: "",
  lastCompletedAt: "",
  streak: 0,
  lastActiveDay: "",
  current: {
    listening: "",
    reading: "",
    writing: "",
    speaking: "",
  },
  quizResults: {},
};

let state: ProgressState = load();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function update(patch: Partial<ProgressState>) {
  state = { ...state, ...patch };
  localStorage.setItem(KEY, JSON.stringify(state));
  emit();
}

/** Fire an analytics event when the runtime hook is mounted. */
type TrackFn = (name: string, props?: Record<string, unknown>) => void;
let trackFn: TrackFn | null = null;
export function setProgressTracker(fn: TrackFn | null) {
  trackFn = fn;
}
export function trackEvent(name: string, props?: Record<string, unknown>) {
  trackFn?.(name, props);
  if (typeof window !== "undefined") {
    const w = window as unknown as { umami?: { track?: TrackFn; (name?: never, props?: never): void } };
    if (typeof w.umami?.track === "function") {
      w.umami.track(name, props);
    }
  }
}

function nextLesson(skill: SkillId, exclude: string[] = []): Lesson | null {
  const pool = getLessonsBySkill(skill).filter((l) => !exclude.includes(l.id));
  return pool[0] ?? null;
}

/** React hook — subscribe to progress updates. */
export function useProgress() {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  const startLesson = useCallback((lesson: Lesson) => {
    if (!state.startedAt) update({ startedAt: new Date().toISOString() });
    update({ current: { ...state.current, [lesson.skill]: lesson.id } });
    trackEvent("lesson_started", { lesson: lesson.id, skill: lesson.skill, level: lesson.level });
  }, []);

  const completeLesson = useCallback((lesson: Lesson) => {
    const already = state.completed.includes(lesson.id);
    const completed = already ? state.completed : [...state.completed, lesson.id];
    const day = today();
    // streak: +1 if last active day was yesterday, reset if >1 day gap, keep if same day
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    let streak = state.streak;
    if (state.lastActiveDay !== day) {
      streak = state.lastActiveDay === yesterday ? streak + 1 : 1;
    }
    update({
      completed,
      lastCompletedAt: new Date().toISOString(),
      streak,
      lastActiveDay: day,
    });
    trackEvent("lesson_completed", { lesson: lesson.id, skill: lesson.skill, streak });
  }, []);

  const recordQuiz = useCallback((lesson: Lesson, correct: boolean) => {
    update({
      quizResults: {
        ...state.quizResults,
        [lesson.id]: { correct, date: new Date().toISOString() },
      },
    });
    trackEvent("quiz_completed", { lesson: lesson.id, skill: lesson.skill, correct });
  }, []);

  const pctForSkill = useCallback(
    (skill: SkillId) => {
      const all = getLessonsBySkill(skill);
      const done = all.filter((l) => state.completed.includes(l.id)).length;
      return Math.round((done / all.length) * 100);
    },
    [],
  );

  const completedForSkill = useCallback(
    (skill: SkillId) => state.completed.filter((id) => id.startsWith(skill)).length,
    [],
  );

  const recommended = useCallback(
    (skill: SkillId): Lesson | null => {
      // resume incomplete, else weakest-area heuristic: lowest quiz score, else next lesson
      const started = getLessonsBySkill(skill).filter(
        (l) => state.current[skill] === l.id && !state.completed.includes(l.id),
      );
      if (started[0]) return started[0];
      const missed = getLessonsBySkill(skill)
        .filter((l) => state.quizResults[l.id]?.correct === false)
        .sort((a, b) => (a.quiz.a === 0 ? -1 : 1));
      if (missed[0]) return missed[0];
      return nextLesson(skill, state.completed);
    },
    [],
  );

  const reset = useCallback(() => {
    update(DEFAULT_STATE);
  }, []);

  return {
    state,
    startLesson,
    completeLesson,
    recordQuiz,
    pctForSkill,
    completedForSkill,
    recommended,
    isCompleted: (id: string) => state.completed.includes(id),
    reset,
  };
}

export type { ProgressState, SkillId };
