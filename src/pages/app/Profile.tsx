import { useNavigate } from 'react-router-dom';
import { Bell, Bookmark, CalendarPlus, ChevronRight, LogOut, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useUser } from '@/state/user';
import { FAITHS } from '@/data/faiths';
import { DAILY_PRACTICE } from '@/data/practice';
import { toast } from 'sonner';
import { useState } from 'react';

const Profile = () => {
  const nav = useNavigate();
  const { faith, denomination, city, interests, bookmarks, rsvped, fasts, reminders, toggleReminder, addFast, reset } = useUser();
  const [showFastForm, setShowFastForm] = useState(false);
  const [fastDate, setFastDate] = useState(new Date().toISOString().slice(0,10));
  const [fastType, setFastType] = useState('Day fast');
  const [fastIntention, setFastIntention] = useState('');

  if (!faith) return null;
  const f = FAITHS.find(x => x.id === faith)!;
  const practice = DAILY_PRACTICE[faith];

  return (
    <div className="pb-8">
      <header className="bg-gradient-dawn px-6 pt-10 pb-8 text-primary-foreground">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary-foreground/15 backdrop-blur grid place-items-center font-display text-3xl">
            {f.symbol}
          </div>
          <div>
            <p className="font-display text-2xl leading-tight">{f.name}</p>
            {denomination && <p className="text-xs opacity-80">{denomination}</p>}
            {city && <p className="text-[11px] opacity-80 inline-flex items-center gap-1 mt-1"><MapPin className="h-3 w-3"/>{city}</p>}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {interests.map(i => (
            <span key={i} className="text-[10px] uppercase tracking-wider bg-primary-foreground/15 backdrop-blur rounded-full px-2.5 py-1">{i}</span>
          ))}
        </div>
      </header>

      <div className="px-5 -mt-4 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <Card className="p-3 text-center">
            <p className="font-display text-2xl text-primary">{bookmarks.length}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Saved</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="font-display text-2xl text-primary">{rsvped.length}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">RSVPs</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="font-display text-2xl text-primary">{fasts.length}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Fasts</p>
          </Card>
        </div>

        {/* Prayer reminders */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="h-4 w-4 text-primary" />
            <p className="font-display text-lg">Daily reminders</p>
          </div>
          <ul className="space-y-2">
            {practice.map(p => (
              <li key={p.id} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-medium">{p.label}</p>
                  <p className="text-[11px] text-muted-foreground">{p.time}</p>
                </div>
                <Switch checked={!!reminders[p.id]} onCheckedChange={() => toggleReminder(p.id)} />
              </li>
            ))}
          </ul>
        </Card>

        {/* Fasting scheduler */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CalendarPlus className="h-4 w-4 text-primary" />
              <p className="font-display text-lg">Fasting schedule</p>
            </div>
            <button onClick={() => setShowFastForm(s => !s)} className="text-xs text-primary font-medium">
              {showFastForm ? 'Cancel' : 'Add fast'}
            </button>
          </div>

          {showFastForm && (
            <div className="space-y-2 mb-3 p-3 rounded-xl bg-muted/50 border border-border">
              <input type="date" value={fastDate} onChange={e => setFastDate(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" />
              <input value={fastType} onChange={e => setFastType(e.target.value)} placeholder="Type"
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" />
              <input value={fastIntention} onChange={e => setFastIntention(e.target.value)} placeholder="Intention (optional)"
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm" />
              <Button size="sm" className="w-full" onClick={() => {
                addFast({ id: crypto.randomUUID(), date: fastDate, type: fastType, intention: fastIntention });
                setShowFastForm(false); setFastIntention('');
                toast.success('Fast scheduled');
              }}>Save fast</Button>
            </div>
          )}

          {fasts.length === 0 && !showFastForm && (
            <p className="text-xs text-muted-foreground">No fasts scheduled yet.</p>
          )}
          <ul className="space-y-1.5">
            {fasts.map(fst => (
              <li key={fst.id} className="flex items-center justify-between py-1.5 border-t border-border first:border-0">
                <div>
                  <p className="text-sm font-medium">{fst.type}</p>
                  {fst.intention && <p className="text-[11px] text-muted-foreground italic">"{fst.intention}"</p>}
                </div>
                <p className="text-xs text-muted-foreground">{new Date(fst.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Saved & RSVPs */}
        <Card>
          <button onClick={() => nav('/app/scriptures')} className="w-full flex items-center gap-3 p-4 hover:bg-muted/50">
            <Bookmark className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium flex-1 text-left">Saved scriptures</span>
            <span className="text-xs text-muted-foreground">{bookmarks.length}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </Card>

        <Button variant="outline" className="w-full rounded-full" onClick={() => { reset(); toast('Profile reset'); nav('/'); }}>
          <LogOut className="h-4 w-4 mr-2" /> Reset demo profile
        </Button>
      </div>
    </div>
  );
};

export default Profile;
