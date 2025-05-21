import { motion } from 'framer-motion';
import { ProgressBarBackground, ProgressBarContainer, ProgressBarFill } from './ProgressBar.style';

interface ProgressBarProps {
  type?: 'MAIN' | 'DEFAULT';
  totalSteps: number;
  currentStep: number;
}

const ProgressBar = ({ type, totalSteps, currentStep }: ProgressBarProps) => {
  const progress = totalSteps === 0 ? 0 : (currentStep / totalSteps) * 100;

  return (
    <ProgressBarContainer type={type}>
      <ProgressBarBackground type={type}>
        <ProgressBarFill
          type={type}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </ProgressBarBackground>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
