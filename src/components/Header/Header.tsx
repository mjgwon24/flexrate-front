'use client';

import Image from 'next/image';
import { HeaderContainer, HeaderRightContainer, HeaderTitle, None } from './Header.style';
import { useRouter } from 'next/navigation';

type HeaderType =
  | '신용 점수 평가'
  | '대출 신청'
  | '알림함'
  | '우리금융그룹'
  | '소비 습관 리포트'
  | '마이페이지'
  | '내 정보 변경';

interface HeaderProps {
  type?: HeaderType;
  backIcon?: boolean;
  user?: boolean;
}

const Header = ({ type = '대출 신청', backIcon = false, user = false }: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const renderRightIcons = () => {
    if (type === '우리금융그룹' && user) {
      return (
        <HeaderRightContainer>
          <Image src="/icons/alert_36.svg" width={36} height={36} alt="알림" />
          <Image src="/icons/mypage_36.svg" width={36} height={36} alt="마이페이지" />
        </HeaderRightContainer>
      );
    }

    if (type === '알림함' && user) {
      return (
        <HeaderRightContainer>
          <Image src="/icons/mypage_36.svg" width={36} height={36} alt="마이페이지" />
        </HeaderRightContainer>
      );
    }

    return <None />;
  };

  return (
    <HeaderContainer>
      {backIcon ? (
        <Image
          src="/icons/backArrow_36.svg"
          width={36}
          height={36}
          alt="뒤로가기"
          onClick={handleBack}
        />
      ) : (
        <None />
      )}
      <HeaderTitle>{type}</HeaderTitle>
      {renderRightIcons()}
    </HeaderContainer>
  );
};

export default Header;
