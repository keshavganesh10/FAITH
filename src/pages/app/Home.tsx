import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useUser } from '@/state/user';
import { FAITHS } from '@/data/faiths';
import { VERSE_OF_DAY } from '@/data/scriptures';
import { DAILY_PRACTICE } from '@/data/practice';
import { EVENTS } from '@/data/community';
import { PRODUCTS } from '@/data/marketplace';
import { Card } from '@/components/ui/card';
import { NotificationsSheet } from '@/components/NotificationsSheet';

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
};

const nextPractice = (faith: ReturnType<typeof useUser>['faith']) => {
  if (!faith) return null;
  const list = DAILY_PRACTICE[faith];
  const now = new Date();
  const today = list.map(p => {
    const [h, m] = p.time.split(':').map(Number);
    const d = new Date(); d.setHours(h, m, 0, 0);
    return { ...p, when: d };
  });
  return today.find(p => p.when > now) ?? today[0];
};

const Home = () => {
  const { faith, city } = useUser();
  if (!faith) return null;
  const f = FAITHS.find(x => x.id === faith)!;
  const verse = VERSE_OF_DAY[faith];
  const practice = nextPractice(faith);
  const event = EVENTS.find(e => e.faith === faith) ?? EVENTS[0];
  const product = PRODUCTS.find(p => p.faith === faith && p.seasonal) ?? PRODUCTS.find(p => p.faith === faith) ?? PRODUCTS[0];

  return (
    <div className="pb-6">
      {/* Hero greeting */}
      <header className="bg-gradient-dawn px-6 pt-10 pb-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 texture-paper" />
        <div className="relative">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase opacity-80">{f.greeting}</p>
              <h1 className="font-display text-3xl mt-1">{greeting()}</h1>
              <p className="text-xs mt-1.5 opacity-80">
                {new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
                {city && ` · ${city.split(',')[0]}`}
              </p>
            </div>
            <NotificationsSheet />
          </div>
        </div>
      </header>

      <div className="px-5 -mt-6 space-y-4">
        {/* Verse of the day */}
        <Card className="bg-gradient-card border-border/60 shadow-soft p-5 animate-float-in">
          <div className="flex items-center gap-2 text-accent">
            <Sparkles className="h-4 w-4" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase">Passage of the day</span>
          </div>
          <p className="font-display text-xl leading-snug text-foreground mt-3">"{verse.text}"</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground italic">— {verse.reference}</span>
            <Link to={`/app/scriptures`} className="text-xs font-medium text-primary inline-flex items-center gap-1">
              Read more <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </Card>

        {/* Practice */}
        {practice && (
          <Card className="p-4 flex items-center gap-4 shadow-soft">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 grid place-items-center">
              <span className="font-display text-2xl text-primary">{practice.time.split(':')[0]}</span>
            </div>
            <div className="flex-1">
              <p className="text-[11px] tracking-widest uppercase text-muted-foreground">Next {practice.kind}</p>
              <p className="font-display text-lg text-foreground leading-tight">{practice.label}</p>
              <p className="text-xs text-muted-foreground">at {practice.time}</p>
            </div>
          </Card>
        )}

        {/* Upcoming event */}
        <Link to="/app/community" className="block">
          <Card className="p-4 shadow-soft hover:shadow-elevated transition-shadow">
            <p className="text-[11px] tracking-widest uppercase text-muted-foreground">Near you</p>
            <p className="font-display text-xl text-foreground mt-1">{event.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{event.host} · {event.distanceKm} km away</p>
            <p className="text-xs text-primary mt-2">
              {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })} · {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </Card>
        </Link>

        {/* Featured product */}
        <Link to={`/app/market/${product.id}`} className="block">
          <Card className="p-4 flex gap-4 items-center shadow-soft hover:shadow-elevated transition-shadow">
            <div className="h-16 w-16 rounded-2xl bg-gold-soft/40 grid place-items-center text-3xl">{product.emoji}</div>
            <div className="flex-1">
              <p className="text-[11px] tracking-widest uppercase text-accent">
                {product.seasonal ? `For ${product.seasonal}` : 'Featured'}
              </p>
              <p className="font-display text-lg text-foreground leading-tight">{product.name}</p>
              <p className="text-xs text-muted-foreground">{product.vendor} · £{product.price.toFixed(2)}</p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Home;
