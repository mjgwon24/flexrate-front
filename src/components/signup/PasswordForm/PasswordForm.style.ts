import styled from '@emotion/styled';

import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';

export const Title = styled.div`
  margin-top: 74px;
  padding: 12px 22px;
  ${typoStyleMap['head1']};
  color: ${semanticColor.text.normal.primary};
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0px 22px;
  gap: 12px;
`;

export const BottomSheetBtnContainer = styled.div`
  width: 140px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
`;
