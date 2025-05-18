'use client';

import {
  MainContainer, SubContainer,
  SubTitle,
  TableItem,
  TableItemKey,
  TableItemValue
} from "@/app/mypage/page.style";
import Banner from "@/components/Banner/Banner";
import Header from "@/components/Header/Header";
import {
  Container,
  Wrapper,
} from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';

const MyPage = () => {
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
                권민지
              </TableItemValue>
            </TableItem>
            <TableItem>
              <TableItemKey>이메일</TableItemKey>
              <TableItemValue>
                gmail.com
              </TableItemValue>
            </TableItem>
          </SubContainer>

          <SubContainer>
            <SubTitle>소비 성향</SubTitle>
            <Banner type={'SAVING'} />
          </SubContainer>
        </MainContainer>

      </Container>
    </Wrapper>
  )
};

export default MyPage;
