# Rajvosa Resell — concept preview by Cloz Digital

A cinematic, neon-illuminated e-commerce concept for a Bosnian
streetwear reseller. Built as a **concept preview** for Rajvosa
Resell — your plug for exclusive fashion, sourced and delivered
to Bosnia in approximately three weeks with a secure 50% deposit.

Live brand surfaces:

- Instagram: [@rajvosaresell](https://instagram.com/rajvosaresell)

## What's inside

- **9 pages**: Home · Shop · Product Detail · Brands · Custom Order ·
  How It Works · FAQ · Contact · Order Tracking · 404
- **12 seeded products** with the full admin-ready schema: slug, name,
  brand, category, price, depositAmount, currency, deliveryEstimate,
  images, sizes, description, featured, tags
- **9 brand catalogue**: Corteiz, Trapstar, Essentials, Denim Tears,
  Ami Paris, Nike, Jordan, Adidas, Football Jerseys
- **Living brand system**: `AnimatedLogo` with 4 variants (default,
  hero, loader, icon), magnetic hover, click ripple, light-sweep
  reflection, halo glow, multi-layer drop-shadow palette
- **Atmosphere layers**: ParticleField, AmbientGlow, LightStreak,
  MeshGrid — drop into any section as a backdrop
- **Branded toast system** with the AnimatedLogo icon, glass
  surface, neon-accent stripe
- **Holographic Authenticity badge** with shimmering gradient
- **Loading screen** with rotating conic light-sweep, first-visit
  splash gate (1.6s) vs repeat-visit gate (600ms) via sessionStorage
- **EN + BHS** i18n with browser detection + URL `?lang=` override
- **Order tracker** at `/track` with sample order `RR-2025-0421`
- **SEO**: OpenGraph + Twitter cards, JSON-LD Store schema
- **prefers-reduced-motion** honoured throughout

## Brand system

Single source of truth for the logo:

```js
// src/lib/brand.js
export const BRAND_LOGO = '/brand/rajvosa-resell-logo.png'
```

Logo file lives at `public/brand/rajvosa-resell-logo.png`. Vite serves
anything under `public/` at the site root — replace the file, refresh,
done. The `AnimatedLogo` component falls back to a styled wordmark
if the file is missing so the brand never visibly breaks.

## Palette

| Token | Hex |
|---|---|
| Background (vault) | `#0A0A0A` |
| Olive primary | `#8AA84F` |
| Olive deep | `#6B7F3A` |
| **Olive neon glow** | `#B8FF5A` |
| Ink | `#FFFFFF` |

Typography: Space Grotesk (display) · Inter (body) · JetBrains Mono
(technical).

## Stack

- React 19 + Vite 6 + Tailwind CSS v4
- React Router 7
- Framer Motion
- Lucide React
- Express (production server, Railway-ready)
- No TypeScript / GSAP / Lenis / Stripe / Supabase ceremony — those
  are tracked as Phase 2 / Phase 3 additions when the real flow
  needs them.

## Develop

```bash
npm install
npm run dev          # vite dev server
npm run build        # production build → dist/
npm start            # serve dist/ via the Express server
```

## Deploy

Railway-ready. Nixpacks pins Node 20. The Express server in
`server.js` serves `dist/` with compression, no-cache on
`index.html`, 1-year immutable on hashed assets, and an SPA fallback
for client-side routes.

The `/health` endpoint returns a trivial 200 for Railway's deployment
probe.

## Operator next steps

1. Drop the final logo PNG at `public/brand/rajvosa-resell-logo.png`
2. Replace the Unsplash placeholder URLs in `src/data/products.js`
   with real product photography
3. Set the real WhatsApp number + Instagram handle in
   `src/data/business.js`
4. (Optional) Add `public/brand/rajvosa-resell-logo.webp` next to the
   PNG for a 60–70% smaller payload on modern browsers

## Phase 2 / 3 backlog (deferred)

- Stripe checkout for the 50% deposit (currently routes to WhatsApp)
- Supabase / Postgres backend + admin dashboard for orders
- Real Instagram feed via the IG Basic Display API
- Animated product rarity indicators (requires `rarity` field on
  the product schema)
- Brand sound toggle (requires the actual audio asset)
- Instagram-style story highlight cards
- Cursor-following olive glow across the entire viewport

—

Built by Cloz Digital. Sarajevo. Worldwide pieces.
