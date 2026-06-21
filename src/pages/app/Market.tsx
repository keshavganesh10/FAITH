import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Map as MapIcon, List } from 'lucide-react';
import { PRODUCTS, CATEGORIES, Category, VENDORS } from '@/data/marketplace';
import { useUser } from '@/state/user';
import { Card } from '@/components/ui/card';
import { MapView } from '@/components/MapView';
import { cn } from '@/lib/utils';

const Market = () => {
  const { basket } = useUser();
  const [cat, setCat] = useState<Category | 'All'>('All');
  const [view, setView] = useState<'list' | 'map'>('list');

  const products = useMemo(() =>
    cat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat), [cat]);

  return (
    <div className="pb-6">
      <header className="px-5 pt-6 pb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Authentic · UK vendors</p>
          <h1 className="font-display text-3xl text-foreground mt-0.5 leading-none">Marketplace</h1>
          <p className="text-xs text-muted-foreground mt-1.5">Puja items, murtis, festival kits.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-border bg-card p-0.5">
            <button onClick={() => setView('list')} className={cn('h-8 w-8 grid place-items-center rounded-full',
              view === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}>
              <List className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => setView('map')} className={cn('h-8 w-8 grid place-items-center rounded-full',
              view === 'map' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}>
              <MapIcon className="h-3.5 w-3.5" />
            </button>
          </div>
          <Link to="/app/market/basket" className="relative h-10 w-10 grid place-items-center rounded-full bg-primary text-primary-foreground">
            <ShoppingBag className="h-4 w-4" />
            {basket.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 grid place-items-center text-[10px] rounded-full bg-accent text-accent-foreground font-semibold">{basket.length}</span>
            )}
          </Link>
        </div>
      </header>

      {/* Category chips */}
      <div className="px-5 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {(['All', ...CATEGORIES] as const).map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={cn('shrink-0 rounded-full border px-3.5 py-1.5 text-xs transition-all',
              cat === c ? 'border-accent bg-accent text-accent-foreground' : 'border-border hover:border-accent/40')}>
            {c}
          </button>
        ))}
      </div>

      {view === 'map' ? (
        <div className="px-5 mt-3">
          <MapView
            points={VENDORS.filter(v => isFinite(v.lat)).map(v => ({
              id: v.id, lat: v.lat, lng: v.lng, title: v.name, subtitle: `${v.city} · ★ ${v.rating}`,
            }))}
            height={400}
          />
        </div>
      ) : (
        <>
          {/* Featured vendors rail */}
          <section className="mt-3">
            <p className="px-5 text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Featured vendors</p>
            <div className="px-5 flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
              {VENDORS.map(v => (
                <Card key={v.id} className="shrink-0 w-52 p-3">
                  <p className="font-display text-sm leading-tight">{v.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{v.city}</p>
                  <p className="text-[11px] mt-1 inline-flex items-center gap-1 text-accent">
                    <Star className="h-3 w-3 fill-current" /> {v.rating} <span className="text-muted-foreground">({v.reviews})</span>
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* Product grid */}
          <section className="px-5 mt-4">
            <div className="grid grid-cols-2 gap-3">
              {products.map(p => (
                <Link key={p.id} to={`/app/market/${p.id}`}>
                  <Card className="overflow-hidden hover:shadow-soft transition-shadow h-full">
                    <div className="aspect-square bg-gradient-card grid place-items-center text-4xl relative">
                      {p.image
                        ? <img src={p.image} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                        : <span>{p.emoji}</span>}
                      {p.seasonal && (
                        <span className="absolute top-1.5 left-1.5 text-[9px] tracking-widest uppercase bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full">{p.seasonal}</span>
                      )}
                    </div>
                    <div className="p-2.5">
                      <p className="text-[12px] font-medium leading-tight line-clamp-2">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{p.category}</p>
                      <p className="text-xs font-semibold mt-1">£{p.price.toFixed(2)}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Market;
