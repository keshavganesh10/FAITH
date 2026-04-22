import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCTS, CATEGORY_LABELS } from '@/data/marketplace';
import { useUser } from '@/state/user';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { addToBasket, basket } = useUser();
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) return (
    <div className="p-8 text-center">
      <p>Product not found.</p>
      <Link to="/app/market" className="text-primary text-sm">Back to market</Link>
    </div>
  );

  return (
    <div className="min-h-full flex flex-col bg-background">
      <div className="relative aspect-square bg-gradient-to-br from-gold-soft/50 to-secondary">
        <button onClick={() => nav(-1)} className="absolute top-4 left-4 h-10 w-10 grid place-items-center rounded-full bg-background/80 backdrop-blur shadow-soft">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <Link to="/app/market/basket" className="absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full bg-background/80 backdrop-blur shadow-soft">
          <ShoppingBag className="h-4 w-4" />
          {basket.length > 0 && <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 grid place-items-center rounded-full bg-accent text-accent-foreground text-[10px] font-semibold">{basket.length}</span>}
        </Link>
        <div className="h-full grid place-items-center text-9xl">{product.emoji}</div>
      </div>

      <div className="flex-1 p-6">
        {product.seasonal && <p className="text-[10px] uppercase tracking-[0.3em] text-accent">For {product.seasonal}</p>}
        <h1 className="font-display text-3xl text-foreground mt-1">{product.name}</h1>
        <p className="text-xs text-muted-foreground mt-1">{CATEGORY_LABELS[product.category]}</p>
        <p className="font-display text-3xl text-primary mt-3">£{product.price.toFixed(2)}</p>

        <div className="mt-6 rounded-2xl border border-border bg-gradient-card p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Crafted by</p>
          <p className="font-display text-lg mt-1">{product.vendor}</p>
          <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-0.5">
            <MapPin className="h-3 w-3" />{product.vendorCity}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-foreground/85 mt-5">{product.description}</p>
      </div>

      <div className="p-5 border-t border-border bg-card sticky bottom-0">
        <Button onClick={() => { addToBasket(product.id); toast.success('Added to basket'); }} size="lg" className="w-full h-13 rounded-full">
          Add to basket — £{product.price.toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
