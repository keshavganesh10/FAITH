import { ReactNode } from 'react';

/** Phone-frame mobile shell: centers a max-w device on desktop, full-bleed on mobile. */
export const MobileShell = ({ children }: { children: ReactNode }) => (
  <div className="h-screen w-full bg-gradient-sky flex items-stretch justify-center overflow-hidden md:p-4">
    <div className="relative w-full max-w-[420px] bg-background md:rounded-[2.25rem] md:shadow-elevated overflow-hidden flex flex-col h-full md:h-[760px] md:max-h-[calc(100vh-2rem)]">
      {children}
    </div>
  </div>
);
