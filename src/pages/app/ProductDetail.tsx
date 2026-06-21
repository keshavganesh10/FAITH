import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { findProduct, findVendor } from '@/data/marketplace';
import { useUser } from '@/state/user';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const product = id ? findProduct(id) : undefined;
  const vendor = product ? findVendor(product.vendorId) : undefined;
  const { addToBasket } = useUser();
  const [qty, setQty] = useState(1);

  if (!product) return (
    <div className="p-8 text-center text-muted-foreground">
      Product not found.{' '}<Link to="/app/market" className="text-primary">Back</Link>
    </div>
  );

  return (
    <div className="pb-32">
      <header className="sticky top-0 bg-background/95 backdrop-blur z-20 px-3 py-3 flex items-center border-b border-border/50">
        <button onClick={() => nav(-1)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted"><ChevronLeft className="h-5 w-5" /></button>
        <p className="flex-1 text-center text-[12px] text-muted-foreground truncate">{product.category}</p>
        <div className="w-10" />
      </header>

      <div className="aspect-square bg-gradient-card grid place-items-center text-7xl">
        {product.image
          ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          : <span>{product.emoji}</span>}
      </div>

      <div className="px-5 pt-4">
        {product.seasonal && (
          <span className="inline-block text-[10px] tracking-widest uppercase bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
            For {product.seasonal}
          </span>
        )}
        <h1 className="font-display text-2xl mt-2 leading-tight">{product.name}</h1>
        <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
          <Star className="h-3 w-3 fill-accent text-accent" /> {product.rating} · {product.reviews} reviews
        </p>
        <p className="font-display text-3xl mt-3">£{product.price.toFixed(2)}</p>

        <p className="text-sm text-foreground/80 mt-4 leading-relaxed">{product.description}</p>

        {vendor && (
          <Card className="mt-5 p-3.5">
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground">Sold by</p>
            <p className="font-display text-base mt-0.5">{vendor.name}</p>
            <p className="text-[11px] text-muted-foreground">{vendor.city} · ★ {vendor.rating} ({vendor.reviews})</p>
            <p className="text-xs text-foreground/80 mt-1.5">{vendor.blurb}</p>
          </Card>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 px-5 pb-6 pt-3 bg-gradient-to-t from-background via-background to-transparent flex items-center gap-3">
        <div className="flex items-center rounded-full border border-border bg-card">
          <button onClick={() => setQty(q => Math.max(1, q - 1))} className="h-12 w-12 grid place-items-center"><Minus className="h-4 w-4" /></button>
          <span className="w-6 text-center font-display text-lg">{qty}</span>
          <button onClick={() => setQty(q => q + 1)} className="h-12 w-12 grid place-items-center"><Plus className="h-4 w-4" /></button>
        </div>
        <Button
          onClick={() => {
            for (let i = 0; i < qty; i++) addToBasket(product.id);
            toast.success('Added to basket');
          }}
          size="lg" className="flex-1 h-14 rounded-full text-base"
        >
          <ShoppingBag className="h-4 w-4 mr-2" /> Add — £{(product.price * qty).toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
