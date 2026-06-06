import { useState, useEffect, useCallback } from 'react';
import './SectionLoader.css';

/**
 * SectionLoader - Displays skeleton placeholders while section content loads.
 * Shows layout-specific skeleton shapes with a pulsing gradient animation.
 * Includes ARIA live region for accessibility and error/retry handling.
 *
 * @param {Object} props
 * @param {string} props.layout - Determines skeleton shape ('hero'|'about'|'services'|'why-choose-us'|'service-areas'|'contact')
 * @param {boolean} [props.isReady=false] - When true, triggers fade-out transition
 * @param {Function} [props.onRetry] - Callback when retry button is clicked after timeout
 */
function SectionLoader({ layout, isReady = false, onRetry }) {
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // 10-second timeout for error state
  useEffect(() => {
    if (isReady) return;

    const timer = setTimeout(() => {
      setHasTimedOut(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [isReady]);

  // Fade-out transition when content becomes ready
  useEffect(() => {
    if (isReady) {
      setIsFadingOut(true);
    }
  }, [isReady]);

  const handleRetry = useCallback(() => {
    setHasTimedOut(false);
    if (onRetry) {
      onRetry();
    }
  }, [onRetry]);

  // Error state with retry button
  if (hasTimedOut && !isReady) {
    return (
      <div
        className={`section-loader section-loader--${layout}`}
        role="alert"
        aria-live="assertive"
      >
        <div className="section-loader__error">
          <p className="section-loader__error-message">
            This section could not be loaded. Please try again.
          </p>
          <button
            type="button"
            className="section-loader__retry-button"
            onClick={handleRetry}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const containerClassName = [
    'section-loader',
    `section-loader--${layout}`,
    isFadingOut ? 'section-loader--fade-out' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClassName}
      aria-live="polite"
      aria-busy={!isReady}
      aria-label="Content is loading"
    >
      {renderSkeleton(layout)}
    </div>
  );
}

/**
 * Renders layout-specific skeleton blocks.
 */
function renderSkeleton(layout) {
  switch (layout) {
    case 'hero':
      return (
        <>
          <div className="section-loader__skeleton section-loader__heading" />
          <div className="section-loader__skeleton section-loader__text" />
          <div className="section-loader__skeleton section-loader__text--short section-loader__text" />
          <div className="section-loader__skeleton section-loader__button" />
        </>
      );

    case 'about':
      return (
        <>
          <div className="section-loader__skeleton section-loader__heading" />
          <div className="section-loader__skeleton section-loader__image" />
          <div className="section-loader__skeleton section-loader__text" />
          <div className="section-loader__skeleton section-loader__text" />
          <div className="section-loader__skeleton section-loader__text--short section-loader__text" />
        </>
      );

    case 'services':
      return (
        <>
          <div className="section-loader__skeleton section-loader__heading" />
          <div className="section-loader__grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="section-loader__skeleton section-loader__card"
              />
            ))}
          </div>
        </>
      );

    case 'why-choose-us':
      return (
        <>
          <div className="section-loader__skeleton section-loader__heading" />
          <div className="section-loader__grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <div className="section-loader__skeleton section-loader__text--shorter section-loader__text" />
                <div className="section-loader__skeleton section-loader__text" />
                <div className="section-loader__skeleton section-loader__text--short section-loader__text" />
              </div>
            ))}
          </div>
        </>
      );

    case 'service-areas':
      return (
        <>
          <div className="section-loader__skeleton section-loader__heading" />
          <div className="section-loader__skeleton section-loader__image" />
          <div className="section-loader__columns">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="section-loader__skeleton section-loader__column-item"
              />
            ))}
          </div>
        </>
      );

    case 'contact':
      return (
        <>
          <div className="section-loader__skeleton section-loader__heading" />
          <div className="section-loader__skeleton section-loader__text--short section-loader__text" />
          <div className="section-loader__skeleton section-loader__form-field" />
          <div className="section-loader__skeleton section-loader__form-field" />
          <div className="section-loader__skeleton section-loader__form-field" />
          <div className="section-loader__skeleton section-loader__form-field" />
          <div className="section-loader__skeleton section-loader__form-field--textarea section-loader__form-field" />
          <div className="section-loader__skeleton section-loader__button" style={{ width: '150px', height: '2.5rem' }} />
        </>
      );

    default:
      return (
        <>
          <div className="section-loader__skeleton section-loader__heading" />
          <div className="section-loader__skeleton section-loader__text" />
          <div className="section-loader__skeleton section-loader__text" />
          <div className="section-loader__skeleton section-loader__text--short section-loader__text" />
        </>
      );
  }
}

export default SectionLoader;
