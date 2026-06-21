import { Outlet } from 'react-router-dom';
import { MobileShell } from '@/components/MobileShell';
import { FloatingDock } from '@/components/FloatingDock';
import { MiniPlayer } from '@/components/MiniPlayer';
import { usePlayer } from '@/state/player';

const AppLayout = () => {
  const { current } = usePlayer();
  return (
    <MobileShell>
      <main className={current ? 'flex-1 overflow-y-auto pb-36' : 'flex-1 overflow-y-auto pb-20'}>
        <Outlet />
      </main>
      <MiniPlayer />
      <FloatingDock />
    </MobileShell>
  );
};

export default AppLayout;
