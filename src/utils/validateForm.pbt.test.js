import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { validateForm, isValidEmail } from "./validateForm";

/**
 * Property 2: Form validation correctness
 * Validates: Requirements 7.3, 7.4, 7.5
 *
 * For any form data object, validateForm returns isValid: true if and only if
 * all fields are valid. For invalid data, it returns isValid: false with
 * appropriate error messages keyed to each invalid field.
 */
describe("Property 2: Form validation correctness", () => {
  // Generators for valid form fields
  const validFullName = fc
    .string({ minLength: 1, maxLength: 100 })
    .filter((s) => s.trim().length > 0);

  const validEmail = fc
    .tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter((s) => !/[\s@]/.test(s) && s.length > 0),
      fc.string({ minLength: 1, maxLength: 20 }).filter((s) => !/[\s@.]/.test(s) && s.length > 0),
      fc.string({ minLength: 1, maxLength: 10 }).filter((s) => !/[\s@.]/.test(s) && s.length > 0)
    )
    .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

  const validServiceType = fc
    .string({ minLength: 1, maxLength: 50 })
    .filter((s) => s.trim().length > 0);

  const validMessage = fc
    .string({ minLength: 10, maxLength: 500 })
    .filter((s) => s.trim().length >= 10);

  const validFormData = fc.record({
    fullName: validFullName,
    email: validEmail,
    serviceType: validServiceType,
    message: validMessage,
  });

  it("returns isValid: true for any valid form data", () => {
    fc.assert(
      fc.property(validFormData, (formData) => {
        const result = validateForm(formData);
        expect(result.isValid).toBe(true);
        expect(result.errors).toEqual({});
      }),
      { numRuns: 100 }
    );
  });

  // Generators for invalid form fields
  const invalidFullName = fc.constantFrom("", "   ", "  \t  ");

  const invalidEmail = fc.oneof(
    fc.constant(""),
    fc.string({ minLength: 1, maxLength: 30 }).filter((s) => !isValidEmail(s))
  );

  const invalidServiceType = fc.constantFrom("", "   ", " \t ");

  const invalidMessage = fc
    .string({ minLength: 0, maxLength: 30 })
    .filter((s) => s.trim().length < 10);

  it("returns isValid: false with fullName error when fullName is empty or whitespace-only", () => {
    fc.assert(
      fc.property(invalidFullName, validEmail, validServiceType, validMessage, (fullName, email, serviceType, message) => {
        const result = validateForm({ fullName, email, serviceType, message });
        expect(result.isValid).toBe(false);
        expect(result.errors.fullName).toBe("Full name is required");
      }),
      { numRuns: 100 }
    );
  });

  it("returns isValid: false with email error when email is invalid", () => {
    fc.assert(
      fc.property(validFullName, invalidEmail, validServiceType, validMessage, (fullName, email, serviceType, message) => {
        const result = validateForm({ fullName, email, serviceType, message });
        expect(result.isValid).toBe(false);
        expect(result.errors.email).toBe("Please enter a valid email address");
      }),
      { numRuns: 100 }
    );
  });

  it("returns isValid: false with serviceType error when serviceType is empty or whitespace-only", () => {
    fc.assert(
      fc.property(validFullName, validEmail, invalidServiceType, validMessage, (fullName, email, serviceType, message) => {
        const result = validateForm({ fullName, email, serviceType, message });
        expect(result.isValid).toBe(false);
        expect(result.errors.serviceType).toBe("Please select a service type");
      }),
      { numRuns: 100 }
    );
  });

  it("returns isValid: false with message error when message is less than 10 chars after trimming", () => {
    fc.assert(
      fc.property(validFullName, validEmail, validServiceType, invalidMessage, (fullName, email, serviceType, message) => {
        const result = validateForm({ fullName, email, serviceType, message });
        expect(result.isValid).toBe(false);
        expect(result.errors.message).toBe("Message must be at least 10 characters");
      }),
      { numRuns: 100 }
    );
  });

  it("isValidEmail correctly validates email format using regex /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/", () => {
    // Valid emails: local@domain.tld structure with no spaces or @ in parts
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 20 }).filter((s) => !/[\s@]/.test(s) && s.length > 0),
        fc.string({ minLength: 1, maxLength: 20 }).filter((s) => !/[\s@.]/.test(s) && s.length > 0),
        fc.string({ minLength: 1, maxLength: 10 }).filter((s) => !/[\s@.]/.test(s) && s.length > 0),
        (local, domain, tld) => {
          const email = `${local}@${domain}.${tld}`;
          expect(isValidEmail(email)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );

    // Invalid emails: missing @, missing dot after @, or containing spaces
    fc.assert(
      fc.property(
        fc.oneof(
          // No @ sign at all
          fc.string({ minLength: 1, maxLength: 30 }).filter((s) => !s.includes("@")),
          // Nothing before @
          fc.string({ minLength: 1, maxLength: 20 }).filter((s) => !/[\s@]/.test(s)).map((s) => `@${s}.com`),
          // Nothing after @
          fc.string({ minLength: 1, maxLength: 20 }).filter((s) => !/[\s@]/.test(s)).map((s) => `${s}@`),
          // No dot in domain part
          fc.tuple(
            fc.string({ minLength: 1, maxLength: 15 }).filter((s) => !/[\s@]/.test(s)),
            fc.string({ minLength: 1, maxLength: 15 }).filter((s) => !/[\s@.]/.test(s))
          ).map(([local, domain]) => `${local}@${domain}`),
          // Contains space
          fc.tuple(
            fc.string({ minLength: 1, maxLength: 10 }).filter((s) => !/[\s@]/.test(s)),
            fc.string({ minLength: 1, maxLength: 10 }).filter((s) => !/[\s@]/.test(s))
          ).map(([a, b]) => `${a} ${b}@domain.com`)
        ),
        (email) => {
          expect(isValidEmail(email)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("isValid is true if and only if errors object is empty", () => {
    // For any arbitrary form data, isValid should be true iff errors is empty
    const arbitraryFormData = fc.record({
      fullName: fc.oneof(validFullName, invalidFullName),
      email: fc.oneof(validEmail, invalidEmail),
      serviceType: fc.oneof(validServiceType, invalidServiceType),
      message: fc.oneof(validMessage, invalidMessage),
    });

    fc.assert(
      fc.property(arbitraryFormData, (formData) => {
        const result = validateForm(formData);
        const hasNoErrors = Object.keys(result.errors).length === 0;
        expect(result.isValid).toBe(hasNoErrors);
      }),
      { numRuns: 100 }
    );
  });
});
