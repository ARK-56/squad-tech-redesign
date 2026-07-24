'use client'

import { FiLinkedin, FiArrowRight } from 'react-icons/fi'

const NEWSLETTER_URL =
  'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7457461600812396545'

const LINKEDIN_BLUE = '#0A66C2'

function SubscribeButton({ full = false }) {
  return (
    <a
      href={NEWSLETTER_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 ${full ? 'w-full' : ''}`}
      style={{ background: LINKEDIN_BLUE, boxShadow: '0 8px 24px rgba(10,102,194,0.3)', lineHeight: 1 }}
    >
      <FiLinkedin className="w-4 h-4 flex-shrink-0" />
      <span className="leading-none">Subscribe to Newsletter</span>
    </a>
  )
}

/**
 * LinkedIn newsletter CTA.
 * variant="card"   — boxed card (sidebars)
 * variant="strip"  — horizontal banner (article pages)
 * variant="button" — just the button (footer)
 */
export default function NewsletterCTA({ variant = 'strip' }) {
  if (variant === 'button') return <SubscribeButton />

  if (variant === 'card') {
    return (
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: 'rgba(10,102,194,0.35)', background: 'rgba(255,255,255,0.02)' }}
      >
        <div className="h-1" style={{ background: LINKEDIN_BLUE }} />
        <div className="p-6">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
            style={{ background: 'rgba(10,102,194,0.12)', border: '1px solid rgba(10,102,194,0.3)' }}
          >
            <FiLinkedin className="w-5 h-5" style={{ color: '#4a9eda' }} />
          </div>
          <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-2">Newsletter</p>
          <h3 className="text-white font-bold text-base leading-snug mb-2">
            Growth Strategies, Straight to Your Feed
          </h3>
          <p className="text-white/45 text-sm leading-relaxed mb-5">
            One practical marketing playbook per week — no fluff, no spam.
          </p>
          <SubscribeButton full />
        </div>
      </div>
    )
  }

  // strip
  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl px-6 py-5 border"
      style={{
        borderColor: 'rgba(10,102,194,0.35)',
        borderLeft: `3px solid ${LINKEDIN_BLUE}`,
        background: 'rgba(10,102,194,0.05)',
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(10,102,194,0.12)', border: '1px solid rgba(10,102,194,0.3)' }}
      >
        <FiLinkedin className="w-5 h-5" style={{ color: '#4a9eda' }} />
      </div>
      <p className="text-sm leading-relaxed flex-1">
        <span className="text-white font-semibold">Enjoyed this article?</span>{' '}
        <span className="text-white/45">
          Get one practical growth playbook like it every week — subscribe to our LinkedIn newsletter.
        </span>
      </p>
      <SubscribeButton />
    </div>
  )
}
