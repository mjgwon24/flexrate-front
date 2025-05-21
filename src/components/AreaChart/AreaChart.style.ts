import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';
import styled from '@emotion/styled';

export const ChartContainer = styled.div`
  margin-top: 15px;
  padding: 18px 24px 0px 14px;
  background-color: ${semanticColor.bg.default};
  border-radius: 15px;
`;

export const ChartTitle = styled.div`
  ${typoStyleMap['body2_eb']};
  color: ${semanticColor.text.normal.sub2};
  margin-left: 10px;
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
