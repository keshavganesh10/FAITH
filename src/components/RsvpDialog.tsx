import { useState } from 'react';
import { Calendar, MapPin, Minus, Plus, Users, Bell } from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { CommunityEvent } from '@/data/community';
import { toast } from 'sonner';

interface Props {
  event: CommunityEvent | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onConfirm: (guests: number, remind: boolean) => void;
  going: boolean;
  onCancel: () => void;
}

export const RsvpDialog = ({ event, open, onOpenChange, onConfirm, going, onCancel }: Props) => {
  const [guests, setGuests] = useState(1);
  const [remind, setRemind] = useState(true);
  if (!event) return null;
  const d = new Date(event.date);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl max-w-[380px] p-0 overflow-hidden">
        <div className="bg-gradient-dawn px-6 pt-6 pb-5 text-primary-foreground">
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">{event.type}</p>
          <DialogHeader className="space-y-1 mt-1 text-left">
            <DialogTitle className="font-display text-2xl leading-tight">{event.title}</DialogTitle>
            <DialogDescription className="text-primary-foreground/85 text-xs">
              {event.host}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-3 flex flex-wrap gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />
              {d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })} · {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{event.venue}</span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {going ? (
            <div className="rounded-2xl bg-primary/5 border border-primary/15 p-4 text-center">
              <p className="font-display text-lg text-foreground">You're going ✓</p>
              <p className="text-xs text-muted-foreground mt-1">We'll send a gentle reminder before it begins.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between rounded-2xl border border-border p-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Attending</p>
                    <p className="text-[11px] text-muted-foreground">Including yourself</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setGuests(g => Math.max(1, g - 1))}
                    className="h-8 w-8 grid place-items-center rounded-full border border-border hover:bg-muted"
                    aria-label="Fewer"
                  ><Minus className="h-3.5 w-3.5" /></button>
                  <span className="font-display text-lg w-8 text-center">{guests}</span>
                  <button
                    onClick={() => setGuests(g => Math.min(8, g + 1))}
                    className="h-8 w-8 grid place-items-center rounded-full border border-border hover:bg-muted"
                    aria-label="More"
                  ><Plus className="h-3.5 w-3.5" /></button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-border p-3">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Remind me</p>
                    <p className="text-[11px] text-muted-foreground">1 hour before it starts</p>
                  </div>
                </div>
                <Switch checked={remind} onCheckedChange={setRemind} />
              </div>
            </>
          )}
        </div>

        <DialogFooter className="px-5 pb-5 pt-0 sm:justify-stretch gap-2">
          {going ? (
            <Button
              variant="outline"
              className="w-full rounded-full"
              onClick={() => { onCancel(); onOpenChange(false); toast('RSVP cancelled'); }}
            >Cancel RSVP</Button>
          ) : (
            <Button
              className="w-full rounded-full"
              onClick={() => {
                onConfirm(guests, remind);
                onOpenChange(false);
                toast.success(`You're going! ${guests > 1 ? `(${guests} attending)` : ''}`);
              }}
            >Confirm RSVP</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
