"use client";

const STORAGE_KEY = "claude-course-progress";
const BOOKMARKS_KEY = "claude-course-bookmarks";
const CHECKPOINTS_KEY = "claude-course-checkpoints";

export interface ProgressState {
  completed: string[]; // lesson slugs
  lastVisited: string | null;
}

function getProgress(): ProgressState {
  if (typeof window === "undefined") return { completed: [], lastVisited: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { completed: [], lastVisited: null };
  } catch {
    return { completed: [], lastVisited: null };
  }
}

function saveProgress(state: ProgressState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function markComplete(slug: string): void {
  const state = getProgress();
  if (!state.completed.includes(slug)) {
    state.completed = [...state.completed, slug];
  }
  state.lastVisited = slug;
  saveProgress(state);
}

export function markIncomplete(slug: string): void {
  const state = getProgress();
  state.completed = state.completed.filter((s) => s !== slug);
  saveProgress(state);
}

export function isComplete(slug: string): boolean {
  return getProgress().completed.includes(slug);
}

export function getCompletedSlugs(): string[] {
  return getProgress().completed;
}

export function getLastVisited(): string | null {
  return getProgress().lastVisited;
}

export function setLastVisited(slug: string): void {
  const state = getProgress();
  state.lastVisited = slug;
  saveProgress(state);
}

export function getCompletedCount(): number {
  return getProgress().completed.length;
}

// Bookmarks
function getBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(slug: string): boolean {
  const bookmarks = getBookmarks();
  const isBookmarked = bookmarks.includes(slug);
  const updated = isBookmarked
    ? bookmarks.filter((s) => s !== slug)
    : [...bookmarks, slug];
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  return !isBookmarked;
}

export function isBookmarked(slug: string): boolean {
  return getBookmarks().includes(slug);
}

export function getBookmarkedSlugs(): string[] {
  return getBookmarks();
}

// ── Checkpoint tracking ──────────────────────────────────────

function getCheckpoints(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CHECKPOINTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Call when the learner answers the checkpoint correctly */
export function markCheckpointPassed(slug: string): void {
  const checkpoints = getCheckpoints();
  if (!checkpoints.includes(slug)) {
    localStorage.setItem(CHECKPOINTS_KEY, JSON.stringify([...checkpoints, slug]));
  }
}

export function hasPassedCheckpoint(slug: string): boolean {
  return getCheckpoints().includes(slug);
}
