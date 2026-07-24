'use client'

import { memo } from 'react'
import Link from 'next/link'
import { useParams, redirect } from 'next/navigation'
import { FiArrowRight, FiCalendar, FiChevronRight, FiCheck } from 'react-icons/fi'
import { industries } from '../data/industries'
import { services } from '../data/services'
import useScrollReveal from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

export default function IndustryPage() {
  const { slug } = useParams()
  const industry = industries[slug]

  if (!industry) redirect('/services')

  const industryServices = industry.services
    .map((s) => services.find((svc) => svc.slug === s))
    .filter(Boolean)

  return (
    <div>
      {/* Hero */}
      <section className="pt-36 pb-16 relative overflow-hidden">
        <div className="grid-overlay" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(231,49,3,0.08) 0%, transparent 70%)' }}
        />
        <div className="w-full max-w-[78rem] mx-auto px-4 relative z-10">
          <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-6 font-medium">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span className="flex items-center gap-1.5">
              <FiChevronRight className="w-3 h-3" />
              <span className="text-white/60">For {industry.name}</span>
            </span>
          </nav>

          <p className="eyebrow mb-5">{industry.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
            {industry.headline.split(' ').slice(0, -3).join(' ')}{' '}
            <span className="brand-text">{industry.headline.split(' ').slice(-3).join(' ')}</span>
          </h1>
          <p className="section-copy max-w-2xl text-lg mb-9">{industry.subheadline}</p>
          <div className="flex flex-wrap gap-3 mb-12">
            <Link href="/start" className="btn-primary px-7 py-3">
              Claim Free Offer <FiArrowRight className="w-4 h-4" />
            </Link>
            <a href="https://calendly.com/squadtechsolution/inquiry" target="_blank" rel="noreferrer" className="btn-secondary px-7 py-3">
              <FiCalendar className="w-4 h-4" /> Book Free Call
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl">
            {industry.stats.map((s) => (
              <div key={s.label} className="card text-center py-5">
                <p className="text-xl md:text-2xl font-bold brand-text mb-1">{s.value}</p>
                <p className="text-white/40 text-[11px] uppercase tracking-wider leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain points */}
      {/* <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <SectionHeader
            eyebrow="We Know Your Market"
            title={`The ${industry.name} Problems`}
            accent="We Solve Weekly"
          />
          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {industry.painPoints.map((p, i) => (
              <PainCard key={i} point={p} index={i} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Features & Process/Pain Points */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <IndustryFeaturesBlock />
            <IndustryProcessBlock painPoints={industry.painPoints} />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <SectionHeader
            eyebrow="How We Help"
            title={`Core Services for`}
            accent={industry.name}
          />
          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {industryServices.map((svc, i) => (
              <ServiceCard key={svc.slug} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4 text-center">
          <p className="eyebrow mb-4">Get Started</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            See the Work{' '}
            <span className="brand-text">Before You Pay</span>
          </h2>
          <p className="section-copy max-w-md mx-auto mb-8">
            We build your strategy — and for websites, the full first build — before any payment is due.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/start" className="btn-primary px-8 py-3">
              Start Your Project <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio" className="btn-secondary px-8 py-3">
              See {industry.name} Work
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

function SectionHeader({ eyebrow, title, accent }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`max-w-2xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="section-title">
        {title} <span className="brand-text">{accent}</span>
      </h2>
    </div>
  )
}

// const PainCard = memo(function PainCard({ point, index }) {
//   const { ref, visible } = useScrollReveal()
//   return (
//     <div
//       ref={ref}
//       className={`card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
//       style={{ transitionDelay: `${index * 80}ms` }}
//     >
//       <div
//         className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 text-sm font-bold"
//         style={{ background: 'rgba(231,49,3,0.1)', border: '1px solid rgba(231,49,3,0.2)', color: '#e73103' }}
//       >
//         {String(index + 1).padStart(2, '0')}
//       </div>
//       <h4 className="text-white font-semibold text-sm mb-2">{point.title}</h4>
//       <p className="text-white/50 text-sm leading-relaxed">{point.desc}</p>
//     </div>
//   )
// })

const ServiceCard = memo(function ServiceCard({ svc, index }) {
  const { ref, visible } = useScrollReveal()
  const rgb = svc.accentColor === '#e73103' ? '231,49,3' : '245,142,30'
  return (
    <Link
      href={`/services/${svc.slug}`}
      ref={ref}
      className={`group card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.2)` }}
      >
        <svc.icon className="w-5 h-5" style={{ color: svc.accentColor }} />
      </div>
      <h4 className="text-white font-semibold mb-2">{svc.title}</h4>
      <p className="text-white/50 text-sm leading-relaxed mb-5">{svc.tagline}</p>
      <span className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color: svc.accentColor }}>
        Learn More <FiArrowRight className="w-4 h-4" />
      </span>
    </Link>
  )
})

function IndustryFeaturesBlock() {
  const { ref, visible } = useScrollReveal()
  const features = [
    'Dedicated project manager & strategic consulting',
    'Custom UI/UX design tailored to your target audience',
    'Full-stack development with SEO-optimized clean code',
    'High-converting copy and marketing strategy templates',
    'Continuous quality assurance and post-launch maintenance',
    'Real-time reporting and analytics integration'
  ]
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <p className="eyebrow mb-4">What's Included</p>
      <h2 className="section-title mb-8">
        Everything in <span className="brand-text">Our Solutions</span>
      </h2>
      <div className="space-y-3">
        {features.map((feat, i) => (
          <div key={i} className="flex items-start gap-3">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(231,49,3,0.12)' }}
            >
              <FiCheck className="w-3 h-3" style={{ color: '#e73103' }} />
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{feat}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function IndustryProcessBlock({ painPoints }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <p className="eyebrow mb-4">Our Process</p>
      <h2 className="section-title mb-8">
        How We <span className="brand-text">Deliver</span>
      </h2>
      <div className="space-y-5">
        {painPoints.map((step, i) => (
          <div
            key={i}
            className="flex gap-5 p-5 rounded-2xl border border-white/10 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div
              className="text-4xl font-black leading-none flex-shrink-0 select-none"
              style={{ color: 'rgba(231,49,3,0.15)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-1.5">{step.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
