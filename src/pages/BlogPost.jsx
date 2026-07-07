import { useParams, Link, Navigate } from 'react-router-dom'
import { FiArrowRight, FiClock, FiCalendar, FiArrowLeft } from 'react-icons/fi'
import { posts } from '../data/blog'
import useScrollReveal from '../hooks/useScrollReveal'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/blogs" replace />

  const related = posts.filter((p) => p.slug !== slug).slice(0, 2)

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
            <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link to="/blogs" className="hover:text-white/60 transition-colors">Blog</Link>
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
          <p className="text-white/60 text-lg leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      {/* Featured image */}
      <div className="w-full max-w-[56rem] mx-auto px-4 pb-4">
        <div className="rounded-2xl overflow-hidden border border-white/10" style={{ aspectRatio: '16/7' }}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
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

          {/* Author */}
          <div
            className="mt-12 p-6 rounded-2xl flex items-center gap-5 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl"
              style={{ background: 'linear-gradient(135deg, #e73103, #f58e1e)' }}
            >
              S
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Squadtech Editorial</p>
              <p className="text-white/40 text-xs mt-0.5">
                Insights from the team at Squad Tech Solution — 30+ specialists across growth, engineering, design & media.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-full max-w-[78rem] mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">Related Articles</h2>
              <Link to="/blogs" className="btn-secondary px-4 py-2 text-xs">
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
            Ready to put this into practice?{' '}
            <span className="brand-text">Let's talk.</span>
          </h2>
          <p className="section-copy max-w-md mx-auto mb-8">
            Book a free discovery call and we'll build a custom strategy for your brand — before you commit to anything.
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
            <Link to="/blogs" className="btn-secondary px-8 py-3">
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
      to={`/blogs/${post.slug}`}
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
