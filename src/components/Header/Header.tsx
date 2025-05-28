'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { logoutUser } from '@/apis/auth';

import { HeaderContainer, HeaderRightContainer, HeaderTitle, None } from './Header.style';

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
  isLoggedIn?: boolean;
  hasLoan?: boolean;
}

const Header = ({ type, backIcon = false, isLoggedIn = false }: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleLogout = async () => {
  try {
    await logoutUser();
    router.replace('/auth/login');
  } catch (error) {
    console.error('로그아웃 실패:', error);
    alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
  }
};

  const renderRightIcons = () => {
    if (type === '우리금융그룹' && isLoggedIn) {
      return (
        <HeaderRightContainer>
          <Image src="/icons/alert_36.svg" width={36} height={36} alt="알림" />
          <Image src="/icons/webee_36.svg" width={36} height={36} alt="마이페이지" />
        </HeaderRightContainer>
      );
    }

    if (type === '알림함' && isLoggedIn) {
      return (
        <HeaderRightContainer>
          <Image src="/icons/webee_36.svg" width={36} height={36} alt="마이페이지" />
        </HeaderRightContainer>
      );
    }

    if (type === '마이페이지') {
      return (
      <HeaderRightContainer>
        <Image
          src="/icons/logout.svg"
          width={36}
          height={36}
          alt="로그아웃"
          onClick={handleLogout}
          style={{ cursor: 'pointer' }}
        />
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
