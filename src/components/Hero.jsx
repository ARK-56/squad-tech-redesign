import { useEffect, useRef } from 'react'
import { FiArrowRight, FiCalendar } from 'react-icons/fi'
import { HiCheckCircle } from 'react-icons/hi2'

const proofChips = [
  'Zero-risk guarantee',
  '7 years delivering',
  'No contracts',
]

const floatStats = [
  { value: '200+', label: 'Projects Delivered', pos: 'top-8 -left-4' },
  { value: '+98%', label: 'Client Satisfaction', pos: 'bottom-8 -right-4' },
]

const stats = [
  { value: '200+', label: 'Successful Projects' },
  { value: '7', label: 'Years of Experience' },
  { value: '+98%', label: 'Client Satisfaction' },
  { value: '10M+', label: 'Impressions' },
  { value: '67+', label: 'Global Clients' },
]

export default function Hero() {
  const orbRef = useRef(null)

  useEffect(() => {
    let rafId = null
    const handleMouseMove = (e) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        if (orbRef.current) {
          const x = (e.clientX / window.innerWidth - 0.5) * 20
          const y = (e.clientY / window.innerHeight - 0.5) * 20
          orbRef.current.style.transform = `translate(${x}px, ${y}px)`
        }
        rafId = null
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section id="home" className="relative overflow-hidden" style={{ paddingTop: '5.5rem', paddingBottom: '3rem' }}>
      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={orbRef}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full transition-transform duration-700 ease-out"
          style={{ background: 'radial-gradient(circle, rgba(231,49,3,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,142,30,0.08) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[78rem] mx-auto px-4">
        {/* Two-column hero */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center mb-16">
          {/* Left */}
          <div className="animate-fade-up">
            {/* Trust strip */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10"
              style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.7)' }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Trusted by 67+ global clients
            </div>

            {/* Eyebrow */}
            <p className="eyebrow mb-4">OUTCOME-DRIVEN TECH AGENCY</p>

            {/* Headline */}
            <h1 className="font-bold leading-[1.1] mb-5" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
              Risk-Free<br />
              <span className="brand-text">Digital Products</span>
            </h1>

            {/* Copy */}
            <p className="section-copy mb-8 max-w-xl">
              Squad Tech Solution delivers elite software, marketing, and design. Try our 100% free
              website offer: if you don't love the design, we walk right away.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a href="/start" className="btn-primary px-6 py-3">
                Claim Free Offer <FiArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://calendly.com/squadtechsolution/inquiry"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary px-6 py-3"
              >
                <FiCalendar className="w-4 h-4" /> Book Free Call
              </a>
            </div>

            {/* Proof chips */}
            <div className="flex flex-wrap gap-3 mb-6">
              {proofChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-white/10 text-white/60"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <HiCheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {chip}
                </span>
              ))}
            </div>

            {/* Trustpilot badge */}
            <a
              href="https://uk.trustpilot.com/review/squadtechsol.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="#00B67A"/>
                <path d="M12 16.5l-4.5 2.7 1.2-5-4-3.5 5.2-.4L12 5.5l2.1 4.8 5.2.4-4 3.5 1.2 5z" fill="white"/>
              </svg>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#00B67A" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-white/40 text-xs leading-none">Rated <span className="text-white/70 font-semibold">Excellent</span> on Trustpilot</span>
              </div>
            </a>
          </div>

          {/* Right - video placeholder */}
          <div className="relative hidden lg:block animate-fade-up animate-delay-200">
            <div
              className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/3]"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <video
                autoPlay muted loop playsInline preload="metadata"
                className="w-full h-full object-cover opacity-90"
              >
                <source src="/videos/Promotional-Intro-Squad-Tech-Solution.mp4" type="video/mp4" />
              </video>

              {/* Tag overlays */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                {['Free preview', 'Our philosophy', 'How we Work'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/80 border border-white/10"
                    style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Float cards */}
            <div
              className="absolute -top-4 -left-6 rounded-2xl px-4 py-3 border border-white/10 animate-float"
              style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)', animationDuration: '4s' }}
            >
              <div className="text-2xl font-bold brand-text">200+</div>
              <div className="text-xs text-white/50 font-medium">Projects Delivered</div>
            </div>

            <div
              className="absolute -bottom-4 -right-6 rounded-2xl px-4 py-3 border border-white/10 animate-float"
              style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)', animationDuration: '4.5s', animationDelay: '1s' }}
            >
              <div className="text-2xl font-bold text-green-400">+98%</div>
              <div className="text-xs text-white/50 font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="card text-center py-5 px-4 hover:border-white/20 transition-all duration-300"
            >
              <div
                className="text-2xl md:text-3xl font-bold mb-1 brand-text"
              >
                {stat.value}
              </div>
              <div className="text-xs text-white/50 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
