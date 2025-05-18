'use client';

import Image from 'next/image';
import {
  ButtonContainer,
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
import Button from '@/components/Button/Button';

const IntroduceHome = ({ user }: { user: boolean }) => {
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
      <ButtonContainer>
        <Button size="XL" text="대출 신청하기" varient="PRIMARY" />
      </ButtonContainer>
    </Wrapper>
  );
};

export default IntroduceHome;
