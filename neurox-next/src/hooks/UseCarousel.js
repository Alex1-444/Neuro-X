import { useState, useCallback, useRef } from "react";

export function useCarousel(totalItems, visibleItems = 4) {
  const [offset, setOffset] = useState(0);
  const isAnimating = useRef(false);
  const maxOffset = totalItems - visibleItems;

  const goNext = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    setOffset((prev) => Math.min(prev + 1, maxOffset));

    // Desbloquea tras la transición CSS (300ms)
    setTimeout(() => {
      isAnimating.current = false;
    }, 300);
  }, [maxOffset]);

  const goPrev = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    setOffset((prev) => Math.max(prev - 1, 0));

    setTimeout(() => {
      isAnimating.current = false;
    }, 300);
  }, []);

  const canGoPrev = offset > 0;
  const canGoNext = offset < maxOffset;

  return { offset, goNext, goPrev, canGoPrev, canGoNext };
}
