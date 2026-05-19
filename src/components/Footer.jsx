import { Link } from 'react-router-dom'
import { Instagram, MessageCircle, Mail, ArrowUpRight, Heart } from 'lucide-react'
import { useT } from '@/i18n/useI18n'
import { BUSINESS } from '@/data/business'
import { BrandMark } from '@/components/BrandMark'

export function Footer() {
  const t = useT()
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/[0.06] mt-32">
      <div className="mesh-grid absolute inset-0 opacity-30 pointer-events-none" />
      <div className="relative max-w-[1440px] mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-10">
        {/* Sign-off */}
        <div className="text-center mb-16 md:mb-20">
          <div className="eyebrow mb-4">SARAJEVO · WORLDWIDE PIECES</div>
          <p className="font-display font-bold text-[clamp(40px,7vw,96px)] leading-[0.95] tracking-tight">
            <span className="shimmer-text">{t('foot.sign')}</span>
          </p>
        </div>

        {/* Columns */}
        <div className="grid md:grid-cols-4 gap-10 md:gap-14 border-t border-white/[0.06] pt-12">
          <div className="md:col-span-2">
            <BrandMark size="lg" pulse float />
            <p className="text-[14px] text-white/55 mt-5 max-w-[420px] leading-relaxed">
              Authentic streetwear and limited-release sneakers, sourced and delivered to Bosnia & Herzegovina.
              Custom orders welcome via Instagram or our form.
            </p>
          </div>

          <div>
            <div className="eyebrow mb-4">Navigate</div>
            <ul className="space-y-2.5 text-[14px]">
              {[['/shop','Shop'],['/brands','Brands'],['/custom','Custom order'],['/how','How it works'],['/faq','FAQ'],['/track','Track order']].map(([to,label]) => (
                <li key={to}><Link to={to} className="text-white/70 hover:text-white">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">Contact</div>
            <ul className="space-y-2.5 text-[14px] text-white/70">
              <li className="flex items-center gap-2.5">
                <Instagram size={14} className="text-[var(--color-olive-glow)]" />
                <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">{BUSINESS.instagramHandle}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle size={14} className="text-[var(--color-olive-glow)]" />
                <a href={`https://wa.me/${BUSINESS.whatsapp}`} className="hover:text-white">{BUSINESS.whatsappDisplay}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-[var(--color-olive-glow)]" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-white">{BUSINESS.email}</a>
              </li>
            </ul>
            <Link to="/custom" className="inline-flex items-center gap-1 mt-5 link-neon text-[13px]">
              Start a custom order <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>

        {/* Bottom rail */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3 text-[11.5px] text-white/40 font-mono uppercase tracking-[0.18em]">
          <div>© {year} {BUSINESS.name}. {t('foot.copy')}</div>
          <div className="flex items-center gap-2">
            <Heart size={11} className="text-[var(--color-olive-glow)]" />
            <span>Concept preview by</span>
            <a href="https://cloz.digital" target="_blank" rel="noopener noreferrer"
              className="text-[var(--color-olive-glow)] hover:text-white">cloz.digital</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
