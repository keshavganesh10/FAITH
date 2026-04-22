import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileShell } from '@/components/MobileShell';
import { FAITHS, FaithId, INTERESTS, CITIES } from '@/data/faiths';
import { useUser } from '@/state/user';
import { cn } from '@/lib/utils';

const Onboarding = () => {
  const nav = useNavigate();
  const { setProfile } = useUser();
  const [step, setStep] = useState(0);
  const [faith, setFaith] = useState<FaithId | null>(null);
  const [denomination, setDenomination] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);

  const next = () => {
    if (step < 3) setStep(step + 1);
    else {
      setProfile({ onboarded: true, faith, denomination, city, interests });
      nav('/app', { replace: true });
    }
  };
  const back = () => (step === 0 ? nav('/') : setStep(step - 1));

  const canNext =
    (step === 0 && !!faith) ||
    (step === 1 && !!denomination) ||
    (step === 2 && !!city) ||
    (step === 3 && interests.length > 0);

  const selectedFaith = FAITHS.find(f => f.id === faith);

  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-2 flex items-center gap-3">
        <button onClick={back} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted text-foreground" aria-label="Back">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex-1 flex gap-1.5">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={cn('h-1 flex-1 rounded-full transition-colors',
              i <= step ? 'bg-primary' : 'bg-muted')} />
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6 animate-float-in" key={step}>
        {step === 0 && (
          <>
            <h2 className="font-display text-3xl text-foreground">Choose your tradition</h2>
            <p className="text-sm text-muted-foreground mt-2">We'll tailor scripture, practice and community to your path.</p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {FAITHS.map(f => (
                <button key={f.id} onClick={() => { setFaith(f.id); setDenomination(null); }}
                  className={cn('rounded-2xl border-2 bg-gradient-card p-4 text-left transition-all',
                    faith === f.id ? 'border-primary shadow-soft' : 'border-border hover:border-primary/40')}>
                  <div className="font-display text-3xl text-primary">{f.symbol}</div>
                  <div className="mt-2 font-medium text-sm">{f.name}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{f.scriptureName}</div>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && selectedFaith && (
          <>
            <h2 className="font-display text-3xl text-foreground">Within {selectedFaith.name}</h2>
            <p className="text-sm text-muted-foreground mt-2">Optional — helps us refine your readings.</p>
            <div className="space-y-2 mt-6">
              {selectedFaith.denominations.map(d => (
                <button key={d} onClick={() => setDenomination(d)}
                  className={cn('w-full flex items-center justify-between rounded-xl border-2 px-4 py-3.5 text-left transition-all',
                    denomination === d ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40')}>
                  <span className="text-sm font-medium">{d}</span>
                  {denomination === d && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-display text-3xl text-foreground">Where are you?</h2>
            <p className="text-sm text-muted-foreground mt-2">For local events, places of worship and vendors.</p>
            <div className="space-y-2 mt-6">
              {CITIES.map(c => (
                <button key={c} onClick={() => setCity(c)}
                  className={cn('w-full flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-all',
                    city === c ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40')}>
                  <span className="text-sm">{c}</span>
                  {city === c && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="font-display text-3xl text-foreground">What draws you?</h2>
            <p className="text-sm text-muted-foreground mt-2">Pick a few — your home feed is built around these.</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {INTERESTS.map(i => {
                const on = interests.includes(i);
                return (
                  <button key={i} onClick={() => setInterests(s => on ? s.filter(x => x !== i) : [...s, i])}
                    className={cn('rounded-full border px-4 py-2 text-sm transition-all',
                      on ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/40')}>
                    {i}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="px-5 pb-6 pt-3">
        <Button onClick={next} disabled={!canNext} size="lg" className="w-full h-16 rounded-2xl text-base font-semibold shadow-elevated">
          {step === 3 ? 'Enter FAITH' : 'Continue'}
        </Button>
      </div>
    </MobileShell>
  );
};

export default Onboarding;
