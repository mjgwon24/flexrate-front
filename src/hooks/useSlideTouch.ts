import { useRef } from 'react';

export function useSlideTouch(
  index: number,
  total: number,
  setIndex: (i: number) => void,
  sensitivity: number = 50
) {
  const startX = useRef<number | null>(null);
  const endX = useRef<number | null>(null);
  const isMouseDown = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    endX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    handleSwipe();
  };

  const onMouseDown = (e: React.MouseEvent) => {
    isMouseDown.current = true;
    startX.current = e.clientX;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (isMouseDown.current) {
      endX.current = e.clientX;
    }
  };
  const onMouseUp = () => {
    if (isMouseDown.current) {
      handleSwipe();
      isMouseDown.current = false;
    }
  };
  const onMouseLeave = () => {
    if (isMouseDown.current) {
      handleSwipe();
      isMouseDown.current = false;
    }
  };

  const handleSwipe = () => {
    if (startX.current === null || endX.current === null) return;

    const diff = startX.current - endX.current;
    if (Math.abs(diff) > sensitivity) {
      if (diff > 0 && index < total - 1) setIndex(index + 1);
      else if (diff < 0 && index > 0) setIndex(index - 1);
    }

    startX.current = null;
    endX.current = null;
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  };
}
