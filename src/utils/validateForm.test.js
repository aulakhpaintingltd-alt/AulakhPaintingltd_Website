import { describe, it, expect } from "vitest";
import { validateForm, isValidEmail } from "./validateForm";

describe("validateForm", () => {
  it("returns isValid true when all fields are valid", () => {
    const formData = {
      fullName: "John Doe",
      email: "john@example.com",
      serviceType: "Residential Painting",
      message: "I need my house painted please",
    };

    const result = validateForm(formData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("returns error when fullName is empty", () => {
    const formData = {
      fullName: "",
      email: "john@example.com",
      serviceType: "Residential Painting",
      message: "I need my house painted please",
    };

    const result = validateForm(formData);
    expect(result.isValid).toBe(false);
    expect(result.errors.fullName).toBe("Full name is required");
  });

  it("returns error when fullName is only whitespace", () => {
    const formData = {
      fullName: "   ",
      email: "john@example.com",
      serviceType: "Residential Painting",
      message: "I need my house painted please",
    };

    const result = validateForm(formData);
    expect(result.isValid).toBe(false);
    expect(result.errors.fullName).toBe("Full name is required");
  });

  it("returns error when email is invalid", () => {
    const formData = {
      fullName: "John Doe",
      email: "not-an-email",
      serviceType: "Residential Painting",
      message: "I need my house painted please",
    };

    const result = validateForm(formData);
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe("Please enter a valid email address");
  });

  it("returns error when email is empty", () => {
    const formData = {
      fullName: "John Doe",
      email: "",
      serviceType: "Residential Painting",
      message: "I need my house painted please",
    };

    const result = validateForm(formData);
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe("Please enter a valid email address");
  });

  it("returns error when serviceType is empty", () => {
    const formData = {
      fullName: "John Doe",
      email: "john@example.com",
      serviceType: "",
      message: "I need my house painted please",
    };

    const result = validateForm(formData);
    expect(result.isValid).toBe(false);
    expect(result.errors.serviceType).toBe("Please select a service type");
  });

  it("returns error when message is less than 10 characters", () => {
    const formData = {
      fullName: "John Doe",
      email: "john@example.com",
      serviceType: "Residential Painting",
      message: "Short",
    };

    const result = validateForm(formData);
    expect(result.isValid).toBe(false);
    expect(result.errors.message).toBe("Message must be at least 10 characters");
  });

  it("trims message before checking length", () => {
    const formData = {
      fullName: "John Doe",
      email: "john@example.com",
      serviceType: "Residential Painting",
      message: "   short   ",
    };

    const result = validateForm(formData);
    expect(result.isValid).toBe(false);
    expect(result.errors.message).toBe("Message must be at least 10 characters");
  });

  it("accepts message with exactly 10 characters after trimming", () => {
    const formData = {
      fullName: "John Doe",
      email: "john@example.com",
      serviceType: "Residential Painting",
      message: "1234567890",
    };

    const result = validateForm(formData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("returns multiple errors when multiple fields are invalid", () => {
    const formData = {
      fullName: "",
      email: "bad",
      serviceType: "",
      message: "hi",
    };

    const result = validateForm(formData);
    expect(result.isValid).toBe(false);
    expect(Object.keys(result.errors)).toHaveLength(4);
    expect(result.errors.fullName).toBe("Full name is required");
    expect(result.errors.email).toBe("Please enter a valid email address");
    expect(result.errors.serviceType).toBe("Please select a service type");
    expect(result.errors.message).toBe("Message must be at least 10 characters");
  });
});

describe("isValidEmail", () => {
  it("returns true for valid email formats", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("name.last@domain.co")).toBe(true);
    expect(isValidEmail("user+tag@sub.domain.org")).toBe(true);
  });

  it("returns false for invalid email formats", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("noatsign")).toBe(false);
    expect(isValidEmail("@nodomain.com")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
    expect(isValidEmail("user @domain.com")).toBe(false);
    expect(isValidEmail("user@domain")).toBe(false);
  });
});
