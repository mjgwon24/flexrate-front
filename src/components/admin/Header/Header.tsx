import Image from 'next/image';

import Logo from '@/assets/img/logo(green).png';

import {
  EmailBox,
  HeaderRightContainer,
  HeaderWrapper,
  HomePageButton,
  LogoContainer,
  LogoSmallText,
} from './Header.style';

const Header = () => {
  return (
    <HeaderWrapper>
      <LogoContainer>
        <Image src={Logo} alt="FlexRate Logo" width={120} height={40} />
        <LogoSmallText>Admin</LogoSmallText>
      </LogoContainer>
      <HeaderRightContainer>
        <HomePageButton>FlexRate 홈페이지</HomePageButton>
        <EmailBox>flexrate@fisa.com</EmailBox>
      </HeaderRightContainer>
    </HeaderWrapper>
  );
};

export default Header;
