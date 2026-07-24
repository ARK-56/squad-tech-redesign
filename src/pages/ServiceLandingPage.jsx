'use client'

import Link from 'next/link'
import { useParams, redirect } from 'next/navigation'
import { FiArrowRight, FiCheck, FiStar, FiCalendar } from 'react-icons/fi'
import { HiCheckCircle } from 'react-icons/hi2'
import { services } from '../data/services'
import { serviceLandings } from '../data/serviceLandings'

const testimonials = [
  {
    quote: 'Their marketing guarantee gave us complete peace of mind. Within weeks, our content views multiplied and user acquisition costs dropped.',
    name: 'Elena Rostova',
    role: 'Director of Brand Experience, Veloce Digital',
    initials: 'ER',
  },
  {
    quote: 'What stood out most was the combination of design taste and implementation quality. Nothing felt generic, and nothing felt fragile.',
    name: 'Aris Thorne',
    role: 'Founder, Lumina Ventures',
    initials: 'AT',
  },
  {
    quote: 'Squad Tech is elite. They handled our platform\'s scale effortlessly and delivered high-end video assets with the speed of true entrepreneurs.',
    name: 'Sarah Jenkins',
    role: 'CEO, Horizon Scale Media',
    initials: 'SJ',
  },
]

export default function ServiceLandingPage() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)
  const landing = serviceLandings[slug]

  if (!service || !landing) redirect('/services')

  const rgb = service.accentColor === '#e73103' ? '231,49,3' : '245,142,30'

  return (
    <div className="min-h-screen" style={{ background: '#060606' }}>
      {/* Minimal nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/08" style={{ background: 'rgba(6,6,6,0.9)', backdropFilter: 'blur(20px)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4 flex items-center justify-between py-4">
          <Link href="/">
            <img src="/images/logo.avif" alt="Squadtech Solution" className="h-10 w-auto object-contain"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </Link>
          <a
            href="https://calendly.com/squadtechsolution/inquiry"
            target="_blank"
            rel="noreferrer"
            className="btn-primary text-sm px-5 py-2.5"
          >
            Book Free Call <FiCalendar className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-36 pb-24 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse, rgba(${rgb},0.1) 0%, transparent 65%)` }}
        />
        <div className="w-full max-w-[56rem] mx-auto px-4 text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border"
            style={{ color: service.accentColor, background: `rgba(${rgb},0.08)`, borderColor: `rgba(${rgb},0.2)` }}
          >
            <service.icon className="w-4 h-4" /> {service.title}
          </div>
          <h1 className="font-bold leading-[1.1] mb-6 text-white" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
            {landing.headline}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {landing.subheadline}
          </p>

          {/* Guarantee pill */}
          <div
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold mb-8 border"
            style={{ color: '#4ade80', background: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.2)' }}
          >
            <HiCheckCircle className="w-4 h-4" />
            {landing.guarantee}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://calendly.com/squadtechsolution/inquiry"
              target="_blank"
              rel="noreferrer"
              className="btn-primary px-8 py-4 text-base"
            >
              Book Free Discovery Call <FiArrowRight className="w-5 h-5" />
            </a>
            <Link href={`/services/${slug}`} className="btn-secondary px-8 py-4 text-base">
              See Full Service Details
            </Link>
          </div>

          {/* Social proof strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-white/30">
            {[
              `${service.stats[0].value} ${service.stats[0].label}`,
              `${service.stats[1].value} ${service.stats[1].label}`,
              `${service.stats[2].value} ${service.stats[2].label}`,
            ].map((s, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full" style={{ background: service.accentColor }} />
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">Pricing</p>
            <h2 className="section-title">
              Simple, Transparent <span className="brand-text">Packages</span>
            </h2>
            <p className="section-copy mt-4">All packages include our performance guarantee. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {landing.packages.map((pkg, i) => (
              <PricingCard key={i} pkg={pkg} service={service} rgb={rgb} />
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Features */}
            <div>
              <p className="eyebrow mb-4">What's Included</p>
              <h2 className="section-title mb-8">
                Everything in <span className="brand-text">This Service</span>
              </h2>
              <div className="space-y-3">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `rgba(${rgb},0.12)` }}
                    >
                      <FiCheck className="w-3 h-3" style={{ color: service.accentColor }} />
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{feat}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div>
              <p className="eyebrow mb-4">Our Process</p>
              <h2 className="section-title mb-8">
                How We <span className="brand-text">Deliver</span>
              </h2>
              <div className="space-y-4">
                {service.process.map((step, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 rounded-2xl border border-white/10"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <div
                      className="text-3xl font-black leading-none flex-shrink-0 select-none"
                      style={{ color: `rgba(${rgb},0.18)` }}
                    >
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1.5">{step.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">What Clients Say</p>
            <h2 className="section-title">
              Trusted by <span className="brand-text">Ambitious Brands</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} accentColor={service.accentColor} rgb={rgb} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[48rem] mx-auto px-4">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">FAQ</p>
            <h2 className="section-title">
              Common <span className="brand-text">Questions</span>
            </h2>
          </div>
          <div className="space-y-4">
            {landing.faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} accentColor={service.accentColor} rgb={rgb} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[48rem] mx-auto px-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 border"
            style={{ color: '#4ade80', background: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.2)' }}
          >
            <HiCheckCircle className="w-4 h-4" /> {landing.guarantee}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Ready to Get Started?
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-8">
            Book a free 30-minute discovery call. We'll review your current situation, identify the highest-impact opportunities, and tell you exactly what we'd do — before you commit to anything.
          </p>
          <a
            href="https://calendly.com/squadtechsolution/inquiry"
            target="_blank"
            rel="noreferrer"
            className="btn-primary px-10 py-4 text-base inline-flex"
          >
            Book Free Discovery Call <FiArrowRight className="w-5 h-5" />
          </a>
          <p className="text-white/25 text-sm mt-4">No commitment. No credit card. 100% free.</p>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="py-8 border-t border-white/06 text-center">
        <p className="text-white/20 text-sm">© {new Date().getFullYear()} Squad Tech Solution · <Link href="/" className="hover:text-white/40 transition-colors">squadtechsol.com</Link></p>
      </footer>
    </div>
  )
}

function PricingCard({ pkg, service, rgb }) {
  return (
    <div
      className={`rounded-2xl border flex flex-col transition-all duration-300 ${pkg.highlighted ? 'border-transparent relative' : 'border-white/10'
        }`}
      style={{
        background: pkg.highlighted ? `rgba(${rgb},0.06)` : 'rgba(255,255,255,0.03)',
        ...(pkg.highlighted && { boxShadow: `0 0 0 1px rgba(${rgb},0.3), 0 20px 60px rgba(${rgb},0.12)` }),
      }}
    >
      {pkg.highlighted && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${service.accentColor}, ${service.accentColor === '#e73103' ? '#f58e1e' : '#e73103'})` }}
        >
          Most Popular
        </div>
      )}
      <div className="p-7 flex flex-col flex-1">
        <p className="text-white font-bold text-lg mb-1">{pkg.name}</p>
        <div className="flex items-end gap-1 mb-3">
          <span className="text-3xl font-black" style={{ color: service.accentColor }}>{pkg.price}</span>
          <span className="text-white/30 text-sm pb-1">{pkg.period}</span>
        </div>
        {pkg.finalPrice && (
          <p className="text-white/30 text-xs mb-3">{pkg.finalPrice}</p>
        )}
        <p className="text-white/50 text-sm leading-relaxed mb-6">{pkg.description}</p>
        <ul className="space-y-2.5 mb-8 flex-1">
          {pkg.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <FiCheck className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: service.accentColor }} />
              <span className="text-white/60 text-sm">{f}</span>
            </li>
          ))}
        </ul>
        <a
          href="https://calendly.com/squadtechsolution/inquiry"
          target="_blank"
          rel="noreferrer"
          className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${pkg.highlighted ? 'btn-primary' : 'border border-white/10 text-white/70 hover:text-white hover:border-white/20'
            }`}
          style={!pkg.highlighted ? { background: 'rgba(255,255,255,0.04)' } : {}}
        >
          Get Started <FiArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial, accentColor, rgb }) {
  return (
    <div
      className="rounded-2xl p-6 border border-white/10 flex flex-col"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <FiStar key={i} className="w-3.5 h-3.5 fill-current" style={{ color: '#f59e0b' }} />
        ))}
      </div>
      <p className="text-white/65 text-sm leading-relaxed flex-1 mb-5">"{testimonial.quote}"</p>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: `rgba(${rgb},0.2)`, color: accentColor }}
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="text-white text-sm font-semibold">{testimonial.name}</p>
          <p className="text-white/40 text-xs">{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}

function FAQItem({ faq, accentColor, rgb }) {
  return (
    <div
      className="rounded-2xl p-6 border border-white/10"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <h4 className="text-white font-semibold text-sm mb-3">{faq.q}</h4>
      <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
    </div>
  )
}
