import { useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import ProfileIcon from '@/assets/icons/profile_24.svg';

import {
  SidebarWrapper,
  SidebarInner,
  ProfileBox,
  ProfileName,
  ProfileGreeting,
  SidebarHr,
  MenuSection,
  MenuSectionTitle,
  MenuItemWrapper,
  MenuItem,
  SelectedBar,
  MenuSectionWrapper,
} from './Sidebar.style';

/**
 * 관리자 페이지 메뉴 타입
 */
type MenuItemType = {
  label: string;
  path: string;
  match: (pathname: string) => boolean;
};

type MenuSectionType = {
  sectionTitle: string;
  items: MenuItemType[];
};

/**
 * 관리자 페이지 메뉴 섹션
 */
const menuSections: MenuSectionType[] = [
  {
    sectionTitle: '관리',
    items: [
      {
        label: '고객 관리',
        path: '/admin/customer-management',
        match: (pathname: string) => pathname.startsWith('/admin/customer-management'),
      },
    ],
  },
  {
    sectionTitle: '대출',
    items: [
      {
        label: '대출 신청 현황',
        path: '/admin/loan-application',
        match: (pathname: string) => pathname === '/admin/loan-application',
      },
    ],
  },
];

const Sidebar = () => {
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError('인증 정보가 없습니다.');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:8080/api/members/mypage', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('사용자 정보를 불러오지 못했습니다.');
        }

        const data = await response.json();
        setUserName(data.name);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || '알 수 없는 오류');
        } else {
          setError('알 수 없는 오류');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  return (
    <SidebarWrapper>
      <SidebarInner>
        <ProfileBox>
          <ProfileIcon width={28} height={28} />
          <ProfileGreeting>
            {loading ? (
              <p></p>
            ) : error ? (
              <p>error</p>
            ) : (
              <>
                <ProfileName>{userName}</ProfileName> 님, 반가워요!
              </>
            )}
          </ProfileGreeting>
        </ProfileBox>
        <SidebarHr />

        <MenuSectionWrapper>
          {menuSections.map((section) => (
            <MenuSection key={section.sectionTitle}>
              <MenuSectionTitle>{section.sectionTitle}</MenuSectionTitle>
              {section.items.map((item) => {
                const selected = item.match(pathname);
                return (
                  <MenuItemWrapper key={item.label}>
                    {selected && <SelectedBar />}
                    <MenuItem selected={selected} onClick={() => router.push(item.path)}>
                      {item.label}
                    </MenuItem>
                  </MenuItemWrapper>
                );
              })}
            </MenuSection>
          ))}
        </MenuSectionWrapper>
      </SidebarInner>
    </SidebarWrapper>
  );
};

export default Sidebar;
