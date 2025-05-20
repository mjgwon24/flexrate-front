import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { primitiveColor, semanticColor } from '@/styles/colors';
import { typoStyleMap } from '@/styles/typos';

export const Wrapper = styled(motion.div)`
  position: relative;
  width: 280px;
  height: 280px;
  margin: 0 auto;
`;

export const ChartOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const KCBLabel = styled.div`
  ${typoStyleMap['body1_b']};
  color: ${semanticColor.text.normal.sub2};
  font-weight: 600;
  margin-bottom: 39px;
`;

export const Score = styled.span<{ strong?: boolean }>`
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: ${({ strong }) =>
    strong ? semanticColor.text.normal.accent : semanticColor.text.normal.primary};
`;

export const Percentile = styled.div`
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${semanticColor.text.normal.sub3};
  margin: 0 auto;
  margin-top: 39px;
  padding: 5px 8px;
  border-radius: 15px;
  background: ${primitiveColor.gray[50]};
  width: fit-content;
`;
