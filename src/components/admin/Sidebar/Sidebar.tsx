import { usePathname, useRouter } from 'next/navigation';

import ProfileIcon from '@/assets/icons/profile_24.svg';
import { useInitUser } from '@/hooks/useInitUser';
import { useUserStore } from '@/stores/userStore';

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
  useInitUser();
  const user = useUserStore((state) => state.user);

  const pathname = usePathname();
  const router = useRouter();

  return (
    <SidebarWrapper>
      <SidebarInner>
        <ProfileBox>
          <ProfileIcon width={28} height={28} />
          <ProfileGreeting>
            {user ? (
              <>
                <ProfileName>{user?.name}</ProfileName> 님, 반가워요!
              </>
            ) : (
              <ProfileName></ProfileName>
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
