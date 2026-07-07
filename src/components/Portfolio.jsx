import { memo } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiExternalLink } from 'react-icons/fi'
import { SiBehance } from 'react-icons/si'
import { projects } from '../data/portfolio'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Portfolio() {
  const { ref, visible } = useScrollReveal()

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      <div className="w-full max-w-[78rem] mx-auto px-4">
        {/* Header */}
        <div
          ref={ref}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div>
            <p className="eyebrow mb-3">RECENT CASE STUDIES</p>
            <h2 className="section-title">
              Demonstrated{' '}
              <em className="not-italic brand-text">Engineering Milestones</em>
            </h2>
          </div>
          <Link to="/portfolio" className="btn-secondary shrink-0 px-5 py-2.5 text-sm">
            View All Work <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
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
        transitionDelay: `${index * 70}ms`,
        background: 'rgba(255,255,255,0.04)',
        borderColor: `rgba(${project.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.25)`,
        boxShadow: `0 0 18px rgba(${project.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.12)`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 8px 40px rgba(${project.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.3)`
        e.currentTarget.style.borderColor = `rgba(${project.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.5)`
        e.currentTarget.style.transform = 'translateY(-6px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = `0 0 18px rgba(${project.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.12)`
        e.currentTarget.style.borderColor = `rgba(${project.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.25)`
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.parentElement.style.background = 'rgba(231,49,3,0.08)'
            e.target.style.display = 'none'
          }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <div
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
          >
            <FiArrowRight className="w-5 h-5 text-white rotate-[-45deg]" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-1.5"
          style={{ color: project.accentColor }}
        >
          {project.category} · {project.client}
        </p>
        <h3 className="text-white font-semibold group-hover:text-white/80 transition-colors duration-200 mb-2">
          {project.title}
        </h3>
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
