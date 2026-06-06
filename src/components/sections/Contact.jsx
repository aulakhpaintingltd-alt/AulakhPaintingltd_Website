import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import CTAButton from '../ui/CTAButton';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import { validateForm } from '../../utils/validateForm';
import {
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  EMAIL,
  SERVICES,
  CONTACT_CONTENT,
} from '../../config/constants';

// EmailJS configuration - Replace these with your actual IDs from emailjs.com
const EMAILJS_SERVICE_ID = 'service_f9p756l';
const EMAILJS_TEMPLATE_ID = 'template_hkxx5ro';
const EMAILJS_PUBLIC_KEY = 'a3ke27LVGTq3slktg';

/**
 * Contact Section - Sends estimate requests via EmailJS to apathania206@gmail.com
 */
function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendError('');
    const { isValid, errors: validationErrors } = validateForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.fullName,
          from_email: formData.email,
          phone: formData.phone || 'Not provided',
          service_type: formData.serviceType,
          message: formData.message,
          to_email: 'apathania206@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);
      setErrors({});
    } catch (err) {
      setSendError('Failed to send. Please try again or call us directly.');
    } finally {
      setIsSending(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="contact">
        <div className="contact__container">
          <div className="contact__success">
            <div className="contact__success-icon" aria-hidden="true">✓</div>
            <h3 className="contact__success-heading">Thank You!</h3>
            <p className="contact__success-message">
              Your estimate request has been submitted successfully. We will get back to you shortly.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <AnimateOnScroll animation="fade-up" duration={600}>
          <h2 className="contact__heading">{CONTACT_CONTENT.heading}</h2>
        </AnimateOnScroll>

        <div className="contact__content">
          <AnimateOnScroll animation="fade-right" duration={800}>
            <div className="contact__info">
              <h3 className="contact__info-heading">Contact Us Directly</h3>

              <div className="contact__info-item">
                <span className="contact__info-label">Phone:</span>
                <a href={`tel:${PRIMARY_PHONE.replace(/-/g, '')}`} className="contact__link contact__link--phone">
                  {PRIMARY_PHONE}
                </a>
              </div>

              <div className="contact__info-item">
                <span className="contact__info-label">Phone:</span>
                <a href={`tel:${SECONDARY_PHONE.replace(/-/g, '')}`} className="contact__link contact__link--phone">
                  {SECONDARY_PHONE}
                </a>
              </div>

              <div className="contact__info-item">
                <span className="contact__info-label">Email:</span>
                <a href={`mailto:${EMAIL}`} className="contact__link contact__link--email">
                  {EMAIL}
                </a>
              </div>

              <div className="contact__mobile-cta">
                <CTAButton
                  label={`Call ${PRIMARY_PHONE}`}
                  href={`tel:${PRIMARY_PHONE.replace(/-/g, '')}`}
                  variant="phone"
                />
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-left" duration={800} delay={200}>
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="contact__form-group">
                <label htmlFor="contact-fullName" className="contact__label">
                  {CONTACT_CONTENT.formLabels.fullName} <span className="contact__required">*</span>
                </label>
                <input
                  type="text"
                  id="contact-fullName"
                  name="fullName"
                  className={`contact__input ${errors.fullName ? 'contact__input--error' : ''}`}
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && (
                  <span id="error-fullName" className="contact__error" role="alert">
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="contact__form-group">
                <label htmlFor="contact-email" className="contact__label">
                  {CONTACT_CONTENT.formLabels.email} <span className="contact__required">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  className={`contact__input ${errors.email ? 'contact__input--error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <span id="error-email" className="contact__error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="contact__form-group">
                <label htmlFor="contact-phone" className="contact__label">
                  {CONTACT_CONTENT.formLabels.phone}
                </label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  className="contact__input"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="contact-serviceType" className="contact__label">
                  {CONTACT_CONTENT.formLabels.serviceType} <span className="contact__required">*</span>
                </label>
                <select
                  id="contact-serviceType"
                  name="serviceType"
                  className={`contact__select ${errors.serviceType ? 'contact__input--error' : ''}`}
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  aria-describedby={errors.serviceType ? 'error-serviceType' : undefined}
                  aria-invalid={!!errors.serviceType}
                >
                  <option value="">Select a service</option>
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
                {errors.serviceType && (
                  <span id="error-serviceType" className="contact__error" role="alert">
                    {errors.serviceType}
                  </span>
                )}
              </div>

              <div className="contact__form-group">
                <label htmlFor="contact-message" className="contact__label">
                  {CONTACT_CONTENT.formLabels.message} <span className="contact__required">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={`contact__textarea ${errors.message ? 'contact__input--error' : ''}`}
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <span id="error-message" className="contact__error" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              <button type="submit" className="contact__submit" disabled={isSending}>
                {isSending ? 'Sending...' : CONTACT_CONTENT.formLabels.submit}
              </button>
              {sendError && (
                <p className="contact__send-error" role="alert">{sendError}</p>
              )}
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

export default Contact;
