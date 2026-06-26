import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Bookmark, Headphones } from 'lucide-react';
import { COLLECTIONS, findPassage } from '@/data/scriptures';
import { Card } from '@/components/ui/card';
import { useUser } from '@/state/user';

const CollectionDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { bookmarks } = useUser();
  const collection = COLLECTIONS.find(c => c.id === id);

  if (!collection) return (
    <div className="p-8 text-center text-muted-foreground">
      Collection not found.{' '}<Link to="/app/scriptures" className="text-primary">Back</Link>
    </div>
  );

  const passages = collection.passageIds.map(findPassage).filter(Boolean) as ReturnType<typeof findPassage>[];

  return (
    <div className="pb-6">
      <header className="sticky top-0 bg-background/95 backdrop-blur z-20 px-3 py-3 flex items-center border-b border-border/50">
        <button onClick={() => nav(-1)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted"><ChevronLeft className="h-5 w-5" /></button>
        <p className="flex-1 text-center text-[12px] text-muted-foreground">Collection</p>
        <div className="w-10" />
      </header>

      <section className="relative h-40 text-primary-foreground" style={{
        background: `linear-gradient(135deg, hsl(${collection.hue} 60% 42%), hsl(${(collection.hue + 30) % 360} 55% 60%))`,
      }}>
        <div className="absolute inset-0 px-5 py-4 flex flex-col justify-end">
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-80">{passages.length} passages</p>
          <h1 className="font-display text-3xl leading-tight mt-1">{collection.title}</h1>
          <p className="text-xs opacity-90 mt-1.5 line-clamp-2">{collection.description}</p>
        </div>
      </section>

      <section className="px-5 mt-4">
        <Card className="overflow-hidden">
          {passages.map((p, i) => p && (
            <Link key={p.id} to={`/app/scriptures/${p.id}`}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors ${i > 0 ? 'border-t border-border/60' : ''}`}>
              <div className="h-8 w-8 rounded-full bg-accent/10 text-accent grid place-items-center text-xs font-display">{i + 1}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate">{p.title}</p>
                <p className="text-[11px] text-muted-foreground inline-flex items-center gap-2">
                  {p.reference}
                  {p.audio && <Headphones className="h-3 w-3" />}
                </p>
              </div>
              {bookmarks.includes(p.id) && <Bookmark className="h-3.5 w-3.5 text-accent fill-accent" />}
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
          ))}
        </Card>
      </section>
    </div>
  );
};

export default CollectionDetail;
