import LoanDashboard from '@/components/main/LoanDashboard/LoanDashboard';
import {
  BgContainer,
  Card,
  CardContentContainer,
  CardTitle,
  Description,
  SmallTitle,
  SubTitle,
  Wrapper,
} from '../FirstPage/FirstPage.style';
import {
  CardFlexContainer,
  DescriptionContainer,
  FlexContainer,
  GreenText,
  GridContainer,
  MediumTitle,
  MediumTitleWrapper,
} from './SecondPage.style';
import Image from 'next/image';

const SecondPage = () => {
  return (
    <Wrapper>
      <BgContainer color="white">
        <CardFlexContainer>
          <Card color="gray">
            <MediumTitleWrapper>
              <MediumTitle $isStrong={true}>
                2020<MediumTitle>년</MediumTitle>
              </MediumTitle>
              <br />
              <MediumTitle $isStrong={true}>
                12<MediumTitle>월</MediumTitle>
              </MediumTitle>
              <MediumTitle $isStrong={true}>
                10<MediumTitle>일</MediumTitle>
              </MediumTitle>
            </MediumTitleWrapper>
            <CardContentContainer>
              <SubTitle>
                이번 달<br />
                대출금 이자
              </SubTitle>
            </CardContentContainer>
          </Card>
          <Card color="gray">
            <CardTitle>
              0<SmallTitle>회차</SmallTitle>
            </CardTitle>
            <CardContentContainer>
              <SubTitle>대출금 납부 회차</SubTitle>
              <Description type="sub2">2023.09.15 오후 5시</Description>
            </CardContentContainer>
          </Card>
        </CardFlexContainer>
        <LoanDashboard />
      </BgContainer>
      <BgContainer color="gray">
        <GridContainer>
          <Card>
            <MediumTitleWrapper>
              <MediumTitle $isStrong={true}>
                2020<MediumTitle>년</MediumTitle>
              </MediumTitle>
              <br />
              <MediumTitle $isStrong={true}>
                12<MediumTitle>월</MediumTitle>
              </MediumTitle>
              <MediumTitle $isStrong={true}>
                10<MediumTitle>일</MediumTitle>
              </MediumTitle>
            </MediumTitleWrapper>
            <CardContentContainer>
              <SubTitle>대출 시작일</SubTitle>
            </CardContentContainer>
          </Card>
          <Card>
            <CardTitle>
              9<SmallTitle>회차</SmallTitle>
            </CardTitle>
            <CardContentContainer>
              <SubTitle>금리 변경 횟수</SubTitle>
            </CardContentContainer>
          </Card>
          <Card>
            <CardTitle>
              9<SmallTitle>회차</SmallTitle>
            </CardTitle>
            <CardContentContainer>
              <SubTitle>상환 횟수</SubTitle>
              <DescriptionContainer>
                <Description type="sub2">280,000원</Description>
                <Description type="sub3">2023.09.15 오후 5시</Description>
              </DescriptionContainer>
            </CardContentContainer>
          </Card>
          <Card>
            <CardTitle>
              3<SmallTitle>회차</SmallTitle>
            </CardTitle>
            <CardContentContainer>
              <SubTitle>연체 횟수</SubTitle>
              <DescriptionContainer>
                <FlexContainer>
                  <Description type="sub2">280,000원</Description>
                  <Image src={'/icons/greenUpArrow.svg'} width={18} height={18} alt="위 화살표" />
                  <GreenText>3%</GreenText>
                </FlexContainer>
                <Description type="sub2">2023.09.15 오후 5시</Description>
              </DescriptionContainer>
            </CardContentContainer>
          </Card>
        </GridContainer>
      </BgContainer>
    </Wrapper>
  );
};

export default SecondPage;
