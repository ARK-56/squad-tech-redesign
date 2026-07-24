'use client'

import { useState, memo } from 'react'
import { FiPlus, FiMinus, FiArrowRight, FiCalendar } from 'react-icons/fi'
import { HiCheckCircle } from 'react-icons/hi2'
import useScrollReveal from '../hooks/useScrollReveal'

const faqs = [
  {
    q: 'How does the free website offer actually work?',
    a: 'We design a full homepage concept for your brand completely free of charge. Once we present it, you review it carefully. If you love the direction and want to move forward, we scope the full build and you pay our standard fee. If you\'re not satisfied, we walk away — no questions asked, no invoices sent.',
  },
  {
    q: 'What services does Squad Tech Solution offer?',
    a: 'We offer six core services: Social Media Marketing, SEO & PPC, Brand Identity, Media Production, Web Development, and Dedicated Remote Staff. Each service is backed by our performance guarantee.',
  },
  {
    q: 'Am I locked into a long-term contract?',
    a: 'No. Our marketing retainers run month-to-month — no long-term contracts and no cancellation fees. You can adjust, pause, or end your plan with 30 days\' notice, so you stay because the work performs, not because you\'re tied in.',
  },
  {
    q: 'How do you ensure quality when working remotely?',
    a: 'All our remote staff are rigorously vetted through technical assessments, portfolio reviews, and culture-fit interviews. We only place senior-level talent with proven track records. Your dedicated team member integrates fully into your workflow, communication tools, and processes.',
  },
  {
    q: 'How long does it typically take to deliver a project?',
    a: 'For web projects, initial designs are ready within 7–10 business days. Full website launches typically happen in 3–5 weeks depending on complexity. Marketing campaigns go live within 5–7 days of onboarding. We\'re obsessed with speed without compromising quality.',
  },
  {
    q: 'What industries have you worked with?',
    a: 'We\'ve successfully partnered with SaaS companies, e-commerce brands, professional services firms, fintech startups, healthcare providers, and media companies across the US, Europe, and APAC. Our approach is industry-agnostic — outcomes are our north star.',
  },
]

const ctaPoints = [
  'Free strategy session — no commitment',
  'Results guaranteed or we walk away',
  'Response within 24 hours',
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const { ref, visible } = useScrollReveal()

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="w-full max-w-[78rem] mx-auto px-4">
        {/* Header */}
        <div
          ref={ref}
          className={`max-w-2xl mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="section-title">
            Everything you need to know about{' '}
            <span className="brand-text">how we work</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">
          {/* FAQ list */}
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
          </div>

          {/* Sticky CTA */}
          <div className="lg:sticky lg:top-28">
            <div
              className="rounded-3xl border border-white/10 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(231,49,3,0.10), rgba(245,142,30,0.05))' }}
            >
              {/* Top accent line */}
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #e73103, #f58e1e)' }} />

              <div className="p-8">
                <p className="eyebrow mb-4">Ready to Start?</p>
                <h3 className="text-white font-bold text-2xl leading-tight mb-3">
                  Get Your Free<br />
                  <span className="brand-text">Strategy Session</span>
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Book a free 30-minute discovery call. We'll map out your goals, identify quick wins, and show you exactly what we'd do — before you commit to anything.
                </p>

                <ul className="space-y-2.5 mb-7">
                  {ctaPoints.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-white/70 text-sm">
                      <HiCheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#e73103' }} />
                      {point}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://calendly.com/squadtechsolution/inquiry"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary w-full py-3.5 text-sm mb-3"
                >
                  <FiCalendar className="w-4 h-4" /> Book Free Call <FiArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="mailto:inquiry@squadtechsol.com"
                  className="btn-secondary w-full py-3 text-sm"
                >
                  Send an Email
                </a>

                <p className="text-center text-white/25 text-xs mt-4">No spam. No contracts. 100% free.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const FAQItem = memo(function FAQItem({ faq, index, open, onToggle }) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`rounded-2xl border overflow-hidden transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${open ? 'border-white/15' : 'border-white/8 hover:border-white/12'}`}
      style={{ background: 'rgba(255,255,255,0.04)', transitionDelay: `${index * 60}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={`font-semibold text-sm md:text-base transition-colors duration-200 ${open ? 'text-white' : 'text-white/70 hover:text-white'}`}>
          {faq.q}
        </span>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10 transition-all duration-200"
          style={open ? { background: 'linear-gradient(135deg, #e73103, #f58e1e)', border: 'none' } : { background: 'rgba(255,255,255,0.04)' }}
        >
          {open
            ? <FiMinus className="w-3.5 h-3.5 text-white" />
            : <FiPlus className="w-3.5 h-3.5 text-white/50" />
          }
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-64' : 'max-h-0'}`}>
        <p className="px-6 pb-5 text-white/50 text-sm leading-relaxed">{faq.a}</p>
      </div>
    </div>
  )
})
