import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowUpRight, ArrowRight, ShieldCheck, Clock, Sparkles, BadgeCheck,
  Instagram, MessageCircle, Quote, Truck, Wallet, PackageCheck, MapPin,
} from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { ProductCard } from '@/components/ProductCard'
import { AnimatedLogo } from '@/components/brand/AnimatedLogo'
import { ParticleField, AmbientGlow } from '@/components/brand/Atmosphere'
import { featured, BRANDS } from '@/data/products'
import { BUSINESS } from '@/data/business'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedDrops />
      <HowItWorksTimeline />
      <BrandsStrip />
      <TrustBlock />
      <Testimonials />
      <FinalCTA />
    </>
  )
}

// ─── Hero ──────────────────────────────────────────────────

function Hero() {
  const t = useT()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[100svh] pt-28 md:pt-32 pb-20 px-5 md:px-8 overflow-hidden flex items-center">
      {/* Mesh grid */}
      <div className="absolute inset-0 mesh-grid opacity-50 pointer-events-none" />

      {/* Drifting particles */}
      <ParticleField count={32} />

      {/* Parallax neon glow */}
      <motion.div
        style={{ y, opacity }}
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
      >
        <div className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(184,255,90,0.18), transparent 70%)' }} />
      </motion.div>

      {/* Corner brackets */}
      {[
        'top-[88px] left-5 md:left-8',
        'top-[88px] right-5 md:right-8',
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-12 h-12 pointer-events-none`}>
          <div className={`absolute ${pos.includes('left') ? 'left-0' : 'right-0'} top-0 h-px w-12 bg-[var(--color-olive-glow)]/60`} />
          <div className={`absolute ${pos.includes('left') ? 'left-0' : 'right-0'} top-0 w-px h-12 bg-[var(--color-olive-glow)]/60`} />
        </div>
      ))}

      <div className="relative max-w-[1440px] mx-auto w-full grid lg:grid-cols-12 gap-10 items-center">
        {/* Copy column */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          {/* Featured logo mark — large, floating, pulsing, click-rippling, magnetic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex mb-6 -ml-1"
          >
            <AnimatedLogo variant="hero" pulse float interactive asLink={false} priority />
          </motion.div>

          {/* Delivery + pickup chips (replaces the previous authenticity badge) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="hidden lg:flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full chip neon">
              <Truck size={11} /> 48h delivery in BiH
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full chip">
              <MapPin size={11} /> Pickup in Sarajevo
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 mb-7 rounded-full border border-[var(--color-olive-line)] bg-[var(--color-olive-soft)] backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-olive-glow)]"
              style={{ boxShadow: '0 0 8px var(--color-olive-glow)' }} />
            <span className="font-mono text-[10.5px] tracking-[0.24em] uppercase text-[var(--color-olive-glow)]">
              {t('hero.eyebrow')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            className="font-display font-bold text-[clamp(48px,8vw,128px)] leading-[0.95] tracking-[-0.03em]"
          >
            {t('hero.h1.a')}<br />
            <span className="shimmer-text">{t('hero.h1.b')}</span><br />
            <span className="italic font-light">{t('hero.h1.c')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="mt-7 text-[16px] md:text-[19px] text-white/65 leading-relaxed max-w-[640px]"
          >
            {t('hero.sub')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Link to="/shop" className="btn-neon">
              {t('hero.cta')} <ArrowUpRight size={15} />
            </Link>
            <Link to="/custom" className="btn-ghost">
              {t('hero.cta2')} <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex items-center gap-5 text-[12px] text-white/45 font-mono uppercase tracking-[0.18em]"
          >
            <Link to="/how" className="link-neon !text-white/60 hover:!text-[var(--color-olive-glow)]">
              {t('hero.cta3')} →
            </Link>
          </motion.div>
        </motion.div>

        {/* Product preview column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative hidden lg:block"
        >
          <HeroProductStack />
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 inset-x-0 border-y border-white/[0.06] bg-black/40 backdrop-blur overflow-hidden">
        <div className="flex items-center gap-12 py-3 animate-[ticker_30s_linear_infinite] whitespace-nowrap"
          style={{ animation: 'ticker 30s linear infinite' }}>
          {[...Array(2)].flatMap(() => ['CORTEIZ','TRAPSTAR','ESSENTIALS','DENIM TEARS','AMI PARIS','JORDAN','NIKE','ADIDAS','FOOTBALL JERSEYS','CUSTOM ORDERS']).map((b, i) => (
            <span key={i} className="font-display font-semibold text-[14px] tracking-[0.18em] uppercase text-white/35 flex items-center gap-12">
              {b}
              <span className="text-[var(--color-olive-glow)]/60">/</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
      </div>
    </section>
  )
}

function HeroProductStack() {
  const feat = featured().slice(0, 3)
  if (!feat.length) return null
  return (
    <div className="relative h-[520px]">
      {feat.map((p, i) => (
        <motion.div
          key={p.slug}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="absolute product-frame overflow-hidden"
          style={{
            width: '320px',
            height: '420px',
            top:    i === 0 ? '40px' : i === 1 ? '0' : '80px',
            left:   i === 0 ? '0'    : i === 1 ? '180px' : '90px',
            zIndex: 10 - i,
            transform: `rotate(${i === 0 ? -3 : i === 1 ? 4 : -1}deg)`,
          }}
        >
          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
          <div className="scanline" style={{ opacity: 0.3 }} />
          <div className="absolute bottom-3 left-3 right-3">
            <span className="chip neon">{p.brand}</span>
            <div className="mt-2 font-display font-semibold text-[14px] truncate">{p.name}</div>
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--color-olive-glow)] mt-1">{p.price} {p.currency}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Trust strip ────────────────────────────────────────────

function TrustStrip() {
  const t = useT()
  const items = [
    { icon: Truck,    label: t('strip.auth') },     // 48h delivery in BiH
    { icon: MapPin,   label: t('strip.deposit') },  // Pickup in Sarajevo
    { icon: Wallet,   label: t('strip.delivery') }, // 50% deposit · custom
    { icon: Instagram, label: t('strip.custom') },  // DM @rajvosa_resell
  ]
  return (
    <section className="relative border-y border-white/[0.06] bg-[#111]/40 backdrop-blur-sm">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-6">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-4 md:gap-x-8">
          {items.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-[13px] text-white/80">
              <Icon size={16} className="text-[var(--color-olive-glow)] shrink-0" />
              <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── Featured drops ────────────────────────────────────────

function FeaturedDrops() {
  const t = useT()
  const items = featured()
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="eyebrow mb-3">{t('feat.eyebrow')}</div>
            <h2 className="font-display font-semibold text-[clamp(36px,5.5vw,68px)] leading-[1] tracking-tight">
              {t('feat.title')}
            </h2>
          </div>
          <Link to="/shop" className="link-neon font-mono text-[12px] uppercase tracking-[0.18em]">
            {t('feat.cta')}
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {items.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}

// ─── How it works timeline ─────────────────────────────────

function HowItWorksTimeline() {
  const t = useT()
  const steps = [1,2,3,4,5,6,7].map(n => ({
    n: String(n).padStart(2, '0'),
    t: t(`how.s${n}.t`),
    d: t(`how.s${n}.d`),
    icon: [Sparkles, BadgeCheck, Wallet, ShieldCheck, Truck, Wallet, PackageCheck][n-1],
  }))
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 border-y border-white/[0.06]">
      <div className="absolute inset-0 mesh-grid opacity-30 pointer-events-none" />
      <div className="relative max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <div className="eyebrow mb-3">{t('how.eyebrow')}</div>
          <h2 className="font-display font-semibold text-[clamp(36px,5.5vw,68px)] leading-[1.02] tracking-tight max-w-[820px] mx-auto">
            {t('how.title')}
          </h2>
        </div>

        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.li key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="vault-card p-6 group">
                <div className="flex items-start justify-between mb-5">
                  <span className="numeric font-display font-bold text-[36px] text-white/15 group-hover:text-[var(--color-olive-glow)]/60 transition-colors">{s.n}</span>
                  <Icon size={18} className="text-[var(--color-olive-glow)]" />
                </div>
                <div className="font-display font-semibold text-[16px] mb-2">{s.t}</div>
                <p className="text-[13.5px] text-white/55 leading-relaxed">{s.d}</p>
              </motion.li>
            )
          })}
        </ol>

        <div className="mt-12 text-center">
          <Link to="/how" className="btn-ghost">
            See the full process <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Brands strip ──────────────────────────────────────────

function BrandsStrip() {
  const t = useT()
  return (
    <section className="relative py-24 md:py-28 px-5 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-12">
          <div className="eyebrow mb-3">{t('brand.eyebrow')}</div>
          <h2 className="font-display font-semibold text-[clamp(34px,5vw,60px)] leading-[1] tracking-tight">
            {t('brand.title')}
          </h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-px bg-white/[0.06] border border-white/[0.06]">
          {BRANDS.map(b => (
            <Link key={b.slug} to="/brands"
              className="bg-[#0E0E0E] hover:bg-[#141414] aspect-[4/3] flex flex-col items-center justify-center p-4 text-center group transition-colors">
              <div className="font-display font-bold text-[18px] md:text-[22px] tracking-tight group-hover:text-[var(--color-olive-glow)] transition-colors">
                {b.name}
              </div>
              <div className="mt-1 font-mono text-[9.5px] tracking-[0.2em] uppercase text-white/35">
                {b.tagline}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Long-form trust ───────────────────────────────────────

function TrustBlock() {
  const t = useT()
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 border-y border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="eyebrow mb-3">SOURCED · VERIFIED · DELIVERED</div>
          <h2 className="font-display font-semibold text-[clamp(34px,5vw,60px)] leading-[1.02] tracking-tight">
            {t('trust.title')}
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-6 text-[16px] md:text-[17px] text-white/70 leading-[1.7]">
          <p className="first-letter:float-left first-letter:font-display first-letter:font-bold first-letter:text-[64px] first-letter:leading-[0.85] first-letter:mr-3 first-letter:mt-1 first-letter:text-[var(--color-olive-glow)]">
            {t('trust.p1')}
          </p>
          <p>{t('trust.p2')}</p>
          <p>{t('trust.p3')}</p>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ──────────────────────────────────────────

function Testimonials() {
  const t = useT()
  const reviews = [
    { q: t('rev.q1'), who: t('rev.q1.who') },
    { q: t('rev.q2'), who: t('rev.q2.who') },
    { q: t('rev.q3'), who: t('rev.q3.who') },
  ]
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <div className="eyebrow mb-3">{t('rev.eyebrow')}</div>
          <h2 className="font-display font-semibold text-[clamp(34px,5vw,60px)] leading-[1.02] tracking-tight max-w-[800px]">
            {t('rev.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="vault-card p-7">
              <Quote size={18} className="text-[var(--color-olive-glow)] mb-5" />
              <p className="font-display text-[18px] md:text-[20px] leading-[1.4] text-white/90">{r.q}</p>
              <div className="mt-6 pt-5 border-t border-white/[0.06] font-mono text-[11px] tracking-[0.18em] uppercase text-white/55">
                {r.who}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ─────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="relative py-24 md:py-36 px-5 md:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(700px 500px at 50% 50%, rgba(184,255,90,0.12), transparent 70%)' }} />
      <div className="absolute inset-0 mesh-grid opacity-40 pointer-events-none" />
      <div className="relative max-w-[900px] mx-auto text-center">
        <div className="eyebrow mb-5">READY · WHEN YOU ARE</div>
        <h2 className="font-display font-bold text-[clamp(40px,6.5vw,88px)] leading-[1] tracking-[-0.02em]">
          Find your <span className="shimmer-text">grail</span>.
          <br />
          We'll get it here.
        </h2>
        <p className="mt-6 text-[16px] md:text-[18px] text-white/65 max-w-[560px] mx-auto">
          Drop us a link, a screenshot, or just the name of the piece. 24-hour reply, every time.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/custom" className="btn-neon">
            Start a custom order <ArrowUpRight size={15} />
          </Link>
          <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Instagram size={14} /> DM on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
