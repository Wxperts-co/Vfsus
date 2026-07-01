'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/common-components/navbar';
import Footer from '@/components/common-components/footer';

interface NavigationWrapperProps {
  children: React.ReactNode;
}

export default function NavigationWrapper({ children }: NavigationWrapperProps) {
  const pathname = usePathname();
  
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
