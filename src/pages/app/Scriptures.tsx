import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRight, Bookmark, Headphones, Clock, Sparkles, Flame, GraduationCap, Trophy } from 'lucide-react';
import { useUser } from '@/state/user';
import { SCRIPTURES, COLLECTIONS, READING_PLANS, VERSE_OF_DAY } from '@/data/scriptures';
import { COURSES, lessonCount } from '@/data/courses';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Scriptures = () => {
  const { bookmarks, readingStreak, completedLessons, xp } = useUser();
  const [tab, setTab] = useState('library');

  return (
    <div className="pb-6">
      <header className="px-5 pt-6 pb-3">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Library</p>
        <h1 className="font-display text-3xl text-foreground mt-0.5 leading-none">Sacred Texts</h1>
        <p className="text-xs text-muted-foreground mt-1.5">Gita, Upanishads, Vedas — translated, searchable, ad-free.</p>
      </header>

      {/* Verse of the day */}
      <section className="px-5 mb-3">
        <Link to={`/app/scriptures/${VERSE_OF_DAY.id}`}>
          <Card className="bg-gradient-dawn text-primary-foreground p-4 shadow-soft border-0 relative overflow-hidden">
            <div className="absolute inset-0 texture-paper opacity-20" />
            <div className="relative">
              <p className="text-[9px] tracking-[0.3em] uppercase opacity-80 inline-flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5" /> Verse of the day
              </p>
              {VERSE_OF_DAY.sanskrit && (
                <p className="font-display text-sm mt-1.5 opacity-90">{VERSE_OF_DAY.sanskrit}</p>
              )}
              <p className="font-display text-base mt-1 leading-snug line-clamp-2">"{VERSE_OF_DAY.text.split('.')[0]}."</p>
              <p className="text-[10px] opacity-85 mt-1.5">{VERSE_OF_DAY.reference}</p>
            </div>
          </Card>
        </Link>
      </section>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="px-5">
          <TabsList className="w-full">
            <TabsTrigger value="library" className="flex-1">Library</TabsTrigger>
            <TabsTrigger value="study" className="flex-1">Study</TabsTrigger>
            <TabsTrigger value="courses" className="flex-1">Courses</TabsTrigger>
          </TabsList>
        </div>

        {/* LIBRARY: books only */}
        <TabsContent value="library" className="mt-3">
          <section className="px-5 space-y-2.5">
            {SCRIPTURES.map(book => (
              <Card key={book.id} className="overflow-hidden">
                <div className="px-4 py-2.5 border-b border-border/60">
                  <p className="font-display text-base">{book.title}</p>
                  {book.subtitle && <p className="text-[10.5px] text-muted-foreground italic">{book.subtitle}</p>}
                </div>
                <ul>
                  {book.passages.map(p => (
                    <li key={p.id}>
                      <Link to={`/app/scriptures/${p.id}`} className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-muted/50 transition-colors">
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium truncate">{p.title}</p>
                          <p className="text-[10.5px] text-muted-foreground inline-flex items-center gap-2">
                            <span>{p.reference}</span>
                            {p.duration && <span className="inline-flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" />{p.duration}m</span>}
                            {p.audio && <Headphones className="h-2.5 w-2.5" />}
                          </p>
                        </div>
                        {bookmarks.includes(p.id) && <Bookmark className="h-3.5 w-3.5 text-accent fill-accent" />}
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </section>
        </TabsContent>

        {/* STUDY: streak + plans + collections */}
        <TabsContent value="study" className="mt-3 space-y-4">
          <section className="px-5">
            <Link to="/app/scriptures/streak">
              <Card className="p-3 flex items-center gap-3 shadow-soft hover:shadow-elevated transition-shadow">
                <div className="h-10 w-10 rounded-xl bg-gradient-saffron grid place-items-center text-primary-foreground">
                  <Flame className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{readingStreak}-day reading streak</p>
                  <p className="text-[11px] text-muted-foreground">Read 1 passage today to keep it going.</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Card>
            </Link>
          </section>

          <section>
            <p className="px-5 text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Reading plans</p>
            <div className="px-5 flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
              {READING_PLANS.map(p => (
                <Link key={p.id} to={`/app/scriptures/plan/${p.id}`}>
                  <Card className="shrink-0 w-44 p-3.5 hover:shadow-soft transition-shadow">
                    <p className="text-[9px] uppercase tracking-widest text-accent font-semibold">{p.days} days</p>
                    <p className="font-display text-sm leading-tight mt-1">{p.title}</p>
                    <p className="text-[10.5px] text-muted-foreground mt-1 leading-snug line-clamp-2">{p.description}</p>
                    <p className="text-[10px] text-muted-foreground mt-2 inline-flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" /> {p.daily} min/day
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="px-5">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Collections</p>
            <div className="grid grid-cols-2 gap-2">
              {COLLECTIONS.map(c => (
                <Link key={c.id} to={`/app/scriptures/collection/${c.id}`}>
                  <Card className="relative overflow-hidden p-3 h-24 border-0 text-primary-foreground"
                    style={{ background: `linear-gradient(135deg, hsl(${c.hue} 60% 42%), hsl(${(c.hue + 30) % 360} 55% 60%))` }}>
                    <p className="font-display text-sm leading-tight relative">{c.title}</p>
                    <p className="text-[9.5px] opacity-85 mt-1 line-clamp-2 relative">{c.description}</p>
                    <p className="absolute bottom-2 right-2 text-[9px] opacity-90">{c.passageIds.length} passages →</p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </TabsContent>

        {/* COURSES: Duolingo style */}
        <TabsContent value="courses" className="mt-3">
          <div className="px-5 mb-3 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1">
              <GraduationCap className="h-3 w-3" /> Guided study
            </p>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Scriptures;
