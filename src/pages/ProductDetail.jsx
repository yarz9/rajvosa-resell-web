import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, BadgeCheck, Clock, ShieldCheck, Instagram, MessageCircle,
  ChevronLeft, ChevronRight, ArrowUpRight, Loader2, CheckCircle2, AlertTriangle,
  Truck, MapPin, X,
} from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { bySlug as seedBySlug, related as seedRelated } from '@/data/products'
import { BUSINESS } from '@/data/business'
import { ProductCard } from '@/components/ProductCard'
import { useToast } from '@/components/ui/Toast'
import { api, apiConfigured } from '@/lib/api'
import { AuthBadge } from '@/components/ui/AuthBadge'

function adapt(p) {
  if (!p) return null
  return {
    slug: p.slug, name: p.name, brand: p.brand, category: p.category,
    price: p.price, currency: p.currency || 'KM',
    depositAmount: Math.round((p.price || 0) / 2),
    deliveryEstimate: p.delivery_badge === 'same_day' ? 'Same-day pickup'
                    : p.delivery_badge === '24h'      ? '24h delivery'
                    : 'Ready for delivery',
    images: (p.images && p.images.length ? p.images.map(i => i.url || i) : []) || [],
    sizes: p.sizes || [],
    description: p.description || '',
    tags: p.tags || [],
    stock_qty: p.stock_qty,
    id: p.id,
  }
}

export default function ProductDetail() {
  const { slug } = useParams()
  const t = useT()
  const [p, setP] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [size, setSize] = useState('')
  const [showReserve, setShowReserve] = useState(false)

  useEffect(() => {
    setLoading(true); setActiveImg(0); setSize('')
    const fall = () => {
      const s = seedBySlug(slug)
      setP(s ? { ...s, depositAmount: s.depositAmount ?? Math.round((s.price || 0) / 2) } : null)
      setLoading(false)
    }
    if (!apiConfigured) { fall(); return }
    api.getProduct(slug).then(d => { setP(adapt(d.product)); setLoading(false) }).catch(fall)
  }, [slug])

  if (loading) return <div className="pt-40 pb-24 text-center text-white/55"><Loader2 className="animate-spin inline mr-2" /> Loading…</div>
  if (!p) return <Navigate to="/shop" replace />

  const rels = seedRelated(slug, 4)
  const waMsg = encodeURIComponent(`Hi Rajvosa — I'd like to reserve ${p.name}${size ? ` (size ${size})` : ''}. ${p.price} ${p.currency}.`)
  const waUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${waMsg}`

  return (
    <div className="pt-28 md:pt-32 pb-24 px-5 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <Link to="/shop" className="inline-flex items-center gap-2 text-[12px] font-mono tracking-[0.18em] uppercase text-white/55 hover:text-white mb-8">
          <ArrowLeft size={12} /> Back to vault
        </Link>

        <div className="grid lg:grid-cols-12 gap-10 md:gap-14">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="product-frame aspect-[4/5] relative overflow-hidden">
              {p.images[0] && (
                <motion.img
                  key={activeImg}
                  src={p.images[activeImg]}
                  alt={p.name}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover" />
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="chip">{p.brand}</span>
                {p.tags?.includes('grail') && <span className="chip neon live">GRAIL</span>}
                {p.tags?.includes('exclusive') && <span className="chip neon live">EXCLUSIVE</span>}
              </div>
              {p.images.length > 1 && (
                <>
                  <button onClick={() => setActiveImg(i => (i - 1 + p.images.length) % p.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[var(--color-olive-glow)]">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setActiveImg(i => (i + 1) % p.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[var(--color-olive-glow)]">
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
            {p.images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {p.images.map((src, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`aspect-square rounded-sm overflow-hidden border-2 transition-all ${
                      activeImg === i ? 'border-[var(--color-olive-glow)]' : 'border-transparent hover:border-white/30'
                    }`}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Specs */}
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">{p.brand} · {p.category}</div>
            <h1 className="font-display font-semibold text-[clamp(30px,4vw,52px)] leading-[1.05] tracking-tight">{p.name}</h1>

            <div className="mt-5">
              <AuthBadge size="sm" />
            </div>

            <div className="mt-6 flex items-baseline gap-4">
              <span className="numeric font-display font-bold text-[42px] md:text-[52px] leading-none">
                {p.price} <span className="text-white/45 text-[18px] font-normal">{p.currency}</span>
              </span>
            </div>

            {p.description && (
              <p className="mt-6 text-[15px] text-white/65 leading-relaxed">{p.description}</p>
            )}

            {p.sizes && p.sizes.length > 0 && (
              <div className="mt-8">
                <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-white/55 mb-3">{t('pdp.size')}</div>
                <div className="flex flex-wrap gap-2">
                  {p.sizes.map(s => (
                    <button key={s} onClick={() => setSize(s === size ? '' : s)}
                      className={`min-w-[52px] px-3 py-2.5 rounded-sm border font-mono text-[12px] uppercase tracking-[0.12em] transition-all ${
                        s === size
                          ? 'border-[var(--color-olive-glow)] bg-[var(--color-olive-soft)] text-[var(--color-olive-glow)]'
                          : 'border-white/15 text-white/75 hover:border-white/40'
                      }`}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center gap-2 text-[13px] text-white/70">
              {p.deliveryEstimate?.includes('Same-day')
                ? <MapPin size={14} className="text-[var(--color-olive-glow)]" />
                : p.deliveryEstimate?.includes('24h')
                  ? <Clock size={14} className="text-[var(--color-olive-glow)]" />
                  : <Truck size={14} className="text-[var(--color-olive-glow)]" />}
              <span className="font-mono uppercase tracking-[0.12em] text-[11px]">Delivery:</span>
              <span className="font-semibold">{p.deliveryEstimate}</span>
            </div>

            {p.stock_qty !== undefined && p.stock_qty > 0 && p.stock_qty <= 2 && (
              <div className="mt-3 text-[11.5px] font-mono uppercase tracking-wider text-[var(--color-olive-glow)]">
                Only {p.stock_qty} left in stock
              </div>
            )}

            <div className="mt-8 space-y-3">
              <button onClick={() => setShowReserve(true)} className="btn-neon w-full">
                Reserve now <ArrowUpRight size={14} />
              </button>
              <div className="grid grid-cols-2 gap-3">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost justify-center">
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost justify-center">
                  <Instagram size={14} /> Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related (uses bundled seed; works without API) */}
        {rels.length > 0 && (
          <div className="mt-24">
            <div className="eyebrow mb-4">{t('pdp.related')}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {rels.map((r, i) => <ProductCard key={r.slug} p={r} index={i} />)}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showReserve && (
          <ReserveModal product={p} size={size} onClose={() => setShowReserve(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

function ReserveModal({ product, size, onClose }) {
  const { push } = useToast()
  const [s, setS] = useState({ name: '', email: '', phone: '', delivery_method: 'pickup', notes: '' })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(null)
  const [err, setErr] = useState('')
  const upd = (k) => (e) => setS(p => ({ ...p, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault(); setErr('')
    if (s.name.trim().length < 2) return setErr('Add your name.')
    if (!/^\S+@\S+\.\S+$/.test(s.email)) return setErr('Add a valid email.')
    setSending(true)
    const payload = {
      product_id: product.id || '',
      product_slug: product.slug,
      product_name: product.name,
      size,
      ...s,
      website_url: '',
    }
    try {
      if (apiConfigured) {
        const d = await api.submitReserve(payload)
        setDone({ code: d.code })
        push({ kind: 'success', title: 'Reservation held', body: `Code ${d.code}.` })
      } else {
        await new Promise(r => setTimeout(r, 600))
        setDone({ code: 'CONCEPT-PREVIEW' })
        push({ kind: 'success', title: 'Reservation held (preview)', body: 'No backend wired yet — DM @rajvosaresell.' })
      }
    } catch (e) {
      setErr(e.message || 'Could not reserve.'); push({ kind: 'error', title: 'Reserve failed', body: e.message })
    } finally { setSending(false) }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-[520px] vault-card p-7"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white"><X size={18} /></button>

        {done ? (
          <div className="text-center py-6">
            <div className="inline-flex w-16 h-16 rounded-full bg-[var(--color-olive-soft)] border-2 border-[var(--color-olive-line)] items-center justify-center mb-5">
              <CheckCircle2 size={28} className="text-[var(--color-olive-glow)]" />
            </div>
            <h3 className="font-display font-semibold text-[24px] mb-2">Holding it for you.</h3>
            <p className="text-white/65 text-[14px]">
              Code <span className="font-mono text-[var(--color-olive-glow)]">{done.code}</span>.
              We'll confirm pickup or delivery within the hour.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <div className="eyebrow mb-2">RESERVE</div>
              <h3 className="font-display font-semibold text-[22px] tracking-tight">{product.name}</h3>
              <div className="text-[12.5px] text-white/55 mt-1">
                {product.price} {product.currency} · {size ? `Size ${size}` : 'No size selected'} · {product.deliveryEstimate}
              </div>
            </div>

            <input value={s.name}  onChange={upd('name')}  className={inp} placeholder="Your name *" />
            <input value={s.email} onChange={upd('email')} className={inp} placeholder="Email *" type="email" />
            <input value={s.phone} onChange={upd('phone')} className={inp} placeholder="Phone (optional)" />

            <div className="grid grid-cols-3 gap-2">
              {[['pickup', MapPin, 'Pickup'], ['24h', Clock, '24h delivery'], ['shipping', Truck, 'Ship BiH']].map(([v, Ic, label]) => (
                <button key={v} type="button" onClick={() => setS(p => ({ ...p, delivery_method: v }))}
                  className={`px-2 py-3 rounded-sm border text-[11.5px] font-mono uppercase tracking-[0.1em] flex flex-col items-center gap-1 ${
                    s.delivery_method === v
                      ? 'border-[var(--color-olive-glow)] bg-[var(--color-olive-soft)] text-[var(--color-olive-glow)]'
                      : 'border-white/15 text-white/65 hover:border-white/40'
                  }`}>
                  <Ic size={13} /> {label}
                </button>
              ))}
            </div>

            <textarea rows={3} value={s.notes} onChange={upd('notes')} className={inp + ' resize-none'} placeholder="Pickup time, address, notes…" />

            {err && (
              <p className="text-[13px] text-red-300 flex items-center gap-2">
                <AlertTriangle size={13} /> {err}
              </p>
            )}

            <button type="submit" disabled={sending} className="btn-neon w-full justify-center disabled:opacity-50">
              {sending ? <><Loader2 size={14} className="animate-spin" /> Holding…</> : <>Confirm reservation <ArrowUpRight size={14} /></>}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

const inp = 'w-full px-3.5 py-3 bg-white/[0.03] border border-white/10 rounded-sm text-[14px] text-white placeholder:text-white/35 focus:border-[var(--color-olive-line)] focus:bg-white/[0.05] focus:outline-none transition-all'
