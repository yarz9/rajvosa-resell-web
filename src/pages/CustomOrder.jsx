import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send, CheckCircle2, AlertTriangle, Loader2, Instagram, MessageCircle, Sparkles,
  ArrowUpRight, Upload, X, Image as ImageIcon,
} from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { BRANDS, CATEGORIES, SIZES_CLOTHES } from '@/data/products'
import { BUSINESS } from '@/data/business'
import { AnimatedLogo } from '@/components/brand/AnimatedLogo'
import { useToast } from '@/components/ui/Toast'
import { api, apiConfigured } from '@/lib/api'

// ── Image helpers ──────────────────────────────────────────
const MAX_IMAGE_BYTES = 3.5 * 1024 * 1024     // server caps at 4MB; leave headroom
const MAX_IMAGES = 6

const readAsDataURL = (file) => new Promise((resolve, reject) => {
  const r = new FileReader()
  r.onerror = () => reject(new Error('Could not read file'))
  r.onload = () => resolve(r.result)
  r.readAsDataURL(file)
})

export default function CustomOrder() {
  const t = useT()
  const { push } = useToast()

  const [s, setS] = useState({
    name: '', email: '', phone: '', ig: '',
    brand: '', product_name: '', category: '', size: '', color: '',
    budget_min: '', budget_max: '',
    product_url: '', notes: '',
  })
  const [images, setImages] = useState([]) // [{ name, size, dataUrl }]
  const [dragging, setDragging] = useState(false)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(null)    // { code } when API returns
  const [err, setErr] = useState('')

  const fileRef = useRef(null)
  const upd = (k) => (e) => setS((p) => ({ ...p, [k]: e.target.value }))

  // ── Image intake ─────────────────────────────────────────
  const addFiles = useCallback(async (files) => {
    setErr('')
    const accepted = []
    for (const f of files) {
      if (!f.type.startsWith('image/')) continue
      if (f.size > MAX_IMAGE_BYTES) {
        push({ kind: 'error', title: 'Image too large', body: `${f.name} exceeds 3.5MB.` })
        continue
      }
      if (images.length + accepted.length >= MAX_IMAGES) {
        push({ kind: 'error', title: 'Max 6 images' })
        break
      }
      try {
        accepted.push({ name: f.name, size: f.size, dataUrl: await readAsDataURL(f) })
      } catch (e) {
        push({ kind: 'error', title: 'Could not read', body: f.name })
      }
    }
    if (accepted.length) setImages((arr) => [...arr, ...accepted].slice(0, MAX_IMAGES))
  }, [images.length, push])

  const onFileInput = (e) => { addFiles(e.target.files); e.target.value = '' }
  const onDrop = (e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }
  const removeImage = (i) => setImages((arr) => arr.filter((_, x) => x !== i))

  // ── Submit ───────────────────────────────────────────────
  const submit = async (e) => {
    e.preventDefault(); setErr('')
    if (s.name.trim().length < 2)                            { push({ kind: 'error', title: 'Add your name' }); return setErr('Add your name.') }
    if (!/^\S+@\S+\.\S+$/.test(s.email))                     { push({ kind: 'error', title: 'Email looks off' }); return setErr('Add a valid email.') }
    if (s.product_name.trim().length < 2)                    { push({ kind: 'error', title: 'What are we sourcing?' }); return setErr('Add the product name or a link.') }

    setSending(true)
    const payload = {
      name: s.name, email: s.email, phone: s.phone, instagram: s.ig,
      brand: s.brand, product_name: s.product_name, category: s.category,
      size: s.size, color: s.color,
      budget_min: Number(s.budget_min) || 0,
      budget_max: Number(s.budget_max) || Number(s.budget_min) || 0,
      product_url: s.product_url, notes: s.notes,
      images: images.map((i) => i.dataUrl),
      website_url: '', // honeypot
    }

    try {
      if (apiConfigured) {
        const data = await api.submitCustom(payload)
        setDone({ code: data.code })
        push({ kind: 'success', title: 'Order request submitted', body: `Code ${data.code} · reply within 24h.` })
      } else {
        // Concept preview without a backend — graceful no-op
        await new Promise((r) => setTimeout(r, 700))
        setDone({ code: 'CONCEPT-PREVIEW' })
        push({ kind: 'success', title: 'Order request submitted (preview)', body: 'No backend wired yet — DM us on Instagram to follow up.' })
      }
    } catch (e) {
      setErr(e.message || 'Could not send.')
      push({ kind: 'error', title: 'Submit failed', body: e.message || 'Try WhatsApp instead.' })
    } finally {
      setSending(false)
    }
  }

  const waMsg = encodeURIComponent(
    `Custom order request:\n• Brand: ${s.brand}\n• Product: ${s.product_name}\n• Size: ${s.size}\n• Colour: ${s.color}\n• Budget: ${s.budget_min}–${s.budget_max} KM\n• Link: ${s.product_url}\n• Notes: ${s.notes}`,
  )
  const waUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${waMsg}`

  return (
    <div className="pt-32 md:pt-40 pb-24 px-5 md:px-8 relative overflow-hidden">
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(184,255,90,0.10), transparent 70%)' }} />

      <div className="relative max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <div className="eyebrow mb-3">{t('co.eyebrow')}</div>
          <h1 className="font-display font-semibold text-[clamp(40px,6vw,80px)] leading-[0.98] tracking-tight max-w-[800px] mx-auto">
            {t('co.title')}
          </h1>
          <p className="mt-6 text-[16px] md:text-[18px] text-white/65 max-w-[560px] mx-auto">
            {t('co.sub')}
          </p>
        </div>

        {/* Deposit / delivery reminder strip — real Rajvosa Resell business rules */}
        <div className="mb-10 grid sm:grid-cols-4 gap-3 max-w-[920px] mx-auto">
          {[
            ['50% deposit',   'confirms your order'],
            ['~3 weeks',      'typical sourcing + delivery'],
            ['Remaining 50%', 'paid when the piece arrives'],
            ['Delivery',      'BiH-wide · pickup in Sarajevo'],
          ].map(([h, sub]) => (
            <div key={h} className="text-center vault-card p-3">
              <div className="font-display font-semibold text-[14.5px] text-[var(--color-olive-glow)]">{h}</div>
              <div className="text-[11.5px] text-white/55 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-10">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done"
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  className="vault-card p-12 md:p-16 text-center">
                  <div className="flex justify-center mb-7">
                    <AnimatedLogo variant="default" size={64} pulse float asLink={false} />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-olive-line)] bg-[var(--color-olive-soft)] mb-5">
                    <CheckCircle2 size={12} className="text-[var(--color-olive-glow)]" />
                    <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[var(--color-olive-glow)]">
                      REQUEST LOCKED IN · {done.code}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-[clamp(28px,3.6vw,40px)] tracking-tight">
                    Your request has been received.
                  </h3>
                  <p className="mt-4 text-white/65 max-w-[480px] mx-auto leading-relaxed">
                    We'll review availability and contact you shortly with pricing and deposit instructions.
                    A confirmation has also been emailed to <strong className="text-white/85">{s.email}</strong>.
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
                        {BRANDS.map((b) => <option key={b.slug}>{b.name}</option>)}
                        <option>Other (specify in notes)</option>
                      </select>
                    </Field>
                    <Field label={t('co.f.product')} required>
                      <input value={s.product_name} onChange={upd('product_name')} className={inp} placeholder="e.g. Corteiz Alcatraz Hoodie" />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label="Category">
                      <select value={s.category} onChange={upd('category')} className={inp}>
                        <option value="">—</option>
                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label={t('co.f.size')}>
                      <input value={s.size} onChange={upd('size')} className={inp} placeholder="L · 42 · One size" />
                    </Field>
                    <Field label={t('co.f.color')}>
                      <input value={s.color} onChange={upd('color')} className={inp} placeholder="Olive" />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Budget min (KM)">
                      <input type="number" value={s.budget_min} onChange={upd('budget_min')} className={inp} placeholder="200" />
                    </Field>
                    <Field label="Budget max (KM)">
                      <input type="number" value={s.budget_max} onChange={upd('budget_max')} className={inp} placeholder="450" />
                    </Field>
                  </div>

                  <Field label={t('co.f.url')}>
                    <input value={s.product_url} onChange={upd('product_url')} className={inp} placeholder="https://..." />
                  </Field>

                  {/* Reference image upload */}
                  <Field label={`Reference images (max ${MAX_IMAGES}, drag-and-drop or click)`}>
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={onDrop}
                      onClick={() => fileRef.current?.click()}
                      className={`cursor-pointer rounded-sm border border-dashed px-4 py-6 text-center transition-colors ${
                        dragging
                          ? 'border-[var(--color-olive-glow)] bg-[var(--color-olive-soft)]'
                          : 'border-white/15 bg-white/[0.02] hover:border-[var(--color-olive-line)]'
                      }`}
                    >
                      <Upload size={20} className="mx-auto text-[var(--color-olive-glow)] mb-2" />
                      <div className="text-[13px] text-white/70">
                        {images.length ? `${images.length} of ${MAX_IMAGES} attached` : 'Drop screenshots or click to browse'}
                      </div>
                      <div className="text-[11px] text-white/40 mt-1">PNG · JPG · WebP up to 3.5MB each</div>
                      <input ref={fileRef} type="file" accept="image/*" multiple onChange={onFileInput} className="hidden" />
                    </div>

                    {images.length > 0 && (
                      <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {images.map((img, i) => (
                          <div key={i} className="relative aspect-square rounded-sm overflow-hidden border border-white/10 group">
                            <img src={img.dataUrl} alt={img.name} className="w-full h-full object-cover" />
                            <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(i) }}
                              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center">
                              <X size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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
