'use client';

import { ReactNode, MouseEvent } from 'react';

import { AnimatePresence } from 'framer-motion';

import { Overlay, Sheet, Handle } from './Modal.style';

interface ModalProps {
  type?: 'PRE_APPLIED' | 'NONE_CREDIT' | 'LOGOUT';
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const handleOverlayClick = () => {
    onClose();
  };

  const handleSheetClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay onClick={handleOverlayClick}>
          <Sheet
            onClick={handleSheetClick}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <Handle />
            {children}
          </Sheet>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
