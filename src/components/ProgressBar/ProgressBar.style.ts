import { primitiveColor, semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const ProgressBarContainer = styled.div<{ type?: string }>`
  padding: ${({ type }) => (type === 'MAIN' ? '0' : '8px 24px')};
`;

export const ProgressBarBackground = styled.div<{ type?: string }>`
  width: 100%;
  height: ${({ type }) => (type === 'MAIN' ? 10 : 3)}px;
  background-color: ${({ type }) =>
    type === 'MAIN' ? primitiveColor.blue[50] : semanticColor.bgBtn.inactive.default};
  border-radius: 100px;
`;

export const ProgressBarFill = styled(motion.div)<{ type?: string }>`
  height: 100%;
  background-color: ${({ type }) =>
    type === 'MAIN' ? primitiveColor.blue[700] : semanticColor.bgBtn.active.primary};
  border-radius: 100px;
  width: 0%;
`;
