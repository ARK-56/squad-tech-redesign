'use client'

import { memo } from 'react'
import Link from 'next/link'
import { useParams, redirect } from 'next/navigation'
import {
  FiArrowRight, FiChevronRight, FiCheck, FiX, FiExternalLink,
  FiTag, FiTool, FiUser, FiZap,
} from 'react-icons/fi'
import { themeCategories, themesByCategory } from '../data/themes'
import useScrollReveal from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

export default function ThemeCategoryPage() {
  const { category } = useParams()
  const cat = themeCategories[category]

  if (!cat) redirect('/themes')

  const list = themesByCategory(category)

  // ItemList + Product/Review schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: cat.name,
    numberOfItems: list.length,
    itemListElement: list.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: t.name,
        description: t.review[0],
        brand: { '@type': 'Brand', name: t.marketplace },
        review: {
          '@type': 'Review',
          author: { '@type': 'Organization', name: 'Squad Tech Solution' },
          reviewBody: t.review.join(' '),
          positiveNotes: { '@type': 'ItemList', itemListElement: t.pros.map((p, j) => ({ '@type': 'ListItem', position: j + 1, name: p })) },
          negativeNotes: { '@type': 'ItemList', itemListElement: t.cons.map((c, j) => ({ '@type': 'ListItem', position: j + 1, name: c })) },
        },
      },
    })),
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="pt-36 pb-14 relative overflow-hidden">
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
              <Link href="/themes" className="hover:text-white/60 transition-colors">Theme Directory</Link>
            </span>
            <span className="flex items-center gap-1.5">
              <FiChevronRight className="w-3 h-3" />
              <span className="text-white/60">{cat.short}</span>
            </span>
          </nav>

          <p className="eyebrow mb-5">{cat.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 max-w-3xl">
            {cat.headline.split(' ').slice(0, -2).join(' ')}{' '}
            <span className="brand-text">{cat.headline.split(' ').slice(-2).join(' ')}</span>
          </h1>
          <p className="section-copy max-w-2xl text-lg mb-5">{cat.subheadline}</p>
          <p className="text-white/45 text-sm leading-relaxed max-w-2xl mb-4">{cat.intro}</p>
          <p className="text-white/30 text-xs max-w-2xl">
            {cat.own
              ? 'Every demo below is a real site our team designed and built. Click through, break things, view source — that\'s the point.'
              : 'Disclosure: marketplace links below are affiliate links — we may earn a commission at no extra cost to you. Our cons are published either way.'}
          </p>
        </div>
      </section>

      {/* Listings */}
      <section className="pb-20">
        <div className="w-full max-w-[78rem] mx-auto px-4 space-y-8">
          {list.map((theme, i) => (
            <ThemeListing key={theme.slug} theme={theme} position={i + 1} />
          ))}
        </div>
      </section>

      {/* Other categories */}
      <section className="py-16" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-white/45 text-sm">
              Looking for a different kind of theme?
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(themeCategories)
                .filter(([slug]) => slug !== category)
                .map(([slug, c]) => (
                  <Link
                    key={slug}
                    href={`/themes/${slug}`}
                    className="btn-secondary px-5 py-2 text-sm"
                  >
                    {c.short} Themes <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4 text-center">
          <p className="eyebrow mb-4">Skip the DIY</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Any Theme on This Page,{' '}
            <span className="brand-text">Built and Launched for You</span>
          </h2>
          <p className="section-copy max-w-lg mx-auto mb-8">
            Setup, customisation, content, speed optimisation, and SEO — and you see the finished site before you pay a cent.
          </p>
          <Link href="/start" className="btn-primary px-8 py-3">
            Get Started Free <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}

const ThemeListing = memo(function ThemeListing({ theme, position }) {
  const { ref, visible } = useScrollReveal()
  const hasMeasured = theme.measured && (theme.measured.lighthouseMobile || theme.measured.pageWeight)

  return (
    <article
      ref={ref}
      className={`rounded-3xl border border-white/10 overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      <div className="p-7 md:p-9">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #e73103, #f58e1e)' }}
            >
              {position}
            </div>
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl leading-snug">{theme.name}</h2>
              <p className="text-white/35 text-sm mt-1">
                {theme.platform} · {theme.own ? 'built in-house by Squad Tech' : `via ${theme.marketplace}`}
              </p>
            </div>
          </div>
          <span
            className="px-4 py-2 rounded-full text-sm font-bold flex-shrink-0"
            style={{ background: 'rgba(231,49,3,0.1)', color: '#f58e1e', border: '1px solid rgba(231,49,3,0.25)' }}
          >
            {theme.price}
          </span>
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm">
          <span className="flex items-center gap-2 text-white/45">
            <FiTool className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#f58e1e' }} />
            {theme.builder}
          </span>
          <span className="flex items-center gap-2 text-white/45">
            <FiUser className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#f58e1e' }} />
            Best for: {theme.bestFor}
          </span>
          {hasMeasured && (
            <span className="flex items-center gap-2 text-white/45">
              <FiZap className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#f58e1e' }} />
              {theme.measured.lighthouseMobile && <>Lighthouse mobile: {theme.measured.lighthouseMobile}</>}
              {theme.measured.pageWeight && <> · {theme.measured.pageWeight}</>}
            </span>
          )}
        </div>

        {/* Review */}
        <div className="mb-7">
          <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
            <FiTag className="w-3 h-3" /> Our Review
          </p>
          {theme.review.map((p, i) => (
            <p key={i} className="text-white/60 text-sm leading-relaxed mb-3">{p}</p>
          ))}
        </div>

        {/* Pros / Cons */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="rounded-xl p-5" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.18)' }}>
            <p className="text-green-400/80 text-xs uppercase tracking-widest font-semibold mb-3">Pros</p>
            <div className="space-y-2.5">
              {theme.pros.map((p, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <FiCheck className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/60 text-sm leading-snug">{p}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl p-5" style={{ background: 'rgba(231,49,3,0.05)', border: '1px solid rgba(231,49,3,0.18)' }}>
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: 'rgba(245,142,30,0.8)' }}>Cons</p>
            <div className="space-y-2.5">
              {theme.cons.map((c, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <FiX className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#e73103' }} />
                  <p className="text-white/60 text-sm leading-snug">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 rounded-2xl p-5"
          style={{ background: 'rgba(231,49,3,0.05)', border: '1px solid rgba(231,49,3,0.18)' }}
        >
          <p className="text-sm leading-relaxed flex-1">
            {theme.own ? (
              <>
                <span className="text-white font-semibold">Want {theme.name} as your website?</span>{' '}
                <span className="text-white/45">
                  We'll rebrand it, load your content, and launch it — and you see your finished version before you pay.
                </span>
              </>
            ) : (
              <>
                <span className="text-white font-semibold">Love {theme.name} but don't want to deal with the code?</span>{' '}
                <span className="text-white/45">
                  We'll set up, customise, and optimise this exact theme for you — and you see it finished before you pay.
                </span>
              </>
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
            <Link href={`/start?theme=${encodeURIComponent(theme.name)}`} className="btn-primary px-5 py-2.5 text-sm justify-center">
              {theme.own ? 'Make It Yours — Free' : 'Get It Built Free'} <FiArrowRight className="w-4 h-4" />
            </Link>
            {theme.own ? (
              <a
                href={theme.demoUrl}
                target="_blank"
                rel="noopener"
                className="btn-secondary px-5 py-2.5 text-sm justify-center"
              >
                View Live Demo <FiExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <a
                href={theme.affiliateUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="btn-secondary px-5 py-2.5 text-sm justify-center"
              >
                View on {theme.marketplace} <FiExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
})
