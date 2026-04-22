import { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, BadgeCheck, Calendar } from 'lucide-react';
import { ACCOUNTS } from '@/data/accounts';
import { EVENTS } from '@/data/community';
import { Button } from '@/components/ui/button';

const AuthorProfile = () => {
  const { handle } = useParams();
  const nav = useNavigate();
  const decoded = handle ? decodeURIComponent(handle) : '';
  const acct = ACCOUNTS[decoded];

  const posts = useMemo(
    () => EVENTS.filter(e => e.handle === decoded),
    [decoded]
  );

  if (!acct) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm">Account not found.</p>
        <Link to="/app/community" className="text-primary text-sm">Back to community</Link>
      </div>
    );
  }

  return (
    <div className="pb-6">
      <header className="px-4 pt-5 pb-2 flex items-center justify-between">
        <button onClick={() => nav(-1)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="font-display text-base">{acct.handle}</p>
        <div className="w-10" />
      </header>

      <div className="px-5 pt-2 flex items-center gap-4">
        <img src={acct.avatar} alt="" className="h-20 w-20 rounded-full object-cover border-2 border-card shadow-soft" />
        <div className="flex-1 grid grid-cols-3 gap-2 text-center">
          <div><p className="font-display text-lg leading-none">{posts.length}</p><p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Posts</p></div>
          <div><p className="font-display text-lg leading-none">{acct.followers.toLocaleString()}</p><p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Followers</p></div>
          <div><p className="font-display text-lg leading-none">{Math.floor(acct.followers / 18)}</p><p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Following</p></div>
        </div>
      </div>

      <div className="px-5 mt-3">
        <div className="flex items-center gap-1.5">
          <p className="font-semibold text-sm">{acct.name}</p>
          {acct.verified && <BadgeCheck className="h-4 w-4 text-primary" fill="currentColor" stroke="hsl(var(--card))" />}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{acct.city}</p>
        <p className="text-[13px] text-foreground mt-2 leading-snug">{acct.bio}</p>

        <div className="flex gap-2 mt-3">
          <Button size="sm" className="flex-1 rounded-full h-9">Follow</Button>
          <Button size="sm" variant="outline" className="flex-1 rounded-full h-9">Message</Button>
        </div>
      </div>

      {/* Posts grid */}
      <div className="mt-5 px-1">
        <div className="px-4 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Posts</div>
        {posts.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-12">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-0.5">
            {posts.map(p => (
              <Link key={p.id} to="/app/community" className="relative aspect-square bg-muted overflow-hidden">
                <img src={p.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute bottom-1 left-1 right-1 text-white text-[9px] font-semibold drop-shadow flex items-center gap-1">
                  <Calendar className="h-2.5 w-2.5" />{new Date(p.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorProfile;
