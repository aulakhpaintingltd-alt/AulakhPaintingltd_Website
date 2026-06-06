import { useEffect, useRef } from 'react';

/**
 * Custom hook that creates a parallax scrolling effect on an element.
 * The element moves at a different speed than the scroll, creating depth.
 *
 * @param {number} speed - Parallax speed factor (0.1 = subtle, 0.5 = strong). Default: 0.3
 * @returns {React.RefObject} ref to attach to the parallax element
 */
export function useParallax(speed = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    let ticking = false;

    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          const offset = (scrollY - elementTop) * speed;

          element.style.transform = `translate3d(0, ${offset}px, 0)`;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (element) {
        element.style.transform = '';
      }
    };
  }, [speed]);

  return ref;
}

export default useParallax;
