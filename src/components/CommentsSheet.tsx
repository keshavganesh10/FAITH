import { useState, useMemo } from 'react';
import { Heart, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CommunityEvent, Comment } from '@/data/community';
import { ACCOUNTS } from '@/data/accounts';
import { useAccount } from '@/state/account';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Props {
  event: CommunityEvent | null;
  open: boolean;
  onOpenChange: (b: boolean) => void;
}

export const CommentsSheet = ({ event, open, onOpenChange }: Props) => {
  const nav = useNavigate();
  const { account, comments: extra, likedComments, addComment, toggleCommentLike } = useAccount();
  const [text, setText] = useState('');

  const all: Comment[] = useMemo(() => {
    if (!event) return [];
    return [...event.comments, ...(extra[event.id] ?? [])];
  }, [event, extra]);

  if (!event) return null;

  const submit = () => {
    if (!account) {
      onOpenChange(false);
      nav('/signup');
      return;
    }
    if (!text.trim()) return;
    addComment(event.id, text);
    setText('');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-3xl flex flex-col">
        <SheetHeader className="px-5 pt-3 pb-2 border-b border-border">
          <div className="mx-auto h-1 w-10 rounded-full bg-muted mb-2" />
          <SheetTitle className="text-center text-base font-display">Comments</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {all.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-12">
              No comments yet. Be the first to share a thought.
            </p>
          )}
          {all.map((c, i) => {
            const acct = ACCOUNTS[c.handle];
            const key = `${event.id}:${i}`;
            const liked = likedComments.includes(key);
            const likeCount = (c.likes ?? 0) + (liked ? 1 : 0);
            return (
              <div key={i} className="flex gap-2.5">
                <button
                  onClick={() => acct && nav(`/app/community/u/${encodeURIComponent(acct.handle)}`)}
                  className="shrink-0"
                >
                  {acct ? (
                    <img src={acct.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-muted grid place-items-center text-[10px] font-semibold text-muted-foreground">
                      {c.user.charAt(0)}
                    </div>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] leading-snug">
                    <button
                      onClick={() => acct && nav(`/app/community/u/${encodeURIComponent(acct.handle)}`)}
                      className="font-semibold mr-1.5 hover:underline"
                    >
                      {c.handle}
                    </button>
                    <span>{c.text}</span>
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">2h</p>
                    <button className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground">Reply</button>
                    {likeCount > 0 && <p className="text-[10px] text-muted-foreground">{likeCount} likes</p>}
                  </div>
                </div>
                <button onClick={() => toggleCommentLike(key)} className="shrink-0 p-1 -mr-1">
                  <Heart className={cn('h-3.5 w-3.5 transition-all', liked ? 'fill-destructive text-destructive' : 'text-muted-foreground')} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="border-t border-border p-3 flex items-center gap-2 bg-card">
          {account ? (
            <img src={account.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
          ) : (
            <div className="h-7 w-7 rounded-full bg-muted grid place-items-center text-[10px] text-muted-foreground">?</div>
          )}
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder={account ? 'Add a comment…' : 'Sign in to comment'}
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={submit}
            className={cn(
              'text-sm font-semibold transition-colors',
              text.trim() && account ? 'text-primary' : 'text-primary/40'
            )}
          >
            {account ? 'Post' : 'Sign in'}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
