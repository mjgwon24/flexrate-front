'use client';

import styled from '@emotion/styled';

export const ConditionbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 0.5rem;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
`;

export const Total = styled.span`
  color: #262626;
  font-size: 1.1rem;
`;

export const ConditionBox = styled.div`
  width: 100%;
  padding: 20px 30px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background: #fff;
`;
