'use client';

import styled from '@emotion/styled';

import Header from '@/components/Header/Header';
import IntroduceHome from '@/components/main/IntroduceHome/IntroduceHome';
import TabBar from '@/components/main/TabBar/TabBar';
import MainHasLoan from '@/components/MainHasLoan/MainHasLoan';

const Home = () => {
  // 회원 여부 확인
  const user = true;
  const hasLoan = true;

  return (
    <Container>
      <Header type="우리금융그룹" user={user} hasLoan={hasLoan} />
      <TabBar />
      {user && hasLoan ? <MainHasLoan /> : <IntroduceHome />}
    </Container>
  );
};

export default Home;

const Container = styled.div`
  height: 94vh;
  overflow-y: auto;
`;
