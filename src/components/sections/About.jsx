import AnimateOnScroll from '../ui/AnimateOnScroll';
import './About.css';

function About() {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <AnimateOnScroll animation="fade-up" duration={600}>
          <h2 className="about__heading">About Us</h2>
          <div className="about__divider"></div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" duration={800} delay={200}>
          <p className="about__intro">
            At Aulakh Painting Ltd, we are a team of dedicated professionals committed to transforming spaces with precision, care, and attention to detail. Based in Surrey, BC, we proudly serve communities across the Greater Vancouver area and beyond.
          </p>
        </AnimateOnScroll>

        <div className="about__values-grid">
          <AnimateOnScroll animation="fade-up" duration={600} delay={100}>
            <div className="about__value-card">
              <div className="about__value-icon">🎨</div>
              <h3 className="about__value-title">Quality Craftsmanship</h3>
              <p className="about__value-text">Every brush stroke reflects our commitment to excellence. We use premium paints and materials for a flawless, long-lasting finish.</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" duration={600} delay={200}>
            <div className="about__value-card">
              <div className="about__value-icon">🤝</div>
              <h3 className="about__value-title">Honest Communication</h3>
              <p className="about__value-text">We believe in transparent pricing, clear timelines, and keeping you informed at every step of the project.</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" duration={600} delay={300}>
            <div className="about__value-card">
              <div className="about__value-icon">🏠</div>
              <h3 className="about__value-title">Respect for Your Space</h3>
              <p className="about__value-text">We treat your home or business like our own — clean work areas, protective coverings, and thorough cleanup when we're done.</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" duration={600} delay={400}>
            <div className="about__value-card">
              <div className="about__value-icon">⏱️</div>
              <h3 className="about__value-title">Timely Completion</h3>
              <p className="about__value-text">We respect your time. Our team works efficiently to deliver projects on schedule without cutting corners.</p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

export default About;
