# Requirements Document

## Introduction

A professional single-page website for Aulakh Painting Ltd, a painting company based in British Columbia, Canada. The website showcases the company's services, builds trust through professional presentation, and drives customer inquiries through clear calls-to-action. Built with React + Vite, the site features smooth scroll animations, section-specific loading states, responsive design, and a well-organized component architecture with dedicated constants and colour configuration files.

## Glossary

- **Website**: The Aulakh Painting Ltd single-page React application served via Vite
- **Navbar**: The fixed navigation bar at the top of the Website providing smooth-scroll links to each section
- **Hero_Section**: The full-viewport introductory section displaying the company hook line and primary call-to-action
- **About_Section**: The section introducing the company owner and company values
- **Services_Section**: The section displaying service category cards with descriptions
- **WhyChooseUs_Section**: The section highlighting company differentiators and guarantees
- **ServiceAreas_Section**: The section listing cities and regions served in British Columbia
- **Contact_Section**: The section containing the free estimate request form and contact information
- **Footer**: The bottom section containing contact details, social links, and copyright information
- **Section_Loader**: A skeleton/placeholder animation displayed while a section's content is loading
- **Scroll_Animation**: A CSS/JS animation triggered when a section enters the viewport during scrolling
- **Constants_File**: A dedicated JavaScript module exporting all text content, phone numbers, email, and configuration values
- **Colours_File**: A dedicated JavaScript/CSS module defining the colour palette used throughout the Website
- **Image_Placeholder**: A styled container with defined dimensions reserving space for images to be added later
- **Service_Card**: A UI card component displaying a service category title, description, and list of sub-services
- **CTA_Button**: A call-to-action button directing users to the Contact_Section or phone contact
- **Image_Guide**: A markdown documentation file specifying image file names, dimensions, and placement locations

## Requirements

### Requirement 1: Navigation Bar

**User Story:** As a visitor, I want a fixed navigation bar at the top of the page, so that I can quickly navigate to any section of the website.

#### Acceptance Criteria

1. THE Navbar SHALL display the company name "Aulakh Painting Ltd" as a logo/brand element on the left side
2. THE Navbar SHALL contain navigation links for Home, About, Services, Why Choose Us, Service Areas, and Contact sections
3. WHEN a visitor clicks a navigation link, THE Navbar SHALL smooth-scroll the page to the corresponding section using the browser's native smooth scroll behavior
4. THE Navbar SHALL remain fixed at the top of the viewport during scrolling
5. WHILE the viewport width is less than 768px, THE Navbar SHALL collapse navigation links into a hamburger menu icon
6. WHEN a visitor clicks the hamburger menu icon, THE Navbar SHALL expand to show all navigation links in a vertical layout
7. WHEN a visitor clicks a navigation link while the mobile menu is expanded, THE Navbar SHALL close the mobile menu and scroll to the selected section
8. WHILE a section is in the viewport, THE Navbar SHALL visually distinguish the corresponding navigation link from non-active links using a style differentiation such as color change, underline, or font weight change
9. IF multiple sections are simultaneously visible in the viewport, THEN THE Navbar SHALL highlight the navigation link corresponding to the section closest to the top of the viewport

### Requirement 2: Hero Section

**User Story:** As a visitor, I want to see an impactful hero section when I land on the page, so that I immediately understand what the company does and feel compelled to take action.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy the full viewport height (100vh) on initial page load
2. THE Hero_Section SHALL display the hook line "Brush and blend, no rough end." as the primary heading using an h1 element
3. THE Hero_Section SHALL display a brief company introduction text below the heading sourced from the Constants_File
4. THE Hero_Section SHALL contain a CTA_Button labelled "Get Free Estimate" that smooth-scrolls to the Contact_Section when clicked
5. THE Hero_Section SHALL contain an Image_Placeholder for a background or featured image with minimum dimensions of 1920x1080 pixels
6. WHEN the Hero_Section loads, THE Hero_Section SHALL animate the heading and CTA_Button into view with a fade-up animation completing within 800 milliseconds
7. THE Hero_Section SHALL display a secondary CTA_Button labelled with the primary phone number (672-833-0578) as a clickable tel link

### Requirement 3: About Us Section

**User Story:** As a visitor, I want to learn about the company owner and values, so that I can trust the company with my painting project.

#### Acceptance Criteria

1. THE About_Section SHALL display the owner name "Jeevan Singh" as a heading and the title "Owner/Operator" as a secondary text element visually distinct from the name
2. THE About_Section SHALL contain an Image_Placeholder for the owner's portrait photo with dimensions of 400x500 pixels and alt text describing the expected portrait image
3. THE About_Section SHALL display a company description paragraph sourced from the Constants_File
4. THE About_Section SHALL display company values sourced from the Constants_File as a vertically stacked list with each value as a separate visible item
5. WHEN at least 20 percent of the About_Section enters the viewport during scrolling, THE Scroll_Animation SHALL animate the section content into view within 600 milliseconds
6. THE About_Section SHALL display a section heading sourced from the Constants_File identifying the section purpose

### Requirement 4: Services Section

**User Story:** As a visitor, I want to browse all available services organized by category, so that I can find the specific painting service I need.

#### Acceptance Criteria

1. THE Services_Section SHALL display a Service_Card for each of the six service categories: Residential Painting, Exterior Painting, Commercial Painting, Wood Staining, Pressure Washing and Exterior Cleaning, and Surface Preparation
2. EACH Service_Card SHALL display the service category title, a brief description, and a list of sub-services sourced from the Constants_File
3. EACH Service_Card SHALL contain an Image_Placeholder with dimensions of 400x300 pixels for a service-specific image
4. THE Services_Section SHALL arrange Service_Cards in a responsive grid layout with 3 columns on viewports 1024px and above, 2 columns on viewports between 768px and 1023px, and 1 column on viewports below 768px
5. WHEN the Services_Section enters the viewport during scrolling, THE Scroll_Animation SHALL stagger the appearance of each Service_Card with a 100-millisecond delay between cards
6. WHILE a visitor hovers over a Service_Card on devices that support hover, THE Service_Card SHALL apply a translateY of -4px and a box-shadow elevation increase over a 200-millisecond transition

### Requirement 5: Why Choose Us Section

**User Story:** As a visitor, I want to understand what differentiates this company from competitors, so that I can feel confident choosing them for my project.

#### Acceptance Criteria

1. THE WhyChooseUs_Section SHALL display the following differentiators as individual feature items: Workmanship Guarantee, Fully Licensed and Insured, WorkSafeBC Covered, Premium Paints Stains and Materials, Free Estimates and Consultations, and Customer Satisfaction Priority
2. EACH feature item SHALL display an icon placeholder, a title, and a description of no more than 120 characters
3. THE WhyChooseUs_Section SHALL arrange feature items in a responsive grid with 3 columns on viewports 1024px and above, 2 columns on viewports between 768px and 1023px, and 1 column on viewports below 768px
4. WHEN the WhyChooseUs_Section enters the viewport during scrolling, THE Scroll_Animation SHALL animate each feature item into view with a fade-in and upward translate over a duration of 400ms, with a stagger delay of 100ms between each item
5. WHEN the viewport is resized across breakpoints, THE WhyChooseUs_Section SHALL reflow the grid layout to match the column count for the current viewport width without requiring a page reload

### Requirement 6: Service Areas Section

**User Story:** As a visitor, I want to see which areas the company serves, so that I can confirm they operate in my location.

#### Acceptance Criteria

1. THE ServiceAreas_Section SHALL display a list of cities and regions served in British Columbia sourced from the Constants_File, arranged in a multi-column grid with 3 columns on desktop, 2 columns on tablet, and 1 column on mobile
2. THE ServiceAreas_Section SHALL include a heading indicating the company proudly serves the Greater British Columbia area
3. THE ServiceAreas_Section SHALL contain an Image_Placeholder for a map or regional graphic with dimensions of 600x400 pixels
4. WHEN at least 20 percent of the ServiceAreas_Section enters the viewport during scrolling, THE Scroll_Animation SHALL animate the content into view within 600 milliseconds
5. THE ServiceAreas_Section SHALL include a note indicating the company also serves surrounding areas across British Columbia

### Requirement 7: Contact and Free Estimate Section

**User Story:** As a visitor, I want to easily request a free estimate or contact the company, so that I can start my painting project.

#### Acceptance Criteria

1. THE Contact_Section SHALL display both phone numbers (672-833-0578 and 672-338-7790) as clickable tel links
2. THE Contact_Section SHALL display the email address Aulakhpaintingltd@gmail.com as a clickable mailto link
3. THE Contact_Section SHALL contain a contact form with the following fields: full name (required), email (required, validated for email format), phone number (optional), service type dropdown (required, options sourced from the Constants_File service categories), and message (required, minimum 10 characters)
4. WHEN a visitor submits the contact form with all required fields completed and valid, THE Contact_Section SHALL display a success confirmation message
5. IF a visitor submits the contact form with missing or invalid required fields, THEN THE Contact_Section SHALL display inline validation error messages adjacent to each invalid field
6. WHILE the viewport width is less than 768px, THE Contact_Section SHALL display a prominent CTA_Button for direct phone calling using a tel link to the primary phone number
7. WHEN at least 20 percent of the Contact_Section enters the viewport during scrolling, THE Scroll_Animation SHALL animate the content into view within 600 milliseconds

### Requirement 8: Footer

**User Story:** As a visitor, I want to find all contact information and social links in the footer, so that I can reach the company through my preferred channel.

#### Acceptance Criteria

1. THE Footer SHALL display the company name "Aulakh Painting Ltd" and the hook line "Brush and blend, no rough end."
2. THE Footer SHALL display both phone numbers (672-833-0578 and 672-338-7790) as clickable tel links
3. THE Footer SHALL display the email address Aulakhpaintingltd@gmail.com as a clickable mailto link
4. THE Footer SHALL display a link to the Instagram profile (https://www.instagram.com/aulakh_painting_ltd) that opens in a new tab with rel="noopener noreferrer"
5. THE Footer SHALL display the company location as "British Columbia, Canada"
6. THE Footer SHALL display a copyright notice in the format "© {current year} Aulakh Painting Ltd. All rights reserved."
7. THE Footer SHALL contain quick navigation links to all main sections (Home, About, Services, Why Choose Us, Service Areas, Contact) that smooth-scroll to the corresponding section when clicked

### Requirement 9: Scroll Animations

**User Story:** As a visitor, I want sections to animate smoothly into view as I scroll, so that the browsing experience feels polished and professional.

#### Acceptance Criteria

1. WHEN a section enters at least 20 percent of the viewport, THE Scroll_Animation SHALL trigger on that section
2. THE Scroll_Animation SHALL apply a fade-up effect transitioning from opacity 0 and translateY 30px to opacity 1 and translateY 0
3. THE Scroll_Animation SHALL complete each transition within 600 milliseconds using an ease-out timing function
4. THE Scroll_Animation SHALL trigger only once per section per page load
5. WHILE the visitor has reduced-motion preferences enabled in their operating system, THE Website SHALL disable all Scroll_Animations and render all sections at full opacity with no transform offset
6. THE Scroll_Animation SHALL set each section to opacity 0 and translateY 30px as its initial state before the section enters the viewport
7. IF a section is already within the viewport on initial page load, THEN THE Scroll_Animation SHALL display that section at full opacity with no transform offset without playing the animation

### Requirement 10: Section Loading States

**User Story:** As a visitor, I want to see loading placeholders while sections prepare their content, so that the page feels responsive during initial load.

#### Acceptance Criteria

1. THE Section_Loader SHALL display a skeleton placeholder that reflects the general block structure of the section content, including rectangular shapes representing headings, text lines, and Image_Placeholders
2. THE Section_Loader SHALL use a pulsing gradient animation with a cycle duration between 1000 and 2000 milliseconds to indicate loading state
3. WHEN the section component has mounted and all its data from the Constants_File is available, THE Section_Loader SHALL transition to the actual content with a fade effect completing within 300 milliseconds
4. THE Section_Loader SHALL maintain a height within 10 pixels of the loaded content height to prevent visible layout shift
5. IF section content fails to load within 10 seconds, THEN THE Section_Loader SHALL display an inline error message indicating the section could not be loaded and offer a retry action
6. WHILE the Section_Loader is visible, THE Section_Loader SHALL communicate the loading state to assistive technologies using an appropriate ARIA live region with a label indicating content is loading

### Requirement 11: Constants and Configuration Architecture

**User Story:** As a developer, I want all text content and configuration values in dedicated files, so that I can easily update content without modifying component code.

#### Acceptance Criteria

1. THE Constants_File SHALL export all company information as named exports including company name "Aulakh Painting Ltd", phone numbers (672-833-0578 and 672-338-7790), email (Aulakhpaintingltd@gmail.com), address ("British Columbia, Canada"), Instagram URL, and hook line ("Brush and blend, no rough end.")
2. THE Constants_File SHALL export all six service categories (Residential Painting, Exterior Painting, Commercial Painting, Wood Staining, Pressure Washing and Exterior Cleaning, and Surface Preparation) each containing a title, description, and a list of at least one sub-service
3. THE Constants_File SHALL export text content for each Website section (Hero, About, Services, Why Choose Us, Service Areas, and Contact) including section headings and descriptive body text
4. THE Constants_File SHALL export the list of service area cities and regions containing at least 5 entries representing locations in British Columbia
5. THE Constants_File SHALL export all six differentiator items (Workmanship Guarantee, Fully Licensed and Insured, WorkSafeBC Covered, Premium Paints Stains and Materials, Free Estimates and Consultations, and Customer Satisfaction Priority) each with a title and description
6. THE Colours_File SHALL define the colour palette including primary, secondary, accent, background, text, and state colours (error, success, and warning)
7. THE Colours_File SHALL export colours as CSS custom properties defined on the :root selector and as named JavaScript constant exports for use in component styles
8. THE Constants_File SHALL use named exports so that components can import individual constants without loading the entire file

### Requirement 12: Image Placeholders and Documentation

**User Story:** As a developer, I want clearly defined image placeholders and documentation, so that I know exactly which images to add and where to place them.

#### Acceptance Criteria

1. EACH Image_Placeholder SHALL render a styled container using the width and height passed as component props, a background colour sourced from the Colours_File, and a centred camera/image icon indicating an image belongs there
2. EACH Image_Placeholder SHALL display alt text passed as a component prop, with a maximum length of 125 characters, describing the expected image content for that location
3. WHEN a valid image source prop is provided to an Image_Placeholder, THE Image_Placeholder SHALL render the actual image at the specified dimensions instead of the placeholder container
4. THE Image_Guide SHALL document every image required by the Website (minimum 9 entries: Hero background, owner portrait, six service category images, and service areas map) including file name, required pixel dimensions, accepted file format (PNG, JPG, or WebP), and the component where the image is used
5. THE Image_Guide SHALL specify that all images be placed in the src/assets/images directory
6. THE Image_Guide SHALL be located at the project root as IMAGE_GUIDE.md

### Requirement 13: Responsive Design

**User Story:** As a visitor on any device, I want the website to display correctly and be fully usable, so that I have a good experience regardless of screen size.

#### Acceptance Criteria

1. THE Website SHALL implement a mobile-first responsive design with breakpoints at 768px for tablet and 1024px for desktop
2. WHILE the viewport width is less than 768px, THE Website SHALL stack all grid layouts into a single column
3. THE Website SHALL ensure all text remains readable without horizontal scrolling on viewports as narrow as 320px, with a minimum body font size of 14px and no text truncation or overflow beyond the viewport edge
4. WHILE the viewport width is less than 768px, THE Website SHALL ensure all interactive elements have a minimum touch target size of 44x44 pixels
5. THE Website SHALL ensure all Image_Placeholders scale proportionally within their container while preserving their aspect ratio and not exceeding their container width on all viewport sizes
6. THE Website SHALL render all content without horizontal overflow or layout breakage at any viewport width between 320px and 1920px

### Requirement 14: Component Architecture

**User Story:** As a developer, I want a well-organized component structure, so that the codebase is maintainable and scalable.

#### Acceptance Criteria

1. THE Website SHALL organize components into directories: components/layout (Navbar, Footer), components/sections (Hero, About, Services, WhyChooseUs, ServiceAreas, Contact), components/ui (ServiceCard, CTAButton, ImagePlaceholder, SectionLoader)
2. THE Website SHALL import all text content exported by the Constants_File (company information, service categories, section headings, body text, service areas, and differentiator items) rather than hardcoding those strings as literals in components
3. THE Website SHALL import all colour values from the Colours_File rather than hardcoding colour codes in stylesheets or inline styles
4. EACH component SHALL be a self-contained module consisting of a single JSX file and a co-located stylesheet or styled definitions, with no direct style imports from other components
5. THE Website SHALL use a single App component to compose all section components in the following order from top to bottom: Navbar, Hero, About, Services, WhyChooseUs, ServiceAreas, Contact, Footer
6. EACH component file SHALL use PascalCase naming matching its component name (e.g., ServiceCard.jsx, CTAButton.jsx)
