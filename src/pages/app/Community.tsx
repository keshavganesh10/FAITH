import { useMemo, useState } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EVENTS, EventType, CommunityEvent } from '@/data/community';
import { useUser } from '@/state/user';
import { cn } from '@/lib/utils';
import { RsvpDialog } from '@/components/RsvpDialog';

const FILTERS: { id: EventType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'worship', label: 'Worship' },
  { id: 'study', label: 'Study' },
  { id: 'festival', label: 'Festival' },
  { id: 'volunteering', label: 'Volunteering' },
];

const Community = () => {
  const { faith, rsvped, toggleRSVP, city } = useUser();
  const [filter, setFilter] = useState<EventType | 'all'>('all');
  const [active, setActive] = useState<CommunityEvent | null>(null);
  const [open, setOpen] = useState(false);

  const events = useMemo(() => {
    return EVENTS
      .filter(e => filter === 'all' || e.type === filter)
      .sort((a, b) => {
        if (a.faith === faith && b.faith !== faith) return -1;
        if (b.faith === faith && a.faith !== faith) return 1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [filter, faith]);

  return (
    <div className="pb-6">
      <header className="px-6 pt-10 pb-4">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Community</p>
        <h1 className="font-display text-4xl text-foreground mt-1">Near you</h1>
        {city && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {city}
          </p>
        )}
      </header>

      <div className="px-5 mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={cn('shrink-0 rounded-full border px-3.5 py-1.5 text-xs transition-all',
              filter === f.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="px-5 space-y-3">
        {events.map(e => {
          const going = rsvped.includes(e.id);
          const d = new Date(e.date);
          return (
            <Card key={e.id} className="p-4 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-accent">{e.type}</p>
                  <p className="font-display text-lg text-foreground leading-tight mt-0.5">{e.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{e.host} · {e.venue}</p>
                </div>
                <div className="text-center bg-muted rounded-xl px-3 py-2 shrink-0">
                  <p className="text-[10px] uppercase text-muted-foreground">{d.toLocaleDateString(undefined,{ month:'short' })}</p>
                  <p className="font-display text-2xl leading-none">{d.getDate()}</p>
                </div>
              </div>
              <p className="text-xs text-foreground/80 mt-3 leading-relaxed">{e.description}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="text-[11px] text-muted-foreground flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{d.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{e.distanceKm} km</span>
                </div>
                <Button
                  onClick={() => { setActive(e); setOpen(true); }}
                  size="sm"
                  variant={going ? 'secondary' : 'default'}
                  className="rounded-full h-8 px-4 text-xs"
                >
                  {going ? 'Going ✓' : 'RSVP'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <RsvpDialog
        event={active}
        open={open}
        onOpenChange={setOpen}
        going={active ? rsvped.includes(active.id) : false}
        onConfirm={() => active && toggleRSVP(active.id)}
        onCancel={() => active && toggleRSVP(active.id)}
      />
    </div>
  );
};

export default Community;
