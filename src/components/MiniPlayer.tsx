import { Play, Pause, SkipForward, X } from 'lucide-react';
import { usePlayer } from '@/state/player';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const MiniPlayer = () => {
  const { current, playing, positionSec, toggle, next, stop } = usePlayer();
  if (!current) return null;
  const pct = Math.min(100, (positionSec / current.durationSec) * 100);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-16 z-30 px-3">
      <div className="pointer-events-auto rounded-2xl border border-border/60 bg-card/95 shadow-elevated backdrop-blur-xl overflow-hidden">
        <div className="h-0.5 bg-muted">
          <div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex items-center gap-2.5 px-2.5 py-2">
          <Link to="/app/listen" className="flex items-center gap-2.5 min-w-0 flex-1">
            <div
              className="h-9 w-9 rounded-xl shrink-0 grid place-items-center text-base"
              style={{
                background: `linear-gradient(135deg, hsl(${current.hue} 70% 55%), hsl(${(current.hue + 30) % 360} 65% 70%))`,
              }}
            >
              <span className="text-primary-foreground">🕉</span>
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium truncate leading-tight">{current.title}</p>
              <p className="text-[10px] text-muted-foreground truncate leading-tight">{current.artist}</p>
            </div>
          </Link>
          <button
            onClick={toggle}
            className={cn('h-8 w-8 grid place-items-center rounded-full bg-primary text-primary-foreground hover:opacity-90')}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
          </button>
          <button onClick={next} className="h-8 w-8 grid place-items-center rounded-full hover:bg-muted" aria-label="Next">
            <SkipForward className="h-3.5 w-3.5" />
          </button>
          <button onClick={stop} className="h-8 w-8 grid place-items-center rounded-full hover:bg-muted text-muted-foreground" aria-label="Close">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
