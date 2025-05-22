'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { loanProductApi } from '@/apis/loanProducts';
import Button from '@/components/Button/Button';

import {
  BtnContainer,
  Content,
  ContentBox,
  ContentSubTextContainer,
  ContentSubTextContent,
  ContentSubTextTitle,
  ContentTitle,
  Icon3DContainer,
  IntroduceContentContainer,
  IntroduceTextContainer,
  MainImage3D,
  Spacing,
  SubTitle,
  Title,
  Wrapper,
} from './IntroduceHome.style';

const PRODUCT_ID = 1; // 일단 상품 ID 고정

const IntroduceHome = () => {
  const router = useRouter();

  const handleLoanApplyClick = async () => {
    const token = localStorage.getItem('accessToken');

    try {
      await loanProductApi.selectLoanProduct(PRODUCT_ID, token);
      router.push('/credit-evaluation');
    } catch (error: any) {
      console.error('대출 신청 에러 상세 정보:', error);

      if (!token) {
        router.push('/auth/login');
      } else if (error.response) {
        // HTTP 응답 에러 세부 정보 확인
        console.error('에러 상태 코드:', error.response.status);
        console.error('에러 데이터:', error.response.data);

        if (error.response.status === 401) {
          alert('인증에 실패했습니다. 다시 로그인해주세요.');
          localStorage.removeItem('authToken');
          router.push('/auth/login');
        } else {
          alert(
            `대출 신청 초기화에 실패했습니다: ${error.response.data.message || '알 수 없는 오류'}`
          );
        }
      } else {
        alert('대출 신청 초기화에 실패했습니다. 네트워크 연결을 확인해주세요.');
      }
    }
  };

  return (
    <Wrapper>
      <IntroduceContentContainer>
        <IntroduceTextContainer>
          <Title>FlexRate</Title>
          <SubTitle>당신의 라이프스타일로 평가받는 신용대출</SubTitle>
          <SubTitle>지금 FlexRate로 시작하세요!</SubTitle>
        </IntroduceTextContainer>
        <Icon3DContainer>
          <MainImage3D
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <Image src={'/imgs/mainImage.svg'} alt="대출 상품 이미지" width={169} height={169} />
          </MainImage3D>
        </Icon3DContainer>
        <ContentBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <Content>
            <ContentTitle>최고금리</ContentTitle>
            <ContentSubTextContainer>
              <ContentSubTextTitle>연 2.6%</ContentSubTextTitle>
              <ContentSubTextContent>(개인, 세전, 금액 구간 별 최고 기준)</ContentSubTextContent>
            </ContentSubTextContainer>
          </Content>
          <Content>
            <ContentTitle>가입기간</ContentTitle>
            <ContentSubTextTitle>1일 ~ 365일</ContentSubTextTitle>
          </Content>
          <Content>
            <ContentTitle>가입금액</ContentTitle>
            <ContentSubTextTitle>제한 없음</ContentSubTextTitle>
          </Content>
        </ContentBox>
      </IntroduceContentContainer>
      <Spacing />
      <BtnContainer>
        <Button size="XL" text="대출 신청하기" varient="PRIMARY" onClick={handleLoanApplyClick} />
      </BtnContainer>
    </Wrapper>
  );
};

export default IntroduceHome;
