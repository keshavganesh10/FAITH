import { Copy, Share2, MessageCircle, Mail, Twitter, Facebook, Image as ImageIcon } from 'lucide-react';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from '@/components/ui/sheet';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  text: string;
  reference: string;
}

export const ShareSheet = ({ open, onOpenChange, text, reference }: Props) => {
  const composed = `"${text}" — ${reference}`;
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const actions = [
    {
      label: 'Copy text', icon: Copy,
      run: async () => { await navigator.clipboard?.writeText(composed); toast.success('Passage copied'); onOpenChange(false); },
    },
    {
      label: 'Share via…', icon: Share2,
      run: async () => {
        if (navigator.share) {
          try { await navigator.share({ title: reference, text: composed, url }); onOpenChange(false); }
          catch { /* dismissed */ }
        } else {
          await navigator.clipboard?.writeText(composed);
          toast.success('Copied — share with any app');
          onOpenChange(false);
        }
      },
    },
    {
      label: 'Save as image', icon: ImageIcon,
      run: () => { toast('Quote card saved to gallery'); onOpenChange(false); },
    },
    {
      label: 'Messages', icon: MessageCircle,
      run: () => { window.location.href = `sms:?body=${encodeURIComponent(composed)}`; onOpenChange(false); },
    },
    {
      label: 'Email', icon: Mail,
      run: () => { window.location.href = `mailto:?subject=${encodeURIComponent(reference)}&body=${encodeURIComponent(composed)}`; onOpenChange(false); },
    },
    {
      label: 'X / Twitter', icon: Twitter,
      run: () => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(composed)}`, '_blank'); onOpenChange(false); },
    },
    {
      label: 'Facebook', icon: Facebook,
      run: () => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(composed)}`, '_blank'); onOpenChange(false); },
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl border-b-0 border-x-0 max-h-[85vh] overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="font-display text-2xl">Share passage</SheetTitle>
          <SheetDescription className="text-xs">A small light, passed on.</SheetDescription>
        </SheetHeader>

        {/* Quote card preview */}
        <div className="mt-4 rounded-3xl bg-gradient-dawn p-6 text-primary-foreground shadow-elevated relative overflow-hidden">
          <div className="absolute inset-0 opacity-25 texture-paper" />
          <div className="relative">
            <p className="font-display text-xl leading-snug">"{text}"</p>
            <p className="mt-3 text-[11px] tracking-[0.25em] uppercase opacity-85">— {reference}</p>
            <p className="mt-4 text-[10px] opacity-70 tracking-widest">FAITH · faithbykesh</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-3 pb-2">
          {actions.map(a => (
            <button
              key={a.label}
              onClick={a.run}
              className="flex flex-col items-center gap-1.5 group"
            >
              <span className="h-12 w-12 grid place-items-center rounded-2xl bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors text-foreground">
                <a.icon className="h-5 w-5" />
              </span>
              <span className="text-[10px] text-muted-foreground text-center leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
