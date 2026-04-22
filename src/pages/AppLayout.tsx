import { Outlet } from 'react-router-dom';
import { MobileShell } from '@/components/MobileShell';
import { FloatingDock } from '@/components/FloatingDock';

const AppLayout = () => (
  <MobileShell>
    <main className="flex-1 overflow-y-auto pb-20">
      <Outlet />
    </main>
    <FloatingDock />
  </MobileShell>
);

export default AppLayout;
