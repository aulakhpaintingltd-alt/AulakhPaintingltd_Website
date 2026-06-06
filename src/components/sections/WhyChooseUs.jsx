import { DIFFERENTIATORS, WHY_CHOOSE_US_CONTENT } from '../../config/constants';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import './WhyChooseUs.css';

/**
 * WhyChooseUs Section - Items zoom in with stagger on scroll.
 */
function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="why-choose-us">
      <div className="why-choose-us__container">
        <AnimateOnScroll animation="fade-up" duration={600}>
          <h2 className="why-choose-us__heading">{WHY_CHOOSE_US_CONTENT.heading}</h2>
        </AnimateOnScroll>
        <div className="why-choose-us__grid">
          {DIFFERENTIATORS.map((item, index) => (
            <AnimateOnScroll
              key={item.id}
              animation="zoom-in"
              delay={index * 100}
              duration={500}
            >
              <div className="why-choose-us__item">
                <div className="why-choose-us__icon" aria-hidden="true">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M14 20l4 4 8-8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="why-choose-us__item-title">{item.title}</h3>
                <p className="why-choose-us__item-description">
                  {item.description.length > 120
                    ? item.description.slice(0, 120)
                    : item.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
