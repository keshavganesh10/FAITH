import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Loader2, Volume2 } from 'lucide-react';
import { TRACKS, AUDIO_CATEGORIES, AudioCategory, formatTime } from '@/data/audio';
import { usePlayer } from '@/state/player';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Listen = () => {
  const [cat, setCat] = useState<AudioCategory | 'All'>('All');
  const { current, playing, positionSec, loading, error, play, toggle, next, prev, seek } = usePlayer();

  const tracks = cat === 'All' ? TRACKS : TRACKS.filter(t => t.category === cat);

  return (
    <div className="pb-6">
      <header className="px-5 pt-6 pb-3 bg-gradient-sky">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Ad-free media</p>
        <h1 className="font-display text-3xl text-foreground mt-0.5 leading-none">Listen</h1>
        <p className="text-xs text-muted-foreground mt-1.5">Slokas, bhajans and mantras — uninterrupted.</p>
      </header>

      {/* Now playing hero */}
      {current && (
        <section className="px-5 mt-4">
          <Card className="overflow-hidden border-0 shadow-elevated">
            <div className="aspect-[4/3] relative grid place-items-center text-primary-foreground overflow-hidden"
              style={{ background: `linear-gradient(135deg, hsl(${current.hue} 70% 50%), hsl(${(current.hue + 40) % 360} 65% 65%))` }}>
              {current.cover && current.cover.startsWith('http') && (
                <img src={current.cover} alt={current.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <span className="relative font-display text-8xl opacity-90 drop-shadow-lg">🕉</span>
            </div>

            <div className="p-4">
              <p className="text-[10px] tracking-widest uppercase text-accent">{current.category}</p>
              <p className="font-display text-xl leading-tight mt-1">{current.title}</p>
              <p className="text-xs text-muted-foreground">{current.artist}</p>

              {/* scrub */}
              <input
                type="range" min={0} max={current.durationSec} value={positionSec}
                onChange={e => seek(Number(e.target.value))}
                className="w-full mt-3 accent-[hsl(var(--accent))]"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground -mt-1">
                <span>{formatTime(positionSec)}</span>
                <span>{formatTime(current.durationSec)}</span>
              </div>

              <div className="mt-2 flex items-center justify-center gap-4">
                <button onClick={prev} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted"><SkipBack className="h-4 w-4" /></button>
                <button onClick={toggle} className="h-14 w-14 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-soft hover:opacity-90">
                  {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
                </button>
                <button onClick={next} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted"><SkipForward className="h-4 w-4" /></button>
                <button className="h-10 w-10 grid place-items-center rounded-full text-muted-foreground hover:bg-muted"><Repeat className="h-4 w-4" /></button>
              </div>
              {error && <p className="text-[11px] text-destructive text-center mt-2">{error}</p>}
              {current.audioUrl ? (
                <p className="text-[10px] text-muted-foreground text-center mt-1 inline-flex items-center gap-1 justify-center w-full">
                  <Volume2 className="h-2.5 w-2.5" /> Streaming from archive.org
                </p>
              ) : (
                <p className="text-[10px] text-muted-foreground text-center mt-1">Preview · audio coming soon</p>
              )}
            </div>
          </Card>
        </section>
      )}

      {/* Categories */}
      <section className="mt-4">
        <div className="px-5 flex gap-2 overflow-x-auto scrollbar-hide">
          {(['All', ...AUDIO_CATEGORIES] as const).map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={cn('shrink-0 rounded-full border px-3.5 py-1.5 text-xs transition-all',
                cat === c ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}>
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Track list */}
      <section className="px-5 mt-3 space-y-2">
        {tracks.map(t => {
          const isCurrent = current?.id === t.id;
          return (
            <button key={t.id} onClick={() => play(t)} className="w-full text-left">
              <Card className={cn('p-3 flex items-center gap-3 transition-all',
                isCurrent ? 'ring-2 ring-accent shadow-soft' : 'hover:shadow-soft')}>
                <div
                  className="h-14 w-14 rounded-xl shrink-0 grid place-items-center text-xl text-primary-foreground overflow-hidden relative"
                  style={{ background: `linear-gradient(135deg, hsl(${t.hue} 70% 50%), hsl(${(t.hue + 30) % 360} 65% 65%))` }}
                >
                  {t.cover && t.cover.startsWith('http') && (
                    <img src={t.cover} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  )}
                  <span className="relative drop-shadow">🕉</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] tracking-widest uppercase text-muted-foreground">{t.category}</p>
                  <p className="text-sm font-medium truncate">{t.title}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{t.artist} · {formatTime(t.durationSec)}</p>
                </div>
                <div className="h-9 w-9 grid place-items-center rounded-full bg-primary/10 text-primary">
                  {isCurrent && playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                </div>
              </Card>
            </button>
          );
        })}
      </section>
    </div>
  );
};

export default Listen;
