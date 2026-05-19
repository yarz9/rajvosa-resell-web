import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send, CheckCircle2, AlertTriangle, Loader2, Instagram, MessageCircle, Sparkles, ArrowUpRight,
} from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { BRANDS } from '@/data/products'
import { BUSINESS } from '@/data/business'

export default function CustomOrder() {
  const t = useT()
  const [s, setS] = useState({
    name: '', email: '', phone: '', ig: '', brand: '', product: '',
    size: '', color: '', budget: '', url: '', notes: '',
  })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  const upd = k => e => setS(p => ({ ...p, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    setErr('')
    if (!s.name.trim()) return setErr('Add your name.')
    if (!/^\S+@\S+\.\S+$/.test(s.email)) return setErr('Add a valid email.')
    if (!s.product.trim()) return setErr('Add the product name or a link.')
    setSending(true)
    // Concept preview — simulate send.
    setTimeout(() => { setSending(false); setDone(true) }, 900)
  }

  const waMsg = encodeURIComponent(
    `Custom order request:\n• Brand: ${s.brand}\n• Product: ${s.product}\n• Size: ${s.size}\n• Colour: ${s.color}\n• Budget: ${s.budget} KM\n• Link: ${s.url}\n• Notes: ${s.notes}`
  )
  const waUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${waMsg}`

  return (
    <div className="pt-32 md:pt-40 pb-24 px-5 md:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(184,255,90,0.10), transparent 70%)' }} />

      <div className="relative max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <div className="eyebrow mb-3">{t('co.eyebrow')}</div>
          <h1 className="font-display font-semibold text-[clamp(40px,6vw,80px)] leading-[0.98] tracking-tight max-w-[800px] mx-auto">
            {t('co.title')}
          </h1>
          <p className="mt-6 text-[16px] md:text-[18px] text-white/65 max-w-[560px] mx-auto">
            {t('co.sub')}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-10">
          {/* Form */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done"
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  className="vault-card p-12 md:p-16 text-center">
                  <div className="inline-flex w-20 h-20 rounded-full bg-[var(--color-olive-soft)] border-2 border-[var(--color-olive-line)] items-center justify-center mb-6"
                    style={{ boxShadow: '0 0 32px -4px rgba(184,255,90,0.4)' }}>
                    <CheckCircle2 size={32} className="text-[var(--color-olive-glow)]" />
                  </div>
                  <h3 className="font-display font-semibold text-[clamp(28px,3.6vw,40px)] tracking-tight">
                    {t('co.success.t')}
                  </h3>
                  <p className="mt-4 text-white/65 max-w-[440px] mx-auto leading-relaxed">
                    {t('co.success.d')}
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="vault-card p-6 md:p-9 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label={t('co.f.name')} required>
                      <input value={s.name} onChange={upd('name')} className={inp} placeholder="Adi" />
                    </Field>
                    <Field label={t('co.f.email')} required>
                      <input type="email" value={s.email} onChange={upd('email')} className={inp} placeholder="you@mail.ba" />
                    </Field>
                    <Field label={t('co.f.phone')}>
                      <input value={s.phone} onChange={upd('phone')} className={inp} placeholder="+387 …" />
                    </Field>
                    <Field label={t('co.f.ig')}>
                      <input value={s.ig} onChange={upd('ig')} className={inp} placeholder="@your.handle" />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label={t('co.f.brand')}>
                      <select value={s.brand} onChange={upd('brand')} className={inp}>
                        <option value="">—</option>
                        {BRANDS.map(b => <option key={b.slug}>{b.name}</option>)}
                        <option>Other (specify in notes)</option>
                      </select>
                    </Field>
                    <Field label={t('co.f.product')} required>
                      <input value={s.product} onChange={upd('product')} className={inp} placeholder="e.g. Corteiz Alcatraz Hoodie" />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label={t('co.f.size')}>
                      <input value={s.size} onChange={upd('size')} className={inp} placeholder="L · 42 · etc." />
                    </Field>
                    <Field label={t('co.f.color')}>
                      <input value={s.color} onChange={upd('color')} className={inp} placeholder="Olive" />
                    </Field>
                    <Field label={t('co.f.budget')}>
                      <input type="number" value={s.budget} onChange={upd('budget')} className={inp} placeholder="300" />
                    </Field>
                  </div>

                  <Field label={t('co.f.url')}>
                    <input value={s.url} onChange={upd('url')} className={inp} placeholder="https://..." />
                  </Field>

                  <Field label={t('co.f.notes')}>
                    <textarea rows={4} value={s.notes} onChange={upd('notes')} className={inp + ' resize-none leading-relaxed'} placeholder="Tell us anything that helps us find the right piece." />
                  </Field>

                  {err && (
                    <p className="text-[13px] text-red-300 flex items-center gap-2">
                      <AlertTriangle size={13} /> {err}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button type="submit" disabled={sending}
                      className="btn-neon flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                      {sending ? <><Loader2 size={14} className="animate-spin" /> {t('co.f.sending')}</> : <>{t('co.f.submit')} <Send size={14} /></>}
                    </button>
                    <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1 justify-center">
                      <MessageCircle size={14} /> Send via WhatsApp
                    </a>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Side rail */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="vault-card p-6">
              <Sparkles size={18} className="text-[var(--color-olive-glow)] mb-3" />
              <div className="font-display font-semibold text-[16px] mb-2">Anything sourceable</div>
              <p className="text-[13.5px] text-white/65 leading-relaxed">
                Most of our orders are pieces that aren't in the catalog. If it exists, we can probably get it.
              </p>
            </div>

            <div className="vault-card p-6">
              <div className="eyebrow mb-3">REPLY SLA</div>
              <div className="font-display font-semibold text-[36px] text-[var(--color-olive-glow)]"
                style={{ textShadow: '0 0 18px rgba(184,255,90,0.4)' }}>24h</div>
              <p className="text-[13px] text-white/55 mt-2 leading-relaxed">
                Every request gets a real reply with a final price and sourcing window.
              </p>
            </div>

            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer"
              className="vault-card p-6 block group hover:border-[var(--color-olive-line)]">
              <Instagram size={18} className="text-[var(--color-olive-glow)] mb-3" />
              <div className="font-display font-semibold text-[16px]">DM us instead</div>
              <p className="text-[13.5px] text-white/65 mt-1.5 leading-relaxed">
                {BUSINESS.instagramHandle} — Instagram is the fastest channel.
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-[12px] font-mono uppercase tracking-[0.18em] text-[var(--color-olive-glow)] group-hover:gap-2 transition-all">
                Open DM <ArrowUpRight size={11} />
              </div>
            </a>
          </aside>
        </div>
      </div>
    </div>
  )
}

const inp = 'w-full px-3.5 py-3 bg-white/[0.03] border border-white/10 rounded-sm text-[14px] text-white placeholder:text-white/35 focus:border-[var(--color-olive-line)] focus:bg-white/[0.05] focus:outline-none transition-all'

function Field({ label, required, children }) {
  return (
    <div>
      <label className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-white/55 mb-1.5 block">
        {label}{required && <span className="text-[var(--color-olive-glow)] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
