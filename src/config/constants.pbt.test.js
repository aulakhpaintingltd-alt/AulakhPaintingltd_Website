import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  COMPANY_NAME,
  HOOK_LINE,
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  EMAIL,
  ADDRESS,
  INSTAGRAM_URL,
  NAV_LINKS,
  SERVICES,
  DIFFERENTIATORS,
  SERVICE_AREAS,
} from "./constants";

/**
 * Property 4: Constants data structure completeness
 * Validates: Requirements 11.1, 11.2, 11.3, 11.5, 5.2
 *
 * For any required data export in the constants file, the export SHALL exist
 * as a named export with all required sub-fields populated as non-empty strings,
 * and each service category SHALL contain a subServices array with at least one item,
 * and each differentiator description SHALL not exceed 120 characters.
 */
describe("Property 4: Constants data structure completeness", () => {
  // Company information fields are all non-empty strings
  const companyInfoFields = [
    { name: "COMPANY_NAME", value: COMPANY_NAME },
    { name: "HOOK_LINE", value: HOOK_LINE },
    { name: "PRIMARY_PHONE", value: PRIMARY_PHONE },
    { name: "SECONDARY_PHONE", value: SECONDARY_PHONE },
    { name: "EMAIL", value: EMAIL },
    { name: "ADDRESS", value: ADDRESS },
    { name: "INSTAGRAM_URL", value: INSTAGRAM_URL },
  ];

  it("all company information fields are non-empty strings", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...companyInfoFields),
        (field) => {
          expect(typeof field.value).toBe("string");
          expect(field.value.trim().length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  // NAV_LINKS has exactly 6 items, each with id and label strings
  it("NAV_LINKS has exactly 6 items, each with id and label as non-empty strings", () => {
    expect(NAV_LINKS).toHaveLength(6);

    fc.assert(
      fc.property(
        fc.constantFrom(...NAV_LINKS),
        (link) => {
          expect(typeof link.id).toBe("string");
          expect(link.id.trim().length).toBeGreaterThan(0);
          expect(typeof link.label).toBe("string");
          expect(link.label.trim().length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  // SERVICES has exactly 6 items, each with id, title, description, and subServices array
  it("SERVICES has exactly 6 items, each with id, title, description, and subServices array with at least 1 sub-service", () => {
    expect(SERVICES).toHaveLength(6);

    fc.assert(
      fc.property(
        fc.constantFrom(...SERVICES),
        (service) => {
          // id is a non-empty string
          expect(typeof service.id).toBe("string");
          expect(service.id.trim().length).toBeGreaterThan(0);

          // title is a non-empty string
          expect(typeof service.title).toBe("string");
          expect(service.title.trim().length).toBeGreaterThan(0);

          // description is a non-empty string
          expect(typeof service.description).toBe("string");
          expect(service.description.trim().length).toBeGreaterThan(0);

          // subServices is an array with at least 1 item
          expect(Array.isArray(service.subServices)).toBe(true);
          expect(service.subServices.length).toBeGreaterThanOrEqual(1);

          // each sub-service is a non-empty string
          for (const subService of service.subServices) {
            expect(typeof subService).toBe("string");
            expect(subService.trim().length).toBeGreaterThan(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  // DIFFERENTIATORS has exactly 6 items, each with id, title, and description (max 120 characters)
  it("DIFFERENTIATORS has exactly 6 items, each with id, title, and description not exceeding 120 characters", () => {
    expect(DIFFERENTIATORS).toHaveLength(6);

    fc.assert(
      fc.property(
        fc.constantFrom(...DIFFERENTIATORS),
        (differentiator) => {
          // id is a non-empty string
          expect(typeof differentiator.id).toBe("string");
          expect(differentiator.id.trim().length).toBeGreaterThan(0);

          // title is a non-empty string
          expect(typeof differentiator.title).toBe("string");
          expect(differentiator.title.trim().length).toBeGreaterThan(0);

          // description is a non-empty string with max 120 characters
          expect(typeof differentiator.description).toBe("string");
          expect(differentiator.description.trim().length).toBeGreaterThan(0);
          expect(differentiator.description.length).toBeLessThanOrEqual(120);
        }
      ),
      { numRuns: 100 }
    );
  });

  // SERVICE_AREAS has at least 5 items, all non-empty strings
  it("SERVICE_AREAS has at least 5 items, all non-empty strings", () => {
    expect(SERVICE_AREAS.length).toBeGreaterThanOrEqual(5);

    fc.assert(
      fc.property(
        fc.constantFrom(...SERVICE_AREAS),
        (area) => {
          expect(typeof area).toBe("string");
          expect(area.trim().length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});
