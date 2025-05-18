import { AnimatePresence } from 'framer-motion';
import { Handle, Overlay, Sheet } from './BottomSheet.style';
import { ReactNode } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  children: ReactNode;
}

const BottomSheet = ({ isOpen, children }: BottomSheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay>
          <Sheet
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            <Handle />
            {children}
          </Sheet>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
