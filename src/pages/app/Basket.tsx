import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PRODUCTS } from '@/data/marketplace';
import { useUser } from '@/state/user';
import { toast } from 'sonner';

const Basket = () => {
  const nav = useNavigate();
  const { basket, removeFromBasket, clearBasket } = useUser();

  const items = basket.map(id => PRODUCTS.find(p => p.id === id)!).filter(Boolean);
  const subtotal = items.reduce((s, p) => s + p.price, 0);
  const shipping = items.length ? 3.5 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-full flex flex-col">
      <header className="px-4 pt-6 pb-3 flex items-center gap-3">
        <button onClick={() => nav(-1)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-2xl">Your basket</h1>
      </header>

      <div className="flex-1 px-5 pb-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-xl text-muted-foreground">Your basket is empty</p>
            <Link to="/app/market" className="text-primary text-sm mt-3 inline-block">Browse the market</Link>
          </div>
        ) : items.map((p, i) => (
          <Card key={`${p.id}-${i}`} className="p-3 flex gap-3 items-center">
            <div className="h-14 w-14 rounded-xl bg-gold-soft/40 grid place-items-center text-2xl">{p.emoji}</div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{p.name}</p>
              <p className="text-[11px] text-muted-foreground">{p.vendor}</p>
            </div>
            <p className="text-sm font-semibold">£{p.price.toFixed(2)}</p>
            <button onClick={() => removeFromBasket(p.id)} className="h-8 w-8 grid place-items-center rounded-full hover:bg-muted text-muted-foreground" aria-label="Remove">
              <X className="h-4 w-4" />
            </button>
          </Card>
        ))}
      </div>

      {items.length > 0 && (
        <div className="border-t border-border p-5 bg-card space-y-3">
          <div className="text-sm space-y-1">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>£{shipping.toFixed(2)}</span></div>
            <div className="flex justify-between font-semibold pt-1 border-t border-border mt-1"><span>Total</span><span>£{total.toFixed(2)}</span></div>
          </div>
          <Button onClick={() => { clearBasket(); toast.success('Order placed (demo)'); nav('/app'); }} size="lg" className="w-full h-12 rounded-full">
            Checkout (demo)
          </Button>
        </div>
      )}
    </div>
  );
};

export default Basket;
