import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../config/constants';

/**
 * Custom hook that tracks which section is currently active (closest to top of viewport).
 * Uses IntersectionObserver to detect visible sections and selects the one
 * whose top edge is closest to the top of the viewport.
 *
 * @param {string[]} [sectionIds] - Array of section IDs to observe. Defaults to NAV_LINKS ids.
 * @returns {string} The id of the currently active section.
 */
export function useActiveSection(sectionIds) {
  const ids = sectionIds || NAV_LINKS.map((link) => link.id);
  const [activeSection, setActiveSection] = useState(ids[0] || '');

  useEffect(() => {
    const visibleSections = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.boundingClientRect.top);
          } else {
            visibleSections.delete(id);
          }
        });

        if (visibleSections.size > 0) {
          // Find the section closest to the top of the viewport
          let closestId = null;
          let closestDistance = Infinity;

          visibleSections.forEach((top, id) => {
            const distance = Math.abs(top);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestId = id;
            }
          });

          if (closestId) {
            setActiveSection(closestId);
          }
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px 0px -20% 0px',
      }
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [ids.join(',')]);

  return activeSection;
}

export default useActiveSection;
