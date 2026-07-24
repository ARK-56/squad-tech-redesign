'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FiArrowRight, FiCheckCircle, FiCalendar, FiDownload, FiBookOpen } from 'react-icons/fi'
import Footer from '../components/Footer'

const CONTENT = {
  project: {
    title: 'Your Project Request Is In',
    copy: 'Our team is reviewing your brief now. Expect a reply within one business day — usually much faster. Want to skip the queue? Book a call directly.',
  },
  contact: {
    title: 'Message Received',
    copy: 'Thanks for reaching out. A real human from our team will reply within one business day.',
  },
  resource: {
    title: 'Check Your Inbox',
    copy: 'Your download is on its way to your email right now. If it hasn\'t arrived in 2 minutes, check your spam folder — and add us to your contacts so you never miss a resource.',
  },
  default: {
    title: 'Thank You',
    copy: 'We\'ve received your submission and will be in touch within one business day.',
  },
}

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const { title, copy } = CONTENT[type] || CONTENT.default

  return (
    <div>
      <section className="pt-40 pb-24 relative overflow-hidden">
        <div className="grid-overlay" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(231,49,3,0.09) 0%, transparent 70%)' }}
        />
        <div className="w-full max-w-[42rem] mx-auto px-4 relative z-10 text-center">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-7 flex items-center justify-center"
            style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            <FiCheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="brand-text">{title.split(' ').slice(-1)}</span>
          </h1>
          <p className="section-copy mb-10">{copy}</p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            <a
              href="https://calendly.com/squadtechsolution/inquiry"
              target="_blank"
              rel="noreferrer"
              className="btn-primary px-7 py-3"
            >
              <FiCalendar className="w-4 h-4" /> Book a Free Call
            </a>
            <Link href="/" className="btn-secondary px-7 py-3">
              Back to Home
            </Link>
          </div>

          {/* While you wait */}
          <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-5">While You Wait</p>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <Link
              href="/blogs"
              className="group card flex items-start gap-4 !p-5"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(231,49,3,0.1)', border: '1px solid rgba(231,49,3,0.2)' }}
              >
                <FiBookOpen className="w-4 h-4" style={{ color: '#e73103' }} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-1">Read the Blog</p>
                <p className="text-white/40 text-xs leading-relaxed">Strategies from 200+ delivered projects.</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold mt-2 group-hover:gap-2.5 transition-all" style={{ color: '#f58e1e' }}>
                  Browse Articles <FiArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
            <Link
              href="/resources"
              className="group card flex items-start gap-4 !p-5"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(245,142,30,0.1)', border: '1px solid rgba(245,142,30,0.2)' }}
              >
                <FiDownload className="w-4 h-4" style={{ color: '#f58e1e' }} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-1">Grab Free Resources</p>
                <p className="text-white/40 text-xs leading-relaxed">30 templates, checklists & playbooks — free.</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold mt-2 group-hover:gap-2.5 transition-all" style={{ color: '#f58e1e' }}>
                  View Library <FiArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
