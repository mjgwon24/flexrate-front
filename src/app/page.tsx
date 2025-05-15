import IntroduceHome from '@/components/main/IntroduceHome/IntroduceHome';
import MainHeader from '@/components/main/MainHeader/MainHeader';
import TabBar from '@/components/main/TabBar/TabBar';

const Home = () => {
  // 회원 여부 확인
  const user = false;

  return (
    <>
      <MainHeader user={user} />
      <TabBar />
      {user ? <>회원 메인 화면</> : <IntroduceHome user={user} />}
    </>
  );
};

export default Home;
