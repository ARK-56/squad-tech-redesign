'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, redirect } from 'next/navigation'
import { FiArrowRight, FiClock, FiCalendar, FiArrowLeft } from 'react-icons/fi'
import { posts as staticPosts, resolvePostResources } from '../data/blog'
import { resolveAuthor } from '../data/authors'
import { resources as allResources } from '../data/resources'
import { FiDownload } from 'react-icons/fi'
import NewsletterCTA from '../components/NewsletterCTA'
import useScrollReveal from '../hooks/useScrollReveal'

export default function BlogPost() {
  const { slug } = useParams()
  const [posts, setPosts] = useState(staticPosts)
  const [cmsLoaded, setCmsLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/blogs')
      .then((r) => r.json())
      .then((data) => {
        if (data.posts?.length) setPosts(data.posts.map((p) => ({ ...p, author: resolveAuthor(p), resources: resolvePostResources(p) })))
      })
      .catch(() => {})
      .finally(() => setCmsLoaded(true))
  }, [])

  const post = posts.find((p) => p.slug === slug)

  // Don't redirect until the CMS overlay has had a chance to load —
  // a post added via the admin panel may not be in the static bundle.
  if (!post && !cmsLoaded) return null
  if (!post) redirect('/blogs')

  const related = posts.filter((p) => p.slug !== slug).slice(0, 2)
  const freeResources = (post.resources || [])
    .map((rSlug) => allResources.find((r) => r.slug === rSlug))
    .filter(Boolean)

  const postImage = post.image?.startsWith('http') ? post.image : `https://squadtechsol.com${post.image}`
  const postDate = isNaN(new Date(post.date)) ? post.date : new Date(post.date).toISOString().slice(0, 10)

  return (
    <div>
      {/* Hero */}
      <section className="pt-36 pb-16 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse, rgba(${post.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.07), transparent 65%)` }}
        />
        <div className="w-full max-w-[56rem] mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-8 font-medium">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link href="/blogs" className="hover:text-white/60 transition-colors">Blog</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/60 truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="px-3 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                color: post.accentColor,
                background: `rgba(${post.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.1)`,
                borderColor: `rgba(${post.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.2)`,
              }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-white/30 text-xs">
              <FiCalendar className="w-3 h-3" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-white/30 text-xs">
              <FiClock className="w-3 h-3" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-7">{post.excerpt}</p>

          {/* Byline */}
          {post.author && (
            <Link href={`/writers/${post.author.slug}`} className="group inline-flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: post.author.gradient }}
              >
                {post.author.initials}
              </div>
              <div>
                <p className="text-white text-sm font-semibold group-hover:text-white/80 transition-colors">
                  {post.author.name}
                </p>
                <p className="text-white/35 text-xs">{post.author.role}</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Featured image */}
      <div className="w-full max-w-[56rem] mx-auto px-4 pb-4">
        <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ aspectRatio: '16/7' }}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Divider banner */}
      <div className="w-full h-1" style={{ background: `linear-gradient(90deg, ${post.accentColor}, #f58e1e, transparent)` }} />

      {/* Body */}
      <section className="py-16">
        <div className="w-full max-w-[56rem] mx-auto px-4">
          <article className="prose-custom">
            {post.body.map((block, i) => {
              if (block.type === 'h2') {
                return (
                  <h2
                    key={i}
                    className="text-xl md:text-2xl font-bold text-white mt-10 mb-4 first:mt-0"
                  >
                    {block.content}
                  </h2>
                )
              }
              return (
                <p
                  key={i}
                  className="text-white/65 leading-relaxed mb-5 text-base md:text-[1.05rem]"
                >
                  {block.content}
                </p>
              )
            })}
          </article>

          {/* Free resources */}
          {freeResources.length > 0 && (
            <div
              className="mt-14 rounded-2xl border overflow-hidden"
              style={{ borderColor: 'rgba(231,49,3,0.2)', background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="h-1" style={{ background: 'linear-gradient(90deg, #e73103, #f58e1e)' }} />
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <FiDownload className="w-4 h-4" style={{ color: '#f58e1e' }} />
                  <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">Free Downloads</p>
                </div>
                <h3 className="text-white font-bold text-lg mb-6">
                  Put This Article Into Practice{' '}
                  <span className="brand-text">— Free Tools</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {freeResources.map((res) => (
                    <Link
                      key={res.slug}
                      href={`/resources?r=${res.slug}`}
                      className="group flex items-start gap-4 rounded-xl border border-white/08 hover:border-white/20 p-4 transition-all duration-300"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ background: 'rgba(231,49,3,0.1)', border: '1px solid rgba(231,49,3,0.2)' }}
                      >
                        {res.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-sm font-semibold leading-snug group-hover:text-white/80 transition-colors">
                          {res.title}
                        </p>
                        <p className="text-white/35 text-xs mt-1">
                          {res.format} · {res.pages} · {res.downloadCount} downloads
                        </p>
                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-semibold mt-2.5 group-hover:gap-2.5 transition-all duration-300"
                          style={{ color: '#f58e1e' }}
                        >
                          Get It Free <FiArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Author */}
          {post.author && (
            <div
              className="mt-12 p-6 rounded-2xl border border-white/10"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <div className="flex items-start gap-5 flex-wrap sm:flex-nowrap">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl"
                  style={{ background: post.author.gradient }}
                >
                  {post.author.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Written by</p>
                  <p className="text-white font-semibold text-sm">{post.author.name}</p>
                  <p className="text-white/40 text-xs mt-1.5 leading-relaxed">{post.author.bio}</p>
                </div>
                <Link
                  href={`/writers/${post.author.slug}`}
                  className="btn-secondary px-4 py-2 text-xs flex-shrink-0 self-center"
                >
                  View Portfolio <FiArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Newsletter */}
          <div className="mt-8">
            <NewsletterCTA variant="strip" />
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-full max-w-[78rem] mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">Related Articles</h2>
              <Link href="/blogs" className="btn-secondary px-4 py-2 text-xs">
                All Posts <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {related.map((p) => (
                <RelatedCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4 text-center">
          <p className="eyebrow mb-4">Work With Us</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Rather have experts handle it?{' '}
            <span className="brand-text">We'll do it for you.</span>
          </h2>
          <p className="section-copy max-w-md mx-auto mb-8">
            We run these strategies for 200+ brands — and you see the work before you pay.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://calendly.com/squadtechsolution/inquiry"
              target="_blank"
              rel="noreferrer"
              className="btn-primary px-8 py-3"
            >
              Book Free Call <FiArrowRight className="w-4 h-4" />
            </a>
            <Link href="/blogs" className="btn-secondary px-8 py-3">
              <FiArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function RelatedCard({ post }) {
  const { ref, visible } = useScrollReveal()

  return (
    <Link
      href={`/blogs/${post.slug}`}
      ref={ref}
      className={`group card block overflow-hidden transition-all duration-700 hover:border-white/20 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex items-center gap-3 mb-3 text-white/30 text-xs">
        <span
          className="px-2.5 py-1 rounded-full text-xs font-semibold border"
          style={{
            color: post.accentColor,
            background: `rgba(${post.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.08)`,
            borderColor: `rgba(${post.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.15)`,
          }}
        >
          {post.category}
        </span>
        <span className="flex items-center gap-1"><FiClock className="w-3 h-3" /> {post.readTime}</span>
      </div>
      <h3 className="text-white font-semibold text-sm leading-snug mb-3 group-hover:text-white/80 transition-colors">
        {post.title}
      </h3>
      <p className="text-white/40 text-xs leading-relaxed mb-4">{post.excerpt}</p>
      <span
        className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all"
        style={{ color: post.accentColor }}
      >
        Read Article <FiArrowRight className="w-3.5 h-3.5" />
      </span>
    </Link>
  )
}
