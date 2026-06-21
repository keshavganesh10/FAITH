import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MobileShell } from '@/components/MobileShell';
import { useUser } from '@/state/user';
import skyHero from '@/assets/sky-hero.jpg';

const Welcome = () => {
  const { onboarded } = useUser();
  if (onboarded) return <Navigate to="/app" replace />;

  return (
    <MobileShell>
      <div className="relative flex-1 flex flex-col">
        <div className="absolute inset-0">
          <img src={skyHero} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-between px-8 pt-20 pb-10 text-center">
          <div className="animate-float-in">
            <p className="font-display text-xs tracking-[0.4em] uppercase text-foreground/70">A modern hub</p>
            <h1 className="font-display font-semibold text-7xl mt-3 tracking-tight text-saffron" style={{ letterSpacing: '0.08em' }}>
              FAITH
            </h1>
            <div className="mx-auto mt-4 h-px w-16 bg-accent" />
            <p className="font-display italic text-lg text-foreground/85 mt-6 max-w-xs">
              for ancient traditions
            </p>
          </div>

          <div className="w-full space-y-4 animate-float-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-sm text-foreground/80 leading-relaxed max-w-xs mx-auto">
              Scripture, slokas, local mandirs, NHSF events and authentic puja goods — gathered for the UK Hindu diaspora.
            </p>
            <Button asChild size="lg" className="w-full h-14 rounded-full shadow-soft text-base">
              <Link to="/onboarding">Begin your journey</Link>
            </Button>
            <p className="text-[11px] text-muted-foreground/80 tracking-wider uppercase">
              Ad-free · Local · Personal
            </p>
          </div>
        </div>
      </div>
    </MobileShell>
  );
};

export default Welcome;
