'use client';

import { HeaderContainer, HeaderRightContainer, HeaderTitle, NoneBox } from './MainHeader.style';
import Webee from '@/assets/icons/webee_36.svg';
import Alert from '@/assets/icons/alert_36.svg';

const MainHeader = ({ user }: { user: boolean }) => {
  return (
    <HeaderContainer>
      <NoneBox $user={user} />
      <HeaderTitle>우리금융그룹</HeaderTitle>
      <HeaderRightContainer>
        {user && <Alert />}
        <Webee />
      </HeaderRightContainer>
    </HeaderContainer>
  );
};

export default MainHeader;
