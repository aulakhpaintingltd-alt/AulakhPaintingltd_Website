# Image Guide — Aulakh Painting Ltd Website

All images should be placed in `src/assets/images/`.

Accepted formats: **PNG**, **JPG**, **WebP**

---

## Required Images

| # | File Name | Dimensions | Format | Used In |
|---|-----------|-----------|--------|---------|
| 1 | `hero-background.jpg` | 1920 × 1080 px | PNG, JPG, or WebP | `src/components/sections/Hero.jsx` |
| 2 | `owner-portrait.jpg` | 400 × 500 px | PNG, JPG, or WebP | `src/components/sections/About.jsx` |
| 3 | `service-residential.jpg` | 400 × 300 px | PNG, JPG, or WebP | `src/components/ui/ServiceCard.jsx` (via Services section) |
| 4 | `service-exterior.jpg` | 400 × 300 px | PNG, JPG, or WebP | `src/components/ui/ServiceCard.jsx` (via Services section) |
| 5 | `service-commercial.jpg` | 400 × 300 px | PNG, JPG, or WebP | `src/components/ui/ServiceCard.jsx` (via Services section) |
| 6 | `service-wood-staining.jpg` | 400 × 300 px | PNG, JPG, or WebP | `src/components/ui/ServiceCard.jsx` (via Services section) |
| 7 | `service-pressure-washing.jpg` | 400 × 300 px | PNG, JPG, or WebP | `src/components/ui/ServiceCard.jsx` (via Services section) |
| 8 | `service-surface-preparation.jpg` | 400 × 300 px | PNG, JPG, or WebP | `src/components/ui/ServiceCard.jsx` (via Services section) |
| 9 | `service-areas-map.jpg` | 600 × 400 px | PNG, JPG, or WebP | `src/components/sections/ServiceAreas.jsx` |

---

## Image Details

### 1. Hero Background

- **File name:** `hero-background.jpg`
- **Dimensions:** 1920 × 1080 px
- **Format:** PNG, JPG, or WebP
- **Location:** `src/assets/images/hero-background.jpg`
- **Component:** `src/components/sections/Hero.jsx`
- **Description:** A high-resolution background or featured image for the hero section. Should convey professional painting work — e.g., a freshly painted home exterior, a painter at work, or a clean interior finish.

### 2. Owner Portrait

- **File name:** `owner-portrait.jpg`
- **Dimensions:** 400 × 500 px
- **Format:** PNG, JPG, or WebP
- **Location:** `src/assets/images/owner-portrait.jpg`
- **Component:** `src/components/sections/About.jsx`
- **Description:** A professional portrait photo of the owner, Jeevan Singh. Should be a headshot or upper-body shot with a clean background.

### 3. Residential Painting

- **File name:** `service-residential.jpg`
- **Dimensions:** 400 × 300 px
- **Format:** PNG, JPG, or WebP
- **Location:** `src/assets/images/service-residential.jpg`
- **Component:** `src/components/ui/ServiceCard.jsx` (rendered in `src/components/sections/Services.jsx`)
- **Description:** An image representing residential painting services — e.g., interior room being painted, freshly painted living space.

### 4. Exterior Painting

- **File name:** `service-exterior.jpg`
- **Dimensions:** 400 × 300 px
- **Format:** PNG, JPG, or WebP
- **Location:** `src/assets/images/service-exterior.jpg`
- **Component:** `src/components/ui/ServiceCard.jsx` (rendered in `src/components/sections/Services.jsx`)
- **Description:** An image representing exterior painting services — e.g., house exterior being painted, finished exterior paint job.

### 5. Commercial Painting

- **File name:** `service-commercial.jpg`
- **Dimensions:** 400 × 300 px
- **Format:** PNG, JPG, or WebP
- **Location:** `src/assets/images/service-commercial.jpg`
- **Component:** `src/components/ui/ServiceCard.jsx` (rendered in `src/components/sections/Services.jsx`)
- **Description:** An image representing commercial painting services — e.g., office space, retail storefront, or commercial building being painted.

### 6. Wood Staining

- **File name:** `service-wood-staining.jpg`
- **Dimensions:** 400 × 300 px
- **Format:** PNG, JPG, or WebP
- **Location:** `src/assets/images/service-wood-staining.jpg`
- **Component:** `src/components/ui/ServiceCard.jsx` (rendered in `src/components/sections/Services.jsx`)
- **Description:** An image representing wood staining services — e.g., deck staining, fence staining, or wood furniture finishing.

### 7. Pressure Washing

- **File name:** `service-pressure-washing.jpg`
- **Dimensions:** 400 × 300 px
- **Format:** PNG, JPG, or WebP
- **Location:** `src/assets/images/service-pressure-washing.jpg`
- **Component:** `src/components/ui/ServiceCard.jsx` (rendered in `src/components/sections/Services.jsx`)
- **Description:** An image representing pressure washing and exterior cleaning services — e.g., driveway being pressure washed, siding being cleaned.

### 8. Surface Preparation

- **File name:** `service-surface-preparation.jpg`
- **Dimensions:** 400 × 300 px
- **Format:** PNG, JPG, or WebP
- **Location:** `src/assets/images/service-surface-preparation.jpg`
- **Component:** `src/components/ui/ServiceCard.jsx` (rendered in `src/components/sections/Services.jsx`)
- **Description:** An image representing surface preparation services — e.g., sanding, scraping, priming, or taping before painting.

### 9. Service Areas Map

- **File name:** `service-areas-map.jpg`
- **Dimensions:** 600 × 400 px
- **Format:** PNG, JPG, or WebP
- **Location:** `src/assets/images/service-areas-map.jpg`
- **Component:** `src/components/sections/ServiceAreas.jsx`
- **Description:** A map or regional graphic showing the areas served in British Columbia — e.g., a stylized map highlighting Vancouver, Surrey, Burnaby, Richmond, Abbotsford, and surrounding regions.

---

## Notes

- Until real images are provided, the website uses `ImagePlaceholder` components that render styled containers with a camera icon at the specified dimensions.
- When adding images, import them in the respective component and pass the imported path as the `src` prop to `ImagePlaceholder`.
- All images should be optimized for web (compressed) before adding to the project.
- WebP format is recommended for best performance, with JPG as a fallback.
