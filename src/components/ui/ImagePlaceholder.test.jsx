import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as fc from "fast-check";
import ImagePlaceholder from "./ImagePlaceholder";

/**
 * Property 5: ImagePlaceholder renders based on props
 * Validates: Requirements 12.1, 12.2, 12.3
 *
 * For any valid width and height number props, the ImagePlaceholder component
 * SHALL render a container with those exact dimensions. For any non-empty src
 * string prop, the component SHALL render an <img> element instead of the
 * placeholder container. For any alt text prop, the component SHALL include it
 * in the rendered output, and if the alt text exceeds 125 characters, it SHALL
 * be truncated to 125 characters.
 */
describe("Property 5: ImagePlaceholder renders based on props", () => {
  it("renders an img element with specified dimensions when src is provided", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 4000 }),
        fc.integer({ min: 1, max: 4000 }),
        fc.string({ minLength: 1, maxLength: 200 }).filter((s) => s.trim().length > 0),
        fc.string({ minLength: 1, maxLength: 300 }).filter((s) => s.trim().length > 0),
        (width, height, src, alt) => {
          const { container } = render(
            <ImagePlaceholder width={width} height={height} src={src} alt={alt} />
          );

          const img = container.querySelector("img");
          expect(img).not.toBeNull();
          expect(img.getAttribute("width")).toBe(String(width));
          expect(img.getAttribute("height")).toBe(String(height));
          expect(img.getAttribute("src")).toBe(src);

          // Should NOT render the placeholder container
          const placeholder = container.querySelector(".image-placeholder");
          expect(placeholder).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("renders a styled placeholder container when no src is provided", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 4000 }),
        fc.integer({ min: 1, max: 4000 }),
        (width, height) => {
          const { container } = render(
            <ImagePlaceholder width={width} height={height} alt="Placeholder" />
          );

          // Should render the placeholder div, not an img
          const img = container.querySelector("img");
          expect(img).toBeNull();

          const placeholder = container.querySelector(".image-placeholder");
          expect(placeholder).not.toBeNull();
          expect(placeholder.style.width).toBe(`${width}px`);
          expect(placeholder.style.height).toBe(`${height}px`);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("truncates alt text to 125 characters when it exceeds that length", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 4000 }),
        fc.integer({ min: 1, max: 4000 }),
        fc.string({ minLength: 126, maxLength: 500 }).filter((s) => s.trim().length > 125),
        (width, height, longAlt) => {
          // Test with src (img element)
          const { container: withSrc } = render(
            <ImagePlaceholder width={width} height={height} src="test.jpg" alt={longAlt} />
          );
          const img = withSrc.querySelector("img");
          expect(img).not.toBeNull();
          expect(img.getAttribute("alt").length).toBeLessThanOrEqual(125);
          expect(img.getAttribute("alt")).toBe(longAlt.slice(0, 125));

          // Test without src (placeholder container)
          const { container: withoutSrc } = render(
            <ImagePlaceholder width={width} height={height} alt={longAlt} />
          );
          const placeholder = withoutSrc.querySelector(".image-placeholder");
          expect(placeholder).not.toBeNull();
          const ariaLabel = placeholder.getAttribute("aria-label");
          expect(ariaLabel.length).toBeLessThanOrEqual(125);
          expect(ariaLabel).toBe(longAlt.slice(0, 125));
        }
      ),
      { numRuns: 100 }
    );
  });

  it("preserves aspect ratio via CSS aspectRatio property", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 4000 }),
        fc.integer({ min: 1, max: 4000 }),
        fc.boolean(),
        (width, height, hasSrc) => {
          const props = { width, height, alt: "Test image" };
          if (hasSrc) props.src = "image.jpg";

          const { container } = render(<ImagePlaceholder {...props} />);

          if (hasSrc) {
            const img = container.querySelector("img");
            expect(img).not.toBeNull();
            expect(img.style.aspectRatio).toBe(`${width} / ${height}`);
          } else {
            const placeholder = container.querySelector(".image-placeholder");
            expect(placeholder).not.toBeNull();
            expect(placeholder.style.aspectRatio).toBe(`${width} / ${height}`);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
