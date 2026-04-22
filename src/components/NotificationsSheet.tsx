import { useState } from 'react';
import { Bell, BookOpen, CalendarHeart, ShoppingBag, Sparkles, Check } from 'lucide-react';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription,
} from '@/components/ui/sheet';
import { NOTIFICATIONS, AppNotification } from '@/data/notifications';
import { cn } from '@/lib/utils';

const ICONS = {
  practice: Sparkles,
  event: CalendarHeart,
  scripture: BookOpen,
  market: ShoppingBag,
} as const;

export const NotificationsSheet = () => {
  const [items, setItems] = useState<AppNotification[]>(NOTIFICATIONS);
  const unread = items.filter(i => i.unread).length;
  const markAll = () => setItems(items.map(i => ({ ...i, unread: false })));
  const toggle = (id: string) => setItems(items.map(i => i.id === id ? { ...i, unread: false } : i));

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="relative h-10 w-10 grid place-items-center rounded-full bg-primary-foreground/15 backdrop-blur transition-colors hover:bg-primary-foreground/25"
          aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
        >
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-primary/40" />
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="top" className="rounded-b-3xl border-x-0 border-t-0 max-h-[80vh] overflow-y-auto">
        <SheetHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <SheetTitle className="font-display text-2xl">Notifications</SheetTitle>
            <SheetDescription className="text-xs">{unread > 0 ? `${unread} unread` : 'You\'re all caught up'}</SheetDescription>
          </div>
          {unread > 0 && (
            <button onClick={markAll} className="text-[11px] font-medium text-primary inline-flex items-center gap-1">
              <Check className="h-3 w-3" /> Mark all read
            </button>
          )}
        </SheetHeader>

        <ul className="mt-4 space-y-2">
          {items.map(n => {
            const Icon = ICONS[n.kind];
            return (
              <li key={n.id}>
                <button
                  onClick={() => toggle(n.id)}
                  className={cn(
                    'w-full text-left flex gap-3 rounded-2xl border p-3 transition-colors',
                    n.unread ? 'bg-primary/5 border-primary/20' : 'bg-card border-border hover:bg-muted/50'
                  )}
                >
                  <div className={cn('h-9 w-9 shrink-0 grid place-items-center rounded-full',
                    n.unread ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground')}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-medium truncate">{n.title}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{n.body}</p>
                  </div>
                  {n.unread && <span className="h-2 w-2 rounded-full bg-accent self-center shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
