'use client'

import { memo, useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight, FiClock, FiCalendar, FiSearch, FiX, FiChevronRight, FiFeather } from 'react-icons/fi'
import { posts as staticPosts } from '../data/blog'
import { resolveAuthor, writersList } from '../data/authors'
import NewsletterCTA from '../components/NewsletterCTA'
import useScrollReveal from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

const CATEGORIES = ['All', 'Social Media', 'Web Development', 'Branding', 'SEO & PPC', 'Strategy', 'Media Production', 'Web Design']

const SORT_OPTIONS = [
  { label: 'Latest First', value: 'latest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Quickest Read', value: 'quickest' },
]

function parseMinutes(str) {
  const m = str.match(/(\d+)/)
  return m ? parseInt(m[1], 10) : 99
}

export default function BlogPage() {
  const [posts, setPosts] = useState(staticPosts)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('latest')
  const [visible, setVisible] = useState(10)
  const [stuck, setStuck] = useState(false)
  const sentinelRef = useRef(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { rootMargin: '-73px 0px 0px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    fetch('/api/blogs')
      .then((r) => r.json())
      .then((data) => {
        if (data.posts?.length) setPosts(data.posts.map((p) => ({ ...p, author: resolveAuthor(p) })))
      })
      .catch(() => { })
  }, [])

  useEffect(() => { setVisible(10) }, [query, activeCategory, sort])

  const categoryCounts = useMemo(() => {
    const counts = {}
    posts.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1 })
    return counts
  }, [posts])

  const filtered = useMemo(() => {
    let list = posts
    if (activeCategory !== 'All') list = list.filter((p) => p.category === activeCategory)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }
    if (sort === 'latest') return [...list].sort((a, b) => new Date(b.date) - new Date(a.date))
    if (sort === 'oldest') return [...list].sort((a, b) => new Date(a.date) - new Date(b.date))
    if (sort === 'quickest') return [...list].sort((a, b) => parseMinutes(a.readTime) - parseMinutes(b.readTime))
    return list
  }, [posts, activeCategory, query, sort])

  const featured = filtered[0]
  const grid = filtered.slice(1, visible)
  const hasMore = visible < filtered.length
  const isFiltering = activeCategory !== 'All' || query.trim()

  function clearAll() {
    setQuery('')
    setActiveCategory('All')
    setSort('latest')
  }

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="pt-36 pb-14 relative overflow-hidden">
        <div className="grid-overlay" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(231,49,3,0.08) 0%, transparent 70%)' }}
        />

        <div className="w-full max-w-[78rem] mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-6 font-medium">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span className="flex items-center gap-1.5">
              <FiChevronRight className="w-3 h-3" />
              <span className="text-white/60">Blog</span>
            </span>
          </nav>

          <p className="eyebrow mb-5">Insights</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
            Strategies, Case Studies &{' '}
            <span className="brand-text">Hard-Won Lessons</span>
          </h1>
          <p className="section-copy max-w-2xl text-lg mb-10">
            Practical frameworks from the team behind 200+ delivered projects — published so ambitious brands can grow smarter.
          </p>

          {/* Search */}
          <div className="relative max-w-xl group">
            <div
              className="absolute -inset-px rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(231,49,3,0.5), rgba(245,142,30,0.5))' }}
            />
            <div className="relative flex items-center rounded-full border border-white/10 group-focus-within:border-transparent transition-colors" style={{ background: '#0d0d0d' }}>
              <FiSearch className="ml-5 w-4 h-4 text-white/30 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, topics, categories…"
                className="w-full bg-transparent border-none px-4 py-3.5 text-sm text-white placeholder-white/25 outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="mr-4 p-1 rounded-full text-white/30 hover:text-white transition-colors flex-shrink-0"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter bar ───────────────────────────────────── */}
      <div ref={sentinelRef} />
      <section
        className="sticky top-[4.5rem] z-30 py-3 transition-all duration-300"
        style={
          stuck
            ? {
              background: 'rgba(6,6,6,0.88)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }
            : {
              background: 'transparent',
              borderBottom: '1px solid transparent',
            }
        }
      >
        <div className="w-full max-w-[78rem] mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1.5 px-0.5" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors duration-200"
                  style={
                    active
                      ? {
                        background: 'linear-gradient(135deg, #e73103, #f58e1e)',
                        color: '#fff',
                        fontWeight: 600,
                      }
                      : {
                        background: 'transparent',
                        color: 'rgba(255,255,255,0.45)',
                        fontWeight: 500,
                      }
                  }
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="hidden sm:block flex-shrink-0 text-sm font-medium border border-white/10 rounded-full px-4 py-2 outline-none text-white/60 cursor-pointer hover:border-white/20 transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} style={{ background: '#111', color: '#fff' }}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* ── Results meta ─────────────────────────────────── */}
      {isFiltering && (
        <div className="w-full max-w-[78rem] mx-auto px-4 pt-8 flex items-center gap-4 flex-wrap">
          <p className="text-white/40 text-sm">
            {filtered.length === 0
              ? 'No articles found'
              : <><span className="brand-text font-bold">{filtered.length}</span> article{filtered.length === 1 ? '' : 's'} found</>}
            {activeCategory !== 'All' && <> in <span className="text-white font-semibold">{activeCategory}</span></>}
            {query.trim() && <> for <span className="text-white font-semibold">"{query}"</span></>}
          </p>
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <FiX className="w-3 h-3" /> Clear filters
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState onClear={clearAll} />
      ) : (
        <div className="w-full max-w-[78rem] mx-auto px-4 pt-10 pb-24">
          {/* Featured — full width */}
          {featured && <FeaturedPost post={featured} />}

          {/* Latest articles + sticky sidebar */}
          <div className="flex gap-8 items-start mt-14">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {grid.length > 0 && (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-lg font-bold text-white whitespace-nowrap">
                      {isFiltering ? 'More Results' : 'Latest Articles'}
                    </h2>
                    <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(231,49,3,0.35), rgba(255,255,255,0.06))' }} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    {grid.map((post, i) => (
                      <BlogCard key={post.slug} post={post} index={i} />
                    ))}
                  </div>
                </>
              )}

              {hasMore && (
                <div className="text-center mt-14">
                  <button onClick={() => setVisible((v) => v + 9)} className="btn-secondary px-8 py-3 text-sm">
                    Load More Articles
                    <span
                      className="text-[10px] leading-none px-2 py-1 rounded-full font-bold"
                      style={{ background: 'rgba(231,49,3,0.15)', color: '#f58e1e' }}
                    >
                      {filtered.length - visible} more
                    </span>
                  </button>
                </div>
              )}

              {/* Compact banner — only where the sidebar is hidden */}
              <div className="xl:hidden">
                <WriteForUsBanner />
              </div>
            </div>

            {/* Sticky Writer Program sidebar */}
            <WriterSidebar />
          </div>
        </div>
      )}
      <Footer />
    </div>

  )
}

function WriterSidebar() {
  return (
    <aside
      className="hidden xl:block w-80 flex-shrink-0 space-y-5"
      style={{ position: 'sticky', top: '9rem', alignSelf: 'flex-start' }}
    >
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: 'rgba(231,49,3,0.2)', background: 'rgba(255,255,255,0.02)' }}
      >
        {/* Gradient top accent */}
        <div className="h-1" style={{ background: 'linear-gradient(90deg, #e73103, #f58e1e)' }} />

        <div className="p-6">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
            style={{ background: 'rgba(231,49,3,0.1)', border: '1px solid rgba(231,49,3,0.2)' }}
          >
            <FiFeather className="w-5 h-5" style={{ color: '#f58e1e' }} />
          </div>

          <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-2">Writer Program</p>
          <h3 className="text-white font-bold text-lg leading-snug mb-3">
            Write Here. Get a{' '}
            <span className="brand-text">Free Portfolio.</span>
          </h3>
          <p className="text-white/45 text-sm leading-relaxed mb-6">
            We design, build, and host your professional writer portfolio — in exchange for great articles.
          </p>

          {/* Steps */}
          <div className="space-y-3 mb-6">
            {[
              'Publish 3 approved articles',
              'We build your portfolio page — free',
              '1 article every 45 days keeps it live',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(231,49,3,0.12)', color: '#f58e1e', border: '1px solid rgba(231,49,3,0.25)' }}
                >
                  {i + 1}
                </span>
                <p className="text-white/55 text-xs leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* Contributors */}
          <div className="flex items-center gap-3 mb-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center">
              {writersList.filter((w) => !w.isTeam).map((w, i) => (
                <div
                  key={w.slug}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[10px] border-2"
                  style={{ background: w.gradient, borderColor: '#0a0a0a', marginLeft: i === 0 ? 0 : '-8px' }}
                >
                  {w.initials}
                </div>
              ))}
            </div>
            <p className="text-white/35 text-xs">Writers already publishing here</p>
          </div>

          <Link href="/write-for-us" className="btn-primary w-full py-3 text-sm">
            Join the Program <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterCTA variant="card" />
    </aside>
  )
}

function WriteForUsBanner() {
  const { ref, visible } = useScrollReveal()
  return (
    <Link
      href="/write-for-us"
      ref={ref}
      className={`group mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl px-6 py-5 border transition-all duration-500 hover:-translate-y-0.5 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{
        borderColor: 'rgba(231,49,3,0.25)',
        borderLeft: '3px solid #e73103',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      {/* Writer avatars */}
      <div className="flex items-center flex-shrink-0">
        {writersList.filter((w) => !w.isTeam).map((w, i) => (
          <div
            key={w.slug}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs border-2"
            style={{ background: w.gradient, borderColor: '#0a0a0a', marginLeft: i === 0 ? 0 : '-10px' }}
          >
            {w.initials}
          </div>
        ))}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center border-2"
          style={{ background: 'rgba(231,49,3,0.12)', borderColor: '#0a0a0a', marginLeft: '-10px' }}
        >
          <FiFeather className="w-4 h-4" style={{ color: '#f58e1e' }} />
        </div>
      </div>

      <p className="text-sm leading-relaxed flex-1">
        <span className="text-white font-semibold">Are you a writer?</span>{' '}
        <span className="text-white/45">
          Publish 3 articles here and get a free professionally designed portfolio page — built and hosted by our team.
        </span>
      </p>

      <span
        className="inline-flex items-center gap-2 text-sm font-semibold flex-shrink-0 group-hover:gap-3 transition-all duration-300"
        style={{ color: '#f58e1e' }}
      >
        Join the Writer Program <FiArrowRight className="w-4 h-4" />
      </span>
    </Link>
  )
}

function EmptyState({ onClear }) {
  return (
    <div className="w-full max-w-[78rem] mx-auto px-4 py-28 text-center">
      <div
        className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
        style={{ background: 'rgba(231,49,3,0.1)', border: '1px solid rgba(231,49,3,0.2)' }}
      >
        <FiSearch className="w-7 h-7" style={{ color: '#e73103' }} />
      </div>
      <h3 className="text-white font-bold text-xl mb-2">No articles found</h3>
      <p className="text-white/40 text-sm mb-8">Try a different search term or browse another category.</p>
      <button onClick={onClear} className="btn-primary px-7 py-3 text-sm">
        Clear All Filters
      </button>
    </div>
  )
}

const FeaturedPost = memo(function FeaturedPost({ post }) {
  const { ref, visible } = useScrollReveal()

  return (
    <Link
      href={`/blogs/${post.slug}`}
      ref={ref}
      className={`group relative grid lg:grid-cols-[1.05fr_0.95fr] gap-0 rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-700 block ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      {/* Brand glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 80px rgba(231,49,3,0.06)' }}
      />

      {/* Image */}
      <div className="h-64 lg:h-auto relative overflow-hidden" style={{ minHeight: '300px' }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 100%)' }} />
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <span
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white tracking-wide"
            style={{ background: 'linear-gradient(135deg, #e73103, #f58e1e)', boxShadow: '0 8px 24px rgba(231,49,3,0.4)' }}
          >
            ★ Featured
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 lg:p-12 flex flex-col justify-center relative">
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(231,49,3,0.12)', color: '#f58e1e', border: '1px solid rgba(231,49,3,0.25)' }}
          >
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-white/30 text-xs"><FiCalendar className="w-3 h-3" />{post.date}</span>
          <span className="flex items-center gap-1.5 text-white/30 text-xs"><FiClock className="w-3 h-3" />{post.readTime}</span>
        </div>
        {post.author && (
          <div className="flex items-center gap-2.5 mb-5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0"
              style={{ background: post.author.gradient }}
            >
              {post.author.initials}
            </div>
            <span className="text-white/50 text-xs font-medium">By {post.author.name}</span>
          </div>
        )}
        <h2 className="text-white font-bold text-2xl lg:text-3xl leading-snug mb-4 group-hover:text-white/85 transition-colors">
          {post.title}
        </h2>
        <p className="text-white/50 text-sm lg:text-base leading-relaxed mb-8">{post.excerpt}</p>
        <span className="btn-primary px-6 py-3 text-sm self-start">
          Read Article <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
})

const BlogCard = memo(function BlogCard({ post, index }) {
  const { ref, visible } = useScrollReveal()

  return (
    <Link
      href={`/blogs/${post.slug}`}
      ref={ref}
      className={`group card flex flex-col overflow-hidden !p-0 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      {/* Image */}
      <div className="h-48 relative overflow-hidden flex-shrink-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 40%, rgba(5,5,5,0.85) 100%)' }} />
        <div className="absolute bottom-3.5 left-5">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(231,49,3,0.15)', color: '#f58e1e', border: '1px solid rgba(231,49,3,0.3)', backdropFilter: 'blur(8px)' }}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 mb-3 text-white/30 text-xs">
          <span className="flex items-center gap-1.5"><FiCalendar className="w-3 h-3" />{post.date}</span>
          <span className="flex items-center gap-1.5"><FiClock className="w-3 h-3" />{post.readTime}</span>
        </div>
        <h3 className="text-white font-semibold text-base leading-snug mb-3 group-hover:text-white/80 transition-colors">
          {post.title}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed flex-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {post.author && (
            <span className="flex items-center gap-2 min-w-0">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[9px] flex-shrink-0"
                style={{ background: post.author.gradient }}
              >
                {post.author.initials}
              </span>
              <span className="text-white/40 text-xs truncate">{post.author.name}</span>
            </span>
          )}
          <span
            className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300 flex-shrink-0"
            style={{ color: post.accentColor || '#e73103' }}
          >
            Read More <FiArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
})
