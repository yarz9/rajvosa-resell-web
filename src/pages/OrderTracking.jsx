import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, AlertTriangle, CheckCircle2, Loader2, Truck, PackageCheck, Wallet } from 'lucide-react'
import { useT } from '@/i18n/useI18n'

// Concept-preview tracker. Hard-coded sample order so reviewers can
// see what the experience looks like. Wire to /api/orders/:id later.
const SAMPLE_ORDERS = {
  'RR-2025-0421': {
    code: 'RR-2025-0421',
    item: 'Corteiz Alcatraz Hoodie — Olive · L',
    placedAt: '12 Apr 2026',
    eta: 'Week of 06 May 2026',
    currentStep: 3, // 0-5
  },
}

const STEPS = ['track.step.deposit', 'track.step.sourcing', 'track.step.transit', 'track.step.arrived', 'track.step.final', 'track.step.delivered']

export default function OrderTracking() {
  const t = useT()
  const [code, setCode] = useState('')
  const [order, setOrder] = useState(null)
  const [err, setErr] = useState('')
  const [searching, setSearching] = useState(false)

  const lookup = (e) => {
    e.preventDefault()
    setErr(''); setOrder(null); setSearching(true)
    setTimeout(() => {
      const found = SAMPLE_ORDERS[code.trim().toUpperCase()]
      if (!found) setErr(t('track.notfound'))
      else setOrder(found)
      setSearching(false)
    }, 500)
  }

  return (
    <div className="pt-32 md:pt-40 pb-24 px-5 md:px-8 relative">
      <div className="absolute inset-0 mesh-grid opacity-30 pointer-events-none" />
      <div className="relative max-w-[880px] mx-auto">
        <div className="text-center mb-12">
          <div className="eyebrow mb-3">REAL-TIME STATUS</div>
          <h1 className="font-display font-semibold text-[clamp(40px,6vw,80px)] leading-[0.98] tracking-tight">
            {t('track.title')}
          </h1>
          <p className="mt-5 text-[16px] md:text-[18px] text-white/65 max-w-[520px] mx-auto">
            {t('track.sub')}
          </p>
        </div>

        <form onSubmit={lookup} className="vault-card p-5 md:p-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input value={code} onChange={e => setCode(e.target.value)} placeholder={t('track.example')}
              className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-sm text-[15px] font-mono tracking-[0.12em] uppercase focus:border-[var(--color-olive-line)] focus:outline-none" />
          </div>
          <button type="submit" disabled={searching || !code.trim()}
            className="btn-neon disabled:opacity-50 disabled:cursor-not-allowed">
            {searching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
            {t('track.cta')}
          </button>
        </form>

        {err && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-start gap-3 p-5 bg-red-500/10 border border-red-500/30 rounded-sm">
            <AlertTriangle size={16} className="text-red-300 shrink-0 mt-0.5" />
            <p className="text-[14px] text-red-200">{err}</p>
          </motion.div>
        )}

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 vault-card p-7 md:p-9">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
              <div>
                <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[var(--color-olive-glow)] mb-1">Order</div>
                <div className="font-display font-semibold text-[22px]">{order.code}</div>
                <div className="text-white/60 text-[14px] mt-1">{order.item}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-white/55 mb-1">ETA</div>
                <div className="font-display font-semibold text-[18px]">{order.eta}</div>
              </div>
            </div>

            {/* Step list */}
            <ol className="space-y-2.5 mt-8">
              {STEPS.map((sKey, i) => {
                const done = i < order.currentStep
                const current = i === order.currentStep
                return (
                  <li key={sKey} className={`flex items-center gap-4 p-4 rounded-sm border transition-all ${
                    current ? 'bg-[var(--color-olive-soft)] border-[var(--color-olive-line)]'
                            : done ? 'bg-white/[0.02] border-white/10'
                                   : 'bg-transparent border-white/[0.06] opacity-50'
                  }`}>
                    <span className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-[11px] shrink-0 ${
                      done ? 'bg-[var(--color-olive-glow)] text-black'
                           : current ? 'bg-black border border-[var(--color-olive-glow)] text-[var(--color-olive-glow)]'
                                     : 'bg-white/5 border border-white/10 text-white/40'
                    }`}>
                      {done ? <CheckCircle2 size={14} strokeWidth={2.5} /> : String(i + 1).padStart(2,'0')}
                    </span>
                    <span className={`flex-1 font-display text-[15px] md:text-[16px] ${
                      current ? 'font-semibold' : done ? 'text-white/85' : 'text-white/50'
                    }`}>
                      {t(sKey)}
                    </span>
                    {current && (
                      <span className="chip live neon">LIVE</span>
                    )}
                  </li>
                )
              })}
            </ol>
          </motion.div>
        )}
      </div>
    </div>
  )
}
