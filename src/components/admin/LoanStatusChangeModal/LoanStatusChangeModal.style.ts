import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { semanticColor } from "@/styles/colors";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Sheet = styled(motion.div)`
  position: absolute;
  width: fit-content;
  min-height: fit-content;
  background-color: ${semanticColor.bg.default};
  border-radius: 15px;
  padding: 15px 35px 20px 35px;
  transform: translate(-50%, -50%);
  max-height: 60%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;