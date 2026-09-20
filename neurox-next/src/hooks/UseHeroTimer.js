import { useState, useEffect, useCallback, useRef } from "react";

export function useHeroTimer(totalSlides, intervalMs = 15000) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  const resetTimer = useCallback(
    (newIndex) => {
      clearInterval(intervalRef.current);
      setActiveIndex(newIndex);

      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % totalSlides;
          resetTimer(next);
          return next;
        });
      }, intervalMs);
    },
    [totalSlides, intervalMs],
  );

  useEffect(() => {
    resetTimer(0);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = useCallback((index) => resetTimer(index), [resetTimer]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev - 1 + totalSlides) % totalSlides;
      resetTimer(next);
      return next;
    });
  }, [totalSlides, resetTimer]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % totalSlides;
      resetTimer(next);
      return next;
    });
  }, [totalSlides, resetTimer]);

  return { activeIndex, goTo, goPrev, goNext };
}
