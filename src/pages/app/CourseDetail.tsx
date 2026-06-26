import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Lock, CheckCircle2, Play, Star } from 'lucide-react';
import { findCourse, lessonCount } from '@/data/courses';
import { useUser } from '@/state/user';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const CourseDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { completedLessons, xp } = useUser();
  const course = id ? findCourse(id) : undefined;

  if (!course) return (
    <div className="p-8 text-center text-muted-foreground">
      Course not found.{' '}<Link to="/app/courses" className="text-primary">Back</Link>
    </div>
  );

  const flat = course.units.flatMap(u => u.lessons);
  const done = flat.filter(l => completedLessons.includes(l.id)).length;

  return (
    <div className="pb-6">
      <header className="sticky top-0 bg-background/95 backdrop-blur z-20 px-3 py-3 flex items-center border-b border-border/50">
        <button onClick={() => nav(-1)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted"><ChevronLeft className="h-5 w-5" /></button>
        <p className="flex-1 text-center text-[12px] text-muted-foreground truncate">{course.scripture}</p>
        <div className="w-10" />
      </header>

      <section className="px-5 pt-4 pb-4 relative overflow-hidden text-primary-foreground rounded-b-3xl"
        style={{ background: `linear-gradient(135deg, hsl(${course.hue} 65% 45%), hsl(${(course.hue + 40) % 360} 55% 62%))` }}>
        <p className="text-[10px] tracking-[0.3em] uppercase opacity-85">{course.level} · {lessonCount(course)} lessons</p>
        <h1 className="font-display text-2xl mt-1 leading-tight">{course.title}</h1>
        <p className="text-xs opacity-90 mt-1.5">{course.description}</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-white/25 overflow-hidden">
            <div className="h-full bg-white" style={{ width: `${(done / lessonCount(course)) * 100}%` }} />
          </div>
          <span className="text-[11px] inline-flex items-center gap-1"><Star className="h-3 w-3 fill-white" />{xp} XP</span>
        </div>
      </section>

      <section className="px-5 mt-5 space-y-5">
        {course.units.map((u, ui) => {
          // unit unlocked if previous unit fully done or first unit
          const prev = course.units[ui - 1];
          const prevDone = !prev || prev.lessons.every(l => completedLessons.includes(l.id));
          return (
            <div key={u.id}>
              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-accent font-semibold">Unit {ui + 1}</p>
                  <p className="font-display text-lg leading-tight">{u.title}</p>
                  <p className="text-[11px] text-muted-foreground">{u.description}</p>
                </div>
              </div>
              <div className="space-y-2">
                {u.lessons.map((l, li) => {
                  const isDone = completedLessons.includes(l.id);
                  // lesson is locked if previous lesson within unit not done AND unit available
                  const prevLesson = u.lessons[li - 1];
                  const lessonUnlocked = prevDone && (!prevLesson || completedLessons.includes(prevLesson.id) || li === 0);
                  return lessonUnlocked ? (
                    <Link key={l.id} to={`/app/courses/${course.id}/lesson/${l.id}`}>
                      <Card className={cn('p-3 flex items-center gap-3 hover:shadow-soft transition-shadow',
                        isDone && 'bg-accent/5 border-accent/30')}>
                        <div className={cn('h-10 w-10 rounded-full grid place-items-center',
                          isDone ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground')}>
                          {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Play className="h-4 w-4 ml-0.5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium">{l.title}</p>
                          <p className="text-[10.5px] text-muted-foreground">{l.exercises.length} exercises · +{l.xp} XP</p>
                        </div>
                      </Card>
                    </Link>
                  ) : (
                    <Card key={l.id} className="p-3 flex items-center gap-3 opacity-60">
                      <div className="h-10 w-10 rounded-full bg-muted grid place-items-center text-muted-foreground">
                        <Lock className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium">{l.title}</p>
                        <p className="text-[10.5px] text-muted-foreground">Complete previous to unlock</p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default CourseDetail;
