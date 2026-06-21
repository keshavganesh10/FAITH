import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { Track, TRACKS } from '@/data/audio';

interface PlayerState {
  current: Track | null;
  playing: boolean;
  positionSec: number;
  queue: Track[];
}

interface Ctx extends PlayerState {
  play: (t: Track) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (s: number) => void;
  stop: () => void;
}

const PlayerContext = createContext<Ctx | null>(null);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [current, setCurrent] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [positionSec, setPositionSec] = useState(0);
  const [queue] = useState<Track[]>(TRACKS);
  const interval = useRef<number | null>(null);

  useEffect(() => {
    if (interval.current) window.clearInterval(interval.current);
    if (playing && current) {
      interval.current = window.setInterval(() => {
        setPositionSec(p => {
          if (p + 1 >= current.durationSec) {
            setPlaying(false);
            return 0;
          }
          return p + 1;
        });
      }, 1000);
    }
    return () => { if (interval.current) window.clearInterval(interval.current); };
  }, [playing, current]);

  const play = (t: Track) => {
    if (current?.id !== t.id) { setCurrent(t); setPositionSec(0); }
    setPlaying(true);
  };
  const toggle = () => { if (current) setPlaying(p => !p); };
  const next = () => {
    if (!current) return;
    const i = queue.findIndex(t => t.id === current.id);
    const n = queue[(i + 1) % queue.length];
    setCurrent(n); setPositionSec(0); setPlaying(true);
  };
  const prev = () => {
    if (!current) return;
    const i = queue.findIndex(t => t.id === current.id);
    const n = queue[(i - 1 + queue.length) % queue.length];
    setCurrent(n); setPositionSec(0); setPlaying(true);
  };
  const seek = (s: number) => setPositionSec(s);
  const stop = () => { setPlaying(false); setCurrent(null); setPositionSec(0); };

  return (
    <PlayerContext.Provider value={{ current, playing, positionSec, queue, play, toggle, next, prev, seek, stop }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
};
