import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Bell, BellOff } from 'lucide-react';
import { OBSERVANCES } from '@/data/practice';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/state/user';

const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-GB',
  { weekday: 'long', day: 'numeric', month: 'long' });
const daysUntil = (iso: string) => Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000));

const Observances = () => {
  const nav = useNavigate();
  const { reminders, toggleReminder } = useUser();
  const sorted = [...OBSERVANCES].sort((a, b) => +new Date(a.date) - +new Date(b.date));

  return (
    <div className="pb-6">
      <header className="sticky top-0 bg-background/95 backdrop-blur z-20 px-3 py-3 flex items-center border-b border-border/50">
        <button onClick={() => nav(-1)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted"><ChevronLeft className="h-5 w-5" /></button>
        <p className="flex-1 text-center text-[12px] text-muted-foreground">Calendar · Coming up</p>
        <div className="w-10" />
      </header>

      <div className="px-5 pt-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Upcoming</p>
        <h1 className="font-display text-3xl mt-0.5 leading-none">Festivals & Vratas</h1>
        <p className="text-xs text-muted-foreground mt-1.5">Tap the bell to remind yourself the day before.</p>
      </div>

      <section className="px-5 mt-4 space-y-3">
        {sorted.map(o => {
          const on = !!reminders[o.id];
          return (
            <Card key={o.id} className="p-4 flex items-center gap-3 shadow-soft">
              <div className="h-14 w-14 rounded-2xl bg-gradient-saffron grid place-items-center text-2xl text-primary-foreground shrink-0">{o.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] tracking-widest uppercase text-muted-foreground inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {daysUntil(o.date)} day{daysUntil(o.date) === 1 ? '' : 's'} · {o.kind}
                </p>
                <p className="font-display text-lg leading-tight">{o.name}</p>
                <p className="text-[11px] text-muted-foreground">{fmt(o.date)}</p>
                <p className="text-xs text-foreground/80 mt-1.5 line-clamp-2">{o.description}</p>
              </div>
              <Button size="icon" variant={on ? 'default' : 'outline'} className="rounded-full" onClick={() => toggleReminder(o.id)} aria-label="Toggle reminder">
                {on ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
              </Button>
            </Card>
          );
        })}
      </section>
    </div>
  );
};

export default Observances;
