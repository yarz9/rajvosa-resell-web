import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react'
import { AnimatedLogo } from '@/components/brand/AnimatedLogo'

// ══════════════════════════════════════════════════════════════
//  Toast — branded, glass, neon-bordered, with the AnimatedLogo
//  Usage:  const { push } = useToast(); push({ kind, title, body })
//  Kinds:  'success' | 'error' | 'info'  (defaults to 'info')
// ══════════════════════════════════════════════════════════════

const ToastCtx = createContext({ push: () => {}, dismiss: () => {} })
export const useToast = () => useContext(ToastCtx)

let _id = 0
const newId = () => ++_id

export function ToastProvider({ children }) {
  const [items, setItems] = useState([])

  const push = useCallback((toast) => {
    const id = newId()
    const t = { id, kind: 'info', ttl: 4500, ...toast }
    setItems((arr) => [...arr, t])
    if (t.ttl) setTimeout(() => setItems((arr) => arr.filter((x) => x.id !== id)), t.ttl)
    return id
  }, [])

  const dismiss = useCallback((id) => {
    setItems((arr) => arr.filter((x) => x.id !== id))
  }, [])

  return (
    <ToastCtx.Provider value={{ push, dismiss }}>
      {children}
      <div className="fixed top-[80px] right-4 md:right-6 z-[80] flex flex-col gap-3 max-w-[380px] w-[calc(100vw-32px)] pointer-events-none">
        <AnimatePresence initial={false}>
          {items.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0,  scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto toast-glass rounded-sm p-4 flex items-start gap-3 relative overflow-hidden"
            >
              {/* Neon accent stripe on the left */}
              <div className="absolute inset-y-0 left-0 w-[2px] bg-[var(--color-olive-glow)]"
                style={{ boxShadow: '0 0 12px var(--color-olive-glow)' }} />

              <span className="shrink-0">
                <AnimatedLogo variant="icon" asLink={false} pulse float={false} />
              </span>

              <div className="flex-1 min-w-0 pl-1">
                <div className="flex items-center gap-2 mb-1">
                  <KindIcon kind={t.kind} />
                  <div className="font-display font-semibold text-[13.5px] text-white truncate">
                    {t.title}
                  </div>
                </div>
                {t.body && (
                  <div className="text-[12.5px] text-white/65 leading-relaxed">{t.body}</div>
                )}
              </div>

              <button onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className="shrink-0 text-white/40 hover:text-white">
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  )
}

function KindIcon({ kind }) {
  if (kind === 'success') return <CheckCircle2 size={12} className="text-[var(--color-olive-glow)]" />
  if (kind === 'error')   return <AlertTriangle size={12} className="text-red-400" />
  return <Info size={12} className="text-white/60" />
}
