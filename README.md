# Raft Boys — concept preview by Cloz Digital

A cinematic, conversion-focused redesign of [raftboys.ba](https://raftboys.ba).
Built as a **concept preview** to show the client what a world-class
adventure-tourism site looks like for their brand.

## What's inside

- **13 sections**: Hero, Trust Bar, Experiences, Why Choose, Guides,
  Timeline, Reviews, Gallery, Packages, FAQ, Booking, Map, Footer
- **CLOZ.DIGITAL PREVIEW** loading screen on initial load
- **Framer Motion** scroll-triggered reveals, magnetic CTAs, spotlight
  cards, count-up stats, lightbox gallery, animated FAQ accordions
- **EN + BCS** i18n with browser-detection + URL `?lang=` override
- **WhatsApp deep-link** FAB + mobile sticky Book-Now CTA
- **SEO**: OG + Twitter cards, hreflang, JSON-LD `LocalBusiness` +
  `TouristTrip` schema, structured booking form
- **Mobile-first** responsive layout, fully touch-optimised

## Run locally

```bash
npm install
npm run dev
```

Opens on `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview
```

## Before going live — required swaps

### 1. Real photography

Every image URL lives in `src/data/assets.js`. Today it points at
high-resolution Unsplash stock that matches the rafting / Bosnia
aesthetic. Replace each `IMG.*` entry with the client's real
photography:

```js
// src/data/assets.js
export const IMG = {
  heroPoster: '/images/hero-neretva-rapids.jpg', // ← drop file in /public/images
  heroVideo:  '/video/hero-reel.mp4',            // ← optional hero loop
  expRafting: '/images/exp-rafting.jpg',
  // ...
}
```

### 2. Booking endpoint

The booking form posts to `import.meta.env.VITE_BOOKING_ENDPOINT`.
With no env var set, it runs in **concept-preview mode**: simulates
a 700ms roundtrip and shows the success state without actually
sending anything.

To wire it up, create `.env` (or set on your host):

```env
VITE_BOOKING_ENDPOINT=https://cloz.digital/api/public/inquiry
# OR
VITE_BOOKING_ENDPOINT=https://formspree.io/f/<your-id>
# OR
VITE_BOOKING_ENDPOINT=https://api.web3forms.com/submit
```

The form posts JSON with these fields:

```json
{
  "name": "...",
  "email": "...",
  "phone": "...",
  "date": "YYYY-MM-DD",
  "package": "classic | premium | weekend",
  "group": 2,
  "dietary": "...",
  "message": "...",
  "consent": true,
  "lang": "en | bcs",
  "source": "raftboys_website",
  "submitted_at": "ISO 8601"
}
```

If the network call fails, the visitor sees an error message AND
the WhatsApp button stays one tap away — the prospect never leaves
without a route to contact us.

### 3. Pricing + packages

`src/data/content.js` → `PACKAGES` array. Update `priceFrom`,
`features`, descriptions in the dictionary (`pkg.*`).

### 4. Guide bios

`src/data/content.js` → `GUIDES` array. Real names, certifications,
years of experience. Bilingual role labels live in
`src/i18n/dictionary.js`.

### 5. Reviews

`src/data/content.js` → `REVIEWS` array. Replace placeholder quotes
with real ones from Google / TripAdvisor. **Honesty note**: the
current entries are clearly marked as samples — never publish them
as if real.

### 6. SEO

- Add `/public/og.jpg` (1200×630) — a hero shot for OG previews
- Update `index.html` `<title>`, description, structured data
- Add `/public/favicon.ico` and `/public/apple-touch-icon.png`

## Tech stack

- React 19 + Vite 6
- Tailwind CSS v4
- Framer Motion 11
- lucide-react

## Architecture notes

**No backend.** Everything is static. The booking form is the only
network-touching piece, and it's optional (concept-preview mode if
no endpoint is set).

**CMS seam.** All content + imagery lives in `src/data/*.js` and
`src/i18n/dictionary.js`. Swapping in a real CMS (Sanity, Contentful)
is a one-evening migration — these files become the schema.

**Performance.**
- Images use native `loading="lazy"` everywhere except hero
- Framer Motion is the only motion JS; respects
  `prefers-reduced-motion`
- No web fonts beyond Inter + Plus Jakarta Sans
- No tracker scripts shipped

## What's NOT in this preview (and the honest reason)

- **CMS UI** — content lives in `src/data/*.js`. A real CMS is its
  own engagement once the client signs off the design.
- **Blog** — no index/post pages. Easy to add later; not required
  to win the pitch.
- **Real e-sig / payment** — the booking form captures intent and
  routes to a human reply. Payment integration (Stripe / Wise /
  bank QR) is phase 2.
- **Interactive map with custom markers** — current map is a
  styled Google Maps iframe (no API key required, zero JS, zero
  tracking). Replace with Leaflet + custom marker once Phase 2
  budget is approved.

## Concept-preview loading screen

The "CLOZ.DIGITAL PREVIEW" overlay only appears on **initial site
load**. It fades out as soon as `window.load` fires (or after
~1.2s minimum + 2.4s hard cap, whichever comes first). On
`prefers-reduced-motion` it shortens to ~200ms.

To remove it when the client signs and we ship for real:

```jsx
// src/App.jsx
// Delete this line:
<LoadingScreen />
```

— Cloz Digital
