import { useMemo, useState } from 'react';
import { MapPin, Calendar, Heart, MessageCircle, Share2, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EVENTS, EventType, CommunityEvent } from '@/data/community';
import { useUser } from '@/state/user';
import { cn } from '@/lib/utils';
import { RsvpDialog } from '@/components/RsvpDialog';

const FILTERS: { id: EventType | 'all'; label: string }[] = [
  { id: 'all', label: 'For you' },
  { id: 'worship', label: 'Worship' },
  { id: 'study', label: 'Study' },
  { id: 'festival', label: 'Festival' },
  { id: 'volunteering', label: 'Service' },
];

// Deterministic pseudo-stats so feed feels alive without a backend
const stats = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return {
    likes: 24 + (h % 180),
    comments: 3 + (h % 28),
    going: 12 + (h % 90),
    initials: String.fromCharCode(65 + (h % 26)) + String.fromCharCode(65 + ((h >> 5) % 26)),
  };
};

const Community = () => {
  const { faith, rsvped, toggleRSVP, city } = useUser();
  const [filter, setFilter] = useState<EventType | 'all'>('all');
  const [active, setActive] = useState<CommunityEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState<string[]>([]);

  const events = useMemo(() => {
    return EVENTS
      .filter(e => filter === 'all' || e.type === filter)
      .sort((a, b) => {
        if (a.faith === faith && b.faith !== faith) return -1;
        if (b.faith === faith && a.faith !== faith) return 1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [filter, faith]);

  const toggleLike = (id: string) =>
    setLiked(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div className="pb-4">
      <header className="px-5 pt-6 pb-3">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Community</p>
        <h1 className="font-display text-3xl text-foreground mt-0.5">Your circle</h1>
        {city && (
          <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {city}
          </p>
        )}
      </header>

      <div className="px-5 mb-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={cn('shrink-0 rounded-full border px-3 py-1 text-[11px] transition-all',
              filter === f.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-3">
        {events.map(e => {
          const going = rsvped.includes(e.id);
          const isLiked = liked.includes(e.id);
          const d = new Date(e.date);
          const s = stats(e.id);
          const likeCount = s.likes + (isLiked ? 1 : 0);
          return (
            <Card key={e.id} className="overflow-hidden shadow-soft">
              {/* Author header */}
              <div className="flex items-center gap-3 px-4 pt-3.5 pb-2">
                <div className="h-9 w-9 rounded-full bg-gradient-dawn grid place-items-center text-primary-foreground text-xs font-semibold">
                  {s.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground leading-tight truncate">{e.host}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    {d.toLocaleDateString(undefined,{ weekday:'short', day:'numeric', month:'short' })} · {e.distanceKm} km away
                  </p>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-accent font-medium px-2 py-0.5 rounded-full bg-accent/10">
                  {e.type}
                </span>
              </div>

              {/* Visual banner */}
              <div className="mx-4 rounded-xl bg-gradient-card border border-border/40 px-4 py-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 texture-paper" />
                <div className="relative flex items-start gap-3">
                  <div className="text-center bg-background/80 backdrop-blur rounded-lg px-2.5 py-1.5 shrink-0">
                    <p className="text-[9px] uppercase text-muted-foreground leading-none">{d.toLocaleDateString(undefined,{ month:'short' })}</p>
                    <p className="font-display text-xl leading-tight">{d.getDate()}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-base text-foreground leading-tight">{e.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />{d.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })} · {e.venue}
                    </p>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <p className="text-xs text-foreground/85 leading-relaxed px-4 pt-2.5">{e.description}</p>

              {/* Going avatars */}
              <div className="px-4 pt-2 flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {[0,1,2].map(i => (
                    <div key={i} className="h-5 w-5 rounded-full border-2 border-card bg-muted grid place-items-center text-[8px] font-semibold text-muted-foreground">
                      {String.fromCharCode(65 + ((i + e.id.charCodeAt(0)) % 26))}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  <span className="font-semibold text-foreground">{s.going}</span> going
                </p>
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-between px-2 pt-2 pb-2">
                <div className="flex items-center">
                  <button onClick={() => toggleLike(e.id)}
                    className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-muted/60 transition-colors">
                    <Heart className={cn('h-4 w-4 transition-all', isLiked ? 'fill-destructive text-destructive scale-110' : 'text-muted-foreground')} />
                    <span className="text-[11px] text-muted-foreground tabular-nums">{likeCount}</span>
                  </button>
                  <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-muted/60 transition-colors">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-[11px] text-muted-foreground tabular-nums">{s.comments}</span>
                  </button>
                  <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-muted/60 transition-colors">
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <Button
                  onClick={() => { setActive(e); setOpen(true); }}
                  size="sm"
                  variant={going ? 'secondary' : 'default'}
                  className="rounded-full h-7 px-3 text-[11px] mr-2"
                >
                  {going ? <><Users className="h-3 w-3 mr-1" />Going</> : 'RSVP'}
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
