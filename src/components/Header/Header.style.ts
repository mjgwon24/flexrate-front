import styled from '@emotion/styled';

import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';

export const HeaderContainer = styled.div`
  position: sticky;
  overflow-y: auto;
  top: 0;
  display: flex;
  height: 56px;
  min-height: 56px;
  padding: 7px 18px;
  align-items: center;
  align-self: stretch;
  background-color: ${semanticColor.bg.default};
  z-index: 1000;
`;

export const HeaderRightContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const None = styled.div`
  width: 77px;
  height: 36px;
`;

export const HeaderTitle = styled.div`
  margin: 0 auto;
  ${typoStyleMap['title3']};
`;
