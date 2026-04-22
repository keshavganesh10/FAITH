import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Map as MapIcon, LayoutGrid, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PRODUCTS, VENDORS, ProductCategory } from '@/data/marketplace';
import { useUser } from '@/state/user';
import { cn } from '@/lib/utils';
import { MapView, MapPoint } from '@/components/MapView';

const CATEGORIES: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'festival-kits', label: 'Festival' },
  { id: 'ornaments', label: 'Ornaments' },
  { id: 'prayer-items', label: 'Prayer' },
  { id: 'books', label: 'Books' },
];

const Market = () => {
  const { faith, basket } = useUser();
  const [cat, setCat] = useState<ProductCategory | 'all'>('all');
  const [view, setView] = useState<'grid' | 'map'>('grid');

  const items = useMemo(() => PRODUCTS
    .filter(p => cat === 'all' || p.category === cat)
    .sort((a, b) => {
      if (a.faith === faith && b.faith !== faith) return -1;
      if (b.faith === faith && a.faith !== faith) return 1;
      return 0;
    }), [cat, faith]);

  const featuredVendors = useMemo(
    () => VENDORS.slice().sort(() => 0).slice(0, 6),
    []
  );

  const points: MapPoint[] = useMemo(() => VENDORS.map(v => ({
    id: v.id, lat: v.lat, lng: v.lng,
    title: v.name, subtitle: `${v.craft} · ${v.city}`,
  })), []);

  return (
    <div className="pb-2">
      {/* Compact sticky header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="px-4 pt-4 pb-2 flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Marketplace</p>
            <h1 className="font-display text-2xl text-foreground leading-none mt-0.5">From local hands</h1>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setView(v => v === 'grid' ? 'map' : 'grid')}
              className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted text-foreground"
              aria-label="Toggle map"
            >
              {view === 'grid' ? <MapIcon className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
            </button>
            <Link
              to="/app/market/basket"
              className="relative h-9 w-9 grid place-items-center rounded-full bg-primary text-primary-foreground"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              {basket.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 grid place-items-center rounded-full bg-accent text-accent-foreground text-[9px] font-semibold">
                  {basket.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Category chips */}
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={cn('shrink-0 rounded-full border px-3 py-1 text-[11px] transition-all',
                cat === c.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}>
              {c.label}
            </button>
          ))}
        </div>
      </header>

      {view === 'map' ? (
        <div className="px-3 pt-3 pb-6">
          <MapView points={points} height={420} />
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground text-center mt-2">
            {VENDORS.length} vendors across the UK
          </p>
        </div>
      ) : (
        <>
          {/* Vendor row — horizontal scroll */}
          <div className="pt-3">
            <p className="px-4 text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Featured vendors</p>
            <div className="px-4 flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
              {featuredVendors.map(v => (
                <Link key={v.id} to={`/app/market?vendor=${v.id}`} className="shrink-0 w-16 flex flex-col items-center gap-1">
                  <img src={v.avatar} alt={v.name}
                    className="h-14 w-14 rounded-full object-cover border-2 border-card shadow-soft" />
                  <p className="text-[9.5px] text-foreground text-center leading-tight truncate w-full font-medium">{v.name.split(' ')[0]}</p>
                  <p className="text-[8.5px] text-muted-foreground -mt-0.5 inline-flex items-center gap-0.5">
                    <Star className="h-2 w-2 fill-accent text-accent" />{v.rating}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Compact 3-col product grid */}
          <div className="px-3 pt-3 grid grid-cols-3 gap-1.5">
            {items.map(p => (
              <Link to={`/app/market/${p.id}`} key={p.id}>
                <Card className="overflow-hidden shadow-soft hover:shadow-elevated transition-shadow flex flex-col">
                  <div className="relative aspect-square bg-muted">
                    <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                    {p.seasonal && (
                      <span className="absolute top-1 left-1 text-[8px] uppercase tracking-widest text-white font-semibold px-1.5 py-0.5 rounded-full bg-black/50 backdrop-blur">
                        {p.seasonal}
                      </span>
                    )}
                  </div>
                  <div className="p-1.5">
                    <p className="font-display text-[11px] leading-tight text-foreground line-clamp-2 min-h-[26px]">{p.name}</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5 truncate">{p.vendor}</p>
                    <p className="text-[11px] font-semibold mt-0.5">£{p.price.toFixed(2)}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Market;
