import styled from '@emotion/styled';

import { primitiveColor, semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';

export const MediumTitleWrapper = styled.span`
  ${typoStyleMap['title2']};
`;

export const MediumTitle = styled.span<{ $isStrong?: boolean }>`
  color: ${({ $isStrong }) =>
    $isStrong ? semanticColor.text.normal.accent : semanticColor.text.normal.primary};
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 40px;
`;

export const CardFlexContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 15px;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5.5px;
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const GreenText = styled.div`
  ${typoStyleMap['body2_sb']};
  color: ${primitiveColor.green};
`;
