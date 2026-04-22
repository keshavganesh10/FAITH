import { ReactNode } from 'react';

/** Phone-frame mobile shell: centers a max-w device on desktop, full-bleed on mobile. */
export const MobileShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen w-full bg-gradient-sky flex items-stretch justify-center md:p-6">
    <div className="relative w-full max-w-[440px] bg-background md:rounded-[2.5rem] md:shadow-elevated overflow-hidden flex flex-col min-h-screen md:min-h-[860px] md:max-h-[920px]">
      {children}
    </div>
  </div>
);
