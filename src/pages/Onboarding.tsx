import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, MapPin, GraduationCap, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileShell } from '@/components/MobileShell';
import { UK_CITIES, UK_UNIVERSITIES, MANDIRS, INTERESTS } from '@/data/hindu';
import { useUser } from '@/state/user';
import { cn } from '@/lib/utils';

const Onboarding = () => {
  const nav = useNavigate();
  const { setProfile } = useUser();
  const [step, setStep] = useState(0);
  const [city, setCity] = useState<string | null>(null);
  const [university, setUniversity] = useState<string | null>(null);
  const [mandirId, setMandirId] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);

  const next = () => {
    if (step < 2) setStep(step + 1);
    else {
      setProfile({ onboarded: true, city, university, mandirId, interests });
      nav('/app', { replace: true });
    }
  };
  const back = () => (step === 0 ? nav('/') : setStep(step - 1));

  const canNext =
    (step === 0 && !!city && !!university) ||
    (step === 1 && !!mandirId) ||
    (step === 2 && interests.length > 0);

  const visibleMandirs = city ? MANDIRS.filter(m => m.city.toLowerCase().includes(city.toLowerCase())) : [];
  const mandirOptions = visibleMandirs.length > 0 ? visibleMandirs : MANDIRS;

  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <button onClick={back} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted text-foreground" aria-label="Back">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex-1 flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i} className={cn('h-1 flex-1 rounded-full transition-colors',
              i <= step ? 'bg-primary' : 'bg-muted')} />
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-32 animate-float-in" key={step}>
        {step === 0 && (
          <>
            <h2 className="font-display text-3xl text-foreground inline-flex items-center gap-2">
              <MapPin className="h-6 w-6 text-accent" /> Where are you?
            </h2>
            <p className="text-sm text-muted-foreground mt-2">We'll tailor events, mandirs and vendors to your area.</p>

            <p className="mt-6 text-[10px] tracking-widest uppercase text-muted-foreground">UK City</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {UK_CITIES.map(c => (
                <button key={c} onClick={() => { setCity(c); setMandirId(null); }}
                  className={cn('rounded-xl border px-3 py-2.5 text-sm text-left transition-all',
                    city === c ? 'border-primary bg-primary/5 font-medium' : 'border-border hover:border-primary/40')}>
                  {c}
                </button>
              ))}
            </div>

            <p className="mt-6 text-[10px] tracking-widest uppercase text-muted-foreground inline-flex items-center gap-1">
              <GraduationCap className="h-3 w-3" /> University (links to your NHSF chapter)
            </p>
            <select
              value={university ?? ''}
              onChange={e => setUniversity(e.target.value || null)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-3 text-sm"
            >
              <option value="">Select a university…</option>
              {UK_UNIVERSITIES.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="font-display text-3xl text-foreground inline-flex items-center gap-2">
              <Landmark className="h-6 w-6 text-accent" /> Your local mandir
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Pick the temple you visit most. You'll see its aarti times and events at the top of your feed.
            </p>
            <div className="space-y-2 mt-6">
              {mandirOptions.map(m => (
                <button key={m.id} onClick={() => setMandirId(m.id)}
                  className={cn('w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all',
                    mandirId === m.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40')}>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-[11px] text-muted-foreground">{m.city}{m.tradition && ` · ${m.tradition}`}</p>
                  </div>
                  {mandirId === m.id && <Check className="h-4 w-4 text-primary shrink-0" />}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-display text-3xl text-foreground">What draws you?</h2>
            <p className="text-sm text-muted-foreground mt-2">Pick a few — your home feed is built around these.</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {INTERESTS.map(i => {
                const on = interests.includes(i);
                return (
                  <button key={i} onClick={() =>
                    setInterests(s => on ? s.filter(x => x !== i) : [...s, i])}
                    className={cn('rounded-full border px-3.5 py-2 text-xs transition-all',
                      on ? 'border-accent bg-accent text-accent-foreground' : 'border-border hover:border-accent/50')}>
                    {i}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 px-5 pb-6 pt-3 bg-gradient-to-t from-background via-background to-transparent">
        <Button onClick={next} disabled={!canNext} size="lg" className="w-full h-14 rounded-full text-base shadow-soft">
          {step < 2 ? 'Continue' : 'Enter FAITH'}
        </Button>
      </div>
    </MobileShell>
  );
};

export default Onboarding;
