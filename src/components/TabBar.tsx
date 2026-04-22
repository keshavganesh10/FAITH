import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Users, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { to: '/app', label: 'Home', icon: Home, end: true },
  { to: '/app/scriptures', label: 'Scriptures', icon: BookOpen },
  { to: '/app/community', label: 'Community', icon: Users },
  { to: '/app/market', label: 'Market', icon: ShoppingBag },
  { to: '/app/profile', label: 'Profile', icon: User },
];

export const TabBar = () => (
  <nav className="sticky bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur-md">
    <ul className="grid grid-cols-5">
      {tabs.map(({ to, label, icon: Icon, end }) => (
        <li key={to}>
          <NavLink
            to={to}
            end={end}
            className={({ isActive }) => cn(
              'flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium tracking-wide transition-colors',
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {({ isActive }) => (
              <>
                <span className={cn('grid place-items-center h-9 w-9 rounded-full transition-all',
                  isActive && 'bg-primary/10')}>
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
