'use client';

import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button/Button';
import Header from '@/components/Header/Header';
import {
  Description,
  Title,
  Wrapper,
} from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';
import { BtnContainer } from '@/components/signup/EmailForm/EmailForm.style';
import { primitiveColor, semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';

const categoryMap: Record<string, string> = {
  FOOD: '식비',
  LIVING: '주거/생활',
  LEISURE: '여가/취미',
  TRANSPORT: '교통',
  COMMUNICATION: '통신',
  EDUCATION: '교육',
  HEALTH: '의료/건강',
  ETC: '기타',
};

const dummyStats = [
  { category: 'HEALTH', amount: 120000, percentage: 80 },
  { category: 'FOOD', amount: 90000, percentage: 60 },
  { category: 'LEISURE', amount: 30000, percentage: 20 },
  { category: 'TRANSPORT', amount: 20000, percentage: 10 },
  { category: 'COMMUNICATION', amount: 15000, percentage: 5 },
];

const getTopStats = (stats: typeof dummyStats) => {
  if (!stats || stats.length === 0) return [];
  return stats.sort((a, b) => b.percentage - a.percentage).slice(0, 3);
};

const getCircleSize = (percentage: number, max: number) => {
  const maxSize = 200;
  const minSize = 90;
  return (percentage / max) * (maxSize - minSize) + minSize;
};

const getCircleStyle = (size: number) => {
  return {
    rotate: size >= 180 ? 10 : size >= 160 ? -10 : 10,
    bgColor:
      size >= 180
        ? semanticColor.bg.primary
        : size >= 160
        ? primitiveColor.blue[100]
        : primitiveColor.blue[700],
    color:
      size >= 180 || size < 160
        ? semanticColor.text.normal.onPrimary
        : semanticColor.text.normal.accent,
    zIndex: size >= 180 ? 2 : size >= 160 ? 1 : 0,
  };
};

const circleLayouts = [
  { top: 30, left: 120 },
  { top: 160, left: 10 },
  { top: 230, left: 380 },
];

const ConsumptionReport = () => {
  const router = useRouter();
  const topStats = getTopStats(dummyStats);

  return (
    <Wrapper>
      <Header backIcon={true} type="소비 습관 리포트" />
      <Container>
        <Title>
          <TitleStrong>1월</TitleStrong> 카테고리별 소비 통계
        </Title>
        <Description>
          최근 소비 패턴을 분석해,
          <br />더 나은 금융 습관을 제안합니다
        </Description>
        <CircleWrapper>
          <CircleContainer>
            {topStats.map((stat, index) => {
              const delay = index * 0.2;
              const size = getCircleSize(stat.percentage, topStats[0].percentage);
              const { top, left } = circleLayouts[index];
              const style = getCircleStyle(size);

              return (
                <StyledCircle
                  key={stat.category}
                  size={size}
                  top={Math.min(top, 365 - size)}
                  left={Math.min(left, 332 - size)}
                  $rotate={style.rotate}
                  $zIndex={style.zIndex}
                  $bgColor={style.bgColor}
                  $color={style.color}
                  initial={{
                    y: -200,
                    opacity: 0,
                    scale: 0.95,
                    rotate: style.rotate,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 12,
                    mass: 1.7,
                    delay,
                  }}
                >
                  <Percentage>{stat.percentage}%</Percentage>
                  <Category>{categoryMap[stat.category]}</Category>
                  <Account>{stat.amount.toLocaleString()}원</Account>
                </StyledCircle>
              );
            })}
          </CircleContainer>
        </CircleWrapper>

        <ReportContainer>
          <Title>소비 분석 개선 리포트</Title>
          <Description>
            최근 소비 내용을 살펴보면, 꼭 필요한 생활비와 자기계발에 균형 있게 지출하고 계신 모습이
            인상적이에요. 특히 자기계발에 투자하는 비율이 높아서, 단순한 소비보다는 앞으로를 위한
            사용에 가치를 두고 계시다는 느낌이 들어요!
            <br />
            <br />
            다만 가끔 외식이나 취미 쪽에서 예산보다 조금 더 쓰는 경향이 보이는데요, 이런 부분은
            월초에 ‘자유롭게 써도 되는 예산’을 따로 정해두면 마음도 편하고 소비 후 아쉬움도 덜 수
            있을 것 같아요. 지금처럼 균형 있는 소비를 유지하신다면 앞으로도 큰 걱정 없이 잘
            관리해나가실 수 있을 거예요!
          </Description>
        </ReportContainer>
        <BtnContainer>
          <Button size="XL" text="메인 페이지로 이동" onClick={() => router.push('/')} />
        </BtnContainer>
      </Container>
    </Wrapper>
  );
};

export default ConsumptionReport;

const Container = styled.div`
  width: 100%;
  padding: 12px 22px;
  display: flex;
  flex-direction: column;
`;

const TitleStrong = styled.span`
  color: ${semanticColor.text.normal.accent};
`;

const CircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleContainer = styled.div`
  position: relative;
  width: 332px;
  height: 365px;
  border-radius: 12px;
  overflow: hidden;
  background: '#F9FAFB';
  z-index: 0;
`;

const ReportContainer = styled.div`
  margin-top: 52px;
  padding-bottom: 90px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

interface StyledCircleProps {
  size: number;
  top: number;
  left: number;
  $rotate: number;
  $zIndex: number;
  $bgColor: string;
  $color: string;
}

const StyledCircle = styled(motion.div)<StyledCircleProps>`
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 50%;
  border: 3px solid ${semanticColor.bg.default};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  z-index: ${({ $zIndex }) => $zIndex};
  transform: rotate(${({ $rotate }) => $rotate}deg);
`;

const Percentage = styled.div`
  ${typoStyleMap['head1']};
`;

const Category = styled.div`
  ${typoStyleMap['body1_m']};
`;

const Account = styled.div`
  ${typoStyleMap['caption1_m']};
`;
