import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Comment } from '@/data/community';

export interface CurrentAccount {
  handle: string;        // includes leading @
  name: string;
  avatar: string;        // data URL or external URL
  bio?: string;
  city?: string;
}

export interface UserPost {
  id: string;
  image: string;         // data URL
  caption: string;
  createdAt: string;
}

interface AccountState {
  account: CurrentAccount | null;
  comments: Record<string, Comment[]>;     // postId -> extra comments
  likedComments: string[];                 // "postId:idx"
  posts: UserPost[];                        // user-created photo posts
}

interface Ctx extends AccountState {
  signUp: (a: CurrentAccount) => void;
  signOut: () => void;
  addComment: (postId: string, text: string) => void;
  toggleCommentLike: (key: string) => void;
  addPost: (image: string, caption: string) => void;
}

const KEY = 'faith.account.v1';

const initial: AccountState = {
  account: null,
  comments: {},
  likedComments: [],
  posts: [],
};

const AccountContext = createContext<Ctx | null>(null);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AccountState>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? { ...initial, ...JSON.parse(raw) } : initial;
    } catch { return initial; }
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const value: Ctx = {
    ...state,
    signUp: (a) => setState(s => ({ ...s, account: a })),
    signOut: () => setState(s => ({ ...s, account: null })),
    addComment: (postId, text) => setState(s => {
      if (!s.account || !text.trim()) return s;
      const c: Comment = {
        user: s.account.name,
        handle: s.account.handle,
        text: text.trim(),
        likes: 0,
      };
      return { ...s, comments: { ...s.comments, [postId]: [...(s.comments[postId] ?? []), c] } };
    }),
    toggleCommentLike: (key) => setState(s => ({
      ...s,
      likedComments: s.likedComments.includes(key)
        ? s.likedComments.filter(x => x !== key)
        : [...s.likedComments, key],
    })),
    addPost: (image, caption) => setState(s => ({
      ...s,
      posts: [{ id: crypto.randomUUID(), image, caption, createdAt: new Date().toISOString() }, ...s.posts],
    })),
  };

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};

export const useAccount = () => {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');
  return ctx;
};
