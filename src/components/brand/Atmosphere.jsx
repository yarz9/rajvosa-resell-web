import { useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'

// Reusable ambient layers — drop into any section as a background.
// All layers are pointer-events: none so they never interfere.

// ─── ParticleField ──────────────────────────────────────────
// Drifting olive specks moving up the viewport. Pure CSS; the
// element count is deterministic from `count` so SSR is happy.
export function ParticleField({ count = 28, className = '' }) {
  const reduce = useReducedMotion()
  const particles = useMemo(() => {
    if (reduce) return []
    return Array.from({ length: count }).map((_, i) => {
      const x = Math.random() * 100
      const dur = 14 + Math.random() * 18
      const delay = -Math.random() * dur
      const scale = 0.5 + Math.random() * 1.4
      return { i, x, dur, delay, scale }
    })
  }, [count, reduce])
  if (reduce) return null
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <span key={p.i}
          className="particle"
          style={{
            left: `${p.x}%`,
            bottom: '-10px',
            transform: `scale(${p.scale})`,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
          }} />
      ))}
    </div>
  )
}

// ─── AmbientGlow ────────────────────────────────────────────
// Radial olive glow blob. Wraps over arbitrary positions.
export function AmbientGlow({
  size = 700,
  intensity = 0.12,
  className = '',
  style = {},
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size, height: size,
        borderRadius: '50%',
        background: `radial-gradient(closest-side, rgba(184, 255, 90, ${intensity}), transparent 70%)`,
        ...style,
      }}
    />
  )
}

// ─── LightStreak ────────────────────────────────────────────
// Diagonal light streak. Use as decoration in dark sections.
export function LightStreak({ className = '', style = {} }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none ${className}`}
      style={{
        background: 'linear-gradient(120deg, transparent 0%, rgba(184,255,90,0.12) 50%, transparent 100%)',
        filter: 'blur(20px)',
        ...style,
      }}
    />
  )
}

// ─── Mesh grid (re-export of the existing CSS utility as a component) ─
export function MeshGrid({ opacity = 0.4, className = '' }) {
  return (
    <div className={`absolute inset-0 mesh-grid pointer-events-none ${className}`} style={{ opacity }} aria-hidden="true" />
  )
}
