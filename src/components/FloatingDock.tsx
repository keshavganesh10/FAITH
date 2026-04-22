import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { to: '/app', label: 'Home', icon: Home, end: true },
  { to: '/app/scriptures', label: 'Scriptures', icon: BookOpen },
  { to: '/app/community', label: 'Community', icon: Users },
  { to: '/app/market', label: 'Market', icon: ShoppingBag },
  { to: '/app/profile', label: 'Profile', icon: User },
];

export const FloatingDock = () => {
  const loc = useLocation();
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-2 z-30 flex justify-center px-2">
      <nav
        className="pointer-events-auto flex w-full items-center justify-between gap-1 rounded-2xl border border-border/60 bg-card/80 px-2 py-1.5 shadow-elevated backdrop-blur-xl supports-[backdrop-filter]:bg-card/60"
        aria-label="Primary"
      >
        {tabs.map(({ to, label, icon: Icon, end }) => {
          const isActive = end ? loc.pathname === to : loc.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              end={end}
              aria-label={label}
              className={cn(
                'group relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 transition-all duration-300',
                isActive ? 'bg-primary text-primary-foreground shadow-soft' : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              )}
            >
              <Icon className={cn('h-[18px] w-[18px] transition-transform', isActive && 'scale-110')} />
              <span className="text-[10px] font-medium tracking-wide leading-none">{label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
