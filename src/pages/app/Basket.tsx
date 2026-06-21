import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { useUser } from '@/state/user';
import { findProduct } from '@/data/marketplace';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const Basket = () => {
  const nav = useNavigate();
  const { basket, removeFromBasket, clearBasket } = useUser();

  const items = basket.map(id => findProduct(id)).filter(Boolean) as ReturnType<typeof findProduct>[];
  const subtotal = items.reduce((sum, p) => sum + (p?.price ?? 0), 0);
  const shipping = subtotal > 0 ? 3.95 : 0;
  const total = subtotal + shipping;

  return (
    <div className="pb-32">
      <header className="sticky top-0 bg-background/95 backdrop-blur z-20 px-3 py-3 flex items-center border-b border-border/50">
        <button onClick={() => nav(-1)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted"><ChevronLeft className="h-5 w-5" /></button>
        <p className="flex-1 text-center font-display text-lg">Basket</p>
        <div className="w-10" />
      </header>

      <div className="px-5 pt-4 space-y-2">
        {items.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-sm text-muted-foreground">Your basket is empty.</p>
            <Link to="/app/market" className="text-xs text-primary mt-2 inline-block">Browse the marketplace →</Link>
          </Card>
        ) : items.map((p, idx) => p && (
          <Card key={`${p.id}-${idx}`} className="p-3 flex items-center gap-3">
            <div className="h-14 w-14 rounded-xl bg-gradient-card grid place-items-center text-2xl shrink-0">
              {p.image ? <img src={p.image} alt="" className="h-full w-full rounded-xl object-cover" /> : p.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{p.name}</p>
              <p className="text-[11px] text-muted-foreground">£{p.price.toFixed(2)}</p>
            </div>
            <button onClick={() => removeFromBasket(p.id)} className="h-9 w-9 grid place-items-center rounded-full text-muted-foreground hover:bg-muted">
              <Trash2 className="h-4 w-4" />
            </button>
          </Card>
        ))}
      </div>

      {items.length > 0 && (
        <>
          <Card className="mx-5 mt-4 p-4 space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>£{shipping.toFixed(2)}</span></div>
            <div className="border-t border-border mt-1 pt-2 flex justify-between font-display text-lg"><span>Total</span><span>£{total.toFixed(2)}</span></div>
          </Card>
          <div className="absolute inset-x-0 bottom-0 px-5 pb-6 pt-3 bg-gradient-to-t from-background via-background to-transparent">
            <Button
              onClick={() => { toast.success('Order placed — confirmation emailed.'); clearBasket(); nav('/app/market'); }}
              size="lg" className="w-full h-14 rounded-full text-base"
            >
              Checkout · £{total.toFixed(2)}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
