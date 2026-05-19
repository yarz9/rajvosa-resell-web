import { useState } from 'react'
import { Plus, Minus, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useT } from '@/i18n/useI18n'
import { BUSINESS } from '@/data/business'

export default function FAQ() {
  const t = useT()
  const [open, setOpen] = useState('q1')
  const items = ['q1','q2','q3','q4','q5','q6']

  return (
    <div className="pt-32 md:pt-40 pb-24 px-5 md:px-8">
      <div className="max-w-[1080px] mx-auto">
        <div className="mb-12 md:mb-16">
          <div className="eyebrow mb-3">PRACTICAL NOTES</div>
          <h1 className="font-display font-semibold text-[clamp(40px,6vw,84px)] leading-[0.98] tracking-tight">
            {t('faq.title')}
          </h1>
        </div>

        <ul className="border-t border-white/[0.08]">
          {items.map((k, i) => {
            const isOpen = open === k
            return (
              <li key={k} className="border-b border-white/[0.08]">
                <button onClick={() => setOpen(isOpen ? null : k)}
                  className="w-full flex items-start gap-5 md:gap-8 py-6 md:py-7 text-left group"
                  aria-expanded={isOpen}>
                  <span className="font-mono text-[12px] tracking-[0.18em] text-[var(--color-olive-glow)] mt-1.5 w-10 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-display font-semibold text-[18px] md:text-[24px] leading-[1.25] tracking-tight">
                    {t(`faq.${k}`)}
                  </span>
                  <span className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                    isOpen ? 'bg-[var(--color-olive-glow)] border-[var(--color-olive-glow)] text-black'
                           : 'border-white/15 text-white/70 group-hover:border-[var(--color-olive-line)] group-hover:text-[var(--color-olive-glow)]'
                  }`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden">
                      <div className="pl-0 md:pl-[64px] pb-7 md:pb-9 max-w-[760px] text-[15px] md:text-[16.5px] leading-[1.75] text-white/70">
                        {t(`faq.a${k.slice(1)}`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>

        <div className="mt-14 vault-card p-7 md:p-9 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display font-semibold text-[22px] md:text-[26px]">Still got questions?</div>
            <div className="text-white/55 mt-1">We live in Instagram DMs — usually reply in minutes.</div>
          </div>
          <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-neon">
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
