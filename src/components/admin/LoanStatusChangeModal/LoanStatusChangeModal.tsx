'use client';
import React, { useEffect, useRef } from "react";

import { AnimatePresence } from 'framer-motion';
import { Overlay, Sheet } from "@/components/admin/LoanStatusChangeModal/LoanStatusChangeModal.style";

interface LoanStatusChangeModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onOutsideClick?: () => void;
}

const LoanStatusChangeModal = ({ isOpen, children, onOutsideClick }: LoanStatusChangeModalProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sheetRef.current &&
        !sheetRef.current.contains(event.target as Node) &&
        onOutsideClick
      ) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onOutsideClick]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay>
          <Sheet
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'tween', duration: 0.2 }}
            ref={sheetRef}
          >
            {children}
          </Sheet>
        </Overlay>
      )}
    </AnimatePresence>
  )
}

export default LoanStatusChangeModal;