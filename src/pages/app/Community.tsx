import { useState, useMemo } from 'react';
import { MapPin, Calendar, Map as MapIcon, List, Users, Ticket } from 'lucide-react';
import { EVENTS, EVENT_TYPES, EventType, CommunityEvent } from '@/data/community';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapView } from '@/components/MapView';
import { RsvpDialog } from '@/components/RsvpDialog';
import { useUser } from '@/state/user';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Community = () => {
  const { rsvped, toggleRSVP } = useUser();
  const [filter, setFilter] = useState<EventType | 'All'>('All');
  const [view, setView] = useState<'list' | 'map'>('list');
  const [rsvpEvent, setRsvpEvent] = useState<CommunityEvent | null>(null);

  const events = useMemo(() =>
    filter === 'All' ? EVENTS : EVENTS.filter(e => e.type === filter), [filter]);

  return (
    <div className="pb-6">
      <header className="px-5 pt-6 pb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Local</p>
          <h1 className="font-display text-3xl text-foreground mt-0.5 leading-none">Community</h1>
          <p className="text-xs text-muted-foreground mt-1.5">Mandirs · NHSF · students · festivals.</p>
        </div>
        <div className="flex rounded-full border border-border bg-card p-0.5">
          <button onClick={() => setView('list')} className={cn('h-8 w-8 grid place-items-center rounded-full',
            view === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}>
            <List className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => setView('map')} className={cn('h-8 w-8 grid place-items-center rounded-full',
            view === 'map' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}>
            <MapIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="px-5 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {(['All', ...EVENT_TYPES] as const).map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={cn('shrink-0 rounded-full border px-3.5 py-1.5 text-xs transition-all',
              filter === t ? 'border-accent bg-accent text-accent-foreground' : 'border-border hover:border-accent/40')}>
            {t}
          </button>
        ))}
      </div>

      {view === 'map' ? (
        <div className="px-5 mt-3">
          <MapView
            points={events.map(e => ({ id: e.id, lat: e.lat, lng: e.lng, title: e.title, subtitle: `${e.host} · ${e.city}` }))}
            height={400}
          />
        </div>
      ) : (
        <section className="px-5 mt-3 space-y-3">
          {events.map(e => {
            const going = rsvped.includes(e.id);
            const d = new Date(e.date);
            return (
              <Card key={e.id} className="overflow-hidden shadow-soft">
                <div className="h-32 relative bg-gradient-dawn grid place-items-center text-primary-foreground">
                  {e.image && <img src={e.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" loading="lazy" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="relative text-5xl">{e.emoji}</span>
                  <span className="absolute top-2 left-2 text-[9px] tracking-widest uppercase bg-card/90 text-foreground px-2 py-1 rounded-full">{e.type}</span>
                  <span className="absolute top-2 right-2 text-[10px] bg-card/90 text-foreground px-2 py-1 rounded-full font-medium">
                    {e.free ? 'Free' : `£${e.price}`}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-display text-lg leading-tight">{e.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{e.host}</p>
                  <p className="text-xs text-foreground/80 mt-2 line-clamp-2">{e.description}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />
                      {d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })} · {d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{e.venue}</span>
                    <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{e.attendees} going</span>
                  </div>
                  <Button
                    onClick={() => setRsvpEvent(e)} variant={going ? 'outline' : 'default'}
                    className="w-full mt-3 rounded-full h-10"
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    {going ? 'You\'re going ✓' : (e.free ? 'RSVP' : 'Get tickets')}
                  </Button>
                </div>
              </Card>
            );
          })}
        </section>
      )}

      <RsvpDialog
        event={rsvpEvent}
        open={!!rsvpEvent}
        onOpenChange={(o) => !o && setRsvpEvent(null)}
        going={rsvpEvent ? rsvped.includes(rsvpEvent.id) : false}
        onConfirm={() => {
          if (rsvpEvent) { toggleRSVP(rsvpEvent.id); toast.success('You\'re going! We\'ll remind you.'); setRsvpEvent(null); }
        }}
        onCancel={() => {
          if (rsvpEvent) { toggleRSVP(rsvpEvent.id); toast('RSVP cancelled.'); setRsvpEvent(null); }
        }}
      />
    </div>
  );
};

export default Community;
