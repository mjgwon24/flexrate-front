import type { Metadata } from 'next';

import '@/app/globals.css';
import GlobalStyleProvider from '@/components/GlobalStyleProvider/GlobalStyleProvider';

export const metadata: Metadata = {
  title: 'FlexRate',
  description: '라이프스타일을 통해 평가받는 신용대출, FlexRate',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body>
        <GlobalStyleProvider>{children}</GlobalStyleProvider>
      </body>
    </html>
  );
};

export default RootLayout;
