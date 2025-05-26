import styled from '@emotion/styled';

import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  padding: 60px 22px;
  ${typoStyleMap['head1']};
  color: ${semanticColor.text.normal.primary};
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  padding: 0px 22px;
  gap: 12px;
`;

export const BtnContainer = styled.div`
  width: calc(100% - 44px);
  position: absolute;
  bottom: -415px;
  height: 0px; /* 버튼 높이에 맞게 */
`;
