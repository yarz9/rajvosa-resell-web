import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useT } from '@/i18n/useI18n'
import { BrandMark } from '@/components/BrandMark'

// Futuristic vault-opening loader. Olive neon, scanline,
// terminal-style progress counter. Fades after window.load + min 1.4s.
export function LoadingScreen() {
  const t = useT()
  const [hidden, setHidden] = useState(false)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const min = 1400
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / min)
      setPct(Math.round(t * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const finish = () => {
      const elapsed = performance.now() - start
      const wait = Math.max(0, min - elapsed)
      setTimeout(() => setHidden(true), wait + 200)
    }
    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    return () => { cancelAnimationFrame(raf); window.removeEventListener('load', finish) }
  }, [])

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Mesh grid */}
          <div className="absolute inset-0 mesh-grid opacity-40" />

          {/* Radial olive glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(600px 400px at 50% 50%, rgba(184,255,90,0.12), transparent 70%)' }} />

          {/* Scanline */}
          <motion.div
            className="absolute inset-x-0 h-px bg-[var(--color-olive-glow)]/70"
            initial={{ y: '0%' }}
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            style={{ boxShadow: '0 0 24px var(--color-olive-glow)' }}
          />

          {/* Center mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative text-center"
          >
            <div className="eyebrow mb-7">RAJVOSA · EST. SARAJEVO</div>
            <div className="flex justify-center mb-7">
              <BrandMark size="hero" pulse float asLink={false} priority />
            </div>
            <div className="wordmark glow font-display font-bold text-[clamp(28px,4vw,44px)] tracking-[0.05em]">
              RAJVOSA<span className="accent">/</span>RESELL
            </div>
            <div className="mt-5 font-mono text-[11.5px] tracking-[0.32em] uppercase text-white/55">
              {t('load.sub')}
            </div>

            <div className="mt-10 w-[260px] mx-auto">
              <div className="h-px bg-white/[0.06] relative">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[var(--color-olive-glow)]"
                  style={{ width: `${pct}%`, boxShadow: '0 0 12px var(--color-olive-glow)' }}
                />
              </div>
              <div className="mt-2 font-mono text-[10.5px] text-white/45 flex items-center justify-between">
                <span>OPENING_VAULT</span>
                <span className="numeric text-[var(--color-olive-glow)]">{String(pct).padStart(3, '0')}%</span>
              </div>
            </div>
          </motion.div>

          {/* Corners */}
          {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-10 h-10 border border-[var(--color-olive-glow)]/60`}
              style={{
                borderTopWidth:    pos.includes('top')    ? 1 : 0,
                borderBottomWidth: pos.includes('bottom') ? 1 : 0,
                borderLeftWidth:   pos.includes('left')   ? 1 : 0,
                borderRightWidth:  pos.includes('right')  ? 1 : 0,
                maskImage: 'radial-gradient(circle at 50% 50%, transparent 25%, black 26%)',
              }} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
