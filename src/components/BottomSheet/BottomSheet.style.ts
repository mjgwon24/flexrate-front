import { semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
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
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 10px 22px 40px 22px;
`;

export const Handle = styled.div`
  width: 40px;
  height: 4px;
  background-color: #ccc;
  border-radius: 2px;
  margin: 0 auto 8px auto;
`;
