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
    <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex justify-center px-4">
      <nav
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-border/60 bg-card/80 px-2 py-2 shadow-elevated backdrop-blur-xl supports-[backdrop-filter]:bg-card/60"
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
                'group relative grid h-11 place-items-center rounded-full transition-all duration-300',
                isActive ? 'w-24 bg-primary text-primary-foreground shadow-soft' : 'w-11 text-muted-foreground hover:text-foreground hover:bg-muted/60'
              )}
            >
              <span className="flex items-center gap-1.5 px-3">
                <Icon className={cn('h-[18px] w-[18px] transition-transform', isActive && 'scale-110')} />
                <span
                  className={cn(
                    'overflow-hidden text-[11px] font-medium tracking-wide transition-all',
                    isActive ? 'max-w-[80px] opacity-100' : 'max-w-0 opacity-0'
                  )}
                >
                  {label}
                </span>
              </span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
