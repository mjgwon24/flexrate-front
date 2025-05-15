import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';
import styled from '@emotion/styled';

export const TabContainer = styled.div`
  height: 44px;
  display: flex;
  border-bottom: 1px solid ${semanticColor.text.normal.sub4};
`;

export const TabMenu = styled.div<{ $isActive: boolean }>`
  margin: 0 auto;
  width: fit-content;
  ${typoStyleMap['body1_m']};
  padding: 10px;
  color: ${({ $isActive }) =>
    $isActive ? semanticColor.text.normal.sub1 : semanticColor.text.normal.sub4};
  font-weight: ${({ $isActive }) =>
    $isActive ? typoStyleMap['body1_b'] : typoStyleMap['body1_m']};
  border-bottom: 2px solid
    ${({ $isActive }) => ($isActive ? semanticColor.border.active.default : 'none')};
`;
