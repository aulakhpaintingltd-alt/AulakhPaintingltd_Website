import { useEffect } from 'react';

/**
 * Custom hook that triggers scroll-based animations using IntersectionObserver.
 * Adds 'animate-in' class to the referenced element when it enters the viewport.
 *
 * Behaviour:
 * - Triggers at 20% visibility threshold
 * - Fires only once per element (unobserves after animation applied)
 * - Respects prefers-reduced-motion: disables animations and shows content immediately
 * - If element is already in viewport on mount: shows immediately without animation
 *
 * @param {React.RefObject} ref - React ref attached to the element to animate
 * @param {Object} options - Optional configuration
 * @param {number} options.threshold - Intersection threshold (default: 0.2)
 */
export function useScrollAnimation(ref, options = {}) {
  const { threshold = 0.2 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // If reduced motion is preferred, show content immediately without animation
    if (prefersReducedMotion) {
      element.classList.add('animate-in');
      return;
    }

    // Always use IntersectionObserver — even for elements already in viewport.
    // A small delay ensures the browser has painted the initial (hidden) state
    // before the observer fires, so the CSS transition is visible.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use double rAF to guarantee the browser painted the initial state
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                entry.target.classList.add('animate-in');
              });
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    // Cleanup on unmount
    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [ref, threshold]);
}

export default useScrollAnimation;
