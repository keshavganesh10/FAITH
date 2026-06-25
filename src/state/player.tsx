import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { Track, TRACKS } from '@/data/audio';

interface PlayerState {
  current: Track | null;
  playing: boolean;
  positionSec: number;
  queue: Track[];
  loading: boolean;
  error: string | null;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mockInterval = useRef<number | null>(null);

  // Lazily create a single audio element
  useEffect(() => {
    const a = new Audio();
    a.preload = 'metadata';
    a.crossOrigin = 'anonymous';
    audioRef.current = a;

    const onTime = () => setPositionSec(a.currentTime);
    const onEnd = () => { setPlaying(false); setPositionSec(0); };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onWaiting = () => setLoading(true);
    const onCanPlay = () => setLoading(false);
    const onError = () => { setLoading(false); setError('Could not load track.'); setPlaying(false); };

    a.addEventListener('timeupdate', onTime);
    a.addEventListener('ended', onEnd);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('waiting', onWaiting);
    a.addEventListener('canplay', onCanPlay);
    a.addEventListener('error', onError);

    return () => {
      a.pause();
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('ended', onEnd);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('waiting', onWaiting);
      a.removeEventListener('canplay', onCanPlay);
      a.removeEventListener('error', onError);
    };
  }, []);

  // Drive a fake clock for mock-only tracks
  useEffect(() => {
    if (mockInterval.current) { window.clearInterval(mockInterval.current); mockInterval.current = null; }
    if (playing && current && !current.audioUrl) {
      mockInterval.current = window.setInterval(() => {
        setPositionSec(p => {
          if (p + 1 >= current.durationSec) { setPlaying(false); return 0; }
          return p + 1;
        });
      }, 1000);
    }
    return () => { if (mockInterval.current) window.clearInterval(mockInterval.current); };
  }, [playing, current]);

  const play = (t: Track) => {
    setError(null);
    const a = audioRef.current;
    if (!a) return;
    const isSame = current?.id === t.id;
    if (!isSame) {
      setCurrent(t);
      setPositionSec(0);
      if (t.audioUrl) {
        a.src = t.audioUrl;
        a.currentTime = 0;
        setLoading(true);
        a.play().catch(() => setError('Playback blocked. Tap play again.'));
      } else {
        a.removeAttribute('src');
        a.load();
        setPlaying(true);
      }
    } else {
      if (t.audioUrl) {
        a.play().catch(() => setError('Playback blocked.'));
      } else {
        setPlaying(true);
      }
    }
  };

  const toggle = () => {
    if (!current) return;
    const a = audioRef.current;
    if (current.audioUrl && a) {
      if (a.paused) a.play().catch(() => setError('Playback blocked.'));
      else a.pause();
    } else {
      setPlaying(p => !p);
    }
  };

  const next = () => {
    if (!current) return;
    const i = queue.findIndex(t => t.id === current.id);
    play(queue[(i + 1) % queue.length]);
  };
  const prev = () => {
    if (!current) return;
    const i = queue.findIndex(t => t.id === current.id);
    play(queue[(i - 1 + queue.length) % queue.length]);
  };
  const seek = (s: number) => {
    setPositionSec(s);
    const a = audioRef.current;
    if (current?.audioUrl && a) a.currentTime = s;
  };
  const stop = () => {
    const a = audioRef.current;
    if (a) { a.pause(); a.removeAttribute('src'); a.load(); }
    setPlaying(false); setCurrent(null); setPositionSec(0); setError(null);
  };

  return (
    <PlayerContext.Provider value={{ current, playing, positionSec, queue, loading, error, play, toggle, next, prev, seek, stop }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
};
