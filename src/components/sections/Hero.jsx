import { useState, useEffect, useRef } from 'react';
import CTAButton from '../ui/CTAButton';
import { HOOK_LINE, HERO_CONTENT, PRIMARY_PHONE } from '../../config/constants';
import './Hero.css';

import img1 from '../../assets/images/hero_1.jpg';
import img2 from '../../assets/images/hero_2.jpg';
import img3 from '../../assets/images/hero_3.jpg';
import img4 from '../../assets/images/hero_4.jpg';

const HERO_IMAGES = [img1, img2, img3, img4];
const SLIDE_INTERVAL = 2000; // 5 seconds per slide

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      {/* Background image carousel */}
      <div className="hero__carousel">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`hero__slide ${index === currentIndex ? 'hero__slide--active' : ''}`}
          >
            <img src={img} alt="" className="hero__slide-img" />
          </div>
        ))}
      </div>

      {/* Dark overlay for text readability */}
      <div className="hero__overlay" />

      {/* Content */}
      <div className="hero__content">
        <h1 className="hero__heading fade-up">{HOOK_LINE}</h1>
        <p className="hero__intro fade-up fade-up--delay">{HERO_CONTENT.intro}</p>
        <div className="hero__cta fade-up fade-up--delay-2">
          <CTAButton
            label="Get Free Estimate"
            onClick={handleScrollToContact}
            variant="primary"
          />
          <CTAButton
            label={PRIMARY_PHONE}
            href={`tel:${PRIMARY_PHONE.replace(/-/g, '')}`}
            variant="phone"
          />
        </div>
      </div>

      {/* Slide indicators */}
      <div className="hero__indicators">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            className={`hero__indicator ${index === currentIndex ? 'hero__indicator--active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
