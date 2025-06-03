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
  padding: 11px 0px 80px 0px;
`;

export const JobInformationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 40px;
`;

export const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

export const SubTitle = styled.div`
  margin-top: 10px 0px;
  padding: 12px 0px;
  ${typoStyleMap['title3']};
  color: ${semanticColor.text.normal.primary};
`;

export const BtnContainer = styled.div`
  width: calc(100% - 44px);
  position: absolute;
  bottom: 0;
  margin-bottom: 50px;
`;
