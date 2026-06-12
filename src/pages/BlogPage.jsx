import { memo } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiClock, FiCalendar } from 'react-icons/fi'
import { posts } from '../data/blog'
import PageHero from '../components/PageHero'
import useScrollReveal from '../hooks/useScrollReveal'

export default function BlogPage() {
  return (
    <div>
      <PageHero
        eyebrow="Insights"
        title="Strategies, Case Studies &"
        titleAccent="Hard-Won Lessons"
        subtitle="Practical frameworks from the team behind 200+ delivered projects — published so ambitious brands can grow smarter."
        breadcrumbs={[{ label: 'Blog' }]}
      />

      {/* Featured post */}
      <section className="pb-16">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <FeaturedPost post={posts[0]} />
        </div>
      </section>

      {/* All posts */}
      <section className="pb-24" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4 pt-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-bold text-white">All Articles</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

const FeaturedPost = memo(function FeaturedPost({ post }) {
  const { ref, visible } = useScrollReveal()

  return (
    <Link
      to={`/blog/${post.slug}`}
      ref={ref}
      className={`group grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-700 block ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ background: 'rgba(255,255,255,0.04)' }}
    >
      {/* Image panel */}
      <div className="h-56 lg:h-auto relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.25)' }} />
        <div className="absolute top-5 left-5">
          <span
            className="px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/20"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
          >
            Featured · {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 md:p-10 flex flex-col justify-center">
        <div className="flex items-center gap-4 text-white/30 text-xs mb-4">
          <span className="flex items-center gap-1.5"><FiCalendar className="w-3 h-3" />{post.date}</span>
          <span className="flex items-center gap-1.5"><FiClock className="w-3 h-3" />{post.readTime}</span>
        </div>
        <h2 className="text-white font-bold text-xl md:text-2xl leading-snug mb-4 group-hover:text-white/80 transition-colors">
          {post.title}
        </h2>
        <p className="text-white/50 text-sm leading-relaxed mb-6">{post.excerpt}</p>
        <span
          className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
          style={{ color: post.accentColor }}
        >
          Read Article <FiArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
})

const BlogCard = memo(function BlogCard({ post, index }) {
  const { ref, visible } = useScrollReveal()

  return (
    <Link
      to={`/blog/${post.slug}`}
      ref={ref}
      className={`group card overflow-hidden block cursor-pointer transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="-mx-6 -mt-6 h-44 mb-5 relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
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

      <div className="flex items-center gap-4 mb-3 text-white/30 text-xs">
        <span className="flex items-center gap-1.5"><FiCalendar className="w-3 h-3" />{post.date}</span>
        <span className="flex items-center gap-1.5"><FiClock className="w-3 h-3" />{post.readTime}</span>
      </div>
      <h3 className="text-white font-semibold text-base leading-snug mb-3 group-hover:text-white/80 transition-colors">
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
