import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Clock, Phone, Globe } from 'lucide-react';
import { MANDIRS } from '@/data/hindu';
import { useUser } from '@/state/user';
import { MapView } from '@/components/MapView';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Mandir = () => {
  const nav = useNavigate();
  const { mandirId, city, setProfile } = useUser();
  const home = MANDIRS.find(m => m.id === mandirId) || MANDIRS[0];

  // crude "nearest" by string-matching city, else all
  const nearby = MANDIRS
    .filter(m => m.id !== home.id)
    .map(m => ({ ...m, near: city && m.city.toLowerCase().includes(city.toLowerCase()) ? 0 : 1 }))
    .sort((a, b) => a.near - b.near)
    .slice(0, 8);

  return (
    <div className="pb-6">
      <header className="sticky top-0 bg-background/95 backdrop-blur z-20 px-3 py-3 flex items-center border-b border-border/50">
        <button onClick={() => nav(-1)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted"><ChevronLeft className="h-5 w-5" /></button>
        <p className="flex-1 text-center text-[12px] text-muted-foreground">Your mandir</p>
        <div className="w-10" />
      </header>

      <section className="px-5 pt-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{home.tradition}</p>
        <h1 className="font-display text-2xl mt-1 leading-tight">{home.name}</h1>
        <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" />{home.city}</p>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <Card className="p-2.5"><p className="text-[9px] uppercase tracking-widest text-muted-foreground">Next aarti</p><p className="font-display text-sm mt-0.5">6:30 pm</p></Card>
          <Card className="p-2.5"><p className="text-[9px] uppercase tracking-widest text-muted-foreground">Open</p><p className="font-display text-sm mt-0.5">7am–9pm</p></Card>
          <Card className="p-2.5"><p className="text-[9px] uppercase tracking-widest text-muted-foreground">Today</p><p className="font-display text-sm mt-0.5">Aarti × 3</p></Card>
        </div>

        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="sm" className="flex-1 rounded-full"><Phone className="h-3.5 w-3.5 mr-1.5" />Call</Button>
          <Button variant="outline" size="sm" className="flex-1 rounded-full"><Globe className="h-3.5 w-3.5 mr-1.5" />Website</Button>
        </div>
      </section>

      <section className="px-5 mt-5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Aarti schedule</p>
        <Card className="divide-y divide-border/60">
          {[
            { t: 'Mangala Aarti', time: '5:30 am' },
            { t: 'Shringar Aarti', time: '7:30 am' },
            { t: 'Rajbhog Aarti', time: '11:30 am' },
            { t: 'Sandhya Aarti', time: '6:30 pm' },
            { t: 'Shayan Aarti', time: '8:45 pm' },
          ].map(r => (
            <div key={r.t} className="flex items-center px-3.5 py-2.5">
              <Clock className="h-3.5 w-3.5 text-muted-foreground mr-2" />
              <span className="text-[13px]">{r.t}</span>
              <span className="ml-auto text-[12px] text-muted-foreground">{r.time}</span>
            </div>
          ))}
        </Card>
      </section>

      <section className="px-5 mt-5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Nearest mandirs</p>
        <MapView
          points={[home, ...nearby].map(m => ({ id: m.id, lat: m.lat, lng: m.lng, title: m.name, subtitle: m.city }))}
          height={260}
        />
      </section>

      <section className="px-5 mt-4 space-y-2">
        {nearby.map(m => (
          <Card key={m.id} className="p-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-saffron grid place-items-center text-primary-foreground">🛕</div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm leading-tight truncate">{m.name}</p>
              <p className="text-[11px] text-muted-foreground truncate">{m.city} · {m.tradition}</p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setProfile({ mandirId: m.id })}>Set as mine</Button>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Mandir;
