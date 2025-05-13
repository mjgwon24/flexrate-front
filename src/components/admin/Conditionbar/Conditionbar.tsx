import React, { useEffect } from 'react';

import {
  ConditionbarWrapper,
  TitleRow,
  Title,
  Total,
  ConditionBox,
  SkeletonConditionBox,
} from './Conditionbar.style';

interface ConditionbarProps {
  title: string;
  totalElements?: string;
  children: React.ReactNode;
}

const Conditionbar = ({ title, totalElements, children }: ConditionbarProps) => {
  const [isInternalLoading, setIsInternalLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInternalLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ConditionbarWrapper>
      <TitleRow>
        <Title>{title}</Title>
        {totalElements && <Total>{totalElements}</Total>}
      </TitleRow>

      {isInternalLoading ? <SkeletonConditionBox /> : <ConditionBox>{children}</ConditionBox>}
    </ConditionbarWrapper>
  );
};

export default Conditionbar;
