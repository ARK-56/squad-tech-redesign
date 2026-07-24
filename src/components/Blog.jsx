'use client'

import { memo, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight, FiClock, FiCalendar } from 'react-icons/fi'
import { posts as staticPosts } from '../data/blog'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Blog() {
  const [posts, setPosts] = useState(staticPosts)
  const { ref, visible } = useScrollReveal()

  useEffect(() => {
    fetch('/api/blogs')
      .then((r) => r.json())
      .then((data) => { if (data.posts?.length) setPosts(data.posts) })
      .catch(() => {})
  }, [])

  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      <div className="w-full max-w-[78rem] mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div
            ref={ref}
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <p className="eyebrow mb-3">Blogs</p>
            <h2 className="section-title">
              Latest Insights &{' '}
              <span className="brand-text">Case Studies</span>
            </h2>
          </div>
          <Link href="/blogs" className="btn-secondary shrink-0 px-5 py-2.5 text-sm">
            View All Posts <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {posts.slice(0, 3).map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

const BlogCard = memo(function BlogCard({ post, index }) {
  const { ref, visible } = useScrollReveal()

  return (
    <Link
      href={`/blogs/${post.slug}`}
      ref={ref}
      className={`group card overflow-hidden cursor-pointer transition-all duration-700 block ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image header */}
      <div className="-mx-6 -mt-6 h-44 mb-5 relative overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.2)' }} />
        <div className="absolute bottom-4 left-6">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/20"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 mb-3 text-white/30 text-xs">
        <span className="flex items-center gap-1.5"><FiCalendar className="w-3 h-3" />{post.date}</span>
        <span className="flex items-center gap-1.5"><FiClock className="w-3 h-3" />{post.readTime}</span>
      </div>

      <h3 className="text-white font-semibold text-base leading-snug mb-3 group-hover:text-white/80 transition-colors duration-200">
        {post.title}
      </h3>
      <p className="text-white/40 text-sm leading-relaxed mb-5">{post.excerpt}</p>

      <span
        className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
        style={{ color: post.accentColor }}
      >
        Read More <FiArrowRight className="w-4 h-4" />
      </span>
    </Link>
  )
})
