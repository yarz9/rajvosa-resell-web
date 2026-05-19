import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles, BadgeCheck, Wallet, ShieldCheck, Truck, PackageCheck, ArrowUpRight,
} from 'lucide-react'
import { useT } from '@/i18n/useI18n'

export default function HowItWorks() {
  const t = useT()
  const STEPS = [1,2,3,4,5,6,7].map((n, i) => ({
    n: String(n).padStart(2, '0'),
    t: t(`how.s${n}.t`),
    d: t(`how.s${n}.d`),
    icon: [Sparkles, BadgeCheck, Wallet, ShieldCheck, Truck, Wallet, PackageCheck][i],
  }))

  return (
    <div className="pt-32 md:pt-40 pb-24 px-5 md:px-8">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="eyebrow mb-3">{t('how.eyebrow')}</div>
          <h1 className="font-display font-semibold text-[clamp(40px,6vw,84px)] leading-[0.98] tracking-tight max-w-[820px] mx-auto">
            {t('how.title')}
          </h1>
        </div>

        <ol className="relative">
          {/* Vertical thread */}
          <div className="absolute left-[28px] md:left-[40px] top-2 bottom-2 w-px bg-[var(--color-olive-line)] hidden md:block" />

          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.li key={s.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr] gap-5 mb-10 md:mb-12">
                {/* Numeric node */}
                <div className="relative">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full glass flex items-center justify-center relative z-10"
                    style={{ boxShadow: '0 0 20px -8px rgba(184,255,90,0.5)' }}>
                    <Icon size={20} className="text-[var(--color-olive-glow)]" />
                  </div>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 numeric font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-olive-glow)]/70">
                    {s.n}
                  </span>
                </div>
                <div className="pt-2 pb-6 md:pb-10">
                  <h2 className="font-display font-semibold text-[clamp(22px,3vw,32px)] leading-tight tracking-tight">
                    {s.t}
                  </h2>
                  <p className="mt-2.5 text-[15px] md:text-[16px] text-white/65 leading-relaxed max-w-[640px]">
                    {s.d}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </ol>

        {/* Trust badges */}
        <div className="mt-16 grid sm:grid-cols-3 gap-4">
          {[
            { t: '100% Authentic', d: 'Manually checked before shipping.' },
            { t: '50% deposit only', d: 'Pay the rest before final delivery.' },
            { t: '~3 week delivery', d: 'Realistic, honest, every time.' },
          ].map((b, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }}
              className="vault-card p-5">
              <div className="font-display font-semibold text-[16px]">{b.t}</div>
              <div className="text-[13px] text-white/55 mt-1">{b.d}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link to="/custom" className="btn-neon">
            Start a custom order <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}
