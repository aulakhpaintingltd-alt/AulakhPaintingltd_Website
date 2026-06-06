/**
 * Validates contact form data.
 * @param {Object} formData - { fullName, email, phone, serviceType, message }
 * @returns {Object} - { isValid: boolean, errors: { [field]: string } }
 */
export function validateForm(formData) {
  const errors = {};

  if (!formData.fullName || formData.fullName.trim() === "") {
    errors.fullName = "Full name is required";
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.serviceType || formData.serviceType.trim() === "") {
    errors.serviceType = "Please select a service type";
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

/**
 * Validates an email address using a simplified RFC 5322 pattern.
 * @param {string} email - The email address to validate
 * @returns {boolean} - Whether the email matches a valid format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
