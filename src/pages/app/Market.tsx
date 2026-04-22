import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PRODUCTS, ProductCategory, CATEGORY_LABELS } from '@/data/marketplace';
import { useUser } from '@/state/user';
import { cn } from '@/lib/utils';

const CATEGORIES: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'festival-kits', label: 'Festival Kits' },
  { id: 'ornaments', label: 'Ornaments' },
  { id: 'prayer-items', label: 'Prayer Items' },
  { id: 'books', label: 'Books' },
];

const Market = () => {
  const { faith, basket } = useUser();
  const [cat, setCat] = useState<ProductCategory | 'all'>('all');

  const items = useMemo(() => PRODUCTS
    .filter(p => cat === 'all' || p.category === cat)
    .sort((a, b) => {
      if (a.faith === faith && b.faith !== faith) return -1;
      if (b.faith === faith && a.faith !== faith) return 1;
      return 0;
    }), [cat, faith]);

  return (
    <div className="pb-6">
      <header className="px-6 pt-10 pb-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Marketplace</p>
          <h1 className="font-display text-4xl text-foreground mt-1">From local hands</h1>
        </div>
        <Link to="/app/market/basket" className="relative h-11 w-11 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-soft">
          <ShoppingBag className="h-4 w-4" />
          {basket.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 grid place-items-center rounded-full bg-accent text-accent-foreground text-[10px] font-semibold">
              {basket.length}
            </span>
          )}
        </Link>
      </header>

      <div className="px-5 mb-4 flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)}
            className={cn('shrink-0 rounded-full border px-3.5 py-1.5 text-xs transition-all',
              cat === c.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="px-5 grid grid-cols-2 gap-3">
        {items.map(p => (
          <Link to={`/app/market/${p.id}`} key={p.id}>
            <Card className="overflow-hidden shadow-soft hover:shadow-elevated transition-shadow h-full flex flex-col">
              <div className="aspect-square bg-gradient-to-br from-gold-soft/40 to-secondary grid place-items-center text-5xl">
                {p.emoji}
              </div>
              <div className="p-3 flex-1 flex flex-col">
                {p.seasonal && <p className="text-[10px] uppercase tracking-widest text-accent">{p.seasonal}</p>}
                <p className="font-display text-base leading-tight text-foreground">{p.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{p.vendor}</p>
                <p className="text-sm font-semibold mt-auto pt-2">£{p.price.toFixed(2)}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Market;
