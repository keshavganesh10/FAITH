import { useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Bookmark, Share2, Type } from 'lucide-react';
import { useUser } from '@/state/user';
import { SCRIPTURES } from '@/data/scriptures';
import { cn } from '@/lib/utils';
import { ShareSheet } from '@/components/ShareSheet';

const ScriptureReader = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { faith, bookmarks, toggleBookmark } = useUser();
  const [size, setSize] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);

  const passage = useMemo(() => {
    if (!faith) return null;
    for (const b of SCRIPTURES[faith]) {
      const p = b.passages.find(x => x.id === id);
      if (p) return p;
    }
    return null;
  }, [faith, id]);

  if (!passage) return (
    <div className="p-8 text-center">
      <p>Passage not found.</p>
      <Link to="/app/scriptures" className="text-primary text-sm">Back to library</Link>
    </div>
  );

  const sizes = ['text-base', 'text-lg', 'text-xl', 'text-2xl'];
  const bookmarked = bookmarks.includes(passage.id);

  return (
    <div className="min-h-full bg-gradient-card flex flex-col">
      <header className="px-4 pt-6 pb-3 flex items-center justify-between">
        <button onClick={() => nav(-1)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-1">
          <button onClick={() => setSize((size + 1) % sizes.length)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted" aria-label="Text size">
            <Type className="h-4 w-4" />
          </button>
          <button onClick={() => toggleBookmark(passage.id)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted" aria-label="Bookmark">
            <Bookmark className={cn('h-4 w-4', bookmarked && 'fill-accent text-accent')} />
          </button>
          <button onClick={() => setShareOpen(true)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted" aria-label="Share">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </header>

      <article className="flex-1 px-7 py-4 texture-paper">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{passage.reference}</p>
        <h1 className="font-display text-3xl text-foreground mt-2">{passage.title}</h1>
        <div className="my-6 h-px w-16 bg-accent/60" />
        <p className={cn('font-display leading-relaxed text-foreground/90', sizes[size])}>
          {passage.text}
        </p>
      </article>

      <ShareSheet open={shareOpen} onOpenChange={setShareOpen} text={passage.text} reference={passage.reference} />
    </div>
  );
};

export default ScriptureReader;
