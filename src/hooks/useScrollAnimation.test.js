import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import * as fc from 'fast-check';
import { useScrollAnimation } from './useScrollAnimation';

/**
 * Property 3: Scroll animation triggers exactly once at threshold
 * Validates: Requirements 9.1, 9.4
 *
 * For any element observed by the useScrollAnimation hook, when the element's
 * intersection ratio reaches or exceeds 0.2 for the first time, the animation
 * class SHALL be applied. For any subsequent intersection events on the same
 * element, the animation SHALL NOT be re-triggered or removed.
 */

// Mock IntersectionObserver
let observerCallback;
let observerInstances = [];

class MockIntersectionObserver {
  constructor(callback, options) {
    observerCallback = callback;
    this.options = options;
    this.observedElements = new Set();
    observerInstances.push(this);
  }

  observe(element) {
    this.observedElements.add(element);
  }

  unobserve(element) {
    this.observedElements.delete(element);
  }

  disconnect() {
    this.observedElements.clear();
  }
}

describe('Feature: aulakh-painting-website, Property 3: Scroll animation triggers exactly once at threshold', () => {
  let originalIntersectionObserver;
  let originalMatchMedia;

  beforeEach(() => {
    observerInstances = [];
    observerCallback = null;

    originalIntersectionObserver = global.IntersectionObserver;
    global.IntersectionObserver = MockIntersectionObserver;

    originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  afterEach(() => {
    global.IntersectionObserver = originalIntersectionObserver;
    window.matchMedia = originalMatchMedia;
  });

  /**
   * **Validates: Requirements 9.1, 9.4**
   *
   * Property: The 'animate-in' class is added exactly once per element when
   * intersection occurs, and after animation is applied, the observer unobserves
   * the element (triggers only once).
   */
  it('should add animate-in class exactly once regardless of how many intersection events fire', () => {
    fc.assert(
      fc.property(
        // Generate a random number of intersection events (1 to 20)
        fc.integer({ min: 1, max: 20 }),
        // Generate a sequence of isIntersecting booleans (at least one true)
        fc.array(fc.boolean(), { minLength: 1, maxLength: 20 }),
        (numEvents, intersectionSequence) => {
          // Ensure at least one intersection event is true
          if (!intersectionSequence.some((v) => v)) {
            intersectionSequence[0] = true;
          }

          // Create a mock element
          const element = document.createElement('div');
          // Position element outside viewport so it doesn't trigger immediate animation
          element.getBoundingClientRect = () => ({
            top: 2000,
            bottom: 2100,
            left: 0,
            right: 100,
            width: 100,
            height: 100,
          });

          const ref = { current: element };

          // Render the hook
          renderHook(() => useScrollAnimation(ref));

          // Verify observer was created
          expect(observerInstances.length).toBeGreaterThan(0);
          const observer = observerInstances[observerInstances.length - 1];

          // Track how many times classList.add is called with 'animate-in'
          let addCount = 0;
          const originalAdd = element.classList.add.bind(element.classList);
          element.classList.add = (...args) => {
            if (args.includes('animate-in')) {
              addCount++;
            }
            originalAdd(...args);
          };

          // Simulate the sequence of intersection events
          for (const isIntersecting of intersectionSequence) {
            // Only fire callback if element is still being observed
            if (observer.observedElements.has(element)) {
              observerCallback([
                {
                  target: element,
                  isIntersecting,
                  intersectionRatio: isIntersecting ? 0.25 : 0.0,
                },
              ]);
            }
          }

          // Property: animate-in class should be added exactly once
          expect(addCount).toBe(1);
          // Property: element should have the animate-in class
          expect(element.classList.contains('animate-in')).toBe(true);
          // Property: element should be unobserved after animation
          expect(observer.observedElements.has(element)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Validates: Requirements 9.1, 9.4**
   *
   * Property: After the observer unobserves the element, no further class
   * modifications occur even if more intersection events are simulated.
   */
  it('should unobserve element after first intersection, preventing re-triggering', () => {
    fc.assert(
      fc.property(
        // Generate number of additional events after first intersection
        fc.integer({ min: 1, max: 15 }),
        (additionalEvents) => {
          const element = document.createElement('div');
          element.getBoundingClientRect = () => ({
            top: 2000,
            bottom: 2100,
            left: 0,
            right: 100,
            width: 100,
            height: 100,
          });

          const ref = { current: element };

          renderHook(() => useScrollAnimation(ref));

          const observer = observerInstances[observerInstances.length - 1];

          // First intersection - should trigger animation
          observerCallback([
            {
              target: element,
              isIntersecting: true,
              intersectionRatio: 0.25,
            },
          ]);

          expect(element.classList.contains('animate-in')).toBe(true);
          // Element should be unobserved
          expect(observer.observedElements.has(element)).toBe(false);

          // Try to fire more events - they should not reach the callback
          // because the element is unobserved
          let classListChanged = false;
          element.classList.remove('animate-in');

          // Simulate additional intersection events directly
          for (let i = 0; i < additionalEvents; i++) {
            if (observer.observedElements.has(element)) {
              observerCallback([
                {
                  target: element,
                  isIntersecting: true,
                  intersectionRatio: 0.3,
                },
              ]);
              classListChanged = true;
            }
          }

          // Since element was unobserved, no new events should have fired
          expect(classListChanged).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Validates: Requirements 9.1, 9.4**
   *
   * Property: When prefers-reduced-motion is set, animation class is added
   * immediately without needing an IntersectionObserver.
   */
  it('should add animate-in class immediately when prefers-reduced-motion is enabled', () => {
    fc.assert(
      fc.property(
        // Generate random element positions (doesn't matter for reduced motion)
        fc.record({
          top: fc.integer({ min: -500, max: 5000 }),
          height: fc.integer({ min: 50, max: 500 }),
        }),
        ({ top, height }) => {
          // Override matchMedia to indicate reduced motion preference
          window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: query === '(prefers-reduced-motion: reduce)',
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
          }));

          const element = document.createElement('div');
          element.getBoundingClientRect = () => ({
            top,
            bottom: top + height,
            left: 0,
            right: 100,
            width: 100,
            height,
          });

          const ref = { current: element };
          const instanceCountBefore = observerInstances.length;

          renderHook(() => useScrollAnimation(ref));

          // Property: animate-in class should be added immediately
          expect(element.classList.contains('animate-in')).toBe(true);

          // Property: No new IntersectionObserver should be created
          // (reduced motion path returns early before creating observer)
          expect(observerInstances.length).toBe(instanceCountBefore);
        }
      ),
      { numRuns: 100 }
    );
  });
});
