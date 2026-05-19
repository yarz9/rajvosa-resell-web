import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useT } from '@/i18n/useI18n'

export function ProductCard({ p, index = 0 }) {
  const t = useT()
  const isExclusive = p.tags?.includes('exclusive') || p.tags?.includes('grail')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: Math.min(index, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="product-card group"
    >
      <Link to={`/product/${p.slug}`} className="block no-underline text-white">
        <div className="product-frame aspect-[4/5] relative">
          <img src={p.images[0]} alt={p.name} loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" />

          {/* Scanline overlay */}
          <div className="scanline" />

          {/* Top chips */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            <span className="chip">{p.brand}</span>
            {isExclusive && (
              <span className="chip neon live">EXCLUSIVE</span>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[var(--color-olive-glow)] flex items-center gap-1.5">
              <Sparkles size={11} /> {t('card.view')} <ArrowUpRight size={11} />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-white/50">{p.category}</div>
          <div className="mt-1 font-display font-semibold text-[15px] leading-tight">{p.name}</div>
          <div className="mt-2 flex items-center justify-between">
            <div className="numeric text-[15px] font-semibold text-white">
              {p.price} <span className="text-white/50 text-[12px] font-normal">{p.currency}</span>
            </div>
            <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--color-olive-glow)]">
              {p.depositAmount} {p.currency} {t('card.deposit')}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
