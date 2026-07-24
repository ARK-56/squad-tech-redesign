'use client'

import { memo } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiMapPin } from 'react-icons/fi'
import PageHero from '../components/PageHero'
import { testimonials } from '../data/testimonials'
import useScrollReveal from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

const stats = [
  { value: '98%', label: 'Client Satisfaction' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '67+', label: 'Global Clients' },
  { value: '94%', label: 'Client Retention' },
]

function Stars() {
  return (
    <div className="flex items-center gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#00B67A" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Reviews"
        title="What Clients Say When"
        titleAccent="The Work Speaks"
        subtitle="Real feedback from brands across the US, UK, Germany, and beyond — plus our verified Trustpilot profile."
        breadcrumbs={[{ label: 'Reviews' }]}
      />

      {/* Stats + Trustpilot */}
      <section className="pb-14">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="card text-center py-6">
                <p className="text-2xl md:text-3xl font-bold brand-text mb-1">{s.value}</p>
                <p className="text-white/40 text-xs uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          <a
            href="https://uk.trustpilot.com/review/squadtechsol.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl px-6 py-5 border transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: 'rgba(0,182,122,0.3)', borderLeft: '3px solid #00B67A', background: 'rgba(0,182,122,0.04)' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <rect width="24" height="24" rx="4" fill="#00B67A" />
              <path d="M12 16.5l-4.5 2.7 1.2-5-4-3.5 5.2-.4L12 5.5l2.1 4.8 5.2.4-4 3.5 1.2 5z" fill="white" />
            </svg>
            <p className="text-sm leading-relaxed flex-1">
              <span className="text-white font-semibold">Rated Excellent on Trustpilot.</span>{' '}
              <span className="text-white/45">Independent, verified reviews you can check yourself.</span>
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold flex-shrink-0 group-hover:gap-3 transition-all" style={{ color: '#00B67A' }}>
              Read Trustpilot Reviews <FiArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </section>

      {/* Testimonial grid */}
      <section className="pb-24">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <ReviewCard key={t.name} t={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4 text-center">
          <p className="eyebrow mb-4">Your Turn</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Become the Next{' '}
            <span className="brand-text">Success Story</span>
          </h2>
          <p className="section-copy max-w-md mx-auto mb-8">
            Join the brands who let us prove it first — we design your homepage concept free, and you
            see the work before you pay for it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/start" className="btn-primary px-8 py-3">
              Claim Free Offer <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio" className="btn-secondary px-8 py-3">
              See the Work
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

const ReviewCard = memo(function ReviewCard({ t, index }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`card flex flex-col transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      <Stars />
      <p className="text-white/65 text-sm leading-relaxed flex-1 mb-6">"{t.quote}"</p>
      <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${t.color}, #f58e1e)` }}
        >
          {t.initials}
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm font-semibold truncate">{t.name}</p>
          <p className="text-white/35 text-xs truncate">{t.role}, {t.company}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="flex items-center gap-1 text-white/30 text-xs"><FiMapPin className="w-3 h-3" />{t.country}</span>
        <span
          className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
          style={{ background: 'rgba(231,49,3,0.1)', color: '#f58e1e' }}
        >
          {t.service}
        </span>
      </div>
    </div>
  )
})
