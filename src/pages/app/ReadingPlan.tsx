import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { READING_PLANS } from '@/data/scriptures';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ReadingPlan = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const plan = READING_PLANS.find(p => p.id === id);

  if (!plan) return (
    <div className="p-8 text-center text-muted-foreground">
      Plan not found.{' '}<Link to="/app/scriptures" className="text-primary">Back</Link>
    </div>
  );

  return (
    <div className="pb-6">
      <header className="sticky top-0 bg-background/95 backdrop-blur z-20 px-3 py-3 flex items-center border-b border-border/50">
        <button onClick={() => nav(-1)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted"><ChevronLeft className="h-5 w-5" /></button>
        <p className="flex-1 text-center text-[12px] text-muted-foreground">Reading plan</p>
        <div className="w-10" />
      </header>

      <section className="bg-gradient-dawn text-primary-foreground px-5 py-6 relative overflow-hidden">
        <div className="absolute inset-0 texture-paper opacity-20" />
        <div className="relative">
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-80">{plan.days} days</p>
          <h1 className="font-display text-3xl mt-1 leading-tight">{plan.title}</h1>
          <p className="text-xs opacity-90 mt-2 max-w-md">{plan.description}</p>
          <p className="text-[11px] opacity-85 mt-3 inline-flex items-center gap-1"><Clock className="h-3 w-3" />{plan.daily} min/day</p>
        </div>
      </section>

      <section className="px-5 mt-4">
        <Button className="w-full rounded-full h-11">Start plan</Button>
      </section>

      <section className="px-5 mt-5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Schedule</p>
        <Card className="divide-y divide-border/60">
          {Array.from({ length: plan.days }, (_, i) => i + 1).map(day => (
            <div key={day} className="flex items-center px-4 py-2.5">
              <div className="h-7 w-7 rounded-full bg-muted text-muted-foreground grid place-items-center text-[11px] font-medium">{day}</div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-[13px] font-medium">Day {day}</p>
                <p className="text-[10.5px] text-muted-foreground inline-flex items-center gap-1"><Calendar className="h-2.5 w-2.5" />~{plan.daily} min reading</p>
              </div>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground/30" />
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
};

export default ReadingPlan;
