# LUMIERE — Digital Lookbook & Haute Couture E-Commerce Frontend

An ultra-premium, high-end editorial fashion e-commerce frontend implemented faithfully from the **Google Stitch MCP** design system specification (`LUMIERE | Issue No. 04 — Essentialism`).

---

## 1. Design Source of Truth

The design is derived from the **Stitch MCP Server** project (`projects/7144321199231990450`):
* **Creative North Star:** *The Digital Curator* — rejects cluttered e-commerce in favor of high-end fashion magazine aesthetics, intentional asymmetry, generous negative space, and monochromatic tonal layering.
* **Typography:** `Noto Serif` for editorial display headlines, `Inter` for utilitarian body text and uppercase tracking labels.
* **The "No-Line" Rule:** Eliminates 1px solid section dividers in favor of background shifts (`surface` #f9f9f9 vs `surface-container-low` #f3f3f3 vs `surface-container-lowest` #ffffff) and ghost borders (15% opacity).
* **Corner Radius:** Strictly `0px` sharp corners for chic luxury aesthetic.
* **Glassmorphism:** `rgba(238, 238, 238, 0.75)` with `backdrop-filter: blur(20px)` on top navigation bar, quick filters, and mobile bottom bar.

### Implemented Screen Inventory:
1. **Home Lookbook** (`/`):
   * Full-bleed seasonal anthology hero (`The Winter Anthology`) with high-fashion photography.
   * Circular collection carousel (`Dresses`, `Outerwear`, `Accessories`, `Footwear`, `Tailoring`).
   * Asymmetrical featured grid: `Issue No. 04 — Essentialism`, `The Monolith Coat`, `Fluid Silk`.
   * Brand manifesto statement and floating filter trigger.
2. **Collection Listing** (`/products`):
   * Editorial Header (`Collection 004 / L'Essence — Quiet Elegance in Monochrome`).
   * Asymmetric product grid mirroring the exact proportions from Stitch:
     - 7-col Wide Portrait (`The Archival Trench`)
     - 5-col Square Detail (`Structure Top`)
     - 4-col Tall Vertical (`Silk Narrative`)
     - 8-col Wide Landscape (`The Void Trousers`)
     - 5-col Small Detail (`Leather Obscura`)
     - 7-col Editorial Frame (`Linear Layering`)
   * Interactive sticky filter bar (Size, Color, Fabric, Items Found count).
   * Wishlist toggling and pagination triggers.
3. **Product Details** (`/products/:id`):
   * Asymmetric 3-part gallery (hero 3:4 shot, 2-column detail grid, 16:9 lifestyle shot).
   * Sticky garment information, specifications (mulberry silk, origin), and pricing.
   * Interactive size selector (`XS`, `S`, `M`, `L`) with measure modal popup.
   * Add to Bag action with sliding drawer feedback.
   * Sustainability & Care accordions.
   * *Complete the Look* related pieces (`Strappy Heel`, `Vault Clutch`, `Helix Earrings`).
4. **My Wishlist** (`/wishlist`):
   * Curated selection grid (`Sculpted Silk Gown`, `Archive Clutch`, `Structured Blazer`, `Lumière Trench`).
   * One-click "Move to Bag" and "Remove" interactions.
5. **Bag & Checkout Simulation** (`/checkout`):
   * Sliding luxury Cart Drawer with quantity steppers and subtotal calculations.
   * Multi-step checkout with delivery address, white-glove shipping choice, and test mode simulation banner.
   * Creates realistic persistent mock orders.
6. **Order History & Detail** (`/orders`, `/orders/:id`):
   * Complete client acquisition history with tracking status, receipts, and item breakdowns.
7. **Curator Desk / Admin** (`/admin`):
   * Inventory overview, catalog counts, simulated GMV metrics.
   * Stock status toggles and new garment curation modal.
8. **Client Authentication** (`/login`, `/register`):
   * Client vs Admin persona switching for testing both perspectives.

---

## 2. Technology Stack

* **Core:** React 19, TypeScript (strict mode enabled)
* **Build Tool:** Vite 8
* **Routing:** React Router 7 (`react-router-dom`)
* **Styling:** Tailwind CSS 3.4 + PostCSS with exact Stitch tokens
* **Icons:** Material Symbols Outlined + Lucide React (thin stroke)
* **State Management:** Zustand 5 (persistent cart, wishlist, and auth state)
* **Testing:** Vitest 5 + React Testing Library + jsdom

---

## 3. Architecture for Spring Boot Backend Integration (Java 21)

The application strictly separates UI components from the data access layer:
* **Domain Types:** Strong TypeScript interfaces under `src/types/` (`product.ts`, `cart.ts`, `order.ts`, `user.ts`).
* **Services Layer:** Modular service classes under `src/services/` (`products.service.ts`, `cart.service.ts`, `checkout.service.ts`, `orders.service.ts`).
* **Environment Configuration:** Centralized via `VITE_API_BASE_URL` in `src/services/api.config.ts`.
* **Zero Direct Database Connections:** Ready to consume Spring Boot REST controllers:
  - `GET /api/v1/products`
  - `GET /api/v1/products/{id}`
  - `GET /api/v1/categories`
  - `POST /api/v1/orders`
  - `GET /api/v1/orders/{id}`

---

## 4. Scripts & Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit and component tests
npm run test

# Typecheck and produce production bundle
npm run build

# Preview production build
npm run preview
```
