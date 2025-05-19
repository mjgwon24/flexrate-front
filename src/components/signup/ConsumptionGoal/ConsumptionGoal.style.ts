import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';
import styled from '@emotion/styled';

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`;

export const GoalOptionButton = styled.button<{ selected: boolean }>`
  ${({ selected }) => (selected ? typoStyleMap['title2'] : typoStyleMap['body2_m'])};
  color: ${({ selected }) =>
    selected ? semanticColor.text.normal.primary : semanticColor.text.normal.sub2};
  border: none;
  background: none;
  transition: all 0.2s ease;
  cursor: pointer;
`;
