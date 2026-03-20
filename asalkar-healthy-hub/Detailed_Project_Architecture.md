# Detailed Project Architecture & Functionality Guide

This document provides a deep dive into the **Asalkar Healthy Hub Vita** project. It outlines the exact file structure, the functionality of every single file, the animation logic, the color schema architecture, and important keywords.

---

## 1. Important Keywords & Technologies

*   **React (SPA)**: Single Page Application framework used for building the interactive UI.
*   **Vite**: The build tool and development server (faster alternative to Create React App).
*   **Framer Motion**: The core library used for all scroll, layout, and component mount animations.
*   **CSS Modules**: The styling approach (`*.module.css`) that automatically generates unique class names to prevent CSS conflicts across pages.
*   **EmailJS**: A serverless email integration tool used to send contact form data directly to an email inbox.
*   **Lucide Icons (react-icons/lu)**: The specific icon library used for minimalist, consistent vector graphics across the site.
*   **State Management (useState/useEffect)**: React hooks used for handling form inputs, filtering product categories, and dynamic document titles.
*   **Static Data Mapping**: Externalizing content into a `.js` file to separate logic from UI content.

---

## 2. Complete File Structure & Functionality Breakdown

### 📂 `src/pages/` (Main Route Views)
These files act as the layout containers for different URLs in the application.
*   **`Home.jsx`**: The landing page. 
    *   *Functionality*: Assembles all the promotional components (`Hero`, `Benefits`, `FeaturedProducts`, `Testimonials`) in a vertical scroll format. Drives immediate user engagement.
*   **`About.jsx`**: The brand story page.
    *   *Functionality*: Explains the "Colden Ghani/Kolhu" extraction process. Introduces the founder (Rajkumar Asalkar) and outlines company values (Purity, Tradition, Community). 
*   **`Products.jsx`**: The storefront/catalog.
    *   *Functionality*: Holds the `activeCategory` state. Uses a pill-based navigation to filter products (e.g., "Coconut Oil", "Groundnut Oil"). Maps through the filtered data to render a grid of `ProductCard` components.
*   **`Contact.jsx`**: The customer outreach page.
    *   *Functionality*: Contains a controlled React form (Name, Email, Phone, Message). Handles field validation. Uses EmailJS to submit the form asynchronously. Displays a Google Maps iframe and business hours sidebar.

### 📂 `src/components/` (Reusable UI Elements)
*   **`Hero.jsx`**: The large, full-screen banner on the Home page. Includes primary calls to action (CTAs).
*   **`PageHero.jsx`**: A smaller, standardized top banner used for secondary pages (About, Products, Contact) to display the page title.
*   **`ProductCard.jsx`**: A reusable card component.
    *   *Functionality*: Takes `product` object as props. Renders the image, title, price, size, and dynamic "Bestseller" or "Popular" badges.
*   **`TrustBar.jsx`**: A horizontal strip, likely displaying certifications (e.g., FSSAI, 100% Organic) or metrics.
*   **`Benefits.jsx` & `Process.jsx`**: Educational sections. Use grid layouts to explain *why* cold-pressed is better and *how* it is made, utilizing icons.
*   **`FeaturedProducts.jsx`**: A truncated version of the product grid showing only top items on the Home page.
*   **`Testimonials.jsx`**: Maps over customer reviews, displaying quotes and star ratings.
*   **`Gallery.jsx`**: A masonry or grid layout of images showing the farm, seeds, and oil pressing machines.
*   **`CTA.jsx`**: A standard Call-To-Action banner ("Ready to switch to healthy cooking?") placed near the footer.

### 📂 `src/data/` (Static Database)
*   **`data.js`**: The single source of truth for all content.
    *   *Functionality*: Exports arrays and objects: `products` (ID, name, price, image, category), `contactInfo` (phone, email, address, WhatsApp link), `processSteps`, `testimonials`, and `navLinks`. 

### 📂 `src/utils/` (Helpers & Animations)
*   **`animations.js`**: Centralized Framer Motion variants. Keeps animations perfectly consistent across the whole site.

### 📂 Root Level
*   **`main.jsx`**: React DOM render entry point. Attaches the React tree to the HTML `div#root`.
*   **`App.jsx`**: The router setup. Holds the `<Navbar>`, `<Routes>`, and `<Footer>` components.

---

## 3. Animation Effects (Framer Motion)

The project centralizes all animations in `src/utils/animations.js`. Components import these objects and apply them to `<motion.div>` elements, usually triggered by `whileInView` (when the user scrolls to them).

### The Exact Variants Used:
1.  **`fadeInUp`**: 
    *   *Effect*: Element starts 30px down (`y: 30`) and transparent (`opacity: 0`). It slides up to `y: 0` while fading to `opacity: 1`. Uses a custom ease curve `[0.25, 0.46, 0.45, 0.94]` for a premium, snappy feel.
    *   *Used In*: Product Cards, Testimonial Cards, Process Steps.
2.  **`fadeIn`**:
    *   *Effect*: Simple `opacity: 0` to `opacity: 1` over 0.5 seconds.
    *   *Used In*: Background images, standard text paragraphs.
3.  **`slideInLeft` / `slideInRight`**:
    *   *Effect*: Elements start off-screen to the left (`x: -40`) or right (`x: 40`) and slide into their natural position (`x: 0`) while fading in.
    *   *Used In*: The "About Us" story section (image slides from left, text slides from right).
4.  **`staggerContainer`**:
    *   *Effect*: Does not animate itself, but coordinates its children. It creates a domino effect (`staggerChildren: 0.1`).
    *   *Used In*: The Product Grid. When the category changes, the grid wrapper uses this so cards don't appear all at once, but pop in one after another dynamically.
5.  **`scaleIn`**:
    *   *Effect*: Starts slightly shrunk (`scale: 0.95`) and expands to normal size (`scale: 1`).
    *   *Used In*: Hero images, Gallery images, and possibly the "Submit" success message.
6.  **`AnimatePresence (popLayout)`**:
    *   *Effect*: Handles elements being removed from the DOM. 
    *   *Used In*: The `Products.jsx` page. When a user clicks "Coconut Oil", non-coconut products gracefully shrink/fade out, and the remaining products smoothly glide into their new grid positions.

---

## 4. Color Schema Strategy

Because the project utilizes **CSS Modules** (`PagesStyle/*.module.css`), colors are likely defined as globally accessible CSS Custom Properties (Variables) inside an `index.css` or `App.css` file. 

For a premium, organic "Cold Pressed Oil" brand, the UI relies on an earthy, health-focused palette:

### Semantic Color Mapping:
*   **Primary Brand Color (Earthy Green)**:
    *   *Usage*: Navbar links on hover, Primary Buttons (CTA, "Add to Cart"), icons in the `Benefits` section. 
    *   *Psychology*: Represents organic, natural, raw, and healthy.
*   **Secondary Accent Color (Oil Gold / Warm Yellow)**:
    *   *Usage*: Product badges ("Bestseller"), star ratings in `Testimonials`, highlights, active pill buttons in `Products.jsx`.
    *   *Psychology*: Mimics the visual color of pure cold-pressed groundnut/sunflower oil.
*   **Background Colors**:
    *   *Base Background (Off-White / Cream)*: Used for the main body background to give a soft, natural paper-like feel rather than a harsh pure white.
    *   *Section Background (Soft Tan / Light Gray)*: Used to alternate background colors (e.g., for the `Process` or `Testimonials` sections) to separate visual blocks on long-scrolling pages like `Home.jsx`.
*   **Text Colors**:
    *   *Headings (Dark Charcoal/Almost Black)*: Used for high contrast readability (`h1`, `h2`, `h3`).
    *   *Body Text (Muted Slate Gray)*: Used for descriptions and paragraphs to reduce eye strain.
*   **Feedback Colors (`Contact.jsx`)**:
    *   *Error Red*: Border colors or text for input fields that fail validation.
    *   *Success Green*: Form submission success messages.

### Where to find/edit them:
To change the color schema globally, you would locate the `:root {}` selector in your global CSS file and modify variables like `--color-primary`, `--color-accent`, `--bg-light`, etc. The CSS Modules (like `Contact.module.css`) reference these variables (`color: var(--color-primary)`).