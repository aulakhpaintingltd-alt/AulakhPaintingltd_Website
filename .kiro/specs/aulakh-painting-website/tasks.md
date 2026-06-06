# Implementation Plan: Aulakh Painting Website

## Overview

Build a professional single-page website for Aulakh Painting Ltd using React 19 + Vite 8. The implementation follows a bottom-up approach: configuration files first, then reusable UI components, custom hooks, section components, layout components, and finally wiring everything together in App.jsx. All text content is sourced from a constants file and all colours from a dedicated colours configuration.

## Tasks

- [x] 1. Set up project structure and configuration files
  - [x] 1.1 Create directory structure and colour configuration
    - Create directories: `src/components/layout`, `src/components/sections`, `src/components/ui`, `src/config`, `src/hooks`, `src/styles`, `src/assets/images`, `src/utils`
    - Create `src/styles/colours.css` defining CSS custom properties on `:root` for primary (#1B3A5C), secondary (#D4A843), accent (#2E7D32), background (#FFFFFF), backgroundAlt (#F5F5F5), text (#333333), textLight (#666666), error (#D32F2F), success (#388E3C), warning (#F57C00)
    - Create `src/config/colours.js` exporting the COLOURS object with all palette values as named exports
    - Import `colours.css` in `src/index.css`
    - _Requirements: 11.6, 11.7, 14.1_

  - [x] 1.2 Create constants configuration file
    - Create `src/config/constants.js` with named exports for: COMPANY_NAME, HOOK_LINE, PRIMARY_PHONE, SECONDARY_PHONE, EMAIL, ADDRESS, INSTAGRAM_URL
    - Export NAV_LINKS array with ids and labels for all 6 sections
    - Export SERVICES array with 6 service categories, each containing id, title, description, and subServices array (at least 1 sub-service each)
    - Export DIFFERENTIATORS array with 6 items, each with id, title, and description (max 120 characters)
    - Export SERVICE_AREAS array with at least 5 BC cities/regions
    - Export section content objects: HERO_CONTENT, ABOUT_CONTENT, SERVICES_CONTENT, WHY_CHOOSE_US_CONTENT, SERVICE_AREAS_CONTENT, CONTACT_CONTENT
    - All exports must be named exports
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.8_

  - [x] 1.3 Create IMAGE_GUIDE.md documentation
    - Create `IMAGE_GUIDE.md` at project root documenting all 9+ required images
    - Include entries for: hero background (1920x1080), owner portrait (400x500), 6 service category images (400x300 each), service areas map (600x400)
    - Specify file name, pixel dimensions, accepted formats (PNG, JPG, WebP), and component location for each
    - Specify all images go in `src/assets/images/`
    - _Requirements: 12.4, 12.5, 12.6_

- [x] 2. Implement reusable UI components
  - [x] 2.1 Implement ImagePlaceholder component
    - Create `src/components/ui/ImagePlaceholder.jsx` and `ImagePlaceholder.css`
    - Accept props: width, height, alt, src, className
    - When src is provided, render an `<img>` element with specified dimensions
    - When no src, render a styled container with background colour from Colours_File and a centred camera/image icon
    - Truncate alt text to 125 characters if it exceeds that length
    - Ensure placeholder scales proportionally within container, preserving aspect ratio
    - _Requirements: 12.1, 12.2, 12.3, 13.5_

  - [x] 2.2 Write property test for ImagePlaceholder
    - **Property 5: ImagePlaceholder renders based on props**
    - **Validates: Requirements 12.1, 12.2, 12.3**

  - [x] 2.3 Implement CTAButton component
    - Create `src/components/ui/CTAButton.jsx` and `CTAButton.css`
    - Accept props: label, href, onClick, variant ('primary' | 'secondary' | 'phone')
    - Render as `<a>` if href provided, `<button>` if onClick provided
    - Ensure minimum touch target size of 44x44px
    - Style variants using colours from Colours_File
    - _Requirements: 2.4, 2.7, 13.4_

  - [x] 2.4 Implement ServiceCard component
    - Create `src/components/ui/ServiceCard.jsx` and `ServiceCard.css`
    - Accept props: title, description, subServices, imageSrc, imageAlt
    - Render ImagePlaceholder (400x300), title as heading, description as body text, sub-services as list items
    - Apply hover effect: translateY(-4px) + elevated box-shadow over 200ms transition
    - _Requirements: 4.2, 4.3, 4.6_

  - [x] 2.5 Write property test for ServiceCard
    - **Property 6: ServiceCard displays all service data fields**
    - **Validates: Requirements 4.2**

  - [x] 2.6 Implement SectionLoader component
    - Create `src/components/ui/SectionLoader.jsx` and `SectionLoader.css`
    - Accept layout prop to determine skeleton shape
    - Render skeleton blocks (rectangles for headings, text lines, image placeholders) with pulsing gradient animation (1000-2000ms cycle)
    - Include ARIA live region with loading label for assistive technologies
    - Maintain height close to loaded content to prevent layout shift
    - Display error message with retry button if content fails to load within 10 seconds
    - Fade-out transition (300ms) when content becomes ready
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [x] 3. Implement custom hooks
  - [x] 3.1 Implement useScrollAnimation hook
    - Create `src/hooks/useScrollAnimation.js`
    - Create IntersectionObserver with threshold 0.2
    - On intersection: add 'animate-in' class to element
    - Respect `prefers-reduced-motion` media query — disable animations when set
    - Trigger only once per element (unobserve after animation applied)
    - If element is already in viewport on mount, show immediately without animation
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [x] 3.2 Write property test for useScrollAnimation
    - **Property 3: Scroll animation triggers exactly once at threshold**
    - **Validates: Requirements 9.1, 9.4**

  - [x] 3.3 Implement useActiveSection hook
    - Create `src/hooks/useActiveSection.js`
    - Create IntersectionObserver for all section IDs
    - Track which section is closest to top of viewport when multiple are visible
    - Return activeSection id string
    - _Requirements: 1.8, 1.9_

  - [x] 3.4 Write property test for useActiveSection
    - **Property 1: Active section detection selects topmost visible section**
    - **Validates: Requirements 1.8, 1.9**

- [x] 4. Implement form validation utility
  - [x] 4.1 Create validateForm utility
    - Create `src/utils/validateForm.js`
    - Implement `validateForm(formData)` returning `{ isValid, errors }`
    - Validate: fullName non-empty trimmed string, email matches valid format, serviceType non-empty, message at least 10 characters trimmed
    - Implement `isValidEmail(email)` helper using regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
    - Return field-specific error messages for each invalid field
    - _Requirements: 7.3, 7.4, 7.5_

  - [x] 4.2 Write property test for validateForm
    - **Property 2: Form validation correctness**
    - **Validates: Requirements 7.3, 7.4, 7.5**

- [x] 5. Checkpoint - Ensure foundation is solid
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement section components
  - [x] 6.1 Implement Hero section
    - Create `src/components/sections/Hero.jsx` and `Hero.css`
    - Full viewport height (100vh)
    - Display hook line from constants as h1
    - Display intro text from HERO_CONTENT
    - Two CTA buttons: "Get Free Estimate" (scrolls to contact) and phone number (tel: link)
    - ImagePlaceholder for background/featured image (1920x1080)
    - Fade-up CSS animation on load (800ms) for heading and CTA
    - Integrate SectionLoader for loading state
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [x] 6.2 Implement About section
    - Create `src/components/sections/About.jsx` and `About.css`
    - Display owner name "Jeevan Singh" as heading, "Owner/Operator" as secondary text
    - ImagePlaceholder for portrait (400x500)
    - Description paragraph from ABOUT_CONTENT
    - Values list from ABOUT_CONTENT.values
    - Section heading from constants
    - Integrate useScrollAnimation hook (20% threshold)
    - Integrate SectionLoader for loading state
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [x] 6.3 Implement Services section
    - Create `src/components/sections/Services.jsx` and `Services.css`
    - Render 6 ServiceCard components from SERVICES constant
    - Responsive grid: 3 columns (≥1024px), 2 columns (768-1023px), 1 column (<768px)
    - Staggered scroll animation with 100ms delay between cards
    - Integrate SectionLoader for loading state
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 6.4 Implement WhyChooseUs section
    - Create `src/components/sections/WhyChooseUs.jsx` and `WhyChooseUs.css`
    - Render 6 differentiator items from DIFFERENTIATORS constant
    - Each item: icon placeholder, title, description (max 120 chars)
    - Responsive grid: 3 → 2 → 1 columns at breakpoints
    - Staggered fade-in animation (400ms duration, 100ms stagger)
    - Integrate SectionLoader for loading state
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 6.5 Implement ServiceAreas section
    - Create `src/components/sections/ServiceAreas.jsx` and `ServiceAreas.css`
    - Multi-column list of cities from SERVICE_AREAS constant (3/2/1 columns responsive)
    - Heading indicating Greater BC area service
    - ImagePlaceholder for map (600x400)
    - Note about serving surrounding areas
    - Scroll animation at 20% visibility
    - Integrate SectionLoader for loading state
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [x] 6.6 Implement Contact section
    - Create `src/components/sections/Contact.jsx` and `Contact.css`
    - Display both phone numbers as clickable tel links
    - Display email as clickable mailto link
    - Contact form: full name (required), email (required), phone (optional), service type dropdown (from SERVICES), message (required, min 10 chars)
    - Integrate validateForm utility for inline validation errors
    - Display success confirmation on valid submission
    - Mobile: prominent call button (tel link) below 768px
    - Scroll animation at 20% visibility
    - Integrate SectionLoader for loading state
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

- [x] 7. Implement layout components
  - [x] 7.1 Implement Navbar component
    - Create `src/components/layout/Navbar.jsx` and `Navbar.css`
    - Display company name on left side
    - Navigation links from NAV_LINKS constant
    - Fixed/sticky position at top (z-index: 1000)
    - Smooth scroll on link click via `scrollIntoView({ behavior: 'smooth' })`
    - Integrate useActiveSection hook for active link highlighting
    - Hamburger menu for viewports < 768px
    - Mobile menu: vertical layout, closes on link click or outside click
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9_

  - [x] 7.2 Implement Footer component
    - Create `src/components/layout/Footer.jsx` and `Footer.css`
    - Display company name and hook line
    - Both phone numbers as clickable tel links
    - Email as clickable mailto link
    - Instagram link opening in new tab with rel="noopener noreferrer"
    - Company location "British Columbia, Canada"
    - Copyright notice with dynamic current year
    - Quick navigation links to all sections with smooth scroll
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

- [x] 8. Wire everything together in App.jsx
  - [x] 8.1 Compose App component and global styles
    - Update `src/App.jsx` to import and render all components in order: Navbar, Hero, About, Services, WhyChooseUs, ServiceAreas, Contact, Footer
    - Update `src/App.css` with global layout styles
    - Update `src/index.css` to import colours.css and set base responsive styles (mobile-first, min font 14px)
    - Add scroll-animate base CSS class (opacity: 0, translateY: 30px) and animate-in class (opacity: 1, translateY: 0, transition 600ms ease-out)
    - Add prefers-reduced-motion media query to disable animations globally
    - Ensure no horizontal overflow at any viewport width 320px-1920px
    - _Requirements: 14.5, 13.1, 13.2, 13.3, 13.6, 9.2, 9.3, 9.5, 9.6_

- [x] 8.2 Write property test for constants completeness
    - **Property 4: Constants data structure completeness**
    - **Validates: Requirements 11.1, 11.2, 11.3, 11.5, 5.2**

- [x] 9. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties using `fast-check`
- Unit tests validate specific examples and edge cases
- All text content sourced from constants.js — no hardcoded strings in components
- All colours sourced from colours.js/colours.css — no hardcoded colour codes in components
- Form submission is client-side only (no backend) — shows success message
- Images use placeholders until real assets are provided (see IMAGE_GUIDE.md)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3"] },
    { "id": 1, "tasks": ["2.1", "2.3", "2.6", "3.1", "3.3", "4.1"] },
    { "id": 2, "tasks": ["2.2", "2.4", "3.2", "3.4", "4.2"] },
    { "id": 3, "tasks": ["2.5", "6.1", "6.2", "6.3", "6.4", "6.5", "6.6"] },
    { "id": 4, "tasks": ["7.1", "7.2"] },
    { "id": 5, "tasks": ["8.1", "8.2"] }
  ]
}
```
