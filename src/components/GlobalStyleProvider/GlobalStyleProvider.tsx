'use client';

import { usePathname } from 'next/navigation';

import DesktopGlobalStyle from '@/styles/DesktopGlobalStyle/DesktopGlobalStyle';
import MobileGlobalStyle from '@/styles/MobileGlobalStyle/MobileGlobalStyle';

const GlobalStyleProvider = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return isAdmin ? (
    <DesktopGlobalStyle />
  ) : (
    <>
      <MobileGlobalStyle />
    </>
  );
};

export default GlobalStyleProvider;
