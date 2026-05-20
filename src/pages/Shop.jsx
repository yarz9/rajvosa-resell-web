import { useEffect, useMemo, useState } from 'react'
import { Search, X, SlidersHorizontal, Loader2, Truck, Clock, MapPin } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { ProductCard } from '@/components/ProductCard'
import { PRODUCTS as SEED, BRANDS, CATEGORIES } from '@/data/products'
import { api, apiConfigured } from '@/lib/api'

// Adapter — backend product shape may differ slightly from the seed.
// Normalise to the ProductCard contract.
function adapt(p) {
  if (!p) return null
  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: p.price,
    currency: p.currency || 'KM',
    depositAmount: Math.round((p.price || 0) / 2),
    deliveryEstimate: deliveryLabel(p.delivery_badge),
    images: (p.images && p.images.length ? p.images.map(i => i.url || i) : []) || [],
    sizes: p.sizes || [],
    description: p.description || '',
    featured: !!p.featured,
    tags: p.tags || [],
    stock_qty: p.stock_qty,
    delivery_badge: p.delivery_badge,
  }
}

function deliveryLabel(b) {
  if (b === 'same_day') return 'Pickup in Sarajevo'
  return '48h delivery in BiH'
}

export default function Shop() {
  const t = useT()
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    let cancelled = false
    const fall = () => { if (!cancelled) { setProducts(SEED); setUsingFallback(true); setLoading(false) } }
    if (!apiConfigured) { fall(); return }
    api.listProducts()
      .then(d => {
        if (cancelled) return
        const list = (d.products || []).map(adapt).filter(Boolean)
        if (list.length === 0) fall()
        else { setProducts(list); setUsingFallback(false); setLoading(false) }
      })
      .catch(fall)
    return () => { cancelled = true }
  }, [])

  const [q, setQ] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('featured')

  const filtered = useMemo(() => {
    let list = [...products]
    if (q) {
      const term = q.toLowerCase()
      list = list.filter(p => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(term))
    }
    if (brand)    list = list.filter(p => p.brand === brand)
    if (category) list = list.filter(p => p.category === category)
    if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'featured')   list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    return list
  }, [products, q, brand, category, sort])

  const hasFilters = q || brand || category
  const reset = () => { setQ(''); setBrand(''); setCategory('') }

  return (
    <div className="pt-32 md:pt-40 pb-24 px-5 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <div className="eyebrow mb-3 flex items-center gap-3">
            <span>THE VAULT · {String(products.length).padStart(3, '0')} PIECES</span>
            {usingFallback && apiConfigured && (
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">· cached preview</span>
            )}
          </div>
          <h1 className="font-display font-semibold text-[clamp(44px,7vw,96px)] leading-[0.95] tracking-tight">
            {t('shop.title')}
          </h1>
          <p className="mt-5 text-[16px] md:text-[18px] text-white/65 max-w-[640px]">
            {t('shop.sub')} All items below are <strong className="text-[var(--color-olive-glow)]">in stock</strong> —
            same-day pickup or 24h delivery in Sarajevo, shipping across BiH.
          </p>
        </div>

        {/* Delivery legend — real Rajvosa Resell logistics */}
        <div className="mb-8 flex flex-wrap gap-2.5 text-[11.5px]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full chip neon"><Truck size={11} /> 48h delivery in BiH</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full chip"><MapPin size={11} /> Pickup in Sarajevo</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full chip"><Clock size={11} /> Limited availability</span>
        </div>

        {/* Filters */}
        <div className="mb-8 grid md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder={t('shop.search')}
              className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-sm text-[14px] focus:border-[var(--color-olive-line)] focus:bg-white/[0.05] focus:outline-none transition-all" />
          </div>
          <div className="md:col-span-3">
            <select value={brand} onChange={e => setBrand(e.target.value)}
              className="w-full px-3 py-3 bg-white/[0.03] border border-white/10 rounded-sm text-[14px] font-mono uppercase tracking-[0.12em] focus:border-[var(--color-olive-line)] focus:outline-none">
              <option value="">{t('shop.filter.brand')}: {t('shop.filter.all')}</option>
              {BRANDS.map(b => <option key={b.slug} value={b.name}>{b.name}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full px-3 py-3 bg-white/[0.03] border border-white/10 rounded-sm text-[14px] font-mono uppercase tracking-[0.12em] focus:border-[var(--color-olive-line)] focus:outline-none">
              <option value="">{t('shop.filter.category')}: {t('shop.filter.all')}</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="w-full px-3 py-3 bg-white/[0.03] border border-white/10 rounded-sm text-[14px] font-mono uppercase tracking-[0.12em] focus:border-[var(--color-olive-line)] focus:outline-none">
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
            </select>
          </div>
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/55">
            <span className="text-[var(--color-olive-glow)] numeric">{String(filtered.length).padStart(3, '0')}</span> {t('shop.count')}
          </span>
          {hasFilters && (
            <button onClick={reset} className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/55 hover:text-[var(--color-olive-glow)] flex items-center gap-1.5">
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="vault-card p-16 text-center text-white/55">
            <Loader2 size={22} className="mx-auto animate-spin text-[var(--color-olive-glow)] mb-3" /> Loading the vault…
          </div>
        ) : filtered.length === 0 ? (
          <div className="vault-card p-16 text-center">
            <SlidersHorizontal size={28} className="mx-auto text-white/30 mb-4" />
            <p className="text-white/70 text-[15px] max-w-[480px] mx-auto">{t('shop.empty')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filtered.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}
