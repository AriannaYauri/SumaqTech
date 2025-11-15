export type ProgressMap = Record<string, { completed: boolean }>;

const STORAGE_KEY = 'sumaqtech_progress_v1';

export const loadProgress = (courseId: string): ProgressMap => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const all = JSON.parse(raw) || {};
    return all[courseId] || {};
  } catch {
    return {};
  }
};

export const saveProgress = (courseId: string, progress: ProgressMap) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all = raw ? JSON.parse(raw) : {};
    all[courseId] = progress;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {}
};