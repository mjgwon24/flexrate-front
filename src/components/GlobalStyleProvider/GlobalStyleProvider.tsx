'use client';

import { usePathname } from 'next/navigation';

import DesktopGlobalStyle from '@/styles/DesktopGlobalStyle/DesktopGlobalStyle';
import MobileGlobalStyle from '@/styles/MobileGlobalStyle/MobileGlobalStyle';
import { AppContainer, InnerContainer } from '@/styles/MobileGlobalStyle/MobileGlobalStyle.style';

const GlobalStyleProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <>
        <DesktopGlobalStyle />
        {children}
      </>
    );
  }

  return (
    <>
      <MobileGlobalStyle />
      <AppContainer>
        <InnerContainer>{children}</InnerContainer>
      </AppContainer>
    </>
  );
};

export default GlobalStyleProvider;
