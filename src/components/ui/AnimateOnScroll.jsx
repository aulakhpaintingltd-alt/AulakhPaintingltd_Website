import { useEffect, useRef, useState } from 'react';

/**
 * AnimateOnScroll - Wrapper component that animates children when they scroll into view.
 * Uses IntersectionObserver directly with inline styles for maximum reliability.
 *
 * @param {string} animation - Animation type: 'fade-up', 'fade-left', 'fade-right', 'zoom-in'
 * @param {number} delay - Delay in ms before animation starts
 * @param {number} duration - Animation duration in ms
 * @param {React.ReactNode} children
 */
function AnimateOnScroll({ children, animation = 'fade-up', delay = 0, duration = 800, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const getInitialStyle = () => {
    const base = {
      transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
    };

    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return { ...base, opacity: 0, transform: 'translateY(50px)' };
        case 'fade-left':
          return { ...base, opacity: 0, transform: 'translateX(80px)' };
        case 'fade-right':
          return { ...base, opacity: 0, transform: 'translateX(-80px)' };
        case 'zoom-in':
          return { ...base, opacity: 0, transform: 'scale(0.9)' };
        default:
          return { ...base, opacity: 0, transform: 'translateY(50px)' };
      }
    }

    return { ...base, opacity: 1, transform: 'translateY(0) translateX(0) scale(1)' };
  };

  return (
    <div ref={ref} style={getInitialStyle()} className={className}>
      {children}
    </div>
  );
}

export default AnimateOnScroll;
