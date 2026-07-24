'use client'

import { memo, useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, redirect } from 'next/navigation'
import { FiArrowRight, FiClock, FiCalendar, FiMapPin, FiLinkedin, FiFeather, FiCheckCircle } from 'react-icons/fi'
import { authors } from '../data/authors'
import { posts as staticPosts } from '../data/blog'
import { resolveAuthor } from '../data/authors'
import useScrollReveal from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

export default function WriterPage() {
  const { slug } = useParams()
  const [posts, setPosts] = useState(staticPosts)
  const author = authors[slug]

  useEffect(() => {
    fetch('/api/blogs')
      .then((r) => r.json())
      .then((data) => {
        if (data.posts?.length) setPosts(data.posts.map((p) => ({ ...p, author: resolveAuthor(p) })))
      })
      .catch(() => { })
  }, [])

  const articles = useMemo(
    () => posts.filter((p) => p.author?.slug === slug),
    [posts, slug]
  )

  if (!author) redirect('/blogs')

  const categories = [...new Set(articles.map((a) => a.category))]
  const totalMinutes = articles.reduce((sum, a) => {
    const m = a.readTime.match(/(\d+)/)
    return sum + (m ? parseInt(m[1], 10) : 0)
  }, 0)

  const stats = [
    { value: String(articles.length), label: 'Published Articles' },
    { value: String(categories.length), label: 'Topics Covered' },
    { value: `${totalMinutes} min`, label: 'Of Reading' },
  ]

  return (
    <div>
      {author.template === 'editorial'
        ? <EditorialHero author={author} stats={stats} />
        : <SpotlightHero author={author} stats={stats} />}

      {/* Articles */}
      <section className="pb-24">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-lg font-bold text-white whitespace-nowrap">
              Articles by {author.isTeam ? 'the Team' : author.name.split(' ')[0]}
            </h2>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(231,49,3,0.35), rgba(255,255,255,0.06))' }} />
          </div>

          {articles.length === 0 ? (
            <p className="text-white/40 text-sm py-10">No published articles yet — first pieces are in review.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((post, i) => (
                <ArticleCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Powered-by credit */}
      <section className="py-14" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4 text-center">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">
            This portfolio is powered by
          </p>
          <Link href="/" className="inline-flex items-center gap-2 text-white font-bold text-lg hover:opacity-80 transition-opacity">
            Squad<span className="brand-text">Tech</span> Solution
          </Link>
          <p className="text-white/40 text-sm mt-3 max-w-md mx-auto">
            Professionally designed writer portfolios, hosted free — in exchange for great content.
          </p>
          <Link href="/write-for-us" className="btn-secondary px-6 py-2.5 text-sm mt-6">
            <FiFeather className="w-4 h-4" /> Get Your Own Writer Portfolio
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}

/* ── Template A: Spotlight — centered hero ─────────────── */
function SpotlightHero({ author, stats }) {
  return (
    <section className="pt-36 pb-16 relative overflow-hidden">
      <div className="grid-overlay" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(231,49,3,0.09) 0%, transparent 70%)' }}
      />
      <div className="w-full max-w-[78rem] mx-auto px-4 relative z-10 text-center">
        <div className="mb-6">
          <Avatar author={author} size="lg" />
        </div>
        <p className="eyebrow mb-4">{author.role}</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">{author.name}</h1>
        <p className="section-copy max-w-xl mx-auto mb-6">{author.bio}</p>

        <MetaRow author={author} className="justify-center mb-8" />
        <ExpertiseChips author={author} className="justify-center mb-10" />
        <StatsRow stats={stats} className="max-w-2xl mx-auto" />
      </div>
    </section>
  )
}

/* ── Template B: Editorial — left-aligned two-column ───── */
function EditorialHero({ author, stats }) {
  return (
    <section className="pt-36 pb-16 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,142,30,0.08) 0%, transparent 70%)' }}
      />
      <div className="w-full max-w-[78rem] mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div>
            <div className="flex items-center gap-5 mb-7">
              <Avatar author={author} size="md" />
              <div>
                <p className="eyebrow mb-2">{author.role}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{author.name}</h1>
              </div>
            </div>
            <p className="section-copy mb-6">{author.bio}</p>
            <MetaRow author={author} className="mb-6" />
            <ExpertiseChips author={author} />
          </div>
          <StatsRow stats={stats} vertical />
        </div>
      </div>
    </section>
  )
}

/* ── Shared pieces ─────────────────────────────────────── */
function Avatar({ author, size = 'md', className = '' }) {
  const dims = size === 'lg' ? 'w-24 h-24 text-3xl' : 'w-20 h-20 text-2xl'
  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className="absolute -inset-1 rounded-full opacity-60"
        style={{ background: author.gradient, filter: 'blur(10px)' }}
      />
      <div
        className={`relative ${dims} rounded-full flex items-center justify-center text-white font-bold border-2 border-white/15`}
        style={{ background: author.gradient }}
      >
        {author.initials}
      </div>
    </div>
  )
}

function MetaRow({ author, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 text-white/40 text-sm ${className}`}>
      <span className="flex items-center gap-1.5"><FiMapPin className="w-3.5 h-3.5" />{author.location}</span>
      <span className="flex items-center gap-1.5"><FiCheckCircle className="w-3.5 h-3.5 text-green-400" />Contributor since {author.joined}</span>
      {author.links?.linkedin && (
        <a
          href={author.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 hover:text-white/70 transition-colors"
        >
          <FiLinkedin className="w-3.5 h-3.5" />LinkedIn
        </a>
      )}
    </div>
  )
}

function ExpertiseChips({ author, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {author.expertise.map((tag) => (
        <span
          key={tag}
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(231,49,3,0.1)', color: '#f58e1e', border: '1px solid rgba(231,49,3,0.22)' }}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

function StatsRow({ stats, vertical = false, className = '' }) {
  return (
    <div className={`grid ${vertical ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-4'} ${className}`}>
      {stats.map((s) => (
        <div key={s.label} className="card text-center py-6">
          <p className="text-2xl md:text-3xl font-bold brand-text mb-1">{s.value}</p>
          <p className="text-white/40 text-xs uppercase tracking-wider">{s.label}</p>
        </div>
      ))}
    </div>
  )
}

const ArticleCard = memo(function ArticleCard({ post, index }) {
  const { ref, visible } = useScrollReveal()

  return (
    <Link
      href={`/blogs/${post.slug}`}
      ref={ref}
      className={`group card flex flex-col overflow-hidden !p-0 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      <div className="h-44 relative overflow-hidden flex-shrink-0">
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
        <span
          className="inline-flex items-center gap-2 text-sm font-semibold mt-6 group-hover:gap-3 transition-all duration-300"
          style={{ color: post.accentColor || '#e73103' }}
        >
          Read Article <FiArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
})
