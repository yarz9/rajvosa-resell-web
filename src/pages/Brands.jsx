import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { BRANDS, PRODUCTS } from '@/data/products'

export default function Brands() {
  return (
    <div className="pt-32 md:pt-40 pb-24 px-5 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12 md:mb-16">
          <div className="eyebrow mb-3">AUTHORIZED CATALOG · {BRANDS.length} HOUSES</div>
          <h1 className="font-display font-semibold text-[clamp(44px,7vw,96px)] leading-[0.95] tracking-tight">
            The houses<br /><span className="shimmer-text">we source.</span>
          </h1>
          <p className="mt-6 text-[16px] md:text-[18px] text-white/65 max-w-[640px]">
            Every brand below is sourced through verified partners and authenticated before shipping.
            Don't see what you want? <Link to="/custom" className="link-neon">Request a custom order →</Link>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06]">
          {BRANDS.map((b, i) => {
            const count = PRODUCTS.filter(p => p.brand === b.name).length
            return (
              <motion.div key={b.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="bg-[#0E0E0E] hover:bg-[#141414] transition-colors p-8 md:p-12 group relative overflow-hidden">
                <div className="absolute inset-0 mesh-grid opacity-30 pointer-events-none" />
                <div className="relative">
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <span className="numeric font-mono text-[11px] tracking-[0.2em] uppercase text-white/35">
                      № {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[var(--color-olive-glow)]">
                      {count} pieces
                    </span>
                  </div>
                  <div className="font-display font-bold text-[clamp(36px,5vw,64px)] leading-[1] tracking-tight group-hover:text-[var(--color-olive-glow)] transition-colors">
                    {b.name}
                  </div>
                  <div className="mt-2 font-mono text-[12px] tracking-[0.2em] uppercase text-white/55">
                    {b.tagline}
                  </div>
                  <Link to={`/shop?brand=${encodeURIComponent(b.name)}`}
                    className="mt-6 inline-flex items-center gap-1.5 link-neon text-[13px]">
                    Browse {b.name} <ArrowUpRight size={13} />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
