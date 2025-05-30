'use client';

import styled from '@emotion/styled';

import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';
import { PeriodKey } from '@/types/chart.type';

export const ChartContainer = styled.div`
  margin-top: 15px;
  padding: 18px 24px 0px 14px;
  background-color: ${semanticColor.bg.default};
  border-radius: 15px;
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

export const ChartBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 12px 0px;
`;

export const ChartTitle = styled.div`
  ${typoStyleMap['body2_eb']};
  color: ${semanticColor.text.normal.sub2};
  margin-left: 10px;
`;

export const PeriodBtn = styled.button<{ periodType: PeriodKey; btnKey: PeriodKey }>`
  ${({ periodType, btnKey }) =>
    periodType === btnKey ? typoStyleMap['body2_b'] : typoStyleMap['body2_m']};
  cursor: pointer;
  padding: 4px 10px;
  background-color: ${({ periodType, btnKey }) =>
    periodType === btnKey ? semanticColor.bgBtn.active.secondary : semanticColor.bgBtn.active.wt};
  color: ${({ periodType, btnKey }) =>
    periodType === btnKey ? semanticColor.text.normal.accent : semanticColor.text.normal.sub2};
  border: 1px solid ${semanticColor.border.active.sub4};

  &:first-of-type {
    border-radius: 2px 0px 0px 2px;
    border-right: none;
  }
  &:last-of-type {
    border-radius: 0px 2px 2px 0px;
    border-left: none;
  }
`;

export const TooltipContainer = styled.div`
  padding: 12px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Pretendard', sans-serif;
  width: 150px;
`;

export const TooltipTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #111;
`;

export const TooltipDescription = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
`;

export const TooltipGreenText = styled.div`
  color: #10b981;
  font-weight: 600;
  margin-left: 4px;
`;
