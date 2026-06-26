import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { UserFast } from '@/data/practice';

interface UserState {
  onboarded: boolean;
  name: string | null;
  city: string | null;
  university: string | null;
  mandirId: string | null;
  interests: string[];
  rsvped: string[];
  bookmarks: string[];
  basket: string[];
  fasts: UserFast[];
  reminders: Record<string, boolean>;
  readingStreak: number;
  // Social (mock)
  likedEvents: string[];
  savedEvents: string[];
  // Courses
  completedLessons: string[];   // lesson IDs
  xp: number;
}

interface Ctx extends UserState {
  setProfile: (p: Partial<UserState>) => void;
  toggleRSVP: (id: string) => void;
  toggleBookmark: (id: string) => void;
  toggleLike: (id: string) => void;
  toggleSave: (id: string) => void;
  addToBasket: (id: string) => void;
  removeFromBasket: (id: string) => void;
  clearBasket: () => void;
  addFast: (f: UserFast) => void;
  toggleReminder: (id: string) => void;
  completeLesson: (lessonId: string, xp: number) => void;
  reset: () => void;
}

const KEY = 'faith.user.v3';

const initial: UserState = {
  onboarded: false,
  name: null,
  city: null,
  university: null,
  mandirId: null,
  interests: [],
  rsvped: [],
  bookmarks: [],
  basket: [],
  fasts: [],
  reminders: {},
  readingStreak: 4,
  likedEvents: [],
  savedEvents: [],
  completedLessons: [],
  xp: 0,
};

const UserContext = createContext<Ctx | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<UserState>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? { ...initial, ...JSON.parse(raw) } : initial;
    } catch { return initial; }
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const setProfile = (p: Partial<UserState>) => setState(s => ({ ...s, ...p }));
  const toggle = (key: 'rsvped' | 'bookmarks' | 'likedEvents' | 'savedEvents') => (id: string) => setState(s => ({
    ...s, [key]: s[key].includes(id) ? s[key].filter(x => x !== id) : [...s[key], id],
  }));

  const value: Ctx = {
    ...state, setProfile,
    toggleRSVP: toggle('rsvped'),
    toggleBookmark: toggle('bookmarks'),
    toggleLike: toggle('likedEvents'),
    toggleSave: toggle('savedEvents'),
    addToBasket: (id) => setState(s => ({ ...s, basket: [...s.basket, id] })),
    removeFromBasket: (id) => setState(s => {
      const i = s.basket.indexOf(id); if (i < 0) return s;
      const next = [...s.basket]; next.splice(i, 1); return { ...s, basket: next };
    }),
    clearBasket: () => setState(s => ({ ...s, basket: [] })),
    addFast: (f) => setState(s => ({ ...s, fasts: [...s.fasts, f] })),
    toggleReminder: (id) => setState(s => ({ ...s, reminders: { ...s.reminders, [id]: !s.reminders[id] } })),
    completeLesson: (lessonId, xp) => setState(s => s.completedLessons.includes(lessonId)
      ? s
      : { ...s, completedLessons: [...s.completedLessons, lessonId], xp: s.xp + xp }),
    reset: () => setState(initial),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
