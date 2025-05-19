import { motion } from 'framer-motion';

import { ProgressBarBackground, ProgressBarContainer, ProgressBarFill } from './ProgressBar.style';

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
}

const ProgressBar = ({ totalSteps, currentStep }: ProgressBarProps) => {
  const progress = totalSteps === 0 ? 0 : (currentStep / totalSteps) * 100;

  return (
    <ProgressBarContainer>
      <ProgressBarBackground>
        <ProgressBarFill
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </ProgressBarBackground>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
