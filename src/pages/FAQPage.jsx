'use client'

import { memo, useState } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiChevronDown } from 'react-icons/fi'
import PageHero from '../components/PageHero'
import useScrollReveal from '../hooks/useScrollReveal'
import Footer from '../components/Footer'
import { GROUPS } from '../data/faqs'

export default function FAQPage() {
  return (
    <div>
      <PageHero
        eyebrow="FAQ"
        title="Questions, Answered"
        titleAccent="Honestly"
        subtitle="Everything brands ask us before working together — how we work, timelines, pricing, and the fine print."
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <section className="pb-24">
        <div className="w-full max-w-[56rem] mx-auto px-4">
          {GROUPS.map((g) => (
            <div key={g.group} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-lg font-bold text-white whitespace-nowrap">{g.group}</h2>
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(231,49,3,0.35), rgba(255,255,255,0.06))' }} />
              </div>
              <div className="space-y-3">
                {g.faqs.map((faq, i) => (
                  <FaqItem key={i} faq={faq} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4 text-center">
          <p className="eyebrow mb-4">Still Have Questions?</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ask Us{' '}
            <span className="brand-text">Directly</span>
          </h2>
          <p className="section-copy max-w-md mx-auto mb-8">
            15 minutes, no pitch unless you ask for one.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="https://calendly.com/squadtechsolution/inquiry" target="_blank" rel="noreferrer" className="btn-primary px-8 py-3">
              Book Free Call <FiArrowRight className="w-4 h-4" />
            </a>
            <Link href="/contact" className="btn-secondary px-8 py-3">
              Send a Message
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

const FaqItem = memo(function FaqItem({ faq }) {
  const [open, setOpen] = useState(false)
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`rounded-xl border border-white/10 overflow-hidden transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-white text-sm font-semibold">{faq.q}</span>
        <FiChevronDown
          className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '300px' : '0' }}
      >
        <p className="px-5 pb-5 text-white/50 text-sm leading-relaxed">{faq.a}</p>
      </div>
    </div>
  )
})
