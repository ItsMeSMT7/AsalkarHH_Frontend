# Project Structure & Setup Guide

This document provides an overview of the "Asalkar Healthy Hub Vita" React application's structure, the libraries required to run it, and the data flow of the project.

## 1. Required Libraries & Installation

This project is built using **React** and bundled with **Vite**. Below are the primary dependencies identified in the source code:

*   **react / react-dom**: Core framework.
*   **framer-motion**: Used extensively for page transitions, scroll animations, and layout animations.
*   **react-icons**: Used for UI icons (specifically from the `lu` Lucide icon set).
*   **@emailjs/browser**: Used in the Contact page for client-side form submission directly to email.

### Setup Instructions

To set up the project from scratch or reinstall dependencies, run the following commands in the root of your project (`asalkar-healthy-hub`):

```bash
# 1. Initialize project (if not already done via Vite)
# npm create vite@latest asalkar-healthy-hub -- --template react

# 2. Install core dependencies
npm install react react-dom framer-motion react-icons @emailjs/browser

# 3. Install dev dependencies (Vite)
npm install -D vite @vitejs/plugin-react

# 4. Run the development server
npm run dev
```

## 2. Inferred File Structure

Based on the components and imports across the `.jsx` files, here is the complete file structure of the application:

```text
asalkar-healthy-hub/
├── public/                 # Public assets (favicon, etc.)
├── src/
│   ├── components/         # Reusable UI Components
│   │   ├── PageHero.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Hero.jsx
│   │   ├── TrustBar.jsx
│   │   ├── Benefits.jsx
│   │   ├── FeaturedProducts.jsx
│   │   ├── Process.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Gallery.jsx
│   │   └── CTA.jsx
│   ├── data/               # Mock Database / Static Data
│   │   └── data.js         # Contains `products`, `productCategories`, `contactInfo`
│   ├── pages/              # Main Route Views
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Products.jsx
│   │   └── Contact.jsx
│   ├── pages/PagesStyle/   # Page-specific CSS Modules
│   │   ├── About.module.css
│   │   ├── Products.module.css
│   │   └── Contact.module.css
│   ├── utils/              # Helper functions and Animation variants
│   │   └── animations.js   # Contains `fadeInUp`, `slideInLeft`, `slideInRight`, `staggerContainer`
│   ├── App.jsx             # Main Application Root / Router Definition
│   └── main.jsx            # React DOM rendering entry point
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

## 3. Application Flow

1.  **Entry Point**: The application starts at `main.jsx`, which renders `App.jsx`.
2.  **Routing (Implicit)**: Although not directly visible in the snippets, standard React architecture implies `App.jsx` uses `react-router-dom` to switch between the four main page components (`Home`, `About`, `Products`, `Contact`).
3.  **Data Consumption**:
    *   Pages like `Products.jsx` and `Contact.jsx` import static data objects (`products`, `productCategories`, `contactInfo`) from `src/data/data.js`.
    *   This keeps the components clean and separates the content from the logic.
4.  **UI Construction**:
    *   Each page acts as a layout container.
    *   They import reusable visual sections from the `src/components/` folder.
    *   They import animation variants from `src/utils/animations.js` to ensure uniform entry effects across the site.
5.  **Styling**: The application utilizes CSS Modules (e.g., `About.module.css`). This scopes CSS classes locally to each component, preventing style conflicts across different pages.
6.  **External Integrations**:
    *   The Contact page directly communicates with the EmailJS API upon form submission, completely bypassing the need for a custom backend server.