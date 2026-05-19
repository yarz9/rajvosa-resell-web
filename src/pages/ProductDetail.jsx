import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, BadgeCheck, Clock, ShieldCheck, Instagram, MessageCircle,
  Wallet, PackageCheck, ChevronLeft, ChevronRight, ArrowUpRight,
} from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { bySlug, related } from '@/data/products'
import { BUSINESS } from '@/data/business'
import { ProductCard } from '@/components/ProductCard'

export default function ProductDetail() {
  const { slug } = useParams()
  const p = bySlug(slug)
  const t = useT()
  const [activeImg, setActiveImg] = useState(0)
  const [size, setSize] = useState('')

  if (!p) return <Navigate to="/shop" replace />

  const rels = related(slug, 4)
  const igUrl = `${BUSINESS.instagram}`
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
              <motion.img
                key={activeImg}
                src={p.images[activeImg]}
                alt={p.name}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="chip">{p.brand}</span>
                {p.tags?.includes('grail') && <span className="chip neon live">GRAIL</span>}
                {p.tags?.includes('authenticated') && <span className="chip neon">AUTH ✓</span>}
              </div>
              {p.images.length > 1 && (
                <>
                  <button onClick={() => setActiveImg(i => (i - 1 + p.images.length) % p.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[var(--color-olive-glow)] hover:border-[var(--color-olive-line)]">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setActiveImg(i => (i + 1) % p.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[var(--color-olive-glow)] hover:border-[var(--color-olive-line)]">
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

            <div className="mt-6 flex items-baseline gap-4">
              <span className="numeric font-display font-bold text-[42px] md:text-[52px] leading-none">
                {p.price} <span className="text-white/45 text-[18px] font-normal">{p.currency}</span>
              </span>
            </div>

            <p className="mt-6 text-[15px] text-white/65 leading-relaxed">{p.description}</p>

            {/* Authentication badge */}
            <div className="mt-6 inline-flex items-center gap-2 text-[12px] font-mono tracking-[0.18em] uppercase text-[var(--color-olive-glow)]">
              <BadgeCheck size={14} /> {t('pdp.authenticated')}
            </div>

            {/* Sizes */}
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

            {/* Deposit split */}
            <div className="mt-8 vault-card p-5">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[var(--color-olive-glow)] mb-4">Payment split</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.03] border border-[var(--color-olive-line)] rounded-sm p-4">
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-olive-glow)] mb-1">{t('pdp.now')}</div>
                  <div className="numeric font-display font-semibold text-[24px]">{p.depositAmount} {p.currency}</div>
                  <div className="text-[11px] text-white/45 mt-1">Secures sourcing</div>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.08] rounded-sm p-4">
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/55 mb-1">{t('pdp.later')}</div>
                  <div className="numeric font-display font-semibold text-[24px]">{p.depositAmount} {p.currency}</div>
                  <div className="text-[11px] text-white/45 mt-1">On arrival</div>
                </div>
              </div>
              <p className="text-[12px] text-white/55 mt-3 leading-relaxed">{t('pdp.deposit50')}</p>
            </div>

            {/* Delivery */}
            <div className="mt-5 flex items-center gap-2 text-[13px] text-white/70">
              <Clock size={14} className="text-[var(--color-olive-glow)]" />
              <span className="font-mono uppercase tracking-[0.12em] text-[11px]">{t('pdp.delivery')}:</span>
              <span className="font-semibold">{p.deliveryEstimate}</span>
            </div>

            {/* CTAs */}
            <div className="mt-8 space-y-3">
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-neon w-full">
                {t('pdp.reserve')} → {p.depositAmount} {p.currency} <ArrowUpRight size={14} />
              </a>
              <a href={igUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full">
                <Instagram size={14} /> {t('pdp.ask')}
              </a>
            </div>
          </div>
        </div>

        {/* Related */}
        {rels.length > 0 && (
          <div className="mt-24">
            <div className="eyebrow mb-4">{t('pdp.related')}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {rels.map((r, i) => <ProductCard key={r.slug} p={r} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
