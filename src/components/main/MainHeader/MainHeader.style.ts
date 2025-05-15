import { typoStyleMap } from '@/styles/typos';
import styled from '@emotion/styled';

export const HeaderContainer = styled.div`
  display: flex;
  height: 56px;
  padding: 10px 22px;
  min-height: 56px;
  align-items: center;
  justify-content: space-around;
`;

export const NoneBox = styled.div<{ $user: boolean }>`
  width: ${({ $user }) => ($user ? '77px' : ' 36px')};
  height: ${({ $user }) => ($user ? '57px' : ' 36px')};
`;

export const HeaderTitle = styled.div`
  margin: 0 auto;
  ${typoStyleMap['title3']};
`;

export const HeaderRightContainer = styled.div`
  display: flex;
  gap: 5px;
`;
