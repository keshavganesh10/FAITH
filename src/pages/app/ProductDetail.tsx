import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCTS, CATEGORY_LABELS, getVendor } from '@/data/marketplace';
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

  const vendor = getVendor(product.vendor);

  return (
    <div className="min-h-full flex flex-col bg-background">
      <div className="relative aspect-square bg-muted">
        <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
        <button onClick={() => nav(-1)} className="absolute top-4 left-4 h-10 w-10 grid place-items-center rounded-full bg-background/90 backdrop-blur shadow-soft">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <Link to="/app/market/basket" className="absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full bg-background/90 backdrop-blur shadow-soft">
          <ShoppingBag className="h-4 w-4" />
          {basket.length > 0 && <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 grid place-items-center rounded-full bg-accent text-accent-foreground text-[10px] font-semibold">{basket.length}</span>}
        </Link>
      </div>

      <div className="flex-1 p-5">
        {product.seasonal && <p className="text-[10px] uppercase tracking-[0.3em] text-accent">For {product.seasonal}</p>}
        <h1 className="font-display text-2xl text-foreground mt-1 leading-tight">{product.name}</h1>
        <p className="text-[11px] text-muted-foreground mt-0.5">{CATEGORY_LABELS[product.category]}</p>
        <p className="font-display text-2xl text-primary mt-2">£{product.price.toFixed(2)}</p>

        <div className="mt-4 rounded-2xl border border-border bg-gradient-card p-3 flex items-center gap-3">
          {vendor && <img src={vendor.avatar} alt="" className="h-12 w-12 rounded-full object-cover border-2 border-card shadow-soft" />}
          <div className="flex-1 min-w-0">
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Crafted by</p>
            <p className="font-display text-sm leading-tight">{product.vendor}</p>
            <p className="text-[10.5px] text-muted-foreground inline-flex items-center gap-1.5 mt-0.5">
              <span className="inline-flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" />{product.vendorCity}</span>
              {vendor && <span className="inline-flex items-center gap-0.5"><Star className="h-2.5 w-2.5 fill-accent text-accent" />{vendor.rating}</span>}
            </p>
          </div>
        </div>

        {vendor && <p className="text-[11px] text-muted-foreground italic mt-2">"{vendor.bio}"</p>}

        <p className="text-[13px] leading-relaxed text-foreground/85 mt-4">{product.description}</p>
      </div>

      <div className="p-4 border-t border-border bg-card sticky bottom-0">
        <Button onClick={() => { addToBasket(product.id); toast.success('Added to basket'); }} size="lg" className="w-full h-12 rounded-full">
          Add to basket — £{product.price.toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
