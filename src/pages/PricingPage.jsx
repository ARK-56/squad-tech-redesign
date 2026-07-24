'use client'

import { memo, useState } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiCheck, FiShield } from 'react-icons/fi'
import PageHero from '../components/PageHero'
import { services } from '../data/services'
import { serviceLandings } from '../data/serviceLandings'
import useScrollReveal from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

const TABS = services.map((s) => ({ slug: s.slug, title: s.title }))

export default function PricingPage() {
  const [active, setActive] = useState(TABS[0].slug)
  const landing = serviceLandings[active]
  const service = services.find((s) => s.slug === active)

  return (
    <div>
      <PageHero
        eyebrow="Pricing"
        title="Transparent Pricing,"
        titleAccent="No Surprises"
        subtitle="Real numbers, no 'contact us for a quote' games. Every engagement starts with work you see before you pay."
        breadcrumbs={[{ label: 'Pricing' }]}
      />

      {/* Guarantee strip */}
      <section className="pb-12">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl px-6 py-5 border"
            style={{ borderColor: 'rgba(34,197,94,0.25)', borderLeft: '3px solid #22c55e', background: 'rgba(34,197,94,0.04)' }}
          >
            <FiShield className="w-6 h-6 text-green-400 flex-shrink-0" />
            <p className="text-sm leading-relaxed">
              <span className="text-white font-semibold">Every price below follows one rule: you see the work before you pay.</span>{' '}
              <span className="text-white/45">
                Your homepage concept is designed free before you pay a cent. Marketing retainers run month-to-month with no long-term contracts. Staff placements start with a 2-week trial.
              </span>{' '}
              <Link href="/guarantee" className="text-white/70 underline hover:text-white transition-colors whitespace-nowrap">See how the guarantee works →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Service tabs */}
      <section className="pb-24">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-6" style={{ scrollbarWidth: 'none' }}>
            {TABS.map((tab) => {
              const isActive = active === tab.slug
              return (
                <button
                  key={tab.slug}
                  onClick={() => setActive(tab.slug)}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors duration-200"
                  style={
                    isActive
                      ? { background: 'linear-gradient(135deg, #e73103, #f58e1e)', color: '#fff', fontWeight: 600 }
                      : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)', fontWeight: 500, border: '1px solid rgba(255,255,255,0.08)' }
                  }
                >
                  {tab.title}
                </button>
              )
            })}
          </div>

          {service && (
            <p className="text-white/45 text-sm leading-relaxed max-w-2xl mb-10">{service.description}</p>
          )}

          <div className="grid md:grid-cols-3 gap-5">
            {landing?.packages?.map((pkg, i) => (
              <PackageCard key={`${active}-${pkg.name}`} pkg={pkg} slug={active} index={i} />
            ))}
          </div>

          <p className="text-white/30 text-xs mt-8">
            Prices are standard starting points — final quotes depend on scope and are confirmed in your proposal.
            Custom scopes available on every service.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4 text-center">
          <p className="eyebrow mb-4">Not Sure Where to Start?</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Get a Custom Plan{' '}
            <span className="brand-text">In One Free Call</span>
          </h2>
          <p className="section-copy max-w-md mx-auto mb-8">
            Tell us your goals and budget — we'll recommend the right scope, even if that's smaller than you expected.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="https://calendly.com/squadtechsolution/inquiry" target="_blank" rel="noreferrer" className="btn-primary px-8 py-3">
              Book Free Call <FiArrowRight className="w-4 h-4" />
            </a>
            <Link href="/start" className="btn-secondary px-8 py-3">
              Start a Project
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

const PackageCard = memo(function PackageCard({ pkg, slug, index }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`relative rounded-2xl border p-7 flex flex-col transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{
        transitionDelay: `${index * 80}ms`,
        borderColor: pkg.highlighted ? 'rgba(231,49,3,0.45)' : 'rgba(255,255,255,0.1)',
        background: pkg.highlighted ? 'linear-gradient(180deg, rgba(231,49,3,0.07), rgba(255,255,255,0.02))' : 'rgba(255,255,255,0.03)',
      }}
    >
      {pkg.highlighted && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap"
          style={{ background: 'linear-gradient(135deg, #e73103, #f58e1e)' }}
        >
          Most Popular
        </span>
      )}
      <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3">{pkg.name}</p>
      <p className="mb-1">
        <span className="text-3xl font-bold text-white">{pkg.price}</span>
        {pkg.period && <span className="text-white/35 text-sm">{pkg.period}</span>}
      </p>
      <p className="text-white/45 text-sm leading-relaxed mb-6">{pkg.description}</p>
      <div className="space-y-2.5 flex-1 mb-7">
        {pkg.features.map((f, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <FiCheck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#f58e1e' }} />
            <p className="text-white/55 text-sm leading-snug">{f}</p>
          </div>
        ))}
      </div>
      <Link
        href={`/lp/${slug}`}
        className={pkg.highlighted ? 'btn-primary w-full py-3 text-sm' : 'btn-secondary w-full py-3 text-sm'}
      >
        Get Started <FiArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
})
