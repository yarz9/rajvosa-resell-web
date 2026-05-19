import { Link } from 'react-router-dom'
import { ArrowUpRight, Home } from 'lucide-react'
import { BrandMark } from '@/components/BrandMark'

export default function NotFound() {
  return (
    <div className="min-h-[100svh] pt-24 pb-16 px-5 md:px-8 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 mesh-grid opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(700px 500px at 50% 50%, rgba(184,255,90,0.10), transparent 70%)' }} />

      <div className="relative max-w-[640px] text-center">
        <div className="flex justify-center mb-10">
          <BrandMark size="xl" pulse float asLink={false} priority />
        </div>

        <div className="eyebrow mb-4">ERROR · 404</div>

        <h1 className="font-display font-bold text-[clamp(48px,8vw,112px)] leading-[0.92] tracking-[-0.03em]">
          Vault entry<br />
          <span className="shimmer-text">not found.</span>
        </h1>

        <p className="mt-7 text-[16px] md:text-[18px] text-white/65 max-w-[480px] mx-auto">
          The piece you were looking for either dropped already or never existed. Head back to the vault or
          DM us — we'll source it.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-neon">
            <Home size={14} /> Back to home
          </Link>
          <Link to="/custom" className="btn-ghost">
            Request a custom order <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
