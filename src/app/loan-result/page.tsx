'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button/Button';
import Header from '@/components/Header/Header';
import {
  Container,
  Description,
  Title,
  Wrapper,
} from '@/components/loanApplicationFunnel/LoanApplicationFunnel.style';
import { loanStatusMap, LoanStatusType } from '@/constants/loan.constant';
import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';

interface LoanResultProps {
  loanStatus: LoanStatusType;
}

const LoanResult = ({ loanStatus }: LoanResultProps) => {
  const router = useRouter();
  loanStatus = 'EXECUTED';
  const { title, description } = loanStatusMap[loanStatus];

  const handleBack = () => {
    router.push('/');
  };

  return (
    <Wrapper>
      <Header type="대출 신청" />
      <Container>
        <TitleContainer>
          <Title>{title}</Title>
          {description.split('\n').map((line: string, idx: number) => (
            <Description key={idx}>
              {line}
              <br />
            </Description>
          ))}
        </TitleContainer>
        {loanStatus === 'EXECUTED' && (
          <MainContainer>
            <SubTitle>상세 내용</SubTitle>
            <TableContainer>
              <TableItem>
                <TableItemKey>대출 신청 금액</TableItemKey>
                <TableItemValue>
                  <TableItemValue $isStrong={true}>3,000,000,000</TableItemValue>원
                </TableItemValue>
              </TableItem>
              <TableItem>
                <TableItemKey>대출 신청 금액</TableItemKey>
                <TableItemValue>
                  연 <TableItemValue $isStrong={true}>14.5%</TableItemValue>
                </TableItemValue>
              </TableItem>
              <TableItem>
                <TableItemKey>대출 실행일</TableItemKey>
                <TableItemValue>2023.10.07</TableItemValue>
              </TableItem>
            </TableContainer>
          </MainContainer>
        )}
        <BtnContainer>
          <Button text="메인 페이지로 이동" onClick={handleBack} />
        </BtnContainer>
      </Container>
    </Wrapper>
  );
};

export default LoanResult;

export const TitleContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 11px 0px 0px 11px;
`;

const MainContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 11px 11px 80px 11px;
  margin-bottom: 40px;
`;

const SubTitle = styled.div`
  margin-top: 12px;
  ${typoStyleMap['title3']};
  color: ${semanticColor.text.normal.primary};
`;

const TableContainer = styled.div`
  margin-top: 12px;
  padding: 10px;
  height: fit-content;
  border-top: 1px solid ${semanticColor.border.active.default};
  border-bottom: 1px solid ${semanticColor.border.active.default};
`;

const TableItem = styled.span`
  padding: 18px 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${semanticColor.border.inactive.default};

  &:last-child {
    border: none;
  }
`;

const TableItemKey = styled.span`
  ${typoStyleMap['body2_m']};
  color: ${semanticColor.text.normal.sub2};
`;

const TableItemValue = styled.span<{ $isStrong?: boolean }>`
  ${typoStyleMap['body2_b']};
  color: ${({ $isStrong }) =>
    $isStrong ? semanticColor.text.normal.accent : semanticColor.text.normal.sub2};
`;

const BtnContainer = styled.div`
  width: calc(100% - 44px);
  position: absolute;
  bottom: 0;
`;
