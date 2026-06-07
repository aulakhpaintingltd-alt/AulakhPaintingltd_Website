import ServiceCard from '../ui/ServiceCard';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import { SERVICES, SERVICES_CONTENT } from '../../config/constants';
import './Services.css';

// Import service images
import residential1 from '../../assets/images/residential_1.jpg';
import residential2 from '../../assets/images/residential_2.jpg';
import residential3 from '../../assets/images/residential_3.jpg';
import residential4 from '../../assets/images/residential_4.jpg';

import exterior1 from '../../assets/images/exterior_1.jpg';
import exterior2 from '../../assets/images/exterior_2.jpg';
import exterior3 from '../../assets/images/exterior_3.jpg';
import exterior4 from '../../assets/images/exterior_4.jpg';

import commercial1 from '../../assets/images/commercial_1.jpg';
import commercial2 from '../../assets/images/commercial_2.jpg';
import commercial3 from '../../assets/images/commercial_3.jpg';

import woodStaining1 from '../../assets/images/wood_staining_1.jpg';
import woodStaining2 from '../../assets/images/wood_staining_2.jpg';
import woodStaining3 from '../../assets/images/wood_staining_3.jpg';

import pressureWashing1 from '../../assets/images/pressure_washing_1.jpg';
import pressureWashing2 from '../../assets/images/pressure_washing_2.jpg';

import surfacePrep1 from '../../assets/images/surface_prep_1.jpg';
import surfacePrep2 from '../../assets/images/surface_prep_2.jpg';
import surfacePrep3 from '../../assets/images/surface_prep_3.jpg';

// Map service IDs to their image arrays
const SERVICE_IMAGES = {
  residential: [residential1, residential2, residential3, residential4],
  exterior: [exterior1, exterior2, exterior3, exterior4],
  commercial: [commercial1, commercial2, commercial3],
  'wood-staining': [woodStaining1, woodStaining2, woodStaining3],
  'pressure-washing': [pressureWashing1, pressureWashing2],
  'surface-preparation': [surfacePrep1, surfacePrep2, surfacePrep3],
};

/**
 * Services Section - Cards with image carousels and staggered animation.
 */
function Services() {
  return (
    <section id="services" className="services">
      <div className="services__container">
        <AnimateOnScroll animation="fade-up" duration={600}>
          <h2 className="services__heading">{SERVICES_CONTENT.heading}</h2>
        </AnimateOnScroll>
        <div className="services__grid">
          {SERVICES.map((service, index) => (
            <AnimateOnScroll
              key={service.id}
              animation="fade-up"
              delay={index * 100}
              duration={600}
              className="services__card-wrapper"
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                subServices={service.subServices}
                images={SERVICE_IMAGES[service.id] || []}
              />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
