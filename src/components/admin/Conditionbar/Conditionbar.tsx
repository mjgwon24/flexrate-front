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

/**
 * 조회조건 컴포넌트
 * @param title - 메뉴명
 * @param totalElements - 조회된 데이터 총 개수
 * @param children - 조회조건 요소
 *
 * @since 2025.05.13
 * @author 권민지
 */
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
