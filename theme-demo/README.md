# E-commerce Theme Demo

A pixel-perfect implementation of a Vietnamese cosmetics/beauty e-commerce website, built from Figma design specifications.

## 🎨 Design Source

Built from Figma: **Ecommerce Components - Variables Updated** (Node ID: 600-5125)

## ✨ Features Implemented

### Layout Sections (Top to Bottom):

1. **Navigation Bar**
   - Sticky header with logo, menu, and action icons
   - Search, account, and shopping cart buttons
   - Dropdown menu support

2. **Hero Banner**
   - Full-width hero section (770px height)
   - Carousel navigation with auto-advance
   - Primary CTA button

3. **USP Badge Carousel**
   - Horizontal scrolling badges
   - Trust signals: 30-day returns, COD, fast delivery
   - Background: Neutral-50 (#f9fafb)

4. **Feature Products with Tabs**
   - Section heading with tab navigation
   - 4-column product grid
   - Product cards with hover "Add to Cart" button
   - "View All" button at bottom

5. **Collection Card with Products**
   - Split layout: Collection image (left) + 2x2 product grid (right)
   - Dark overlay on collection image
   - Text and CTA centered on image
   - Product cards with images and pricing

6. **Promotional Banner**
   - Light pink background (#fef2f2)
   - Centered content with large "50%" discount
   - Call-to-action button

7. **Collection Card with Products (Reversed)**
   - Same as #5 but with reversed layout
   - Product grid on left, collection image on right

8. **Customer Reviews**
   - Section subtitle in italic Lora font
   - 4 review cards in horizontal scroll
   - Each card: customer photo, star rating, review text, product info
   - Neutral-50 background

9. **Featured Collections Showcase**
   - 4-column grid of collection cards
   - Image with gradient overlay
   - Collection name and "View more" link

10. **Full Background Banner**
    - 550px height full-width banner
    - Dark overlay (30% opacity)
    - Centered white text and CTA

11. **Trust Signals**
    - 4 icon cards in a row
    - Large 64px icons
    - Title and description text
    - Neutral-50 background

12. **Footer**
    - 5-column layout: Brand + 3 link columns + Newsletter
    - Social media links
    - Payment method icons
    - Dark background (#072835)

## 🎯 Design Specifications

### Typography
- **Font Family**: Be Vietnam Pro (400, 500, 600)
- **Italic Font**: Lora (for subtitle)
- **Heading 1**: 48px/56px, SemiBold (600)
- **Heading 2**: 40px/48px, SemiBold (600)
- **Body Base**: 16px/24px, Regular (400) / Medium (500)
- **Body Small**: 14px/20px, Regular (400) / Medium (500)
- **Body Large**: 18px/24px, Medium (500)

### Colors
- **Primary**: `#072835` (Dark teal)
- **Light**: `#fafafa` (Off-white)
- **Neutral-50**: `#f9fafb` (Light gray)
- **Border**: `rgba(23, 22, 26, 0.12)`
- **Overlay**: `rgba(0, 0, 0, 0.2)` / `rgba(0, 0, 0, 0.3)`

### Spacing
- **XS**: 2px
- **S**: 4px
- **M**: 8px
- **L**: 12px
- **XL**: 16px
- **2XL**: 24px
- **3XL**: 30px
- **4XL**: 48px
- **5XL**: 64px

### Border Radius
- **Small**: 8px
- **Medium**: 12px
- **Large**: 16px
- **Pill**: 100px

### Container Widths
- **Max Width**: 1440px
- **Content Padding**: 64px (desktop)
- **Nav Height**: 80px
- **Hero Height**: 770px

## 🏗️ Component Structure

### Product Cards
- **Image Aspect Ratio**: 302:376.54
- **Image Border Radius**: 8px
- **Content Padding**: 16px
- **Hover Effect**: "Add to Cart" button slides up from bottom

### Collection Cards
- **Height**: 1002px (with products layout)
- **Border Radius**: 16px
- **Overlay**: 20% dark overlay
- **Text Alignment**: Center

### Review Cards
- **Width**: 371px (fixed)
- **Image Height**: 233px
- **Background**: White
- **Border Radius**: 16px
- **Product Thumbnail**: 67x83px

## 🚀 Getting Started

### Option 1: Direct File Access
```bash
cd theme-demo
open index.html
```

### Option 2: Local Server (Recommended)
```bash
cd theme-demo

# Python 3
python3 -m http.server 8000

# Node.js
npx http-server -p 8000
```

Then open `http://localhost:8000`

## 💻 Interactive Features

1. **Carousel**
   - Auto-advance every 5 seconds
   - Manual navigation with arrow buttons
   - Active indicator animation

2. **Tabs**
   - Click to switch between product categories
   - Active state with bottom border

3. **Navbar**
   - Hides on scroll down
   - Shows on scroll up
   - Sticky positioning

4. **Scroll Animations**
   - Cards fade in and slide up when scrolled into view
   - Smooth transitions

5. **Horizontal Scroll**
   - USP badges and reviews support horizontal scroll
   - Drag to scroll with mouse

6. **Product Cards**
   - Hover to reveal "Add to Cart" button
   - Subtle lift animation on hover

7. **Newsletter Form**
   - Email validation
   - Success/error notifications

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 1200px (4-column grids)
- **Tablet**: 768px - 1200px (2-column grids)
- **Mobile**: < 768px (1-column grids)

### Mobile Adaptations
- Navigation menu hidden (hamburger menu can be added)
- Hero title reduced to 32px
- Section headings reduced to 28px
- Single-column layouts
- Reduced padding (32px → 16px)

## 🎨 CSS Architecture

### Methodology
- Mobile-first approach
- CSS custom properties for theming
- BEM-inspired naming convention
- Utility classes for common patterns

### File Organization
```
styles.css
├── Variables & Reset
├── Navigation Bar
├── Hero Section
├── Buttons
├── USP Badge Section
├── Content Container
├── Section Headings
├── Feature Products Section
├── Collection with Products Section
├── Promotional Section
├── Customer Reviews Section
├── Collections Showcase Section
├── Full Background Banner Section
├── Trust Signals Section
├── Footer Section
├── Responsive Design
└── Utility Classes
```

## 🔧 Customization Guide

### Changing Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-bg: #072835;
    --primary-text: #072835;
    --light-text: #fafafa;
    /* ... */
}
```

### Updating Content
Edit directly in `index.html`:
- Product names and prices
- Section titles
- Footer links
- Button text

### Replacing Images
Update `src` attributes with your own image URLs:
- Product images
- Hero banner
- Collection backgrounds
- Customer review photos

## ⚠️ Important Notes

- **Image URLs**: Figma asset URLs expire after 7 days. Replace with permanent hosting for production.
- **Font Loading**: Fonts loaded from Google Fonts CDN
- **No Framework**: Pure HTML/CSS/JavaScript (no React/Vue/etc.)
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge latest versions)

## 📊 Performance Optimizations

- Lazy loading for images (ready to implement with `data-src`)
- CSS transitions for smooth animations
- Passive event listeners for scroll
- Intersection Observer for scroll animations
- Minimal JavaScript dependencies

## 🎯 Production Checklist

Before deploying to production:

- [ ] Replace all Figma image URLs with permanent hosting
- [ ] Optimize images (compression, WebP format)
- [ ] Add meta tags (SEO, social sharing)
- [ ] Implement mobile hamburger menu
- [ ] Add analytics tracking
- [ ] Test on all target browsers
- [ ] Validate HTML/CSS
- [ ] Enable HTTPS
- [ ] Add accessibility features (ARIA labels, keyboard navigation)
- [ ] Implement actual shopping cart functionality
- [ ] Add product detail pages
- [ ] Connect newsletter form to email service

## 📄 License

This is a demo project. Feel free to use and modify as needed.

## 🙏 Credits

- **Design**: Figma "Ecommerce Components - Variables Updated"
- **Fonts**: Be Vietnam Pro, Lora (Google Fonts)
- **Built by**: AI Assistant
- **Date**: November 2025

---

**Note**: This is a static HTML/CSS/JS implementation. For a full e-commerce site, you'll need to integrate with a backend, payment processing, and inventory management system.
