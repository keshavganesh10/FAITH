import { Outlet } from 'react-router-dom';
import { MobileShell } from '@/components/MobileShell';
import { TabBar } from '@/components/TabBar';

const AppLayout = () => (
  <MobileShell>
    <main className="flex-1 overflow-y-auto pb-2">
      <Outlet />
    </main>
    <TabBar />
  </MobileShell>
);

export default AppLayout;
