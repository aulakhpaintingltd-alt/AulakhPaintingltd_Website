import { ABOUT_CONTENT } from '../../config/constants';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import jeewanImg from '../../assets/images/jeewan_singh.jpg';
import './About.css';

/**
 * About Section - Image slides from left, text slides from right on scroll.
 */
function About() {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <AnimateOnScroll animation="fade-up" duration={600}>
          <h2 className="about__section-heading">{ABOUT_CONTENT.heading}</h2>
        </AnimateOnScroll>

        <div className="about__content">
          <AnimateOnScroll animation="fade-right" duration={800} className="about__portrait">
            <img
              src={jeewanImg}
              alt="Jeevan Singh, Owner and Operator of Aulakh Painting Ltd"
              className="about__portrait-image"
              loading="lazy"
            />
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-left" duration={800} delay={200} className="about__info">
            <h3 className="about__owner-name">{ABOUT_CONTENT.ownerName}</h3>
            <p className="about__owner-title">{ABOUT_CONTENT.title}</p>
            <p className="about__description">{ABOUT_CONTENT.description}</p>
            <ul className="about__values-list">
              {ABOUT_CONTENT.values.map((value, index) => (
                <li key={index} className="about__values-item">
                  {value}
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

export default About;
