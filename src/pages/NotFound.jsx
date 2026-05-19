import { Link } from 'react-router-dom'
import { ArrowUpRight, Home, Search } from 'lucide-react'
import { AnimatedLogo } from '@/components/brand/AnimatedLogo'
import { ParticleField, AmbientGlow, MeshGrid } from '@/components/brand/Atmosphere'

export default function NotFound() {
  return (
    <div className="min-h-[100svh] pt-24 pb-16 px-5 md:px-8 flex items-center justify-center relative overflow-hidden">
      <MeshGrid opacity={0.4} />
      <AmbientGlow size={900} intensity={0.10} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <ParticleField count={18} />

      <div className="relative max-w-[680px] text-center">
        <div className="flex justify-center mb-10">
          <AnimatedLogo variant="hero" pulse float interactive asLink={false} priority />
        </div>

        <div className="eyebrow mb-4">ERROR · 404</div>

        <h1 className="font-display font-bold text-[clamp(44px,7.5vw,104px)] leading-[0.95] tracking-[-0.03em]">
          Looks like this drop<br />
          <span className="shimmer-text">sold out.</span>
        </h1>

        <p className="mt-7 text-[16px] md:text-[18px] text-white/65 max-w-[520px] mx-auto">
          The piece you were looking for either dropped already or never existed. Head back to the vault or
          request it as a custom order — we'll source it.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-neon">
            <Home size={14} /> Return Home
          </Link>
          <Link to="/shop" className="btn-ghost">
            <Search size={14} /> Browse Collection
          </Link>
        </div>
      </div>
    </div>
  )
}
