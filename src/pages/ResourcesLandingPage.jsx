'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiDownload, FiCheck, FiSearch, FiX, FiCalendar } from 'react-icons/fi'
import { resources } from '../data/resources'
import useScrollReveal from '../hooks/useScrollReveal'

const CATEGORIES = ['All', 'Web Development', 'Social Media', 'Branding', 'SEO & PPC', 'Media Production', 'Strategy', 'AI Prompts']
const FORMATS = ['Checklist', 'Template', 'Playbook', 'Guide', 'Workbook', 'Calculator', 'Planner', 'Prompt Pack']

function normalizeFormat(fmt) {
  return fmt.replace(/^PDF\s+/i, '').replace(/s$/, '').trim()
}

const heroStats = [
  { value: '28', label: 'Free Resources' },
  { value: '40K+', label: 'Downloads' },
  { value: '8', label: 'Categories' },
  { value: '$0', label: 'Cost' },
]

const featuredSlugs = [
  'social-media-content-calendar',
  'seo-keyword-research-guide',
  'social-media-caption-prompts',
  'digital-marketing-roi-calculator',
]

export default function ResourcesLandingPage() {
  const [active, setActive] = useState('All')
  const [format, setFormat] = useState('')
  const [query, setQuery] = useState('')
  const [requested, setRequested] = useState({})
  const [email, setEmail] = useState('')
  const [activeResource, setActiveResource] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const categoryCounts = useMemo(() => {
    const counts = { All: resources.length }
    for (const r of resources) counts[r.category] = (counts[r.category] || 0) + 1
    return counts
  }, [])

  const formatCounts = useMemo(() => {
    const counts = {}
    for (const r of resources) {
      const f = normalizeFormat(r.format)
      counts[f] = (counts[f] || 0) + 1
    }
    return counts
  }, [])

  const filtered = useMemo(() => {
    let list = active === 'All' ? resources : resources.filter((r) => r.category === active)
    if (format) list = list.filter((r) => normalizeFormat(r.format) === format)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.highlights.some((h) => h.toLowerCase().includes(q))
      )
    }
    return list
  }, [active, format, query])

  const hasFilters = active !== 'All' || format || query.trim()
  const clearAll = () => { setActive('All'); setFormat(''); setQuery('') }

  const featured = resources.filter((r) => featuredSlugs.includes(r.slug))

  const handleRequest = async (slug) => {
    const trimmed = email.trim()
    if (!trimmed) { setError('Please enter your email address.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) { setError('Please enter a valid email address.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, slug }),
      })
      let data = {}
      try { data = await res.json() } catch { /* non-JSON */ }
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setRequested((prev) => ({ ...prev, [slug]: true }))
      setActiveResource(null)
      setEmail('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const openModal = (slug) => { setActiveResource(slug); setError(''); setEmail('') }

  return (
    <div className="min-h-screen" style={{ background: '#060606' }}>

      {/* ── Minimal nav ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/08"
        style={{ background: 'rgba(6,6,6,0.92)', backdropFilter: 'blur(20px)' }}
      >
        <div className="w-full max-w-[78rem] mx-auto px-4 flex items-center justify-between py-4">
          <Link href="/">
            <img
              src="/images/logo.avif"
              alt="Squad Tech Solution"
              className="h-10 w-auto object-contain"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/resources"
              className="text-white/50 hover:text-white text-sm transition-colors hidden sm:block"
            >
              Browse All
            </Link>
            <a
              href="https://calendly.com/squadtechsolution/inquiry"
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-sm px-5 py-2.5"
            >
              Book Free Call <FiCalendar className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        {/* Glows */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(231,49,3,0.09) 0%, transparent 65%)' }}
        />
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(245,142,30,0.06) 0%, transparent 65%)' }}
        />
        <div className="absolute inset-0 grid-overlay pointer-events-none" />

        <div className="w-full max-w-[56rem] mx-auto px-4 text-center relative z-10">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border"
            style={{ color: '#e73103', background: 'rgba(231,49,3,0.08)', borderColor: 'rgba(231,49,3,0.2)' }}
          >
            <FiDownload className="w-4 h-4" />
            Free Marketing Resources — No Sign-Up Required
          </div>

          {/* Headline */}
          <h1
            className="font-bold text-white leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          >
            The Exact Templates Our Team{' '}
            <span className="brand-text">Uses Every Day</span>
          </h1>

          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            28 free frameworks, checklists, prompt packs, and playbooks — the same ones behind 200+ client engagements. Download any of them below, straight to your inbox.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {heroStats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div
                  className="text-3xl font-bold mb-0.5"
                  style={{ background: 'linear-gradient(135deg, #e73103, #f58e1e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {value}
                </div>
                <div className="text-white/40 text-xs font-medium">{label}</div>
              </div>
            ))}
          </div>

          {/* Trust line */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/35">
            {['No credit card', 'No spam — ever', 'Delivered to your inbox', 'Instant download'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <FiCheck className="w-3.5 h-3.5" style={{ color: '#e73103' }} /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured resources ── */}
      <section className="pb-16">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-6 text-center">Most Downloaded</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((r) => {
              const rgb = r.accentColor === '#e73103' ? '231,49,3' : '245,142,30'
              return (
                <button
                  key={r.slug}
                  onClick={() => openModal(r.slug)}
                  className="text-left rounded-2xl border border-white/08 p-5 transition-all duration-200 hover:border-white/15 group"
                  style={{ background: `rgba(${rgb},0.04)` }}
                >
                  <div className="text-2xl mb-3">{r.icon}</div>
                  <div className="text-white font-semibold text-sm mb-1 group-hover:text-white transition-colors">{r.title}</div>
                  <div className="text-white/40 text-xs mb-3">{r.subtitle}</div>
                  <div
                    className="inline-flex items-center gap-1.5 text-xs font-semibold"
                    style={{ color: r.accentColor }}
                  >
                    <FiDownload className="w-3 h-3" /> Get Free
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="w-full max-w-[78rem] mx-auto px-4">
        <div className="border-t border-white/06 mb-16" />
      </div>

      {/* ── Full library ── */}
      <section className="pb-24">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-2">Full Library</p>
              <h2 className="text-white font-bold text-2xl">All 28 Resources</h2>
            </div>
          </div>

          {/* Mobile category pills */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${active === cat ? 'text-white border-transparent' : 'text-white/50 border-white/10 hover:text-white'
                  }`}
                style={active === cat ? { background: 'linear-gradient(135deg, #e73103, #f58e1e)' } : { background: 'rgba(255,255,255,0.04)' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-8 items-start">

            {/* Sidebar */}
            <aside
              className="hidden lg:block w-80 flex-shrink-0 rounded-2xl border border-white/8 p-5"
              style={{ position: 'sticky', top: '5.5rem', alignSelf: 'flex-start', background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-white font-semibold text-sm">Filters</span>
                {hasFilters && (
                  <button onClick={clearAll} className="text-xs text-white/35 hover:text-white/60 transition-colors">
                    Clear all
                  </button>
                )}
              </div>

              <div className="mb-6">
                <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-3">Category</p>
                <div className="space-y-0.5">
                  {CATEGORIES.map((cat) => {
                    const isActive = active === cat
                    return (
                      <button
                        key={cat}
                        onClick={() => setActive(cat)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-150 group"
                        style={isActive ? { background: 'linear-gradient(135deg, rgba(231,49,3,0.12), rgba(245,142,30,0.12))', borderLeft: '2px solid #e73103', paddingLeft: '10px' } : {}}
                      >
                        <span className={`transition-colors ${isActive ? 'text-white font-medium' : 'text-white/50 group-hover:text-white/75'}`}>{cat}</span>
                        <span className={`text-xs tabular-nums ${isActive ? 'text-white/50' : 'text-white/20 group-hover:text-white/35'}`}>{categoryCounts[cat] ?? 0}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="border-t border-white/06 mb-6" />

              <div>
                <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-3">Format</p>
                <div className="space-y-0.5">
                  {FORMATS.filter((f) => formatCounts[f]).map((f) => {
                    const isActive = format === f
                    return (
                      <button
                        key={f}
                        onClick={() => setFormat(isActive ? '' : f)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-150 group"
                        style={isActive ? { background: 'linear-gradient(135deg, rgba(245,142,30,0.12), rgba(231,49,3,0.12))', borderLeft: '2px solid #f58e1e', paddingLeft: '10px' } : {}}
                      >
                        <span className={`transition-colors ${isActive ? 'text-white font-medium' : 'text-white/50 group-hover:text-white/75'}`}>{f}</span>
                        <span className={`text-xs tabular-nums ${isActive ? 'text-white/50' : 'text-white/20 group-hover:text-white/35'}`}>{formatCounts[f] ?? 0}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1 min-w-0">
              {/* Search */}
              <div className="relative mb-5 max-w-lg">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search resources — e.g. SEO, LinkedIn, checklist…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 text-sm outline-none focus:border-white/25 transition-colors"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Active chips */}
              {(active !== 'All' || format) && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {active !== 'All' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-white/10" style={{ background: 'rgba(231,49,3,0.1)', color: '#e73103' }}>
                      {active}
                      <button onClick={() => setActive('All')} className="opacity-60 hover:opacity-100 transition-opacity"><FiX className="w-3 h-3" /></button>
                    </span>
                  )}
                  {format && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-white/10" style={{ background: 'rgba(245,142,30,0.1)', color: '#f58e1e' }}>
                      {format}
                      <button onClick={() => setFormat('')} className="opacity-60 hover:opacity-100 transition-opacity"><FiX className="w-3 h-3" /></button>
                    </span>
                  )}
                </div>
              )}

              {hasFilters && (
                <p className="text-white/30 text-sm mb-6">
                  {filtered.length === 0
                    ? `No results${query.trim() ? ` for "${query}"` : ''}`
                    : `${filtered.length} resource${filtered.length !== 1 ? 's' : ''}${query.trim() ? ` for "${query}"` : ''}`}
                </p>
              )}

              {filtered.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {filtered.map((resource, i) => (
                    <ResourceCard
                      key={resource.slug}
                      resource={resource}
                      index={i}
                      requested={!!requested[resource.slug]}
                      onRequest={() => openModal(resource.slug)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24">
                  <p className="text-5xl mb-5">🔍</p>
                  <p className="text-white font-semibold text-lg mb-2">No resources found</p>
                  <p className="text-white/40 text-sm mb-6">Try a different keyword or adjust the filters.</p>
                  <button onClick={clearAll} className="text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all">
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof strip ── */}
      <section className="py-16 border-t border-white/06">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-10 text-center">What People Say</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { quote: "The LinkedIn outreach playbook alone got us 12 booked calls in our first month using it. Genuinely useful, no fluff.", name: 'Marcus D.', role: 'B2B Founder' },
              { quote: "Downloaded the SEO keyword guide expecting generic advice. Got a proper framework that's now built into our content process.", name: 'Priya S.', role: 'Content Lead' },
              { quote: "The AI prompt packs save our team hours every week. These aren't recycled ChatGPT prompts — they actually work.", name: 'Tom R.', role: 'Marketing Manager' },
            ].map(({ quote, name, role }) => (
              <div key={name} className="rounded-2xl border border-white/08 p-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <p className="text-white/60 text-sm leading-relaxed mb-4">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #e73103, #f58e1e)' }}
                  >
                    {name[0]}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{name}</div>
                    <div className="text-white/35 text-xs">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(231,49,3,0.08) 0%, transparent 65%)' }}
        />
        <div className="w-full max-w-[56rem] mx-auto px-4 text-center relative z-10">
          <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-4">Want More Than Templates?</p>
          <h2 className="font-bold text-white mb-5" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: '1.15' }}>
            Let Our Team Do the{' '}
            <span className="brand-text">Heavy Lifting</span>
          </h2>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Templates are a start — but implementation is where results happen. Book a free strategy call and see how we apply these frameworks to your brand.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://calendly.com/squadtechsolution/inquiry"
              target="_blank"
              rel="noreferrer"
              className="btn-primary px-8 py-3.5"
            >
              Book Free Strategy Call <FiArrowRight className="w-4 h-4" />
            </a>
            <Link href="/resources" className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1.5">
              View on full site <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/06 py-6">
        <div className="w-full max-w-[78rem] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/25 text-xs">
          <span>© {new Date().getFullYear()} Squad Tech Solution · squadtechsol.com</span>
          <Link href="/" className="hover:text-white/50 transition-colors">Back to main site</Link>
        </div>
      </footer>

      {/* ── Email modal ── */}
      {activeResource && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setActiveResource(null) }}
        >
          <div className="w-full max-w-md rounded-3xl p-8 border border-white/10" style={{ background: 'rgba(10,10,10,0.98)' }}>
            {(() => {
              const res = resources.find((r) => r.slug === activeResource)
              return (
                <>
                  <div className="text-4xl mb-4">{res?.icon}</div>
                  <h3 className="text-white font-bold text-xl mb-2">{res?.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    Enter your email and we'll send the {res?.format} straight to your inbox — no spam, ever.
                  </p>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    onKeyDown={(e) => e.key === 'Enter' && !loading && handleRequest(activeResource)}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl border bg-white/5 text-white placeholder-white/30 text-sm mb-3 outline-none transition-colors"
                    style={{ borderColor: error ? 'rgba(231,49,3,0.5)' : 'rgba(255,255,255,0.1)' }}
                  />
                  {error && <p className="text-xs mb-3" style={{ color: '#e73103' }}>{error}</p>}
                  <button
                    onClick={() => handleRequest(activeResource)}
                    disabled={loading}
                    className="btn-primary w-full py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: loading ? 'rgba(255,255,255,0.1)' : `linear-gradient(135deg, ${res?.accentColor}, ${res?.accentColor === '#e73103' ? '#f58e1e' : '#e73103'})` }}
                  >
                    {loading ? 'Sending…' : `Send Me the ${res?.format}`}
                    {!loading && <FiArrowRight className="w-4 h-4" />}
                  </button>
                  <p className="text-white/20 text-xs text-center mt-3">Free. No spam. Unsubscribe anytime.</p>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

function ResourceCard({ resource, index, requested, onRequest }) {
  const { ref, visible } = useScrollReveal()
  const rgb = resource.accentColor === '#e73103' ? '231,49,3' : '245,142,30'

  return (
    <article
      ref={ref}
      className={`rounded-2xl border border-white/10 overflow-hidden transition-all duration-700 flex flex-col ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 50}ms`, background: 'rgba(255,255,255,0.03)' }}
    >
      <div className="p-6 border-b border-white/06" style={{ background: `rgba(${rgb},0.05)` }}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <span className="text-3xl">{resource.icon}</span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ color: resource.accentColor, background: `rgba(${rgb},0.1)` }}>
            {resource.category}
          </span>
        </div>
        <h3 className="text-white font-bold text-lg mb-1">{resource.title}</h3>
        <p className="text-white/40 text-xs font-medium">{resource.subtitle}</p>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="text-white/55 text-sm leading-relaxed mb-5">{resource.description}</p>
        <ul className="space-y-2 mb-6 flex-1">
          {resource.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <FiCheck className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: resource.accentColor }} />
              <span className="text-white/50 text-xs leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-3 mb-5 text-xs text-white/30">
          <span>{resource.format}</span>
          <span>·</span>
          <span>{resource.pages}</span>
          <span>·</span>
          <span>{resource.downloadCount} downloads</span>
        </div>
        {requested ? (
          <div className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold" style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80' }}>
            <FiCheck className="w-4 h-4" /> Sent to your inbox
          </div>
        ) : (
          <button
            onClick={onRequest}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white border border-white/10 hover:border-white/20 transition-all duration-200"
            style={{ background: `rgba(${rgb},0.08)`, color: resource.accentColor }}
          >
            <FiDownload className="w-4 h-4" /> Get Free {resource.format.split(' ')[0]}
          </button>
        )}
      </div>
    </article>
  )
}
