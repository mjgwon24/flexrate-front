import React from 'react';
import {
  ConditionbarWrapper,
  TitleRow,
  Title,
  Total,
  ConditionBox
} from './Conditionbar.style';

interface ConditionbarProps {
  title: string;
  totalElements?: string;
  children: React.ReactNode;
}

const Conditionbar: React.FC<ConditionbarProps> = ({ title, totalElements, children}) => {
  return (
    <ConditionbarWrapper>
      <TitleRow>
        <Title>{title}</Title>
        {totalElements && <Total>{totalElements}</Total>}
      </TitleRow>
      <ConditionBox>
        {children}
      </ConditionBox>
    </ConditionbarWrapper>
  );
}

export default Conditionbar;