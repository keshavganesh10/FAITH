import { Link } from 'react-router-dom';
import { ChevronRight, Bookmark } from 'lucide-react';
import { useUser } from '@/state/user';
import { FAITHS } from '@/data/faiths';
import { SCRIPTURES } from '@/data/scriptures';
import { Card } from '@/components/ui/card';

const Scriptures = () => {
  const { faith, bookmarks } = useUser();
  if (!faith) return null;
  const f = FAITHS.find(x => x.id === faith)!;
  const books = SCRIPTURES[faith];

  return (
    <div className="pb-6">
      <header className="px-6 pt-10 pb-6">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Library</p>
        <h1 className="font-display text-4xl text-foreground mt-1">{f.scriptureName}</h1>
        <p className="text-sm text-muted-foreground mt-2">A quiet space to read, mark and return to.</p>
      </header>

      <section className="px-5 mb-6">
        <Card className="bg-gradient-dawn text-primary-foreground p-4 shadow-soft border-0">
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-80">Daily reading plan</p>
          <p className="font-display text-lg mt-1">Day 12 · 7 minutes</p>
          <p className="text-xs opacity-85 mt-1">{books[0].title} — short passage on stillness</p>
        </Card>
      </section>

      <section className="px-5 space-y-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground px-1">Books & sections</p>
        {books.map(book => (
          <Card key={book.id} className="overflow-hidden">
            <div className="px-4 py-3 border-b border-border/60">
              <p className="font-display text-lg">{book.title}</p>
              {book.subtitle && <p className="text-xs text-muted-foreground italic">{book.subtitle}</p>}
            </div>
            <ul>
              {book.passages.map(p => (
                <li key={p.id}>
                  <Link to={`/app/scriptures/${p.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.title}</p>
                      <p className="text-[11px] text-muted-foreground">{p.reference}</p>
                    </div>
                    {bookmarks.includes(p.id) && <Bookmark className="h-4 w-4 text-accent fill-accent" />}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
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
