import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, CalendarHeart, ShoppingBag, Moon, Sun, LogOut, ChevronRight, GraduationCap, MapPin, Landmark } from 'lucide-react';
import { useUser } from '@/state/user';
import { useTheme } from '@/state/theme';
import { MANDIRS } from '@/data/hindu';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const nav = useNavigate();
  const { name, city, university, mandirId, interests, rsvped, bookmarks, basket, readingStreak, reset } = useUser();
  const { theme, toggle } = useTheme();
  const mandir = MANDIRS.find(m => m.id === mandirId);

  return (
    <div className="pb-6">
      <header className="bg-gradient-dawn px-6 pt-10 pb-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 mandala-watermark" />
        <div className="relative flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary-foreground/20 grid place-items-center font-display text-2xl">
            {(name?.[0] ?? '🕉').toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-2xl">{name ?? 'Namaste, friend'}</h1>
            <p className="text-xs opacity-85">{city ?? 'UK'} · {readingStreak}-day streak</p>
          </div>
        </div>
      </header>

      <div className="px-5 -mt-6 space-y-3">
        <Card className="p-4 space-y-2.5 shadow-soft">
          <Row icon={<MapPin className="h-3.5 w-3.5" />} label="City" value={city ?? '—'} />
          <Row icon={<GraduationCap className="h-3.5 w-3.5" />} label="University" value={university ?? '—'} />
          <Row icon={<Landmark className="h-3.5 w-3.5" />} label="Local mandir" value={mandir?.name ?? '—'} />
        </Card>

        <div className="grid grid-cols-3 gap-2">
          <Stat n={rsvped.length} label="RSVPs" icon={<CalendarHeart className="h-3.5 w-3.5" />} />
          <Stat n={bookmarks.length} label="Saved" icon={<Bookmark className="h-3.5 w-3.5" />} />
          <Stat n={basket.length} label="Basket" icon={<ShoppingBag className="h-3.5 w-3.5" />} />
        </div>

        {interests.length > 0 && (
          <Card className="p-4">
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground">Interests</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {interests.map(i => (
                <span key={i} className="text-[11px] rounded-full bg-muted px-2.5 py-1">{i}</span>
              ))}
            </div>
          </Card>
        )}

        <Card>
          <button onClick={toggle} className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-muted/50 transition-colors">
            <span className="text-sm font-medium inline-flex items-center gap-2">
              {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              {theme === 'dark' ? 'Dark theme' : 'Light theme'}
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
          <Link to="/app/market/basket" className="flex items-center justify-between px-4 py-3.5 border-t border-border/50 hover:bg-muted/50 transition-colors">
            <span className="text-sm font-medium">Basket ({basket.length})</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </Card>

        <Button variant="outline" className="w-full rounded-full" onClick={() => { reset(); nav('/', { replace: true }); }}>
          <LogOut className="h-4 w-4 mr-2" /> Reset & start over
        </Button>
      </div>
    </div>
  );
};

const Row = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="inline-flex items-center gap-2 text-muted-foreground">{icon}{label}</span>
    <span className="font-medium text-right truncate ml-3">{value}</span>
  </div>
);

const Stat = ({ n, label, icon }: { n: number; label: string; icon: React.ReactNode }) => (
  <Card className="p-3 text-center">
    <div className="grid place-items-center text-accent mb-1">{icon}</div>
    <p className="font-display text-xl leading-none">{n}</p>
    <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">{label}</p>
  </Card>
);

export default Profile;
