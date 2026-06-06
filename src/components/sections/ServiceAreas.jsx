import { SERVICE_AREAS, SERVICE_AREAS_CONTENT, GOOGLE_MAPS_URL } from '../../config/constants';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import './ServiceAreas.css';

/**
 * ServiceAreas section - Map on left (clickable to Google Maps), city names on right (clickable to contact).
 */
function ServiceAreas() {
  const handleCityClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="service-areas" className="service-areas">
      <div className="service-areas__container">
        <AnimateOnScroll animation="fade-up" duration={600}>
          <h2 className="service-areas__heading">Our Service Areas</h2>
          <div className="service-areas__divider"></div>
        </AnimateOnScroll>

        <div className="service-areas__content">
          <AnimateOnScroll animation="fade-right" duration={800} className="service-areas__map-side">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="service-areas__map-link"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d334841.5!2d-123.0!3d49.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548674884567a7ed%3A0x50135fca5e6d4b47!2sSurrey%2C%20BC!5e0!3m2!1sen!2sca!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '8px', pointerEvents: 'none' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aulakh Painting Service Areas - Surrey, BC"
              ></iframe>
              <div className="service-areas__map-overlay">
                <span>📍 Click to open in Google Maps</span>
              </div>
            </a>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-left" duration={800} delay={200} className="service-areas__cities-side">
            <div className="service-areas__cities-grid">
              {SERVICE_AREAS.map((city) => (
                <a
                  key={city}
                  href="#contact"
                  className="service-areas__city"
                  onClick={handleCityClick}
                >
                  {city}
                </a>
              ))}
            </div>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll animation="fade-up" delay={400}>
          <p className="service-areas__note">
            {SERVICE_AREAS_CONTENT.note}
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

export default ServiceAreas;
