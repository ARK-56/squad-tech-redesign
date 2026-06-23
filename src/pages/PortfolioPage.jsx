import { useState, memo } from 'react'
import { FiArrowRight, FiExternalLink } from 'react-icons/fi'
import { SiBehance } from 'react-icons/si'
import { projects, categories } from '../data/portfolio'
import PageHero from '../components/PageHero'
import useScrollReveal from '../hooks/useScrollReveal'

export default function PortfolioPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <div>
      <PageHero
        eyebrow="Our Work"
        title="Real Results for"
        titleAccent="Real Brands"
        subtitle="From social campaigns to web platforms and brand identities — every project is engineered to deliver measurable outcomes."
        breadcrumbs={[{ label: 'Portfolio' }]}
      />

      {/* Filter tabs */}
      <section className="pb-24">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  active === cat
                    ? 'text-white border-transparent'
                    : 'text-white/50 border-white/10 hover:text-white hover:border-white/20'
                }`}
                style={active === cat ? { background: 'linear-gradient(135deg, #e73103, #f58e1e)', borderColor: 'transparent' } : { background: 'rgba(255,255,255,0.04)' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-16" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '200+', label: 'Projects Delivered' },
              { value: '67+', label: 'Clients Served' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '10M+', label: 'Impressions Generated' },
            ].map((stat, i) => (
              <div key={i}>
                <p
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{ color: i % 2 === 0 ? '#e73103' : '#f58e1e' }}
                >
                  {stat.value}
                </p>
                <p className="text-white/40 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

const ProjectCard = memo(function ProjectCard({ project, index }) {
  const { ref, visible } = useScrollReveal()

  return (
    <article
      ref={ref}
      className={`group rounded-2xl overflow-hidden border transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 60}ms`,
        background: 'rgba(255,255,255,0.04)',
        borderColor: `rgba(${project.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.25)`,
        boxShadow: `0 0 18px rgba(${project.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.12)`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 0 32px rgba(${project.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.28)`
        e.currentTarget.style.borderColor = `rgba(${project.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.5)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = `0 0 18px rgba(${project.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.12)`
        e.currentTarget.style.borderColor = `rgba(${project.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.25)`
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.parentElement.style.background = 'rgba(231,49,3,0.06)'
            e.target.style.display = 'none'
          }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}
        />
        {/* Hover results overlay */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="flex flex-wrap gap-1.5">
            {project.results.map((r) => (
              <span
                key={r}
                className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-1"
              style={{ color: project.accentColor }}
            >
              {project.category} · {project.client}
            </p>
            <h3 className="text-white font-semibold group-hover:text-white/80 transition-colors duration-200">
              {project.title}
            </h3>
          </div>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `rgba(${project.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.12)` }}
          >
            <FiArrowRight
              className="w-4 h-4 rotate-[-45deg]"
              style={{ color: project.accentColor }}
            />
          </div>
        </div>
        <p className="text-white/40 text-xs leading-relaxed mb-4">{project.description}</p>

        {project.behanceUrl && (
          <a
            href={project.behanceUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 hover:border-white/25 text-white/50 hover:text-white transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <SiBehance className="w-3.5 h-3.5" />
            View on Behance
            <FiExternalLink className="w-3 h-3 opacity-60" />
          </a>
        )}
      </div>
    </article>
  )
})
