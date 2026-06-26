import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { X, Check, ChevronRight, Star } from 'lucide-react';
import { findLesson, Exercise } from '@/data/courses';
import { useUser } from '@/state/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const ExerciseView = ({ ex, onAnswer }: { ex: Exercise; onAnswer: (correct: boolean) => void }) => {
  const [picked, setPicked] = useState<number | null>(null);
  const [typed, setTyped] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = (() => {
    if (ex.kind === 'read') return true;
    if (ex.kind === 'fill-blank') return typed.trim().toLowerCase() === String(ex.answer).toLowerCase();
    return picked === ex.answer;
  })();

  const submit = () => {
    if (submitted) {
      onAnswer(isCorrect);
      setPicked(null); setTyped(''); setSubmitted(false);
      return;
    }
    setSubmitted(true);
  };

  const canSubmit = ex.kind === 'read' || (ex.kind === 'fill-blank' ? typed.trim() !== '' : picked !== null);

  return (
    <div className="flex-1 flex flex-col px-5 pt-5">
      <p className="text-[10px] tracking-[0.3em] uppercase text-accent font-semibold">{ex.kind.replace('-', ' ')}</p>
      <h2 className="font-display text-2xl leading-tight mt-1.5">{ex.prompt}</h2>

      {ex.sanskrit && (
        <p className="font-display text-foreground/85 leading-relaxed mt-4 text-base">{ex.sanskrit}</p>
      )}

      {ex.context && (
        <div className="mt-4 p-4 rounded-2xl bg-muted/60 border border-border/50">
          <p className="text-[13px] text-foreground/90 leading-relaxed">{ex.context}</p>
        </div>
      )}

      <div className="mt-5 space-y-2 flex-1">
        {(ex.kind === 'multiple-choice' || ex.kind === 'tap-translate') && ex.options?.map((o, i) => (
          <button key={i} onClick={() => !submitted && setPicked(i)}
            className={cn('w-full text-left rounded-2xl border-2 p-3.5 text-sm transition-colors',
              !submitted && picked === i && 'border-primary bg-primary/5',
              !submitted && picked !== i && 'border-border hover:border-primary/40',
              submitted && i === ex.answer && 'border-emerald-500 bg-emerald-500/10',
              submitted && picked === i && i !== ex.answer && 'border-red-500 bg-red-500/10',
              submitted && picked !== i && i !== ex.answer && 'border-border opacity-50'
            )}
            disabled={submitted}>
            {o}
          </button>
        ))}

        {ex.kind === 'fill-blank' && (
          <Input value={typed} onChange={e => setTyped(e.target.value)} disabled={submitted}
            placeholder="Type your answer"
            className={cn('h-14 text-base rounded-2xl',
              submitted && isCorrect && 'border-emerald-500',
              submitted && !isCorrect && 'border-red-500')} />
        )}
      </div>

      {submitted && (
        <div className={cn('mt-4 p-3.5 rounded-2xl text-sm', isCorrect ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'bg-red-500/10 text-red-700 dark:text-red-300')}>
          <p className="font-display text-base inline-flex items-center gap-1">
            {isCorrect ? <><Check className="h-4 w-4" />Correct!</> : <><X className="h-4 w-4" />Not quite.</>}
          </p>
          {!isCorrect && ex.kind !== 'fill-blank' && ex.options && typeof ex.answer === 'number' && (
            <p className="text-[12px] mt-1">Answer: {ex.options[ex.answer]}</p>
          )}
          {!isCorrect && ex.kind === 'fill-blank' && (
            <p className="text-[12px] mt-1">Answer: {ex.answer}</p>
          )}
          {ex.explain && <p className="text-[12px] mt-1 opacity-90">{ex.explain}</p>}
        </div>
      )}

      <div className="py-4">
        <Button onClick={submit} disabled={!canSubmit}
          className="w-full h-12 rounded-full text-base">
          {submitted ? 'Continue' : 'Check'}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const nav = useNavigate();
  const { completeLesson } = useUser();
  const found = courseId && lessonId ? findLesson(courseId, lessonId) : undefined;

  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!found) return (
    <div className="p-8 text-center text-muted-foreground">
      Lesson not found.{' '}<Link to="/app/courses" className="text-primary">Back</Link>
    </div>
  );

  const { lesson, course } = found;
  const total = lesson.exercises.length;
  const ex = lesson.exercises[idx];
  const progress = ((idx + (finished ? 1 : 0)) / total) * 100;

  const onAnswer = (isCorrect: boolean) => {
    if (isCorrect) setCorrect(c => c + 1);
    if (idx + 1 >= total) {
      completeLesson(lesson.id, lesson.xp);
      setFinished(true);
    } else {
      setIdx(i => i + 1);
    }
  };

  if (finished) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="h-24 w-24 rounded-full bg-gradient-saffron grid place-items-center text-primary-foreground shadow-elevated text-4xl">🎉</div>
        <h2 className="font-display text-3xl mt-5">Lesson complete!</h2>
        <p className="text-sm text-muted-foreground mt-2">You got {correct} of {total} correct.</p>
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 text-accent">
          <Star className="h-4 w-4 fill-current" /> +{lesson.xp} XP
        </div>
        <div className="mt-8 w-full max-w-xs space-y-2">
          <Button className="w-full rounded-full h-12" onClick={() => nav(`/app/courses/${course.id}`)}>Back to course</Button>
          <Button variant="outline" className="w-full rounded-full h-12" onClick={() => { setIdx(0); setCorrect(0); setFinished(false); }}>
            Practice again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="px-3 py-3 flex items-center gap-3 border-b border-border/50">
        <button onClick={() => nav(-1)} className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted">
          <X className="h-4 w-4" />
        </button>
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-[11px] text-muted-foreground font-medium">{idx + 1}/{total}</span>
      </header>

      <ExerciseView ex={ex} onAnswer={onAnswer} key={ex.id} />
    </div>
  );
};

export default Lesson;
