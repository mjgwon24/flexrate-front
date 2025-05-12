import type { Metadata } from 'next';
import '@/app/globals.css';
import GlobalStyleProvider from '@/components/GlobalStyleProvider/GlobalStyleProvider';
import { AppContainer } from '@/styles/MobileGlobalStyle/MobileGlobalStyle.style';

export const metadata: Metadata = {
  title: 'FlexRate',
  description: '라이프스타일을 통해 평가받는 신용대출, FlexRate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <GlobalStyleProvider />
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
}
