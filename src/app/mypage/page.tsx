'use client';

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import {
  Wrapper,
  MainContainer,
  SubContainer,
  SubTitle,
  TableItem,
  TableItemKey,
  TableItemValue
} from "@/app/mypage/page.style";
import Banner from "@/components/Banner/Banner";
import Header from "@/components/Header/Header";
import {
  Container,
} from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';
import { useInitUser } from "@/hooks/useInitUser";
import type { User } from "@/stores/userStore";
import { useUserStore } from "@/stores/userStore";

const MyPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!token) {
      router.replace('/not-found');
    }
  }, [router]);

  useInitUser();
  const user: User | null = useUserStore((state) => state.user);

  return (
    <Wrapper>
      <Header type="마이페이지" backIcon={true} />

      <Container>
        <MainContainer>
          <SubContainer>
            <SubTitle>개인 정보</SubTitle>

            <TableItem>
              <TableItemKey>이름</TableItemKey>
              <TableItemValue>
                {user?.name}
              </TableItemValue>
            </TableItem>
            <TableItem>
              <TableItemKey>이메일</TableItemKey>
              <TableItemValue>
                {user?.email}
              </TableItemValue>
            </TableItem>
          </SubContainer>

          <SubContainer>
            <SubTitle>소비 성향</SubTitle>
            <Banner type={user?.consumptionType} />
          </SubContainer>
        </MainContainer>

      </Container>
    </Wrapper>
  )
};

export default MyPage;
