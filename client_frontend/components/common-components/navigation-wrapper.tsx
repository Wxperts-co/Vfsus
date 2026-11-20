'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/common-components/navbar';
import Footer from '@/components/common-components/footer';

interface NavigationWrapperProps {
  children: React.ReactNode;
}

export default function NavigationWrapper({ children }: NavigationWrapperProps) {
  const pathname = usePathname();

  // Prevent duplicate/rapid clicks on tel: links (which causes "repeatedly trying to open another application" on iOS Chrome)
  useEffect(() => {
    let lastTelClick = 0;
    const handleTelClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="tel:"]');
      if (target) {
        const now = Date.now();
        if (now - lastTelClick < 2000) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        lastTelClick = now;
      }
    };

    document.addEventListener('click', handleTelClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleTelClick, { capture: true });
    };
  }, []);
  
  // Hide Navbar and Footer on all admin routes
  const isAdminRoute = pathname ? pathname.startsWith('/admin') : false;

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
