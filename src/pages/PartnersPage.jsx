'use client'

import { memo } from 'react'
import Link from 'next/link'
import {
  FiArrowRight, FiFeather, FiUsers, FiChevronRight, FiCheck,
  FiEdit3, FiLayout, FiRefreshCw, FiUserPlus, FiFileText, FiGift,
} from 'react-icons/fi'
import useScrollReveal from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

const WRITER_STEPS = [
  { icon: FiEdit3, title: 'Pitch & Publish', desc: 'Send us topic ideas, then publish 3 approved SEO articles with your byline.' },
  { icon: FiLayout, title: 'We Build Your Portfolio', desc: 'Our design team builds and hosts your professional portfolio page — free.' },
  { icon: FiRefreshCw, title: 'Keep It Live', desc: 'One new article every 45 days keeps your page hosted, updated, and growing.' },
]

const REFERRAL_STEPS = [
  { icon: FiUserPlus, title: 'Introduce a Client', desc: 'Connect us with a business that needs marketing, design, or development.' },
  { icon: FiFileText, title: 'They Sign & Pay', desc: 'When your referral signs a contract and pays their first deposit, you qualify.' },
  { icon: FiGift, title: 'You Get Paid in Services', desc: 'One month of premium social media marketing, managed entirely by our team.' },
]

const SMM_PACKAGE = [
  { title: 'Profile Optimization', desc: 'Bios, highlights, and profiles cleaned up and optimized across your chosen platforms.' },
  { title: '22 Pieces of Content', desc: 'A full monthly calendar — custom graphics, carousels, stories, and short-form video (Reels, TikToks, or Shorts).' },
  { title: 'Professional Copywriting', desc: 'Captions written in your brand voice, not generic filler.' },
  { title: 'Full Management', desc: 'We schedule and publish everything — you don\'t touch a thing.' },
  { title: 'Monthly Analytics Report', desc: 'A clear report showing exactly how your accounts performed.' },
]

export default function PartnersPage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        <div className="grid-overlay" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(231,49,3,0.09) 0%, transparent 70%)' }}
        />
        <div className="w-full max-w-[78rem] mx-auto px-4 relative z-10">
          <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-6 font-medium">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span className="flex items-center gap-1.5">
              <FiChevronRight className="w-3 h-3" />
              <span className="text-white/60">Partner Program</span>
            </span>
          </nav>

          <p className="eyebrow mb-5">Partner Program</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
            Partner With Us.{' '}
            <span className="brand-text">Get Paid in Services.</span>
          </h1>
          <p className="section-copy max-w-2xl text-lg mb-4">
            We don't pay partners in cash — we pay in the thing agencies charge four figures for: professional
            design, development, and marketing, done by our team.
          </p>
          <p className="text-white/40 text-sm max-w-2xl mb-10">
            Two ways in. Trade your <span className="text-white/70 font-semibold">skills</span> (write for our blog)
            or your <span className="text-white/70 font-semibold">network</span> (refer us a client).
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#tracks" className="btn-primary px-7 py-3">
              Choose Your Track <FiArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:inquiry@squadtechsol.com?subject=Partner%20Program"
              className="btn-secondary px-7 py-3"
            >
              Ask a Question First
            </a>
          </div>
        </div>
      </section>

      {/* ── The two tracks ───────────────────────────────── */}
      <section id="tracks" className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <SectionHeader
            eyebrow="Two Tracks"
            title="What Do You Want"
            accent="To Trade?"
          />

          <div className="grid lg:grid-cols-2 gap-6 mt-12">
            {/* Track 1 — Writers */}
            <TrackCard
              badge="Track 1 · Content Partners"
              icon={FiFeather}
              title="Write for Us"
              deal="You write high-quality, SEO-optimized articles for our blog."
              reward="We design, build, and host your professional portfolio page — free, on our domain."
              steps={WRITER_STEPS}
              cta={{ label: 'Explore the Writer Track', to: '/write-for-us' }}
              footnote="3 approved articles to launch your page · 1 article every 45 days keeps it live"
            />

            {/* Track 2 — Referrals */}
            <TrackCard
              badge="Track 2 · Referral Partners"
              icon={FiUsers}
              title="Refer a Client"
              deal="You introduce us to a business that needs marketing, design, or development."
              reward="1 month of free premium Social Media Marketing — fully managed by our team."
              steps={REFERRAL_STEPS}
              cta={{ label: 'Refer a Client', href: 'mailto:inquiry@squadtechsol.com?subject=Referral%20Partner%20—%20Client%20Introduction' }}
              footnote="Reward unlocks when your referral signs and pays their first deposit"
            />
          </div>
        </div>
      </section>

      {/* ── SMM package detail ───────────────────────────── */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <SectionHeader
            eyebrow="The Referral Reward"
            title="What One Free Month of"
            accent="Premium SMM Includes"
            copy="This is the same package clients pay $2,800/month for — run on 2–3 platforms of your choice."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {SMM_PACKAGE.map((item, i) => (
              <PackageCard key={item.title} item={item} index={i} />
            ))}
            <div
              className="rounded-2xl p-6 flex flex-col justify-center"
              style={{ border: '2px dashed rgba(231,49,3,0.35)', background: 'rgba(231,49,3,0.03)' }}
            >
              <p className="text-2xl font-bold brand-text mb-1">$2,800</p>
              <p className="text-white/60 text-sm font-semibold mb-2">Real market value</p>
              <p className="text-white/40 text-xs leading-relaxed">
                Your cost: one introduction that turns into a signed client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who it's for ─────────────────────────────────── */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[56rem] mx-auto px-4">
          <SectionHeader eyebrow="Good Fit?" title="Who This Works" accent="Best For" />
          <div className="space-y-3 mt-10">
            {[
              ['Freelance writers & content strategists', 'who need a professional portfolio without paying a designer — join Track 1.'],
              ['Freelancers, consultants & studio owners', 'whose clients keep asking for marketing services they don\'t offer — join Track 2.'],
              ['Business owners with strong networks', 'who\'d rather earn premium social media management than a one-time cash kickback — join Track 2.'],
              ['Ambitious writers who also know businesses', 'nothing stops you from doing both tracks at once.'],
            ].map(([bold, rest], i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/08 px-5 py-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <FiCheck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#f58e1e' }} />
                <p className="text-sm leading-relaxed">
                  <span className="text-white font-semibold">{bold}</span>{' '}
                  <span className="text-white/45">{rest}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4 text-center">
          <p className="eyebrow mb-5">Ready?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Pick Your Track and{' '}
            <span className="brand-text">Start Trading</span>
          </h2>
          <p className="section-copy max-w-md mx-auto mb-9">
            Both tracks start with one email. We reply within 5 business days.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/write-for-us" className="btn-primary px-8 py-3">
              <FiFeather className="w-4 h-4" /> I Want to Write
            </Link>
            <a
              href="mailto:inquiry@squadtechsol.com?subject=Referral%20Partner%20—%20Client%20Introduction"
              className="btn-secondary px-8 py-3"
            >
              <FiUsers className="w-4 h-4" /> I Have a Referral
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

/* ── Components ────────────────────────────────────────── */
function SectionHeader({ eyebrow, title, accent, copy }) {
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
      {copy && <p className="section-copy mt-4">{copy}</p>}
    </div>
  )
}

const TrackCard = memo(function TrackCard({ badge, icon: Icon, title, deal, reward, steps, cta, footnote }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`rounded-3xl border overflow-hidden flex flex-col transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ borderColor: 'rgba(231,49,3,0.22)', background: 'rgba(255,255,255,0.02)' }}
    >
      <div className="h-1" style={{ background: 'linear-gradient(90deg, #e73103, #f58e1e)' }} />
      <div className="p-7 md:p-9 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(231,49,3,0.1)', border: '1px solid rgba(231,49,3,0.2)' }}
          >
            <Icon className="w-5 h-5" style={{ color: '#f58e1e' }} />
          </div>
          <span
            className="px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: 'rgba(231,49,3,0.1)', color: '#f58e1e', border: '1px solid rgba(231,49,3,0.25)' }}
          >
            {badge}
          </span>
        </div>

        <h3 className="text-white font-bold text-2xl mb-5">{title}</h3>

        <div className="space-y-3 mb-7">
          <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-white/30 text-[11px] uppercase tracking-widest font-semibold mb-1">The Deal</p>
            <p className="text-white/65 text-sm leading-relaxed">{deal}</p>
          </div>
          <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <p className="text-green-400/70 text-[11px] uppercase tracking-widest font-semibold mb-1">The Reward</p>
            <p className="text-white/65 text-sm leading-relaxed">{reward}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8 flex-1">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(245,142,30,0.1)', border: '1px solid rgba(245,142,30,0.2)' }}
              >
                <step.icon className="w-3.5 h-3.5" style={{ color: '#f58e1e' }} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-0.5">{step.title}</p>
                <p className="text-white/45 text-xs leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {cta.to ? (
          <Link href={cta.to} className="btn-primary w-full py-3 text-sm">
            {cta.label} <FiArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <a href={cta.href} className="btn-primary w-full py-3 text-sm">
            {cta.label} <FiArrowRight className="w-4 h-4" />
          </a>
        )}
        <p className="text-white/30 text-xs text-center mt-3">{footnote}</p>
      </div>
    </div>
  )
})

const PackageCard = memo(function PackageCard({ item, index }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 text-sm font-bold"
        style={{ background: 'rgba(231,49,3,0.1)', border: '1px solid rgba(231,49,3,0.2)', color: '#e73103' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
      <h4 className="text-white font-semibold text-sm mb-2">{item.title}</h4>
      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
    </div>
  )
})
