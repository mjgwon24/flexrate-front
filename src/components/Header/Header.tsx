'use client';

import Image from 'next/image';
import {useRouter} from 'next/navigation';

import NotificationBadge from '@/components/NotificationBadge/NotificationBadge';
import {useUnreadNotificationCount} from '@/hooks/useUnreadNotificationCount';

import {HeaderContainer, HeaderRightContainer, HeaderTitle, None} from './Header.style';

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

const Header = ({type, backIcon = false, isLoggedIn = false}: HeaderProps) => {
    const router = useRouter();
    const {unreadCount} = useUnreadNotificationCount();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
    };

    const notifications = () => router.push('/notifications');
    const mypage = () => router.push('/mypage');

    const renderRightIcons = () => {
        if (type === '우리금융그룹' && isLoggedIn) {
            return (
                <HeaderRightContainer>
                    <NotificationBadge
                        unreadCount={unreadCount}
                        onClick={notifications}
                        showCount={true} // 숫자 표시
                    />
                    <Image
                        src="/icons/webee_36.svg"
                        width={36}
                        height={36}
                        alt="마이페이지"
                        onClick={mypage}
                    />
                </HeaderRightContainer>
            );
        }

        if (type === '알림함' && isLoggedIn) {
            return (
                <HeaderRightContainer>
                    <Image
                        src="/icons/webee_36.svg"
                        width={36}
                        height={36}
                        alt="마이페이지"
                        onClick={mypage}
                    />
                </HeaderRightContainer>
            );
        }

        return <None/>;
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
                <None/>
            )}
            <HeaderTitle>{type}</HeaderTitle>
            {renderRightIcons()}
        </HeaderContainer>
    );
};

export default Header;
