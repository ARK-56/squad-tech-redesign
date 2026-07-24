'use client'

import { memo } from 'react'
import Link from 'next/link'
import {
  FiArrowRight, FiFeather, FiGlobe, FiLayout, FiLinkedin,
  FiCheckCircle, FiEdit3, FiRefreshCw, FiAward, FiChevronRight,
} from 'react-icons/fi'
import { writersList } from '../data/authors'
import useScrollReveal from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

const YOU_GET = [
  {
    icon: FiLayout,
    title: 'A Professionally Designed Portfolio',
    desc: 'A high-converting portfolio landing page designed by our team — the same designers our paying clients use.',
  },
  {
    icon: FiGlobe,
    title: 'Free Premium Hosting',
    desc: 'Your portfolio lives on our domain with fast, secure hosting — zero cost, no ads, no upsells.',
  },
  {
    icon: FiLinkedin,
    title: 'A Link Worth Sharing',
    desc: 'One clean URL for your resume, LinkedIn, and pitches — with live bylines proving your published work.',
  },
  {
    icon: FiAward,
    title: 'Published Bylines on a Real Agency Blog',
    desc: 'Every article carries your name, bio, and a link back to your portfolio. Verifiable, credited work.',
  },
]

const STEPS = [
  {
    step: '01',
    icon: FiEdit3,
    title: 'Pitch Us',
    desc: 'Send 2–3 topic ideas in your specialty plus one writing sample. We reply within 5 business days.',
  },
  {
    step: '02',
    icon: FiCheckCircle,
    title: 'Publish 3 Approved Articles',
    desc: 'Write three pieces that pass our editorial review. Each one goes live with your full byline immediately.',
  },
  {
    step: '03',
    icon: FiLayout,
    title: 'We Build Your Portfolio',
    desc: 'Once your third article is approved, our design team builds and launches your portfolio page — free.',
  },
  {
    step: '04',
    icon: FiRefreshCw,
    title: 'Keep It Live',
    desc: 'Contribute one fresh article every 45 days and your portfolio stays hosted, updated, and growing.',
  },
]

const FAQS = [
  {
    q: 'Do I get paid for articles?',
    a: 'This is a value exchange, not a paid gig: you contribute content, we design and host your professional portfolio (a service our clients pay four figures for). Many contributors use the portfolio and bylines to win paid client work.',
  },
  {
    q: 'Who owns the content?',
    a: 'Articles published on our blog stay on our blog, permanently credited to you. You retain the right to link to and reference your published work anywhere.',
  },
  {
    q: 'What happens if I stop contributing?',
    a: 'If no new article lands within 60 days, your portfolio page is paused (not deleted). Publish your next piece and it goes right back up.',
  },
  {
    q: 'What topics do you accept?',
    a: 'Social media marketing, SEO & PPC, web development, branding, media production, and growth strategy. Pitches should be practical and experience-based — no AI-padded listicles.',
  },
  {
    q: 'What are the quality standards?',
    a: 'Original, specific, and useful. We look for first-hand experience, real numbers, and actionable frameworks. Every draft goes through editorial review; we may request one round of revisions.',
  },
]

export default function WriteForUsPage() {
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
              <Link href="/partners" className="hover:text-white/60 transition-colors">Partner Program</Link>
            </span>
            <span className="flex items-center gap-1.5">
              <FiChevronRight className="w-3 h-3" />
              <span className="text-white/60">Write for Us</span>
            </span>
          </nav>

          <p className="eyebrow mb-5">
            <FiFeather className="w-3.5 h-3.5" /> Partner Program · Track 1 — Content Partners
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
            Write for Us. Get a{' '}
            <span className="brand-text">Free Professional Portfolio.</span>
          </h1>
          <p className="section-copy max-w-2xl text-lg mb-9">
            We trade our agency's design and hosting for your expertise. Publish quality articles on our blog,
            and our team designs, builds, and hosts your writer portfolio — the kind clients actually hire from.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:inquiry@squadtechsol.com?subject=Writer%20Program%20Application"
              className="btn-primary px-7 py-3"
            >
              Apply to Write <FiArrowRight className="w-4 h-4" />
            </a>
            <Link href="/blogs" className="btn-secondary px-7 py-3">
              Read the Blog First
            </Link>
          </div>
          <p className="text-white/35 text-sm mt-6">
            Not a writer?{' '}
            <Link href="/partners" className="text-white/70 font-semibold underline underline-offset-2 hover:text-white transition-colors">
              Refer a client instead
            </Link>{' '}
            and earn a free month of premium social media marketing.
          </p>
        </div>
      </section>

      {/* ── What you get ─────────────────────────────────── */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <SectionHeader
            eyebrow="The Exchange"
            title="What You Get"
            accent="(For Zero Dollars)"
            copy="A designed and hosted portfolio is a four-figure service. You get it by doing what you already do best — writing."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {YOU_GET.map((item, i) => (
              <BenefitCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <SectionHeader
            eyebrow="How It Works"
            title="Four Steps to"
            accent="Your Live Portfolio"
            copy="Three approved articles earn the build. One article every 45 days keeps it live."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {STEPS.map((item, i) => (
              <StepCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio examples ───────────────────────────── */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <SectionHeader
            eyebrow="Live Examples"
            title="Portfolios We've"
            accent="Already Built"
            copy="Every contributor page is a real, live portfolio — designed by our team, updated with every byline."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {writersList.filter((w) => !w.isTeam).map((writer, i) => (
              <WriterPreviewCard key={writer.slug} writer={writer} index={i} />
            ))}
            {/* Your page here */}
            <YourPageCard />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[56rem] mx-auto px-4">
          <SectionHeader
            eyebrow="FAQ"
            title="The Fine Print,"
            accent="In Plain English"
          />
          <div className="space-y-4 mt-12">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4 text-center">
          <p className="eyebrow mb-5">Ready?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Your Next Byline Starts{' '}
            <span className="brand-text">Here</span>
          </h2>
          <p className="section-copy max-w-md mx-auto mb-9">
            Send 2–3 topic pitches and one writing sample. If it's a fit, your first article can be live within two weeks.
          </p>
          <a
            href="mailto:inquiry@squadtechsol.com?subject=Writer%20Program%20Application"
            className="btn-primary px-9 py-3.5"
          >
            <FiFeather className="w-4 h-4" /> Apply to the Writer Program
          </a>
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

const BenefitCard = memo(function BenefitCard({ item, index }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: 'rgba(231,49,3,0.1)', border: '1px solid rgba(231,49,3,0.2)' }}
      >
        <item.icon className="w-5 h-5" style={{ color: '#e73103' }} />
      </div>
      <h4 className="text-white font-semibold mb-2 text-sm">{item.title}</h4>
      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
    </div>
  )
})

const StepCard = memo(function StepCard({ item, index }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`card relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <span className="absolute top-5 right-6 text-3xl font-bold" style={{ color: 'rgba(255,255,255,0.06)' }}>
        {item.step}
      </span>
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: 'rgba(245,142,30,0.1)', border: '1px solid rgba(245,142,30,0.2)' }}
      >
        <item.icon className="w-5 h-5" style={{ color: '#f58e1e' }} />
      </div>
      <h4 className="text-white font-semibold mb-2 text-sm">{item.title}</h4>
      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
    </div>
  )
})

const WriterPreviewCard = memo(function WriterPreviewCard({ writer, index }) {
  const { ref, visible } = useScrollReveal()
  return (
    <Link
      href={`/writers/${writer.slug}`}
      ref={ref}
      className={`group card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ background: writer.gradient }}
        >
          {writer.initials}
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm">{writer.name}</h4>
          <p className="text-white/40 text-xs mt-0.5">{writer.role}</p>
        </div>
      </div>
      <p className="text-white/50 text-sm leading-relaxed mb-5" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {writer.bio}
      </p>
      <span className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300" style={{ color: '#e73103' }}>
        View Portfolio <FiArrowRight className="w-4 h-4" />
      </span>
    </Link>
  )
})

function YourPageCard() {
  const { ref, visible } = useScrollReveal()
  return (
    <a
      href="mailto:inquiry@squadtechsol.com?subject=Writer%20Program%20Application"
      ref={ref}
      className={`group rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-700 hover:-translate-y-0.5 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ border: '2px dashed rgba(231,49,3,0.35)', background: 'rgba(231,49,3,0.03)', minHeight: '200px' }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
        style={{ background: 'rgba(231,49,3,0.12)', border: '1px solid rgba(231,49,3,0.25)' }}
      >
        <FiFeather className="w-6 h-6" style={{ color: '#f58e1e' }} />
      </div>
      <h4 className="text-white font-semibold text-sm mb-1.5">Your Portfolio Here</h4>
      <p className="text-white/40 text-xs leading-relaxed">
        Three approved articles and this spot is yours.
      </p>
    </a>
  )
}

const FaqItem = memo(function FaqItem({ faq, index }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <h4 className="text-white font-semibold text-sm mb-2">{faq.q}</h4>
      <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
    </div>
  )
})
