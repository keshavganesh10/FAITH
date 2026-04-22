import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, Calendar, Heart, MessageCircle, Send, Bookmark, MoreHorizontal,
  BadgeCheck, Users, PlusSquare, Map as MapIcon, LayoutGrid,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EVENTS, STORIES, EventType, CommunityEvent, Story } from '@/data/community';
import { ACCOUNTS } from '@/data/accounts';
import { useUser } from '@/state/user';
import { useAccount } from '@/state/account';
import { cn } from '@/lib/utils';
import { RsvpDialog } from '@/components/RsvpDialog';
import { CommentsSheet } from '@/components/CommentsSheet';
import { CreatePostSheet } from '@/components/CreatePostSheet';
import { StoryViewer } from '@/components/StoryViewer';
import { MapView, MapPoint } from '@/components/MapView';

const FILTERS: { id: EventType | 'all'; label: string }[] = [
  { id: 'all', label: 'For you' },
  { id: 'worship', label: 'Worship' },
  { id: 'study', label: 'Study' },
  { id: 'festival', label: 'Festival' },
  { id: 'volunteering', label: 'Service' },
];

// Deterministic pseudo-stats so the feed feels alive without a backend
const stats = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return { likes: 124 + (h % 980), going: 12 + (h % 90) };
};

const Community = () => {
  const nav = useNavigate();
  const { faith, rsvped, toggleRSVP, city } = useUser();
  const { account, comments: extraComments } = useAccount();

  const [filter, setFilter] = useState<EventType | 'all'>('all');
  const [active, setActive] = useState<CommunityEvent | null>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [commentsFor, setCommentsFor] = useState<CommunityEvent | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [story, setStory] = useState<Story | null>(null);
  const [view, setView] = useState<'feed' | 'map'>('feed');
  const [liked, setLiked] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);

  const events = useMemo(() => {
    return EVENTS
      .filter(e => filter === 'all' || e.type === filter)
      .sort((a, b) => {
        if (a.faith === faith && b.faith !== faith) return -1;
        if (b.faith === faith && a.faith !== faith) return 1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [filter, faith]);

  const points: MapPoint[] = useMemo(() => events.map(e => ({
    id: e.id, lat: e.lat, lng: e.lng,
    title: e.title, subtitle: `${e.host} · ${e.venue}`,
  })), [events]);

  const toggleLike = (id: string) =>
    setLiked(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const toggleSave = (id: string) =>
    setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const openStory = (s: Story) => {
    if (s.id === 's0') {
      setCreateOpen(true);
      return;
    }
    setStory(s);
  };

  return (
    <div className="pb-2">
      {/* Header */}
      <header className="px-5 pt-5 pb-2 flex items-end justify-between">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Community</p>
          <h1 className="font-display text-3xl text-foreground mt-0.5 leading-none">Feed</h1>
          {city && (
            <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {city}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setView(v => v === 'feed' ? 'map' : 'feed')}
            className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted text-foreground"
            aria-label="Toggle map view"
          >
            {view === 'feed' ? <MapIcon className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setCreateOpen(true)}
            className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted text-foreground"
            aria-label="Create post"
          >
            <PlusSquare className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Stories rail */}
      <div className="px-4 pt-2 pb-3 flex gap-3 overflow-x-auto scrollbar-hide">
        {STORIES.map(s => {
          const isYou = s.id === 's0';
          const acct = ACCOUNTS[s.handle];
          return (
            <button
              key={s.id}
              onClick={() => openStory(s)}
              className="shrink-0 w-16 flex flex-col items-center gap-1.5"
            >
              <div
                className={cn(
                  'h-16 w-16 rounded-full p-[2px]',
                  isYou ? 'bg-muted' : 'bg-gradient-to-tr from-accent via-primary to-accent'
                )}
              >
                <div className="h-full w-full rounded-full bg-card p-[2px]">
                  <div className="h-full w-full rounded-full overflow-hidden grid place-items-center">
                    {isYou ? (
                      account ? (
                        <img src={account.avatar} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full grid place-items-center bg-muted text-muted-foreground text-2xl">+</div>
                      )
                    ) : acct ? (
                      <img src={acct.avatar} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div
                        className="h-full w-full grid place-items-center text-xl font-display text-primary-foreground"
                        style={{ background: `linear-gradient(135deg, hsl(${s.hue} 70% 55%), hsl(${(s.hue + 40) % 360} 65% 70%))` }}
                      >
                        {s.symbol}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {s.live && (
                <span className="text-[7px] font-bold tracking-widest bg-destructive text-destructive-foreground rounded px-1 py-px -mt-1">
                  LIVE
                </span>
              )}
              <p className="text-[10px] text-muted-foreground truncate w-full text-center leading-none">{s.name}</p>
            </button>
          );
        })}
      </div>

      {/* Filter chips */}
      <div className="px-4 mb-2 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={cn('shrink-0 rounded-full border px-3 py-1 text-[11px] transition-all',
              filter === f.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}>
            {f.label}
          </button>
        ))}
      </div>

      {view === 'map' ? (
        <div className="px-4 pb-6">
          <MapView points={points} height={520} />
          <p className="text-[11px] text-muted-foreground text-center mt-2">
            Showing {points.length} {points.length === 1 ? 'event' : 'events'} near you
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {events.map(e => {
            const acct = ACCOUNTS[e.handle];
            const going = rsvped.includes(e.id);
            const isLiked = liked.includes(e.id);
            const isSaved = saved.includes(e.id);
            const d = new Date(e.date);
            const s = stats(e.id);
            const likeCount = s.likes + (isLiked ? 1 : 0);
            const totalComments = e.comments.length + (extraComments[e.id]?.length ?? 0);

            return (
              <article key={e.id} className="bg-card border-y border-border/50">
                {/* Author header */}
                <div className="flex items-center gap-2.5 px-3.5 py-2.5">
                  <button
                    onClick={() => acct && nav(`/app/community/u/${encodeURIComponent(acct.handle)}`)}
                    className="h-9 w-9 rounded-full p-[1.5px] bg-gradient-to-tr from-accent via-primary to-accent shrink-0"
                  >
                    <div className="h-full w-full rounded-full bg-card p-[1px] overflow-hidden">
                      {acct ? (
                        <img src={acct.avatar} alt="" className="h-full w-full rounded-full object-cover" />
                      ) : (
                        <div
                          className="h-full w-full rounded-full grid place-items-center text-[11px] font-display text-primary-foreground"
                          style={{ background: `linear-gradient(135deg, hsl(${e.hue} 70% 55%), hsl(${(e.hue + 40) % 360} 65% 70%))` }}
                        >
                          {e.symbol}
                        </div>
                      )}
                    </div>
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => acct && nav(`/app/community/u/${encodeURIComponent(acct.handle)}`)}
                        className="text-[13px] font-semibold text-foreground leading-tight truncate hover:underline"
                      >
                        {e.host}
                      </button>
                      {e.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" fill="currentColor" stroke="hsl(var(--card))" />}
                    </div>
                    <p className="text-[10.5px] text-muted-foreground leading-tight truncate">
                      {e.venue} · {e.distanceKm} km
                    </p>
                  </div>
                  <button className="p-1 -mr-1 text-muted-foreground hover:text-foreground transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                {/* Hero image — real photo */}
                <div className="relative aspect-square w-full overflow-hidden bg-muted">
                  <img src={e.image} alt={e.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />

                  {/* Top-left date chip */}
                  <div className="absolute top-3 left-3 bg-background/95 backdrop-blur rounded-xl px-2.5 py-1.5 text-center shadow-soft">
                    <p className="text-[8px] uppercase tracking-widest text-muted-foreground leading-none">
                      {d.toLocaleDateString(undefined, { month: 'short' })}
                    </p>
                    <p className="font-display text-xl leading-tight text-foreground">{d.getDate()}</p>
                  </div>

                  {/* Top-right type chip */}
                  <span className="absolute top-3 right-3 text-[9px] uppercase tracking-widest text-white font-semibold px-2 py-1 rounded-full bg-black/40 backdrop-blur">
                    {e.type}
                  </span>

                  {/* Bottom title block */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
                    <p className="font-display text-2xl text-white leading-tight drop-shadow">{e.title}</p>
                    <p className="text-[11px] text-white/85 mt-1 inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })} ·
                      {' '}{d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {/* Action bar */}
                <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
                  <div className="flex items-center gap-1">
                    <button onClick={() => toggleLike(e.id)} className="p-1.5 -ml-1.5 hover:opacity-70 transition-opacity">
                      <Heart className={cn('h-6 w-6 transition-all',
                        isLiked ? 'fill-destructive text-destructive scale-110' : 'text-foreground')} />
                    </button>
                    <button onClick={() => setCommentsFor(e)} className="p-1.5 hover:opacity-70 transition-opacity">
                      <MessageCircle className="h-6 w-6 text-foreground" />
                    </button>
                    <button className="p-1.5 hover:opacity-70 transition-opacity">
                      <Send className="h-6 w-6 text-foreground" />
                    </button>
                  </div>
                  <button onClick={() => toggleSave(e.id)} className="p-1.5 -mr-1.5 hover:opacity-70 transition-opacity">
                    <Bookmark className={cn('h-6 w-6 transition-all',
                      isSaved ? 'fill-foreground text-foreground' : 'text-foreground')} />
                  </button>
                </div>

                {/* Likes */}
                <p className="px-3.5 text-[12px] font-semibold text-foreground tabular-nums">
                  {likeCount.toLocaleString()} likes
                </p>

                {/* Caption */}
                <p className="px-3.5 pt-1 text-[12.5px] text-foreground leading-snug">
                  <button
                    onClick={() => acct && nav(`/app/community/u/${encodeURIComponent(acct.handle)}`)}
                    className="font-semibold mr-1.5 hover:underline"
                  >
                    {e.handle}
                  </button>
                  {e.description}
                </p>

                {/* Going row */}
                <div className="px-3.5 pt-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-1.5">
                      {e.comments.slice(0, 3).map((c, i) => {
                        const a = ACCOUNTS[c.handle];
                        return a ? (
                          <img key={i} src={a.avatar} alt=""
                            className="h-5 w-5 rounded-full border-2 border-card object-cover" />
                        ) : (
                          <div key={i} className="h-5 w-5 rounded-full border-2 border-card bg-muted grid place-items-center text-[8px] font-semibold text-muted-foreground">
                            {c.user.charAt(0)}
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      <span className="font-semibold text-foreground">{s.going}</span> going
                    </p>
                  </div>
                  <Button
                    onClick={() => { setActive(e); setRsvpOpen(true); }}
                    size="sm"
                    variant={going ? 'secondary' : 'default'}
                    className="rounded-full h-7 px-3.5 text-[11px]"
                  >
                    {going ? <><Users className="h-3 w-3 mr-1" />Going</> : 'RSVP'}
                  </Button>
                </div>

                {/* Comments preview */}
                {totalComments > 0 && (
                  <div className="px-3.5 pt-2 space-y-0.5">
                    {totalComments > 1 && (
                      <button
                        onClick={() => setCommentsFor(e)}
                        className="text-[11.5px] text-muted-foreground hover:text-foreground transition-colors block"
                      >
                        View all {totalComments} comments
                      </button>
                    )}
                    {e.comments.slice(0, 1).map((c, i) => (
                      <p key={i} className="text-[12px] text-foreground leading-snug">
                        <span className="font-semibold mr-1.5">{c.handle}</span>
                        {c.text}
                      </p>
                    ))}
                  </div>
                )}

                {/* Posted ago */}
                <p className="px-3.5 pt-1.5 pb-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {e.postedAgo} ago
                </p>

                {/* Add comment row */}
                <div
                  onClick={() => setCommentsFor(e)}
                  className="px-3.5 pb-3 flex items-center gap-2 border-t border-border/40 pt-2.5 cursor-pointer"
                >
                  {account ? (
                    <img src={account.avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-gradient-dawn grid place-items-center text-[9px] font-semibold text-primary-foreground">
                      ?
                    </div>
                  )}
                  <p className="flex-1 text-[12px] text-muted-foreground">Add a comment…</p>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <RsvpDialog
        event={active}
        open={rsvpOpen}
        onOpenChange={setRsvpOpen}
        going={active ? rsvped.includes(active.id) : false}
        onConfirm={() => active && toggleRSVP(active.id)}
        onCancel={() => active && toggleRSVP(active.id)}
      />
      <CommentsSheet
        event={commentsFor}
        open={!!commentsFor}
        onOpenChange={(o) => !o && setCommentsFor(null)}
      />
      <CreatePostSheet open={createOpen} onOpenChange={setCreateOpen} />
      <StoryViewer story={story} onClose={() => setStory(null)} />
    </div>
  );
};

export default Community;
