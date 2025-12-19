import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // PREMIUM SMOOTH SCROLL (DAHA YUMUŞAK)
    const smoothScroll = () => {
      const target = 0;
      const duration = 600; // geçiş süresi (ms)
      const start = window.scrollY;
      const distance = target - start;
      let startTime = null;

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);

        window.scrollTo(0, start + distance * easedProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    smoothScroll();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
