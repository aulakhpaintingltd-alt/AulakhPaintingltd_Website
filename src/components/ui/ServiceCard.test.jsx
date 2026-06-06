import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as fc from "fast-check";
import ServiceCard from "./ServiceCard";

/**
 * Property 6: ServiceCard displays all service data fields
 * Validates: Requirements 4.2
 *
 * For any valid service category object containing a title, description, and
 * subServices array, the ServiceCard component SHALL render all three pieces
 * of information in its output — the title as a heading, the description as
 * body text, and each sub-service as a list item.
 */
describe("Property 6: ServiceCard displays all service data fields", () => {
  it("renders the title as a heading element", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
        fc.string({ minLength: 1, maxLength: 200 }).filter((s) => s.trim().length > 0),
        fc.array(
          fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.trim().length > 0),
          { minLength: 1, maxLength: 10 }
        ),
        (title, description, subServices) => {
          const { container } = render(
            <ServiceCard
              title={title}
              description={description}
              subServices={subServices}
            />
          );

          const heading = container.querySelector("h3");
          expect(heading).not.toBeNull();
          expect(heading.textContent).toBe(title);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("renders the description as body text", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
        fc.string({ minLength: 1, maxLength: 200 }).filter((s) => s.trim().length > 0),
        fc.array(
          fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.trim().length > 0),
          { minLength: 1, maxLength: 10 }
        ),
        (title, description, subServices) => {
          const { container } = render(
            <ServiceCard
              title={title}
              description={description}
              subServices={subServices}
            />
          );

          const paragraph = container.querySelector("p");
          expect(paragraph).not.toBeNull();
          expect(paragraph.textContent).toBe(description);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("renders all sub-services as list items", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
        fc.string({ minLength: 1, maxLength: 200 }).filter((s) => s.trim().length > 0),
        fc.array(
          fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.trim().length > 0),
          { minLength: 1, maxLength: 10 }
        ),
        (title, description, subServices) => {
          const { container } = render(
            <ServiceCard
              title={title}
              description={description}
              subServices={subServices}
            />
          );

          const listItems = container.querySelectorAll("li");
          expect(listItems.length).toBe(subServices.length);

          subServices.forEach((service, index) => {
            expect(listItems[index].textContent).toBe(service);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it("renders ImagePlaceholder with 400x300 dimensions", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
        fc.string({ minLength: 1, maxLength: 200 }).filter((s) => s.trim().length > 0),
        fc.array(
          fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.trim().length > 0),
          { minLength: 1, maxLength: 10 }
        ),
        (title, description, subServices) => {
          const { container } = render(
            <ServiceCard
              title={title}
              description={description}
              subServices={subServices}
            />
          );

          // ImagePlaceholder without src renders a div with role="img"
          const placeholder = container.querySelector(".image-placeholder");
          expect(placeholder).not.toBeNull();
          expect(placeholder.style.width).toBe("400px");
          expect(placeholder.style.height).toBe("300px");
        }
      ),
      { numRuns: 100 }
    );
  });
});
