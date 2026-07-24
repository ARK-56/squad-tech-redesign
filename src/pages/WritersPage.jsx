'use client'

import { memo, useMemo } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiFeather, FiMapPin } from 'react-icons/fi'
import PageHero from '../components/PageHero'
import { writersList } from '../data/authors'
import { posts } from '../data/blog'
import useScrollReveal from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

export default function WritersPage() {
  const counts = useMemo(() => {
    const c = {}
    posts.forEach((p) => {
      if (p.author?.slug) c[p.author.slug] = (c[p.author.slug] || 0) + 1
    })
    return c
  }, [])

  return (
    <div>
      <PageHero
        eyebrow="Contributors"
        title="The Writers Behind"
        titleAccent="The Insights"
        subtitle="Our in-house team and contributing writers — every article on this blog carries a real byline from a real practitioner."
        breadcrumbs={[{ label: 'Writers' }]}
      />

      <section className="pb-24">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {writersList.map((writer, i) => (
              <WriterCard key={writer.slug} writer={writer} count={counts[writer.slug] || 0} index={i} />
            ))}
            <JoinCard />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

const WriterCard = memo(function WriterCard({ writer, count, index }) {
  const { ref, visible } = useScrollReveal()
  return (
    <Link
      href={`/writers/${writer.slug}`}
      ref={ref}
      className={`group card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ background: writer.gradient }}
        >
          {writer.initials}
        </div>
        <div className="min-w-0">
          <h3 className="text-white font-semibold text-sm">{writer.name}</h3>
          <p className="text-white/40 text-xs mt-0.5 truncate">{writer.role}</p>
        </div>
      </div>
      <p className="text-white/50 text-sm leading-relaxed mb-5" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {writer.bio}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {writer.expertise.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
            style={{ background: 'rgba(231,49,3,0.1)', color: '#f58e1e', border: '1px solid rgba(231,49,3,0.2)' }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="flex items-center gap-1.5 text-white/35 text-xs">
          <FiMapPin className="w-3 h-3" />{writer.location} · {count} article{count === 1 ? '' : 's'}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all" style={{ color: '#e73103' }}>
          Portfolio <FiArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  )
})

function JoinCard() {
  const { ref, visible } = useScrollReveal()
  return (
    <Link
      href="/write-for-us"
      ref={ref}
      className={`group rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-700 hover:-translate-y-0.5 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ border: '2px dashed rgba(231,49,3,0.35)', background: 'rgba(231,49,3,0.03)', minHeight: '220px' }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
        style={{ background: 'rgba(231,49,3,0.12)', border: '1px solid rgba(231,49,3,0.25)' }}
      >
        <FiFeather className="w-6 h-6" style={{ color: '#f58e1e' }} />
      </div>
      <h3 className="text-white font-semibold text-sm mb-1.5">Become a Contributor</h3>
      <p className="text-white/40 text-xs leading-relaxed mb-3">
        Publish 3 articles, get a free professional portfolio page.
      </p>
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all" style={{ color: '#f58e1e' }}>
        Join the Writer Program <FiArrowRight className="w-3.5 h-3.5" />
      </span>
    </Link>
  )
}
