'use client';

import DesktopGlobalStyle from '@/styles/DesktopGlobalStyle/DesktopGlobalStyle';
import MobileGlobalStyle from '@/styles/MobileGlobalStyle/MobileGlobalStyle';
import { css, Global } from '@emotion/react';
import { usePathname } from 'next/navigation';

const GlobalStyleProvider = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  console.log('GlobalStyleProvider loaded:', pathname);

  return isAdmin ? (
    <DesktopGlobalStyle />
  ) : (
    <>
      <MobileGlobalStyle />
    </>
  );
};

export default GlobalStyleProvider;
