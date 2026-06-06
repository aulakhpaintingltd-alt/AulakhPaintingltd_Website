/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import * as fc from "fast-check";
import { NAV_LINKS } from "../config/constants";
import { useActiveSection } from "./useActiveSection";

/**
 * Property 1: Active section detection selects topmost visible section
 * **Validates: Requirements 1.8, 1.9**
 *
 * For any set of section elements with known vertical positions and any scroll
 * position where multiple sections are simultaneously visible in the viewport,
 * the useActiveSection hook SHALL identify the section whose top edge is closest
 * to the top of the viewport as the active section.
 */

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

/**
 * Mock IntersectionObserver that allows us to simulate intersection entries.
 */
class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.elements = new Set();
    MockIntersectionObserver.instances.push(this);
  }

  observe(element) {
    this.elements.add(element);
  }

  unobserve(element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  // Simulate intersection entries
  trigger(entries) {
    this.callback(entries, this);
  }
}

MockIntersectionObserver.instances = [];

describe("useActiveSection - Property-Based Tests", () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

    // Create DOM elements for each section
    SECTION_IDS.forEach((id) => {
      const el = document.createElement("section");
      el.setAttribute("id", id);
      document.body.appendChild(el);
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  it("Property 1: Active section detection selects topmost visible section", () => {
    fc.assert(
      fc.property(
        // Generate a non-empty subset of section IDs that are "visible"
        fc
          .shuffledSubarray(SECTION_IDS, { minLength: 1 })
          .chain((visibleIds) =>
            // For each visible section, generate a top position (distance from viewport top)
            fc
              .tuple(
                ...visibleIds.map(() =>
                  fc.integer({ min: -500, max: 1000 })
                )
              )
              .map((tops) => ({
                visibleIds,
                tops,
              }))
          ),
        ({ visibleIds, tops }) => {
          // Render the hook
          const { result } = renderHook(() => useActiveSection());

          // Get the latest observer instance
          const observer =
            MockIntersectionObserver.instances[
              MockIntersectionObserver.instances.length - 1
            ];

          // Simulate intersection entries for visible sections
          const entries = visibleIds.map((id, index) => ({
            target: document.getElementById(id),
            isIntersecting: true,
            boundingClientRect: { top: tops[index] },
            intersectionRatio: 0.5,
          }));

          act(() => {
            observer.trigger(entries);
          });

          // Determine expected active section: the one with top closest to 0 (viewport top)
          let expectedId = visibleIds[0];
          let minDistance = Math.abs(tops[0]);

          for (let i = 1; i < visibleIds.length; i++) {
            const distance = Math.abs(tops[i]);
            if (distance < minDistance) {
              minDistance = distance;
              expectedId = visibleIds[i];
            }
          }

          // The hook should select the section closest to the top of the viewport
          expect(result.current).toBe(expectedId);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("Property 1b: Active section is always a valid section ID from NAV_LINKS", () => {
    fc.assert(
      fc.property(
        // Generate random subset of visible sections with positions
        fc
          .shuffledSubarray(SECTION_IDS, { minLength: 1 })
          .chain((visibleIds) =>
            fc
              .tuple(
                ...visibleIds.map(() =>
                  fc.integer({ min: -500, max: 1000 })
                )
              )
              .map((tops) => ({
                visibleIds,
                tops,
              }))
          ),
        ({ visibleIds, tops }) => {
          const { result } = renderHook(() => useActiveSection());

          const observer =
            MockIntersectionObserver.instances[
              MockIntersectionObserver.instances.length - 1
            ];

          const entries = visibleIds.map((id, index) => ({
            target: document.getElementById(id),
            isIntersecting: true,
            boundingClientRect: { top: tops[index] },
            intersectionRatio: 0.5,
          }));

          act(() => {
            observer.trigger(entries);
          });

          // The returned active section must always be a valid section ID
          expect(SECTION_IDS).toContain(result.current);
        }
      ),
      { numRuns: 100 }
    );
  });
});
