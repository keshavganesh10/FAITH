import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Flame, BookOpen, Trophy } from 'lucide-react';
import { useUser } from '@/state/user';
import { Card } from '@/components/ui/card';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Streak = () => {
  const nav = useNavigate();
  const { readingStreak, completedLessons, xp } = useUser();

  return (
    <div className="pb-6">
      <header className="sticky top-0 bg-background/95 backdrop-blur z-20 px-3 py-3 flex items-center border-b border-border/50">
        <button onClick={() => nav(-1)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted"><ChevronLeft className="h-5 w-5" /></button>
        <p className="flex-1 text-center text-[12px] text-muted-foreground">Your streak</p>
        <div className="w-10" />
      </header>

      <section className="px-5 pt-6 text-center">
        <div className="mx-auto h-28 w-28 rounded-full bg-gradient-saffron grid place-items-center text-primary-foreground shadow-elevated">
          <Flame className="h-12 w-12" />
        </div>
        <p className="font-display text-5xl mt-4">{readingStreak}</p>
        <p className="text-xs text-muted-foreground mt-1">day reading streak</p>
        <p className="text-[11px] text-muted-foreground mt-2 max-w-xs mx-auto">Read or listen to at least one passage today to keep your streak alive.</p>
      </section>

      <section className="px-5 mt-6">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">This week</p>
        <Card className="p-4 flex justify-between">
          {DAYS.map((d, i) => {
            const done = i < readingStreak;
            return (
              <div key={d} className="flex flex-col items-center gap-1.5">
                <div className={`h-9 w-9 rounded-full grid place-items-center text-xs font-medium ${done ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {done ? '✓' : ''}
                </div>
                <span className="text-[10px] text-muted-foreground">{d}</span>
              </div>
            );
          })}
        </Card>
      </section>

      <section className="px-5 mt-5 grid grid-cols-2 gap-3">
        <Card className="p-4">
          <BookOpen className="h-4 w-4 text-accent" />
          <p className="font-display text-2xl mt-1.5">{completedLessons.length}</p>
          <p className="text-[11px] text-muted-foreground">lessons completed</p>
        </Card>
        <Card className="p-4">
          <Trophy className="h-4 w-4 text-accent" />
          <p className="font-display text-2xl mt-1.5">{xp}</p>
          <p className="text-[11px] text-muted-foreground">XP earned</p>
        </Card>
      </section>

      <section className="px-5 mt-5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Milestones</p>
        <Card className="divide-y divide-border/60">
          {[3, 7, 30, 100, 365].map(n => (
            <div key={n} className="flex items-center px-4 py-2.5">
              <span className="text-[13px]">{n}-day streak</span>
              <span className={`ml-auto text-[11px] ${readingStreak >= n ? 'text-accent font-medium' : 'text-muted-foreground'}`}>
                {readingStreak >= n ? 'Unlocked ✓' : 'Locked'}
              </span>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
};

export default Streak;
