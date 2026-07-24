'use client'

import { memo } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiChevronRight, FiCheckCircle, FiCode, FiZap, FiShield } from 'react-icons/fi'
import { themeCategories, themesByCategory } from '../data/themes'
import useScrollReveal from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

const TRUST_POINTS = [
  {
    icon: FiCode,
    title: 'Reviewed by Working Developers',
    desc: 'Every theme is evaluated by the team that builds 200+ client sites a year — codebase quality, not marketing screenshots.',
  },
  {
    icon: FiZap,
    title: 'Performance Over Promises',
    desc: 'We test real page speed and Core Web Vitals behaviour, not the demo\'s cached numbers.',
  },
  {
    icon: FiShield,
    title: 'Honest Cons on Every Listing',
    desc: 'Every theme has trade-offs. We publish them, because you\'ll find them anyway — better before you buy.',
  },
]

export default function ThemesHubPage() {
  const categories = Object.entries(themeCategories)

  // ItemList schema for the category hub
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'WordPress Theme Reviews by Squad Tech Solution',
    itemListElement: categories.map(([slug, cat], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: cat.name,
      url: `https://squadtechsol.com/themes/${slug}`,
    })),
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

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
              <span className="text-white/60">Theme Directory</span>
            </span>
          </nav>

          <p className="eyebrow mb-5">Theme Directory</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
            Themes Reviewed by People{' '}
            <span className="brand-text">Who Build for a Living</span>
          </h1>
          <p className="section-copy max-w-2xl text-lg mb-4">
            Hand-picked WordPress themes with honest, hands-on reviews from our development team —
            what's genuinely good, what will fight you, and who each one is actually for.
          </p>
          <p className="text-white/35 text-sm max-w-2xl">
            Some links below are affiliate links — we may earn a commission at no cost to you.
            It never changes what we recommend: every listing carries the cons we found, too.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-20">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map(([slug, cat], i) => (
              <CategoryCard key={slug} slug={slug} cat={cat} count={themesByCategory(slug).length} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why trust us */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-4">Why Trust These Reviews</p>
            <h2 className="section-title">
              Not a Screenshot Farm —{' '}
              <span className="brand-text">An Agency's Shortlist</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TRUST_POINTS.map((p, i) => (
              <TrustCard key={p.title} point={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Service CTA */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4 text-center">
          <p className="eyebrow mb-4">The Shortcut</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Found a Theme You Love?{' '}
            <span className="brand-text">We'll Build It for You.</span>
          </h2>
          <p className="section-copy max-w-lg mx-auto mb-8">
            Hosting, setup, customisation, speed optimisation, and SEO — done by the team that reviewed it.
            You see the finished site before you pay.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/start" className="btn-primary px-8 py-3">
              Get Started Free <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services/web-development" className="btn-secondary px-8 py-3">
              How Our Web Builds Work
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

const CategoryCard = memo(function CategoryCard({ slug, cat, count, index }) {
  const { ref, visible } = useScrollReveal()
  return (
    <Link
      href={`/themes/${slug}`}
      ref={ref}
      className={`group rounded-3xl border overflow-hidden transition-all duration-700 hover:-translate-y-0.5 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 90}ms`, borderColor: 'rgba(231,49,3,0.2)', background: 'rgba(255,255,255,0.02)' }}
    >
      <div className="h-1" style={{ background: 'linear-gradient(90deg, #e73103, #f58e1e)' }} />
      <div className="p-8">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: 'rgba(231,49,3,0.1)', color: '#f58e1e', border: '1px solid rgba(231,49,3,0.25)' }}
          >
            {count} {cat.own ? 'original themes' : 'themes reviewed'}
          </span>
          {cat.own && (
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.25)' }}
            >
              ✓ Built in-house · live demos
            </span>
          )}
        </div>
        <h2 className="text-white font-bold text-xl mb-3 group-hover:text-white/85 transition-colors">{cat.name}</h2>
        <p className="text-white/45 text-sm leading-relaxed mb-6">{cat.subheadline}</p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300" style={{ color: '#e73103' }}>
          Browse Reviews <FiArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
})

const TrustCard = memo(function TrustCard({ point, index }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: 'rgba(231,49,3,0.1)', border: '1px solid rgba(231,49,3,0.2)' }}
      >
        <point.icon className="w-5 h-5" style={{ color: '#e73103' }} />
      </div>
      <h4 className="text-white font-semibold mb-2 text-sm">{point.title}</h4>
      <p className="text-white/50 text-sm leading-relaxed">{point.desc}</p>
    </div>
  )
})
