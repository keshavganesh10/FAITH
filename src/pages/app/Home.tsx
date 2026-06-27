import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, CalendarHeart } from 'lucide-react';
import { useUser } from '@/state/user';
import { VERSE_OF_DAY } from '@/data/scriptures';
import { OBSERVANCES, PANCHANG } from '@/data/practice';
import { EVENTS } from '@/data/community';
import { TRACKS } from '@/data/audio';
import { MANDIRS, HINDU_GREETINGS } from '@/data/hindu';
import { Card } from '@/components/ui/card';
import { NotificationsSheet } from '@/components/NotificationsSheet';
import { usePlayer } from '@/state/player';

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Shubh sandhya';
};

const daysUntil = (iso: string) => {
  const d = new Date(iso); const now = new Date();
  return Math.max(0, Math.ceil((d.getTime() - now.getTime()) / 86400000));
};

const Home = () => {
  const { city, mandirId, name } = useUser();
  const mandir = MANDIRS.find(m => m.id === mandirId);
  const event = EVENTS.find(e => city && e.city.toLowerCase().includes((city || '').toLowerCase())) ?? EVENTS[0];
  const next = OBSERVANCES[0];
  const sloka = TRACKS[0];
  const { play } = usePlayer();
  const greetingLine = HINDU_GREETINGS[new Date().getDate() % HINDU_GREETINGS.length];

  return (
    <div className="pb-6">
      <header className="bg-gradient-dawn px-6 pt-10 pb-14 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 texture-paper" />
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-primary-foreground/15 mandala-watermark" />
        <div className="relative">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase opacity-80">{greetingLine}</p>
              <h1 className="font-display text-3xl mt-1">{greeting()}{name ? `, ${name}` : ''}</h1>
              <p className="text-xs mt-2 opacity-85">
                {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                {city && ` · ${city}`}
              </p>
              <p className="text-[11px] mt-1.5 opacity-80 font-display italic">
                {PANCHANG.tithi} · {PANCHANG.nakshatra} nakshatra
              </p>
            </div>
            <NotificationsSheet />
          </div>
        </div>
      </header>

      <div className="px-5 -mt-8 space-y-3.5">
        {/* Verse of the day */}
        <Card className="bg-gradient-card border-border/60 shadow-soft p-5 animate-float-in">
          <div className="flex items-center gap-2 text-accent">
            <Sparkles className="h-4 w-4" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase">Verse of the day</span>
          </div>
          {VERSE_OF_DAY.sanskrit && (
            <p className="font-display text-base mt-3 text-foreground/70 leading-snug">{VERSE_OF_DAY.sanskrit}</p>
          )}
          <p className="font-display text-lg leading-snug text-foreground mt-2">"{VERSE_OF_DAY.text}"</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground italic">— {VERSE_OF_DAY.reference}</span>
            <Link to={`/app/scriptures/${VERSE_OF_DAY.id}`} className="text-xs font-medium text-primary inline-flex items-center gap-1">
              Read more <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </Card>

        {/* Upcoming observance */}
        <Link to="/app/observances" className="block">
          <Card className="p-4 flex items-center gap-4 shadow-soft hover:shadow-elevated transition-shadow">
            <div className="h-14 w-14 rounded-2xl bg-gradient-saffron grid place-items-center text-2xl text-primary-foreground">
              {next.emoji}
            </div>
            <div className="flex-1">
              <p className="text-[11px] tracking-widest uppercase text-muted-foreground inline-flex items-center gap-1">
                <Flame className="h-3 w-3" /> Coming up · {daysUntil(next.date)} day{daysUntil(next.date) === 1 ? '' : 's'}
              </p>
              <p className="font-display text-lg text-foreground leading-tight">{next.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{next.description}</p>
            </div>
          </Card>
        </Link>

        {/* Mandir card */}
        {mandir && (
          <Card className="p-4 shadow-soft">
            <p className="text-[11px] tracking-widest uppercase text-muted-foreground">Your mandir</p>
            <p className="font-display text-lg text-foreground mt-0.5">{mandir.name}</p>
            <p className="text-xs text-muted-foreground">{mandir.city} · Next aarti 6:30pm</p>
          </Card>
        )}

        {/* Local event */}
        <Link to="/app/community" className="block">
          <Card className="p-4 shadow-soft hover:shadow-elevated transition-shadow">
            <p className="text-[11px] tracking-widest uppercase text-muted-foreground inline-flex items-center gap-1">
              <CalendarHeart className="h-3 w-3" /> Near you
            </p>
            <p className="font-display text-xl text-foreground mt-1">{event.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{event.host} · {event.distanceKm.toFixed(1)} km</p>
            <p className="text-xs text-primary mt-2">
              {new Date(event.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
              {' · '}
              {new Date(event.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </Card>
        </Link>

        {/* Sloka of the morning */}
        <button onClick={() => play(sloka)} className="block w-full text-left">
          <Card className="p-4 flex items-center gap-3 shadow-soft hover:shadow-elevated transition-shadow">
            <div
              className="h-14 w-14 rounded-2xl grid place-items-center text-xl text-primary-foreground"
              style={{ background: `linear-gradient(135deg, hsl(${sloka.hue} 70% 55%), hsl(${(sloka.hue + 30) % 360} 65% 70%))` }}
            >🕉</div>
            <div className="flex-1">
              <p className="text-[11px] tracking-widest uppercase text-accent">Listen · Ad-free</p>
              <p className="font-display text-base text-foreground leading-tight">{sloka.title}</p>
              <p className="text-xs text-muted-foreground">{sloka.artist}</p>
            </div>
            <span className="text-[11px] text-primary font-medium">Play →</span>
          </Card>
        </button>
      </div>
    </div>
  );
};

export default Home;
