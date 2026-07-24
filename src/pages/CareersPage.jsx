'use client'

import { memo } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiGlobe, FiTrendingUp, FiZap, FiUsers, FiFeather } from 'react-icons/fi'
import PageHero from '../components/PageHero'
import useScrollReveal from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

const perks = [
  { icon: FiGlobe, title: 'Fully Remote', desc: 'Work from anywhere. Our team spans the US, Europe, and Asia — output matters, location doesn\'t.', color: '#e73103' },
  { icon: FiTrendingUp, title: 'Real Growth Paths', desc: 'No juniors parked on grunt work. You own accounts, ship work that goes live, and level up fast.', color: '#f58e1e' },
  { icon: FiZap, title: 'Startup Speed', desc: 'No six-week approval chains. Ideas ship the week they\'re good. Hungry minds thrive here.', color: '#e73103' },
  { icon: FiUsers, title: 'Cross-Functional Pods', desc: 'Strategy, creative, dev, and analytics working in lock-step — you learn every discipline by osmosis.', color: '#f58e1e' },
]

const roles = [
  { title: 'Social Media Strategist', type: 'Full-time · Remote', desc: 'Own client accounts end-to-end: strategy, content calendars, paid amplification, and reporting.' },
  { title: 'Performance Media Buyer', type: 'Full-time · Remote', desc: 'Run Meta, TikTok, and Google campaigns with real budgets and full creative-testing autonomy.' },
  { title: 'React / Next.js Developer', type: 'Full-time · Remote', desc: 'Build conversion-focused client sites with 95+ Lighthouse scores as the baseline, not the goal.' },
  { title: 'Video Editor (Short-Form)', type: 'Full-time · Remote', desc: 'Cut Reels, TikToks, and ad creative where hook rate is the scoreboard.' },
  { title: 'SEO Specialist', type: 'Full-time · Remote', desc: 'Technical audits, content strategy, and rank tracking across 100+ keyword portfolios.' },
]

export default function CareersPage() {
  return (
    <div>
      <PageHero
        eyebrow="Careers"
        title="Do the Best Work"
        titleAccent="Of Your Career"
        subtitle="We hire hungry specialists who want ownership, speed, and clients who actually see their work. Complacency doesn't last here — neither does boredom."
        breadcrumbs={[{ label: 'Careers' }]}
      />

      {/* Perks */}
      <section className="pb-20">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map((p, i) => (
              <PerkCard key={p.title} perk={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[56rem] mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-lg font-bold text-white whitespace-nowrap">Open Roles</h2>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(231,49,3,0.35), rgba(255,255,255,0.06))' }} />
          </div>
          <div className="space-y-4">
            {roles.map((r, i) => (
              <RoleCard key={r.title} role={r} index={i} />
            ))}
          </div>
          <p className="text-white/35 text-sm mt-8">
            Don't see your role? We keep a bench of exceptional people. Send your portfolio anyway —{' '}
            <a href="mailto:inquiry@squadtechsol.com?subject=Open%20Application" className="text-white/60 underline underline-offset-2 hover:text-white transition-colors">
              inquiry@squadtechsol.com
            </a>
          </p>
        </div>
      </section>

      {/* Writer program cross-link */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <Link
            href="/write-for-us"
            className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl px-6 py-5 border transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: 'rgba(231,49,3,0.25)', borderLeft: '3px solid #e73103', background: 'rgba(255,255,255,0.02)' }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(231,49,3,0.1)', border: '1px solid rgba(231,49,3,0.2)' }}
            >
              <FiFeather className="w-5 h-5" style={{ color: '#f58e1e' }} />
            </div>
            <p className="text-sm leading-relaxed flex-1">
              <span className="text-white font-semibold">Writer, not job-hunting?</span>{' '}
              <span className="text-white/45">
                Contribute articles to our blog and get a free professionally designed portfolio page instead.
              </span>
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold flex-shrink-0 group-hover:gap-3 transition-all" style={{ color: '#f58e1e' }}>
              Writer Program <FiArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}

const PerkCard = memo(function PerkCard({ perk, index }) {
  const { ref, visible } = useScrollReveal()
  const rgb = perk.color === '#e73103' ? '231,49,3' : '245,142,30'
  return (
    <div
      ref={ref}
      className={`card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.2)` }}
      >
        <perk.icon className="w-5 h-5" style={{ color: perk.color }} />
      </div>
      <h4 className="text-white font-semibold mb-2 text-sm">{perk.title}</h4>
      <p className="text-white/50 text-sm leading-relaxed">{perk.desc}</p>
    </div>
  )
})

const RoleCard = memo(function RoleCard({ role, index }) {
  const { ref, visible } = useScrollReveal()
  const mailto = `mailto:inquiry@squadtechsol.com?subject=${encodeURIComponent(`Application: ${role.title}`)}`
  return (
    <a
      href={mailto}
      ref={ref}
      className={`group card flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap mb-1.5">
          <h4 className="text-white font-semibold text-sm">{role.title}</h4>
          <span
            className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
            style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}
          >
            {role.type}
          </span>
        </div>
        <p className="text-white/45 text-sm leading-relaxed">{role.desc}</p>
      </div>
      <span className="inline-flex items-center gap-2 text-sm font-semibold flex-shrink-0 group-hover:gap-3 transition-all" style={{ color: '#e73103' }}>
        Apply <FiArrowRight className="w-4 h-4" />
      </span>
    </a>
  )
})
