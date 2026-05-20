// Single source of truth for Rajvosa Resell brand + business data.
// Update here, not in copy. Used across Nav, Footer, Hero, forms,
// JSON-LD, sitemap, the AnimatedLogo + disclaimer surfaces.

export const BUSINESS = {
  name: 'Rajvosa Resell',
  tagline: 'Premium streetwear, delivered across Bosnia & Herzegovina.',
  instagram: 'https://instagram.com/rajvosa_resell',
  instagramHandle: '@rajvosa_resell',
  whatsapp: '38762000000',          // placeholder — replace with real number
  whatsappDisplay: '+387 62 000 000',
  email: 'orders@rajvosa-resell.ba',
  city: 'Sarajevo',
  country: 'Bosnia & Herzegovina',
  // In-stock delivery model:
  //   • 48h delivery anywhere in BiH
  //   • personal pickup in Sarajevo
  deliveryWindowInStock: '48h',
  // Custom-order model:
  //   • 50% deposit up front
  //   • ~3 weeks sourcing + shipping
  //   • remaining 50% on arrival
  customOrderWeeks: '~3 weeks',
  depositPct: 50,
  // Legal — RAJVOSA RESELL is an independent reseller.
  disclaimer:
    'Rajvosa Resell is an independent reseller based in Sarajevo, Bosnia and Herzegovina, and is not affiliated with, endorsed by, or sponsored by the brands featured on this website.',
}
