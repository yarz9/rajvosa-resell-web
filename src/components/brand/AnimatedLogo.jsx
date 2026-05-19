import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { BRAND_LOGO } from '@/lib/brand'

// ══════════════════════════════════════════════════════════════
//  AnimatedLogo — the living centerpiece of the brand
//
//  variant:
//    'default' — Nav / inline uses. Subtle glow, modest hover.
//    'hero'    — Hero section. Oversized, layered glow halo,
//                light-sweep reflection, parallax hover.
//    'loader'  — LoadingScreen. Largest size, full hero glow,
//                continuous light sweep, slow float.
//    'icon'    — Tiny inline use (toasts, badges).
//
//  size       — explicit pixel size override (otherwise derived from variant)
//  interactive — true to enable magnetic hover + click ripple
//  asLink     — wraps in <Link to="/">
//  showWord   — render the wordmark beside the mark
//  className  — extra classes on the wrapper
//  priority   — load eagerly + fetchPriority=high (above-the-fold uses)
// ══════════════════════════════════════════════════════════════

const VARIANTS = {
  default: { size: 64,  glow: 'brand-glow',        sweep: false, halo: false,  wordPx: 18 },
  hero:    { size: 200, glow: 'brand-glow-hero',   sweep: true,  halo: true,   wordPx: 28 },
  loader:  { size: 240, glow: 'brand-glow-hero',   sweep: true,  halo: true,   wordPx: 32 },
  icon:    { size: 22,  glow: 'brand-glow',        sweep: false, halo: false,  wordPx: 11 },
}

export function AnimatedLogo({
  variant = 'default',
  size,
  interactive = false,
  asLink = true,
  showWord = false,
  className = '',
  priority = false,
  pulse = true,
  float = true,
}) {
  const reduce = useReducedMotion()
  const v = VARIANTS[variant] || VARIANTS.default
  const dim = size || v.size

  const [failed, setFailed] = useState(false)
  const [ripples, setRipples] = useState([])
  const wrapperRef = useRef(null)

  // Magnetic hover: track mouse offset within element and translate
  // the inner mark a few px toward the cursor.
  const [magnet, setMagnet] = useState({ x: 0, y: 0 })
  const onMouseMove = useCallback((e) => {
    if (!interactive || reduce || !wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const max = Math.min(dim * 0.06, 8)
    setMagnet({
      x: ((e.clientX - cx) / rect.width) * max * 2,
      y: ((e.clientY - cy) / rect.height) * max * 2,
    })
  }, [interactive, reduce, dim])
  const onMouseLeave = () => setMagnet({ x: 0, y: 0 })

  const onClick = (e) => {
    if (!interactive || reduce) return
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect) return
    const id = Date.now() + Math.random()
    const size = Math.max(dim * 1.4, 80)
    setRipples((r) => [...r, {
      id,
      style: {
        left: e.clientX - rect.left - size / 2,
        top:  e.clientY - rect.top  - size / 2,
        width: size, height: size,
      },
    }])
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 700)
  }

  const Img = (
    <motion.img
      src={BRAND_LOGO}
      alt="Rajvosa Resell"
      width={dim}
      height={dim}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      style={{
        width: dim,
        height: dim,
        x: interactive && !reduce ? magnet.x : 0,
        y: interactive && !reduce ? magnet.y : 0,
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.4 }}
      className={[
        'block object-contain animate-logo-entrance animate-logo-hover',
        v.glow,
        pulse && !reduce ? 'animate-logo-glow' : '',
        float && !reduce ? 'animate-logo-float' : '',
        interactive ? 'cursor-pointer' : '',
      ].filter(Boolean).join(' ')}
    />
  )

  const inner = (
    <span
      ref={wrapperRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="relative inline-flex items-center gap-3 no-underline"
      style={{ minWidth: dim, minHeight: dim }}
    >
      {/* Hero halo — radial glow behind the mark */}
      {v.halo && !reduce && (
        <span
          className="absolute pointer-events-none"
          style={{
            width: dim * 2.1, height: dim * 2.1,
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(closest-side, rgba(184,255,90,0.18), transparent 70%)',
            filter: 'blur(8px)',
            zIndex: 0,
          }}
        />
      )}

      {/* Light sweep reflection */}
      {v.sweep && !reduce && (
        <span
          className="absolute pointer-events-none overflow-hidden"
          style={{
            width: dim, height: dim,
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            borderRadius: '8%',
          }}
        >
          <span className="light-sweep" />
        </span>
      )}

      {/* The mark itself (fallback to wordmark on image failure) */}
      <span className="relative" style={{ zIndex: 1 }}>
        {failed ? (
          <Wordmark dim={dim} wordPx={v.wordPx} forceShow />
        ) : Img}
      </span>

      {showWord && !failed && <Wordmark wordPx={v.wordPx} />}

      {/* Click ripples */}
      {ripples.map((r) => (
        <span key={r.id} className="ripple" style={r.style} />
      ))}
    </span>
  )

  const className_ = `inline-flex items-center ${className}`
  return asLink
    ? <Link to="/" aria-label="Rajvosa Resell — home" className={className_}>{inner}</Link>
    : <span className={className_}>{inner}</span>
}

function Wordmark({ dim, wordPx, forceShow = false }) {
  return (
    <span
      className={`wordmark glow font-display font-bold tracking-[0.04em] ${forceShow ? 'animate-logo-entrance animate-logo-glow' : ''}`}
      style={{ fontSize: wordPx }}
    >
      RAJVOSA<span className="accent">/</span>RESELL
    </span>
  )
}

// Re-export of the lib constant for convenience.
export { BRAND_LOGO }
