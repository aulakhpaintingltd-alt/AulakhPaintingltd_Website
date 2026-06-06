import { useState, useEffect, useRef } from 'react';
import './ServiceCard.css';

function ServiceCard({ title, description, subServices, images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [images]);

  return (
    <article className="service-card">
      <div className="service-card__carousel">
        {images && images.length > 0 ? (
          images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${title} ${index + 1}`}
              className={`service-card__slide ${index === currentIndex ? 'service-card__slide--active' : ''}`}
              loading="lazy"
              decoding="async"
            />
          ))
        ) : (
          <div className="service-card__placeholder">
            <span>No image</span>
          </div>
        )}
      </div>
      <div className="service-card__content">
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__description">{description}</p>
        {subServices && subServices.length > 0 && (
          <ul className="service-card__list">
            {subServices.map((service, index) => (
              <li key={index} className="service-card__list-item">
                {service}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export default ServiceCard;
