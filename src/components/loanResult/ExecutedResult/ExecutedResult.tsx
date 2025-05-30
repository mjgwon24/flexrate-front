import { LoanApplicationResponse } from '@/types/loanApplication.type';
import { formatNumberComma } from '@/utils/formatNumberComma';

import {
  MainContainer,
  SubTitle,
  TableContainer,
  TableItem,
  TableItemKey,
  TableItemValue,
} from './ExecutedResult.style';

export const ExecutedResult = ({ result }: { result: LoanApplicationResponse }) => {
  const formatDate = (date: string) =>
    `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`;

  const loanStartDate = formatDate(result.loanStartDate);
  const loanApplicationAmount = formatNumberComma(result.loanApplicationAmount);

  return (
    <MainContainer>
      <SubTitle>상세 내용</SubTitle>
      <TableContainer>
        <TableItem>
          <TableItemKey>대출 신청 금액</TableItemKey>
          <TableItemValue>
            <TableItemValue $isStrong={true}>{loanApplicationAmount}</TableItemValue>원
          </TableItemValue>
        </TableItem>
        <TableItem>
          <TableItemKey>대출 신청 금액</TableItemKey>
          <TableItemValue>
            연 <TableItemValue $isStrong={true}>{result.loanInterestRate}%</TableItemValue>
          </TableItemValue>
        </TableItem>
        <TableItem>
          <TableItemKey>대출 실행일</TableItemKey>
          <TableItemValue>{loanStartDate}</TableItemValue>
        </TableItem>
      </TableContainer>
    </MainContainer>
  );
};
