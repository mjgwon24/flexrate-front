import Banner from '@/components/Banner/Banner';
import {
  BgContainer,
  Body2,
  Body3,
  Card,
  CardContentContainer,
  CardFlexContainer,
  CardTitle,
  Description,
  FlexContainer,
  MainTitleContainer,
  PercentageText,
  ProductTitle,
  SmallTag,
  SmallTitle,
  SubTitle,
  Tags,
  Title2,
  UserProductContainer,
  UserProductContentContainer,
  Wrapper,
} from './FirstPage.style';
import AreaChart from '@/components/AreaChart/AreaChart';
import Image from 'next/image';

const FirstPage = () => {
  return (
    <Wrapper>
      <BgContainer color="white">
        <MainTitleContainer>
          <Title2>서채연님,</Title2>
          <Body2>
            현재 <Body3>300만원</Body3> 대출 상품을 이용 중입니다.
          </Body2>
        </MainTitleContainer>
        <UserProductContainer>
          <ProductTitle>나의 대출 상품</ProductTitle>
          <UserProductContentContainer>
            <Title2 isStrong={true}>
              Flex rate<Title2>신용대출</Title2>
            </Title2>
            <Tags>
              <SmallTag>1년</SmallTag>
              <SmallTag>300만원</SmallTag>
            </Tags>
          </UserProductContentContainer>
        </UserProductContainer>
      </BgContainer>
      <BgContainer color="gray">
        <Banner type="CONSERVATIVE" borderNone={true} />
        <AreaChart />
        <CardFlexContainer>
          <Card>
            <CardTitle>
              12<SmallTitle>%</SmallTitle>
            </CardTitle>
            <CardContentContainer>
              <SubTitle>오늘의 대출금리</SubTitle>
              <FlexContainer>
                <Description type="sub2">어제 대비</Description>
                <Image src={'/icons/greenUpArrow.svg'} alt="위 화살표" width={18} height={18} />
                <PercentageText>3%</PercentageText>
              </FlexContainer>
            </CardContentContainer>
          </Card>
          <Card>
            <CardTitle>
              640<SmallTitle>점</SmallTitle>
            </CardTitle>
            <CardContentContainer>
              <SubTitle>신용 평가 점수</SubTitle>
              <Description type="sub2">평가 다시 받기 -&gt;</Description>
            </CardContentContainer>
          </Card>
        </CardFlexContainer>
      </BgContainer>
    </Wrapper>
  );
};

export default FirstPage;
