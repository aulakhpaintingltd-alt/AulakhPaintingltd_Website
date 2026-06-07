import { useState, useRef } from 'react';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import './BeforeAfter.css';

// Use static imports but with lazy loading on img tags
// Vite will hash these and serve them as static assets
import before1 from '../../assets/images/before_1.jpg';
import after1 from '../../assets/images/after_1.jpg';
import before2 from '../../assets/images/before_2.jpg';
import after2 from '../../assets/images/after_2.jpg';
import before3 from '../../assets/images/before_3.jpg';
import after3 from '../../assets/images/after_3.jpg';
import before4 from '../../assets/images/before_4.jpg';
import after4 from '../../assets/images/after_4.jpg';
import before5 from '../../assets/images/before_5.jpg';
import after5 from '../../assets/images/after_5.jpg';
import before6 from '../../assets/images/before_6.jpg';
import after6 from '../../assets/images/after_6.jpg';
import before7 from '../../assets/images/before_7.jpg';
import after7 from '../../assets/images/after_7.jpg';
import before8 from '../../assets/images/before_8.jpg';
import after8 from '../../assets/images/after_8.jpg';
import before9 from '../../assets/images/before_9.jpg';
import after9 from '../../assets/images/after_9.png';
import before10 from '../../assets/images/before_10.jpg';
import after10 from '../../assets/images/after_10.jpg';
import before11 from '../../assets/images/before_11.jpg';
import after11 from '../../assets/images/after_11.jpg';

const IMAGE_PAIRS = [
  { id: 1, before: before1, after: after1, label: 'Exterior Paint' },
  { id: 2, before: before2, after: after2, label: 'Exterior house paint facia and shingles' },
  { id: 3, before: before3, after: after3, label: 'Commercial Shop' },
  { id: 4, before: before4, after: after4, label: 'Walls Deck Staining' },
  { id: 5, before: before5, after: after5, label: 'From Light & Plain to Rich & Elegant' },
  { id: 6, before: before6, after: after6, label: 'Accent Wall' },
  { id: 7, before: before7, after: after7, label: 'Custom Kids Bedroom' },
  { id: 8, before: before8, after: after8, label: 'From Construction to Completion' },
  { id: 9, before: before9, after: after9, label: 'Repaint Exterior' },
  { id: 10, before: before10, after: after10, label: 'New Home Exterior Finish' },
  { id: 11, before: before11, after: after11, label: 'A brighter more Moderate Kitchen' },
];

/**
 * ImageSlider - A single before/after comparison slider card.
 */
function ImageSlider({ before, after, label }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);

  const handleInput = (e) => {
    setPosition(Number(e.target.value));
  };

  return (
    <div className="ba-slider-card">
      <div
        className="ba-container"
        ref={containerRef}
        style={{ '--position': `${position}%` }}
      >
        <div className="ba-image-container">
          <img
            className="ba-image ba-image--after"
            src={after}
            alt={`${label} - After`}
            loading="lazy"
            decoding="async"
          />
          <img
            className="ba-image ba-image--before"
            src={before}
            alt={`${label} - Before`}
            loading="lazy"
            decoding="async"
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onInput={handleInput}
          aria-label="Percentage of before photo shown"
          className="ba-slider-input"
        />
        <div className="ba-slider-line" aria-hidden="true"></div>
        <div className="ba-slider-button" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
            <line x1="96" y1="128" x2="16" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
            <polyline points="48 160 16 128 48 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline>
            <line x1="160" y1="128" x2="240" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
            <polyline points="208 96 240 128 208 160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline>
          </svg>
        </div>
      </div>
      <div className="ba-labels">
        <span className="ba-label ba-label--before">Before</span>
        <span className="ba-label ba-label--after">After</span>
      </div>
      <p className="ba-card-title">{label}</p>
    </div>
  );
}

/**
 * BeforeAfter Section - Shows before/after image comparison sliders.
 */
function BeforeAfter() {
  return (
    <section id="before-after" className="before-after">
      <div className="before-after__container">
        <AnimateOnScroll animation="fade-up" duration={600}>
          <h2 className="before-after__heading">Before & After</h2>
          <p className="before-after__subtitle">
            See the difference our professional painting services make. Drag the slider to compare.
          </p>
        </AnimateOnScroll>

        <div className="before-after__grid">
          {IMAGE_PAIRS.map((pair, index) => (
            <AnimateOnScroll key={pair.id} animation="fade-up" delay={index * 100} duration={700}>
              <ImageSlider
                before={pair.before}
                after={pair.after}
                label={pair.label}
              />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BeforeAfter;
