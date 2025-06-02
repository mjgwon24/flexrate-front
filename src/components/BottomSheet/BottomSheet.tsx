import { ReactNode } from 'react';

import { AnimatePresence } from 'framer-motion';

import { Handle, Overlay, Sheet } from './BottomSheet.style';

interface BottomSheetProps {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
}

const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay onClick={onClose}>
          <Sheet
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
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
