// Single source of truth for the Rajvosa Resell brand mark.
//
// Place the final approved logo file at:
//   public/brand/rajvosa-resell-logo.png
//
// Vite serves anything under /public at the site root, so the path
// below resolves correctly in components, CSS backgrounds, meta tags,
// Open Graph images, and email templates without any imports.
//
// Never reference the temporary Discord CDN URL anywhere — those
// links expire. Always go through this constant.

export const BRAND_LOGO = '/brand/rajvosa-resell-logo.png'

// Optional secondary references (for mobile / small variants).
// Add WebP / 2x sources here if/when they exist; the BrandMark
// component will pick them up via the srcSet prop.
export const BRAND_LOGO_WEBP = '/brand/rajvosa-resell-logo.webp'
export const BRAND_LOGO_2X   = '/brand/rajvosa-resell-logo@2x.png'

// The brand wordmark — used as a graceful fallback if the logo
// file is missing (during initial setup, or while the file is being
// updated). Rendered as styled HTML, not text content.
export const BRAND_WORDMARK_PARTS = ['RAJVOSA', '/', 'RESELL']
