import {
  COMPANY_NAME,
  HOOK_LINE,
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  EMAIL,
  INSTAGRAM_URL,
  ADDRESS,
  NAV_LINKS,
} from '../../config/constants';
import logo from '../../assets/images/logo.png';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src={logo} alt={COMPANY_NAME} className="footer-logo" />
          <p className="footer-hook-line">{HOOK_LINE}</p>
        </div>

        <div className="footer-contact">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="footer-contact-list">
            <li>
              <a href={`tel:${PRIMARY_PHONE}`} className="footer-link">
                {PRIMARY_PHONE}
              </a>
            </li>
            <li>
              <a href={`tel:${SECONDARY_PHONE}`} className="footer-link">
                {SECONDARY_PHONE}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="footer-link">
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link footer-instagram"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-location">
          <h3 className="footer-heading">Location</h3>
          <p className="footer-address">{ADDRESS}</p>
        </div>

        <div className="footer-nav">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="footer-link"
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {currentYear} {COMPANY_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
