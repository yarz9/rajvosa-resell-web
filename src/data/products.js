// Structured product catalog — admin-ready shape.
// Each product is a self-contained record. Add to this list to
// surface new items in Shop / Featured / brand pages.

// Placeholder images — replace with real product photography.
// Unsplash provides safe, high-resolution streetwear placeholders.
const img = (id, q = 80) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=${q}`

export const CATEGORIES = ['Hoodies', 'T-Shirts', 'Jackets', 'Tracksuits', 'Sneakers', 'Jerseys', 'Accessories']
export const SIZES_CLOTHES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
export const SIZES_SHOES   = ['39', '40', '41', '42', '43', '44', '45', '46']

export const PRODUCTS = [
  {
    slug: 'corteiz-alcatraz-hoodie-olive',
    name: 'Alcatraz Hoodie — Olive',
    brand: 'Corteiz',
    category: 'Hoodies',
    price: 280,
    depositAmount: 140,
    currency: 'KM',
    deliveryEstimate: '48h delivery in BiH',
    images: [
      img('photo-1556821840-3a63f95609a7'),
      img('photo-1620799140408-edc6dcb6d633'),
      img('photo-1576566588028-4147f3842f27')],
    sizes: SIZES_CLOTHES,
    description: 'Heavyweight cotton fleece with the Alcatraz mark embroidered on the chest. Boxy fit; size up for the signature drape.',
    featured: true,
    tags: ['exclusive', 'restock-rare'],
  },
  {
    slug: 'trapstar-irongate-puffer-black',
    name: 'Irongate Puffer — Black',
    brand: 'Trapstar',
    category: 'Jackets',
    price: 520,
    depositAmount: 260,
    currency: 'KM',
    deliveryEstimate: '48h delivery in BiH',
    images: [
      img('photo-1551028719-00167b16eac5'),
      img('photo-1591047139829-d91aecb6caea'),
      img('photo-1547624643-3bf761b09502')],
    sizes: SIZES_CLOTHES,
    description: 'Quilted nylon puffer with Trapstar branding on the back. AW signature piece, ships in original packaging with tags.',
    featured: true,
    tags: ['limited'],
  },
  {
    slug: 'essentials-fleece-pullover-stone',
    name: 'Essentials Fleece Pullover — Stone',
    brand: 'Essentials',
    category: 'Hoodies',
    price: 195,
    depositAmount: 98,
    currency: 'KM',
    deliveryEstimate: '48h delivery in BiH',
    images: [
      img('photo-1620799140408-edc6dcb6d633'),
      img('photo-1556821840-3a63f95609a7')],
    sizes: SIZES_CLOTHES,
    description: 'Fear of God Essentials core fleece. Oversized fit, dropped shoulder, ribbed cuffs and hem.',
    featured: false,
    tags: [],
  },
  {
    slug: 'denim-tears-american-tears-sweat',
    name: 'American Tears Sweatshirt',
    brand: 'Denim Tears',
    category: 'Hoodies',
    price: 410,
    depositAmount: 205,
    currency: 'KM',
    deliveryEstimate: '48h delivery in BiH',
    images: [
      img('photo-1576566588028-4147f3842f27'),
      img('photo-1521577352947-9bb58764b69a')],
    sizes: SIZES_CLOTHES,
    description: 'Tremaine Emory archival design. Pre-shrunk heavyweight, screen-printed front graphic.',
    featured: true,
    tags: ['archive'],
  },
  {
    slug: 'jordan-1-low-travis-scott-olive',
    name: 'Jordan 1 Low — Travis Scott Olive',
    brand: 'Jordan',
    category: 'Sneakers',
    price: 980,
    depositAmount: 490,
    currency: 'KM',
    deliveryEstimate: '48h delivery in BiH',
    images: [
      img('photo-1551107696-a4b0c5a0d9a2'),
      img('photo-1542291026-7eec264c27ff'),
      img('photo-1606107557195-0e29a4b5b4aa')],
    sizes: SIZES_SHOES,
    description: 'Reverse Swoosh in olive. Deadstock with original box and accessories.',
    featured: true,
    tags: ['grail'],
  },
  {
    slug: 'nike-tn-triple-black',
    name: 'Air Max Plus TN — Triple Black',
    brand: 'Nike',
    category: 'Sneakers',
    price: 380,
    depositAmount: 190,
    currency: 'KM',
    deliveryEstimate: '48h delivery in BiH',
    images: [
      img('photo-1542291026-7eec264c27ff'),
      img('photo-1595950653106-6c9ebd614d3a')],
    sizes: SIZES_SHOES,
    description: 'TN core colourway. Full Tuned Air sole, gradient mesh upper.',
    featured: false,
    tags: [],
  },
  {
    slug: 'ami-paris-de-coeur-hoodie',
    name: 'Ami de Cœur Hoodie',
    brand: 'Ami Paris',
    category: 'Hoodies',
    price: 720,
    depositAmount: 360,
    currency: 'KM',
    deliveryEstimate: '48h delivery in BiH',
    images: [
      img('photo-1556821840-3a63f95609a7'),
      img('photo-1620799140408-edc6dcb6d633')],
    sizes: SIZES_CLOTHES,
    description: 'Signature Ami de Cœur embroidered logo. Soft brushed cotton with kangaroo pocket.',
    featured: false,
    tags: [],
  },
  {
    slug: 'adidas-samba-og-cloud-white',
    name: 'Samba OG — Cloud White',
    brand: 'Adidas',
    category: 'Sneakers',
    price: 290,
    depositAmount: 145,
    currency: 'KM',
    deliveryEstimate: '48h delivery in BiH',
    images: [
      img('photo-1606107557195-0e29a4b5b4aa'),
      img('photo-1595950653106-6c9ebd614d3a')],
    sizes: SIZES_SHOES,
    description: 'The clean white-and-black Samba. Restocks come and go — order while available.',
    featured: false,
    tags: [],
  },
  {
    slug: 'real-madrid-jersey-25-26-home',
    name: 'Real Madrid 25/26 Home Jersey',
    brand: 'Football Jerseys',
    category: 'Jerseys',
    price: 220,
    depositAmount: 110,
    currency: 'KM',
    deliveryEstimate: '48h delivery in BiH',
    images: [
      img('photo-1551115976-e1707e0bcb45'),
      img('photo-1517466787929-bc90951d0974')],
    sizes: SIZES_CLOTHES,
    description: 'Player or fan version. Custom printing (name + number) available on request — €25.',
    featured: false,
    tags: ['custom-print'],
  },
  {
    slug: 'corteiz-cargo-tracksuit-olive',
    name: 'Corteiz Guerillaz Cargo Tracksuit',
    brand: 'Corteiz',
    category: 'Tracksuits',
    price: 540,
    depositAmount: 270,
    currency: 'KM',
    deliveryEstimate: '48h delivery in BiH',
    images: [
      img('photo-1551028719-00167b16eac5'),
      img('photo-1591047139829-d91aecb6caea')],
    sizes: SIZES_CLOTHES,
    description: 'Two-piece set: cargo trousers + zip-up. Rare drop, cuffed ankle.',
    featured: true,
    tags: ['exclusive'],
  },
  {
    slug: 'trapstar-irongate-tee-black',
    name: 'Irongate T-shirt — Black',
    brand: 'Trapstar',
    category: 'T-Shirts',
    price: 145,
    depositAmount: 73,
    currency: 'KM',
    deliveryEstimate: '48h delivery in BiH',
    images: [
      img('photo-1521577352947-9bb58764b69a'),
      img('photo-1576566588028-4147f3842f27')],
    sizes: SIZES_CLOTHES,
    description: 'Heavyweight cotton tee with chrome chenille Trapstar wordmark on the front.',
    featured: false,
    tags: [],
  },
  {
    slug: 'essentials-cap-stone',
    name: 'Essentials Curved Cap — Stone',
    brand: 'Essentials',
    category: 'Accessories',
    price: 110,
    depositAmount: 55,
    currency: 'KM',
    deliveryEstimate: '48h delivery in BiH',
    images: [
      img('photo-1588850561407-ed78c282e89b'),
      img('photo-1521369909029-2afed882baee')],
    sizes: ['One size'],
    description: 'Unstructured 6-panel curved-brim cap, rubberised Essentials logo.',
    featured: false,
    tags: [],
  }]

export const BRANDS = [
  { slug: 'corteiz',     name: 'Corteiz',           tagline: 'Rules the World' },
  { slug: 'trapstar',    name: 'Trapstar',          tagline: 'It’s a Secret' },
  { slug: 'essentials',  name: 'Essentials',        tagline: 'Fear of God' },
  { slug: 'denim-tears', name: 'Denim Tears',       tagline: 'Tremaine Emory' },
  { slug: 'ami-paris',   name: 'Ami Paris',         tagline: 'Ami de Cœur' },
  { slug: 'nike',        name: 'Nike',              tagline: 'Just Do It' },
  { slug: 'jordan',      name: 'Jordan',            tagline: 'Become Legendary' },
  { slug: 'adidas',      name: 'Adidas',            tagline: 'Impossible Is Nothing' },
  { slug: 'football',    name: 'Football Jerseys',  tagline: 'Match-Day Kits & Player Editions' }]

export function bySlug(slug)        { return PRODUCTS.find(p => p.slug === slug) }
export function featured()          { return PRODUCTS.filter(p => p.featured) }
export function byBrand(name)       { return PRODUCTS.filter(p => p.brand === name) }
export function related(slug, n=4)  {
  const p = bySlug(slug); if (!p) return []
  return PRODUCTS.filter(x => x.slug !== slug && (x.brand === p.brand || x.category === p.category)).slice(0, n)
}
