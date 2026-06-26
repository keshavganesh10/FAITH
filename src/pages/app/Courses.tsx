import { Link } from 'react-router-dom';
import { Sparkles, Trophy } from 'lucide-react';
import { COURSES, lessonCount } from '@/data/courses';
import { useUser } from '@/state/user';
import { Card } from '@/components/ui/card';

const Courses = () => {
  const { completedLessons, xp } = useUser();
  return (
    <div>
      <div className="px-5 mb-3 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Guided courses</p>
        <span className="text-[10.5px] text-muted-foreground inline-flex items-center gap-1">
          <Trophy className="h-3 w-3 text-accent" /> {xp} XP
        </span>
      </div>
      <div className="px-5 space-y-3">
        {COURSES.map(c => {
          const total = lessonCount(c);
          const done = c.units.flatMap(u => u.lessons).filter(l => completedLessons.includes(l.id)).length;
          const pct = total ? (done / total) * 100 : 0;
          return (
            <Link key={c.id} to={`/app/courses/${c.id}`}>
              <Card className="overflow-hidden relative border-0 text-primary-foreground p-4"
                style={{ background: `linear-gradient(135deg, hsl(${c.hue} 65% 45%), hsl(${(c.hue + 40) % 360} 55% 62%))` }}>
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-white/20 grid place-items-center text-2xl shrink-0">{c.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-widest uppercase opacity-85 inline-flex items-center gap-1">
                      <Sparkles className="h-2.5 w-2.5" /> {c.level} · {total} lessons
                    </p>
                    <p className="font-display text-lg leading-tight mt-0.5">{c.title}</p>
                    <p className="text-[11px] opacity-90 mt-1 line-clamp-2">{c.description}</p>
                    <div className="mt-3 h-1.5 rounded-full bg-white/25 overflow-hidden">
                      <div className="h-full bg-white" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-[10px] opacity-85 mt-1">{done}/{total} complete</p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
