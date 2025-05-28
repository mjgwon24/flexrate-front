import styled from '@emotion/styled';

import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';

export const MainContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 11px 11px 80px 11px;
  margin-bottom: 40px;
`;

export const SubTitle = styled.div`
  margin-top: 12px;
  ${typoStyleMap['title3']};
  color: ${semanticColor.text.normal.primary};
`;

export const TableContainer = styled.div`
  margin-top: 12px;
  padding: 10px;
  height: fit-content;
  border-top: 1px solid ${semanticColor.border.active.default};
  border-bottom: 1px solid ${semanticColor.border.active.default};
`;

export const TableItem = styled.span`
  padding: 18px 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${semanticColor.border.inactive.default};

  &:last-child {
    border: none;
  }
`;

export const TableItemKey = styled.span`
  ${typoStyleMap['body2_m']};
  color: ${semanticColor.text.normal.sub2};
`;

export const TableItemValue = styled.span<{ $isStrong?: boolean }>`
  ${typoStyleMap['body2_b']};
  color: ${({ $isStrong }) =>
    $isStrong ? semanticColor.text.normal.accent : semanticColor.text.normal.sub2};
`;
