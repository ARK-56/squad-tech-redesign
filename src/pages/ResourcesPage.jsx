'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { FiDownload, FiArrowRight, FiCheck, FiSearch, FiX } from 'react-icons/fi'
import { resources } from '../data/resources'
import PageHero from '../components/PageHero'
import useScrollReveal from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

const CATEGORIES = ['All', 'Web Development', 'Social Media', 'Branding', 'SEO & PPC', 'Media Production', 'Strategy', 'AI Prompts']
const FORMATS = ['Checklist', 'Template', 'Playbook', 'Guide', 'Workbook', 'Calculator', 'Planner', 'Prompt Pack']

function normalizeFormat(fmt) {
  return fmt.replace(/^PDF\s+/i, '').replace(/s$/, '').trim()
}

export default function ResourcesPage() {
  const [active, setActive] = useState('All')
  const [format, setFormat] = useState('')
  const [query, setQuery] = useState('')
  const [requested, setRequested] = useState({})
  const [email, setEmail] = useState('')
  const [activeResource, setActiveResource] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()

  // Deep link: /resources?r=<slug> opens that resource's download modal
  useEffect(() => {
    const slug = searchParams.get('r')
    if (slug && resources.some((res) => res.slug === slug)) {
      setActiveResource(slug)
      router.replace('/resources', { scroll: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      try { data = await res.json() } catch { /* non-JSON response */ }
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

  const openModal = (slug) => {
    setActiveResource(slug)
    setError('')
    setEmail('')
  }

  return (
    <div>
      <PageHero
        eyebrow="Free Tools"
        title="Free Tools & Templates"
        titleAccent="Worth Keeping"
        subtitle="Free frameworks, checklists, and templates from our team — the same ones we use for our 200+ client engagements. No fluff, no upsell."
        breadcrumbs={[{ label: 'Free Tools' }]}
      />

      <section className="pb-24">
        <div className="w-full max-w-[78rem] mx-auto px-4">

          {/* Mobile category pills */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${active === cat
                  ? 'text-white border-transparent'
                  : 'text-white/50 border-white/10 hover:text-white hover:border-white/20'
                  }`}
                style={active === cat
                  ? { background: 'linear-gradient(135deg, #e73103, #f58e1e)' }
                  : { background: 'rgba(255,255,255,0.04)' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-8 items-start">

            {/* ── Sticky sidebar ── */}
            <aside
              className="hidden lg:block w-80 flex-shrink-0 rounded-2xl border border-white/8 p-5"
              style={{ position: 'sticky', top: '6rem', alignSelf: 'flex-start', background: 'rgba(255,255,255,0.02)' }}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-white font-semibold text-sm">Filters</span>
                  {hasFilters && (
                    <button
                      onClick={clearAll}
                      className="text-xs text-white/35 hover:text-white/60 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Category */}
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
                          style={isActive
                            ? { background: 'linear-gradient(135deg, rgba(231,49,3,0.12), rgba(245,142,30,0.12))', borderLeft: '2px solid #e73103', paddingLeft: '10px' }
                            : {}}
                        >
                          <span className={`transition-colors ${isActive ? 'text-white font-medium' : 'text-white/50 group-hover:text-white/75'}`}>
                            {cat}
                          </span>
                          <span className={`text-xs tabular-nums transition-colors ${isActive ? 'text-white/50' : 'text-white/20 group-hover:text-white/35'}`}>
                            {categoryCounts[cat] ?? 0}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/6 mb-6" />

                {/* Format */}
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
                          style={isActive
                            ? { background: 'linear-gradient(135deg, rgba(245,142,30,0.12), rgba(231,49,3,0.12))', borderLeft: '2px solid #f58e1e', paddingLeft: '10px' }
                            : {}}
                        >
                          <span className={`transition-colors ${isActive ? 'text-white font-medium' : 'text-white/50 group-hover:text-white/75'}`}>
                            {f}
                          </span>
                          <span className={`text-xs tabular-nums transition-colors ${isActive ? 'text-white/50' : 'text-white/20 group-hover:text-white/35'}`}>
                            {formatCounts[f] ?? 0}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Main content ── */}
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
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Active filter chips */}
              {(active !== 'All' || format) && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {active !== 'All' && (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-white/10"
                      style={{ background: 'rgba(231,49,3,0.1)', color: '#e73103' }}
                    >
                      {active}
                      <button onClick={() => setActive('All')} className="opacity-60 hover:opacity-100 transition-opacity">
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {format && (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-white/10"
                      style={{ background: 'rgba(245,142,30,0.1)', color: '#f58e1e' }}
                    >
                      {format}
                      <button onClick={() => setFormat('')} className="opacity-60 hover:opacity-100 transition-opacity">
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              {/* Results count */}
              {hasFilters && (
                <p className="text-white/30 text-sm mb-6">
                  {filtered.length === 0
                    ? `No results${query.trim() ? ` for "${query}"` : ''}`
                    : `${filtered.length} resource${filtered.length !== 1 ? 's' : ''}${query.trim() ? ` for "${query}"` : ''}`}
                </p>
              )}

              {/* Grid */}
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
                  <button
                    onClick={clearAll}
                    className="text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Email modal */}
      {activeResource && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setActiveResource(null) }}
        >
          <div
            className="w-full max-w-md rounded-3xl p-8 border border-white/10"
            style={{ background: 'rgba(10,10,10,0.98)' }}
          >
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
                  <p className="text-white/20 text-xs text-center mt-3">
                    Free. No spam. Unsubscribe anytime. By submitting you agree to our{' '}
                    <a href="/privacy-policy" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white/50 transition-colors">Privacy Policy</a>.
                  </p>
                </>
              )
            })()}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4 text-center">
          <p className="eyebrow mb-4">Want More Than Templates?</p>
          <h2 className="section-title mb-5">
            Let Our Team Do the{' '}
            <span className="brand-text">Heavy Lifting</span>
          </h2>
          <p className="section-copy max-w-xl mx-auto mb-8">
            Templates are a start — but implementation is where results actually happen. Book a free strategy call and see how we apply these frameworks to your brand.
          </p>
          <a
            href="https://calendly.com/squadtechsolution/inquiry"
            target="_blank"
            rel="noreferrer"
            className="btn-primary px-8 py-3.5"
          >
            Book Free Strategy Call <FiArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
      <Footer />
    </div>
  )
}

function ResourceCard({ resource, index, requested, onRequest }) {
  const { ref, visible } = useScrollReveal()
  const rgb = resource.accentColor === '#e73103' ? '231,49,3' : '245,142,30'

  return (
    <article
      ref={ref}
      className={`rounded-2xl border border-white/10 overflow-hidden transition-all duration-700 flex flex-col ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 60}ms`, background: 'rgba(255,255,255,0.03)' }}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/06" style={{ background: `rgba(${rgb},0.05)` }}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <span className="text-3xl">{resource.icon}</span>
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ color: resource.accentColor, background: `rgba(${rgb},0.1)` }}
          >
            {resource.category}
          </span>
        </div>
        <h3 className="text-white font-bold text-lg mb-1">{resource.title}</h3>
        <p className="text-white/40 text-xs font-medium">{resource.subtitle}</p>
      </div>

      {/* Body */}
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
          <div
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80' }}
          >
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
