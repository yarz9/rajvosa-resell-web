import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BRAND_LOGO } from '@/lib/brand'

// ══════════════════════════════════════════════════════════════
//  BrandMark — single reusable logo component
//
//  Renders the official Rajvosa Resell logo from /brand/, with
//  optional neon glow + slow float animations (CSS-driven, GPU
//  accelerated). If the image file is missing or fails to load,
//  it falls back to the styled wordmark so the brand never
//  visibly breaks.
//
//  Props:
//    size       'sm' | 'md' | 'lg' | 'xl' | 'hero'  (default 'md')
//    pulse      add the neon-glow-pulse animation       (default true)
//    float      add the slow vertical float animation   (default false)
//    asLink     wrap in a <Link to="/"> back to home    (default true)
//    showWord   render the "RAJVOSA / RESELL" wordmark beside the mark
//    className  extra classes on the outer wrapper
// ══════════════════════════════════════════════════════════════

const SIZES = {
  sm:   { mark: 32,  wordPx: 13, gap: 'gap-2'  },
  md:   { mark: 44,  wordPx: 15, gap: 'gap-2.5' },
  lg:   { mark: 64,  wordPx: 18, gap: 'gap-3'  },
  xl:   { mark: 120, wordPx: 24, gap: 'gap-4'  },
  hero: { mark: 200, wordPx: 32, gap: 'gap-5'  },
}

export function BrandMark({
  size = 'md',
  pulse = true,
  float = false,
  asLink = true,
  showWord = false,
  className = '',
  priority = false,
}) {
  const [failed, setFailed] = useState(false)
  const dims = SIZES[size] || SIZES.md

  const inner = (
    <span className={`inline-flex items-center ${dims.gap} no-underline`}>
      {failed ? (
        <Wordmark dims={dims} forceShow />
      ) : (
        <img
          src={BRAND_LOGO}
          alt="Rajvosa Resell"
          width={dims.mark}
          height={dims.mark}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onError={() => setFailed(true)}
          className={`logo-mark block object-contain ${pulse ? 'pulse' : ''} ${float ? 'float' : ''}`}
          style={{ width: dims.mark, height: dims.mark }}
        />
      )}
      {showWord && !failed && <Wordmark dims={dims} />}
    </span>
  )

  const wrapper = `inline-flex items-center ${className}`

  return asLink
    ? <Link to="/" aria-label="Rajvosa Resell — home" className={wrapper}>{inner}</Link>
    : <span className={wrapper}>{inner}</span>
}

function Wordmark({ dims, forceShow = false }) {
  return (
    <span
      className={`wordmark glow font-display font-bold tracking-[0.04em] ${forceShow ? 'logo-mark' : ''}`}
      style={{ fontSize: dims.wordPx }}
    >
      RAJVOSA<span className="accent">/</span>RESELL
    </span>
  )
}
