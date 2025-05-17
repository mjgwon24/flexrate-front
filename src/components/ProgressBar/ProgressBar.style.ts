import { semanticColor } from '@/styles/colors';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const ProgressBarContainer = styled.div`
  padding: 8px 24px;
`;

export const ProgressBarBackground = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${semanticColor.bgBtn.inactive.default};
  border-radius: 100px;
`;

export const ProgressBarFill = styled(motion.div)`
  height: 100%;
  background-color: ${semanticColor.bgBtn.active.primary};
  border-radius: 100px;
  width: 0%;
`;
