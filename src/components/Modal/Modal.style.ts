import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  padding: 0px 8px 30px 8px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
`;

export const Sheet = styled(motion.div)`
  width: 100%;
  max-height: 60%;
  background-color: ${semanticColor.bg.default};
  border-radius: 15px;
  padding: 10px 0px;
`;

export const Handle = styled.div`
  width: 40px;
  height: 4px;
  background-color: #ccc;
  border-radius: 2px;
  margin: 0 auto 8px auto;
`;

export const ModalFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ModalTitle = styled.div`
  ${typoStyleMap['title2']};
`;

export const ModalSubTitle = styled.div`
  ${typoStyleMap['body2_m']};
  color: ${semanticColor.text.normal.sub2};
`;

export const TitleContainer = styled.div`
  padding: 8px 22px 12px 22px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ModalBtnContainer = styled.div`
  margin-top: 35px;
  display: flex;
  gap: 8px;
  padding: 8px 14px;
`;
