import { useState, useMemo } from 'react';
import { MapPin, Calendar, Map as MapIcon, List, Users, Heart, MessageCircle, Bookmark, Share2, Ticket, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { EVENTS, EVENT_TYPES, EventType, CommunityEvent } from '@/data/community';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapView } from '@/components/MapView';
import { RsvpDialog } from '@/components/RsvpDialog';
import { useUser } from '@/state/user';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Carousel = ({ images, alt }: { images: string[]; alt: string }) => {
  const [i, setI] = useState(0);
  if (!images.length) return null;
  return (
    <div className="relative aspect-square bg-muted overflow-hidden">
      <img src={images[i]} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      {images.length > 1 && (
        <>
          {i > 0 && (
            <button onClick={() => setI(i - 1)}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full bg-black/40 text-white backdrop-blur">
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          {i < images.length - 1 && (
            <button onClick={() => setI(i + 1)}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full bg-black/40 text-white backdrop-blur">
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
          <div className="absolute top-2 right-2 text-[10px] bg-black/50 text-white px-1.5 py-0.5 rounded-full">{i + 1}/{images.length}</div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <span key={idx} className={cn('h-1.5 w-1.5 rounded-full', idx === i ? 'bg-white' : 'bg-white/50')} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Story = ({ name, img }: { name: string; img: string }) => (
  <button className="shrink-0 flex flex-col items-center gap-1 w-16">
    <div className="h-14 w-14 rounded-full p-[2px] bg-gradient-to-tr from-accent via-primary to-accent">
      <div className="h-full w-full rounded-full bg-background p-[2px]">
        <img src={img} alt={name} className="h-full w-full rounded-full object-cover" />
      </div>
    </div>
    <span className="text-[9.5px] text-foreground/80 truncate w-full text-center">{name}</span>
  </button>
);

const Community = () => {
  const { rsvped, toggleRSVP, likedEvents, savedEvents, toggleLike, toggleSave } = useUser();
  const [filter, setFilter] = useState<EventType | 'All'>('All');
  const [view, setView] = useState<'list' | 'map'>('list');
  const [rsvpEvent, setRsvpEvent] = useState<CommunityEvent | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

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

      {/* Stories rail */}
      {view === 'list' && (
        <div className="px-5 flex gap-3 overflow-x-auto scrollbar-hide pb-2 mb-1">
          {events.slice(0, 9).map(e => (
            <Story key={e.id} name={e.hostHandle?.replace('@', '') || e.host} img={e.hostAvatar || e.images[0]} />
          ))}
        </div>
      )}

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
        <section className="mt-3 space-y-4">
          {events.map(e => {
            const going = rsvped.includes(e.id);
            const liked = likedEvents.includes(e.id);
            const saved = savedEvents.includes(e.id);
            const open = expanded[e.id];
            const d = new Date(e.date);
            const likeCount = e.likes + (liked ? 1 : 0);
            return (
              <Card key={e.id} className="overflow-hidden rounded-none border-x-0 sm:rounded-xl sm:border-x shadow-none sm:shadow-soft">
                {/* Author row */}
                <div className="flex items-center gap-2.5 px-3 py-2.5">
                  {e.hostAvatar && (
                    <img src={e.hostAvatar} alt="" className="h-8 w-8 rounded-full object-cover ring-2 ring-accent/30" loading="lazy" />
                  )}
                  <div className="flex-1 min-w-0 leading-tight">
                    <p className="text-[12.5px] font-semibold truncate">{e.hostHandle || e.host}</p>
                    <p className="text-[10.5px] text-muted-foreground truncate">{e.city} · {e.type}</p>
                  </div>
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>

                <Carousel images={e.images} alt={e.title} />

                {/* Action row */}
                <div className="px-3 pt-2.5 flex items-center gap-3">
                  <button onClick={() => { toggleLike(e.id); }} aria-label="Like">
                    <Heart className={cn('h-6 w-6 transition-transform', liked ? 'fill-red-500 text-red-500 scale-110' : 'text-foreground')} />
                  </button>
                  <button onClick={() => toast('Comments are mock — feed is for show.')} aria-label="Comment">
                    <MessageCircle className="h-6 w-6 text-foreground" />
                  </button>
                  <button onClick={() => { if (navigator.share) navigator.share({ title: e.title, text: e.description }).catch(()=>{}); else toast('Link copied!'); }} aria-label="Share">
                    <Share2 className="h-6 w-6 text-foreground" />
                  </button>
                  <button onClick={() => toggleSave(e.id)} className="ml-auto" aria-label="Save">
                    <Bookmark className={cn('h-6 w-6', saved ? 'fill-foreground text-foreground' : 'text-foreground')} />
                  </button>
                </div>

                {/* Body */}
                <div className="px-3 pt-1.5 pb-3">
                  <p className="text-[12.5px] font-semibold">{likeCount.toLocaleString()} likes</p>
                  <p className="text-[13px] mt-1">
                    <span className="font-semibold">{e.hostHandle || e.host}</span>{' '}
                    <span className="font-display">{e.title}</span> — {open ? e.description : `${e.description.slice(0, 90)}${e.description.length > 90 ? '… ' : ''}`}
                    {e.description.length > 90 && !open && (
                      <button onClick={() => setExpanded(x => ({ ...x, [e.id]: true }))} className="text-muted-foreground">more</button>
                    )}
                  </p>

                  <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />
                      {d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })} · {d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{e.venue}</span>
                    <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{e.attendees} going</span>
                    <span className="font-semibold text-foreground">{e.free ? 'Free' : `£${e.price}`}</span>
                  </div>

                  {e.comments.length > 0 && (
                    <div className="mt-2.5 space-y-1">
                      {(open ? e.comments : e.comments.slice(0, 2)).map(cm => (
                        <p key={cm.id} className="text-[12.5px] leading-snug">
                          <span className="font-semibold">{cm.author}</span> {cm.text}
                          <span className="text-[10.5px] text-muted-foreground"> · {cm.ago}</span>
                        </p>
                      ))}
                      {!open && e.comments.length > 2 && (
                        <button onClick={() => setExpanded(x => ({ ...x, [e.id]: true }))}
                          className="text-[12px] text-muted-foreground">View all {e.comments.length} comments</button>
                      )}
                    </div>
                  )}

                  <Button
                    onClick={() => setRsvpEvent(e)} variant={going ? 'outline' : 'default'}
                    className="w-full mt-3 rounded-full h-10"
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    {going ? "You're going ✓" : (e.free ? 'RSVP' : 'Get tickets')}
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
          if (rsvpEvent) { toggleRSVP(rsvpEvent.id); toast.success("You're going! We'll remind you."); setRsvpEvent(null); }
        }}
        onCancel={() => {
          if (rsvpEvent) { toggleRSVP(rsvpEvent.id); toast('RSVP cancelled.'); setRsvpEvent(null); }
        }}
      />
    </div>
  );
};

export default Community;
