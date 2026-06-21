import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Bookmark, Type, Minus, Plus, Play } from 'lucide-react';
import { findPassage } from '@/data/scriptures';
import { useUser } from '@/state/user';
import { TRACKS } from '@/data/audio';
import { usePlayer } from '@/state/player';
import { cn } from '@/lib/utils';

const ScriptureReader = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const passage = id ? findPassage(id) : undefined;
  const { bookmarks, toggleBookmark } = useUser();
  const { play } = usePlayer();
  const [size, setSize] = useState(1);

  if (!passage) return (
    <div className="p-8 text-center">
      <p className="text-muted-foreground">Passage not found.</p>
      <Link to="/app/scriptures" className="text-primary text-sm mt-2 inline-block">Back to library</Link>
    </div>
  );

  const bookmarked = bookmarks.includes(passage.id);
  const audio = passage.audio ? TRACKS[0] : null;
  const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];

  return (
    <div className="pb-6">
      <header className="sticky top-0 bg-background/95 backdrop-blur z-20 px-3 py-3 flex items-center gap-1 border-b border-border/50">
        <button onClick={() => nav(-1)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted" aria-label="Back">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex-1 text-center">
          <p className="text-[10px] tracking-widest uppercase text-muted-foreground">{passage.reference}</p>
          <p className="text-[13px] font-medium truncate">{passage.title}</p>
        </div>
        <button onClick={() => setSize(s => Math.max(0, s - 1))} className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted"><Minus className="h-4 w-4" /></button>
        <Type className="h-3.5 w-3.5 text-muted-foreground" />
        <button onClick={() => setSize(s => Math.min(4, s + 1))} className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted"><Plus className="h-4 w-4" /></button>
        <button onClick={() => toggleBookmark(passage.id)} className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted" aria-label="Bookmark">
          <Bookmark className={cn('h-4 w-4', bookmarked && 'fill-accent text-accent')} />
        </button>
      </header>

      <article className="px-6 py-6">
        <h1 className="font-display text-3xl text-foreground leading-tight">{passage.title}</h1>
        <p className="text-xs text-muted-foreground mt-1">{passage.reference}</p>

        {audio && (
          <button
            onClick={() => play(audio)}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-medium shadow-soft"
          >
            <Play className="h-3 w-3" /> Listen — {audio.artist}
          </button>
        )}

        {passage.sanskrit && (
          <p className="font-display text-foreground/85 mt-6 leading-relaxed text-lg">{passage.sanskrit}</p>
        )}

        <p className={cn('font-display text-foreground leading-relaxed mt-6', sizes[size])}>{passage.text}</p>

        {passage.commentary && (
          <div className="mt-8 border-l-2 border-accent pl-4">
            <p className="text-[10px] uppercase tracking-widest text-accent font-semibold">Commentary</p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed italic">{passage.commentary}</p>
          </div>
        )}
      </article>
    </div>
  );
};

export default ScriptureReader;
