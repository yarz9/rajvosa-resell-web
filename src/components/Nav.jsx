import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Instagram, MessageCircle, ArrowUpRight } from 'lucide-react'
import { useI18n, useT } from '@/i18n/useI18n'
import { SUPPORTED, LANG_LABELS } from '@/i18n/dictionary'
import { BUSINESS } from '@/data/business'
import { BrandMark } from '@/components/BrandMark'

const LINKS = [
  ['/shop',    'nav.shop'],
  ['/brands',  'nav.brands'],
  ['/custom',  'nav.custom'],
  ['/how',     'nav.how'],
  ['/faq',     'nav.faq'],
]

export function Nav() {
  const t = useT()
  const { lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.06]'
                 : 'bg-transparent'
      }`}>
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 h-[64px] md:h-[72px] flex items-center justify-between gap-6">
          {/* Official Rajvosa Resell logo — top-left, scales 40→48px on mobile, 48→56px on desktop */}
          <span className="block md:hidden">
            <BrandMark size="md" pulse priority />
          </span>
          <span className="hidden md:block">
            <BrandMark size="lg" pulse priority />
          </span>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1">
            {LINKS.map(([to, key]) => (
              <NavLink key={to} to={to}
                className={({ isActive }) =>
                  `font-mono text-[11px] tracking-[0.22em] uppercase px-3 py-2 rounded transition-colors ${
                    isActive ? 'text-[var(--color-olive-glow)]' : 'text-white/70 hover:text-white'
                  }`}>
                {t(key)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Lang switcher */}
            <div className="hidden md:flex items-center text-[10.5px] font-mono rounded border border-white/15 overflow-hidden">
              {SUPPORTED.map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-2.5 py-1.5 transition-colors ${
                    lang === l ? 'bg-[var(--color-olive-glow)] text-black font-semibold' : 'text-white/70 hover:text-white'
                  }`}>
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>

            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex w-9 h-9 items-center justify-center rounded-full border border-white/15 text-white/80 hover:text-[var(--color-olive-glow)] hover:border-[var(--color-olive-line)] transition-colors">
              <Instagram size={15} />
            </a>

            <Link to="/custom" className="hidden md:inline-flex btn-neon !py-2.5 !px-4 !text-[11px]">
              {t('nav.cta')} <ArrowUpRight size={13} />
            </Link>

            {/* Mobile hamburger */}
            <button onClick={() => setOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded text-white hover:bg-white/10"
              aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden bg-[#0A0A0A]/98 backdrop-blur-xl flex flex-col">
          <div className="max-w-[1440px] mx-auto w-full px-5 h-[64px] flex items-center justify-between">
            <BrandMark size="md" pulse asLink={false} />
            <button onClick={() => setOpen(false)} className="w-10 h-10 flex items-center justify-center text-white" aria-label="Close">
              <X size={22} />
            </button>
          </div>
          <nav className="px-5 mt-6 flex-1 flex flex-col gap-1">
            {LINKS.map(([to, key]) => (
              <Link key={to} to={to} onClick={() => setOpen(false)}
                className="font-display text-[28px] font-semibold text-white py-3.5 border-b border-white/8">
                {t(key)}
              </Link>
            ))}
            <Link to="/track" onClick={() => setOpen(false)}
              className="font-mono text-[14px] uppercase tracking-[0.18em] text-white/60 mt-4">
              {t('nav.track')}
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)}
              className="font-mono text-[14px] uppercase tracking-[0.18em] text-white/60 mt-1">
              {t('nav.contact')}
            </Link>

            <div className="mt-auto pb-8">
              <Link to="/custom" onClick={() => setOpen(false)} className="btn-neon w-full justify-center">
                {t('nav.cta')} <ArrowUpRight size={14} />
              </Link>
              <div className="flex items-center gap-3 mt-4">
                {SUPPORTED.map(l => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`font-mono text-[11px] px-3.5 py-2 rounded border ${
                      lang === l ? 'bg-[var(--color-olive-glow)] border-[var(--color-olive-glow)] text-black' : 'border-white/20 text-white/70'
                    }`}>
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
