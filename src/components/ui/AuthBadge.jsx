import { ShieldCheck } from 'lucide-react'

// Holographic "Authenticity Guaranteed" badge — drop into product
// detail pages, the trust strip, and proposal confirmations.
export function AuthBadge({ size = 'md', className = '' }) {
  const px = size === 'lg' ? 14 : size === 'sm' ? 10 : 12
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-olive-line)] bg-black/40 backdrop-blur-sm relative overflow-hidden ${className}`}>
      <ShieldCheck size={px + 2} className="text-[var(--color-olive-glow)] shrink-0" />
      <span className="font-display font-semibold uppercase tracking-[0.18em] holo"
        style={{ fontSize: px }}>
        Authenticity Guaranteed
      </span>
    </span>
  )
}
