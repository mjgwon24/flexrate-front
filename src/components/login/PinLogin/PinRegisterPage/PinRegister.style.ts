import styled from '@emotion/styled';

import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';

export const Container = styled.div`
  width: 100%;
  height: 729px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 45px 24px;
`;

export const Title = styled.div`
  margin-top: 100px;
  ${typoStyleMap['head1']};
  text-align: center;
  color: ${semanticColor.text.normal.primary};
`;

export const BtnContainer = styled.div`
  width: calc(100% - 47px);
  position: absolute;
  bottom: 0;
`;

export const BackButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: ${semanticColor.text.normal.sub2};
  ${typoStyleMap['body2_m']};
  cursor: pointer;

  transform: translateY(16px);

  &:hover {
    text-decoration: underline;
  }
`;