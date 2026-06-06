import { useState, useEffect, useRef } from 'react';
import { COMPANY_NAME, NAV_LINKS } from '../../config/constants';
import { useActiveSection } from '../../hooks/useActiveSection';
import logo from '../../assets/images/logo.png';
import './Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Close mobile menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  function handleLinkClick(event, id) {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  return (
    <nav className="navbar" ref={navRef} aria-label="Main navigation">
      <div className="navbar__container">
        <a
          href="#home"
          className="navbar__brand"
          onClick={(e) => handleLinkClick(e, 'home')}
        >
          <img src={logo} alt={COMPANY_NAME} className="navbar__logo" />
        </a>

        <button
          className="navbar__hamburger"
          onClick={toggleMobileMenu}
          ref={menuButtonRef}
          aria-expanded={isMobileMenuOpen}
          aria-controls="navbar-menu"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className={`navbar__hamburger-line ${isMobileMenuOpen ? 'navbar__hamburger-line--open' : ''}`}></span>
          <span className={`navbar__hamburger-line ${isMobileMenuOpen ? 'navbar__hamburger-line--open' : ''}`}></span>
          <span className={`navbar__hamburger-line ${isMobileMenuOpen ? 'navbar__hamburger-line--open' : ''}`}></span>
        </button>

        <ul
          id="navbar-menu"
          className={`navbar__links ${isMobileMenuOpen ? 'navbar__links--open' : ''}`}
          role="menubar"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.id} className="navbar__item" role="none">
              <a
                href={`#${link.id}`}
                className={`navbar__link ${activeSection === link.id ? 'navbar__link--active' : ''}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                role="menuitem"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
