import { Instagram, MessageCircle, Mail, ArrowUpRight, MapPin } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { BUSINESS } from '@/data/business'

export default function Contact() {
  const t = useT()
  return (
    <div className="pt-32 md:pt-40 pb-24 px-5 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 mesh-grid opacity-30 pointer-events-none" />
      <div className="absolute top-32 right-[10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(184,255,90,0.10), transparent 70%)' }} />

      <div className="relative max-w-[1000px] mx-auto">
        <div className="mb-12 md:mb-16 text-center">
          <div className="eyebrow mb-3">DM US · WE LIVE HERE</div>
          <h1 className="font-display font-semibold text-[clamp(44px,7vw,96px)] leading-[0.95] tracking-tight">
            {t('contact.title')}
          </h1>
          <p className="mt-5 text-[16px] md:text-[18px] text-white/65 max-w-[520px] mx-auto">
            {t('contact.sub')}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 md:gap-5">
          <ChannelCard
            href={BUSINESS.instagram}
            icon={Instagram}
            label={t('contact.dm')}
            sub={BUSINESS.instagramHandle}
            primary
          />
          <ChannelCard
            href={`https://wa.me/${BUSINESS.whatsapp}`}
            icon={MessageCircle}
            label={t('contact.wa')}
            sub={BUSINESS.whatsappDisplay}
          />
          <ChannelCard
            href={`mailto:${BUSINESS.email}`}
            icon={Mail}
            label={t('contact.email')}
            sub={BUSINESS.email}
          />
        </div>

        <div className="mt-12 vault-card p-7 md:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <span className="w-11 h-11 rounded-full glass flex items-center justify-center shrink-0">
              <MapPin size={16} className="text-[var(--color-olive-glow)]" />
            </span>
            <div>
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[var(--color-olive-glow)] mb-1">Based in</div>
              <div className="font-display font-semibold text-[20px]">{BUSINESS.city}, {BUSINESS.country}</div>
              <div className="text-white/55 text-[13.5px] mt-1">Personal hand-off available · we also ship anywhere in BiH.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChannelCard({ href, icon: Icon, label, sub, primary }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`vault-card p-7 md:p-8 group ${primary ? 'border-[var(--color-olive-line)]' : ''}`}>
      <span className={`inline-flex w-12 h-12 rounded-full items-center justify-center mb-5 transition-all ${
        primary ? 'bg-[var(--color-olive-glow)] text-black' : 'bg-white/5 text-[var(--color-olive-glow)] border border-white/15 group-hover:border-[var(--color-olive-line)]'
      }`}
        style={primary ? { boxShadow: '0 0 20px -4px rgba(184,255,90,0.5)' } : {}}>
        <Icon size={18} />
      </span>
      <div className="font-display font-semibold text-[18px] mb-1.5">{label}</div>
      <div className="font-mono text-[12px] tracking-[0.12em] text-white/65 mb-5 break-all">{sub}</div>
      <div className="inline-flex items-center gap-1.5 text-[12px] font-mono tracking-[0.18em] uppercase text-[var(--color-olive-glow)] group-hover:gap-2.5 transition-all">
        Open <ArrowUpRight size={11} />
      </div>
    </a>
  )
}
