import { Link } from 'react-router-dom';
import { ChevronRight, Bookmark, Headphones, Clock, Sparkles } from 'lucide-react';
import { useUser } from '@/state/user';
import { FAITHS } from '@/data/faiths';
import { SCRIPTURES, COLLECTIONS, READING_PLANS, VERSE_OF_DAY, findPassage } from '@/data/scriptures';
import { Card } from '@/components/ui/card';

const Scriptures = () => {
  const { faith, bookmarks } = useUser();
  if (!faith) return null;
  const f = FAITHS.find(x => x.id === faith)!;
  const books = SCRIPTURES[faith];
  const collections = COLLECTIONS[faith] ?? [];
  const plans = READING_PLANS[faith] ?? [];
  const verse = VERSE_OF_DAY[faith];

  return (
    <div className="pb-6">
      <header className="px-5 pt-6 pb-3">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Library</p>
        <h1 className="font-display text-3xl text-foreground mt-0.5 leading-none">{f.scriptureName}</h1>
        <p className="text-xs text-muted-foreground mt-1.5">A quiet space to read, mark and return to.</p>
      </header>

      {/* Verse of the day */}
      <section className="px-5 mb-4">
        <Link to={`/app/scriptures/${verse.id}`}>
          <Card className="bg-gradient-dawn text-primary-foreground p-4 shadow-soft border-0 relative overflow-hidden">
            <div className="absolute inset-0 texture-paper opacity-20" />
            <div className="relative">
              <p className="text-[9px] tracking-[0.3em] uppercase opacity-80 inline-flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5" /> Verse of the day
              </p>
              <p className="font-display text-base mt-1.5 leading-snug line-clamp-2">"{verse.text.split('.')[0]}."</p>
              <p className="text-[10px] opacity-85 mt-1.5">{verse.reference}</p>
            </div>
          </Card>
        </Link>
      </section>

      {/* Reading plans */}
      {plans.length > 0 && (
        <section className="mb-4">
          <p className="px-5 text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Reading plans</p>
          <div className="px-5 flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide -mx-1">
            {plans.map(p => (
              <Card key={p.id} className="shrink-0 w-44 p-3.5 hover:shadow-soft transition-shadow cursor-pointer">
                <p className="text-[9px] uppercase tracking-widest text-accent font-semibold">{p.days} days</p>
                <p className="font-display text-sm leading-tight mt-1">{p.title}</p>
                <p className="text-[10.5px] text-muted-foreground mt-1 leading-snug line-clamp-2">{p.description}</p>
                <p className="text-[10px] text-muted-foreground mt-2 inline-flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" /> {p.daily} min/day
                </p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Themed collections */}
      {collections.length > 0 && (
        <section className="px-5 mb-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Collections</p>
          <div className="grid grid-cols-2 gap-2">
            {collections.map(c => (
              <Card
                key={c.id}
                className="relative overflow-hidden p-3 h-24 border-0 text-primary-foreground"
                style={{
                  background: `linear-gradient(135deg, hsl(${c.hue} 60% 45%), hsl(${(c.hue + 30) % 360} 55% 65%))`,
                }}
              >
                <p className="font-display text-sm leading-tight relative">{c.title}</p>
                <p className="text-[9.5px] opacity-85 mt-1 line-clamp-2 relative">{c.description}</p>
                <p className="absolute bottom-2 right-2 text-[9px] opacity-90">{c.passageIds.length} passages →</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Books */}
      <section className="px-5 space-y-2.5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Books & sections</p>
        {books.map(book => (
          <Card key={book.id} className="overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border/60">
              <p className="font-display text-base">{book.title}</p>
              {book.subtitle && <p className="text-[10.5px] text-muted-foreground italic">{book.subtitle}</p>}
            </div>
            <ul>
              {book.passages.map(p => (
                <li key={p.id}>
                  <Link to={`/app/scriptures/${p.id}`} className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-muted/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium truncate">{p.title}</p>
                      <p className="text-[10.5px] text-muted-foreground inline-flex items-center gap-2">
                        <span>{p.reference}</span>
                        {p.duration && <span className="inline-flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" />{p.duration}m</span>}
                        {p.audio && <Headphones className="h-2.5 w-2.5" />}
                      </p>
                    </div>
                    {bookmarks.includes(p.id) && <Bookmark className="h-3.5 w-3.5 text-accent fill-accent" />}
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Scriptures;
