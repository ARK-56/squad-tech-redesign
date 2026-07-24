'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, redirect } from 'next/navigation'
import { FiArrowRight, FiArrowLeft, FiExternalLink, FiEye, FiX, FiImage } from 'react-icons/fi'
import { projects } from '../data/portfolio'
import { caseStudies } from '../data/caseStudies'
import useScrollReveal from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

// Utility to ensure clean image URLs from public directory
const normalizeImagePath = (src) => {
  if (!src) return ''
  let path = typeof src === 'string' ? src : src.image || ''

  // Clean up relative/public folder references
  path = path.replace(/^public\//, '/').replace(/^\.\//, '/')
  if (!path.startsWith('/') && !path.startsWith('http://') && !path.startsWith('https://')) {
    path = '/' + path
  }
  return path
}

export default function CaseStudyPage() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  const study = caseStudies[slug]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [failedImages, setFailedImages] = useState({})

  const handleImageError = (index) => {
    setFailedImages((prev) => ({ ...prev, [index]: true }))
  }

  // Extract images safely from portfolioImages or images array
  const displayImages = useMemo(() => {
    if (!study) return []

    let rawList = []
    if (study.portfolioImages && Array.isArray(study.portfolioImages) && study.portfolioImages.length > 0) {
      rawList = study.portfolioImages
    } else if (study.images && Array.isArray(study.images) && study.images.length > 0) {
      rawList = study.images
    }

    if (rawList.length === 0) return []

    // Normalize paths
    const normalized = rawList.map(normalizeImagePath).filter(Boolean)

    // Return randomized order of images when modal is triggered/loaded
    return [...normalized]
  }, [study, isModalOpen])

  if (!project) redirect('/portfolio')

  const rgb = project.accentColor === '#e73103' ? '231,49,3' : '245,142,30'
  const nextProject = study?.nextProject ? projects.find((p) => p.slug === study.nextProject) : null
  const heroImgSrc = normalizeImagePath(project.image)

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-0 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${rgb},0.1) 0%, transparent 65%)` }}
        />
        <div className="w-full max-w-[78rem] mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-8 font-medium">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:text-white/60 transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-white/60">{project.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-end mb-14">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border"
                style={{ color: project.accentColor, background: `rgba(${rgb},0.08)`, borderColor: `rgba(${rgb},0.2)` }}
              >
                {project.category}
                {study?.industry && <><span className="opacity-40">·</span>{study.industry}</>}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                {project.title}
              </h1>
              <p className="text-white/50 text-lg leading-relaxed mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-white/50"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {study && (
                  <div className="flex gap-4 text-sm text-white/40">
                    <span><strong className="text-white/60">Client</strong> · {project.client}</span>
                    {study.duration && <span><strong className="text-white/60">Duration</strong> · {study.duration}</span>}
                    {study.service && <span><strong className="text-white/60">Service</strong> · {study.service}</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 gap-3">
              {(study?.metrics || project.results.map((r) => ({ value: r, label: '' }))).map((m, i) => (
                <MetricCard key={i} metric={m} accentColor={project.accentColor} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Hero Cover Image & Pulse View Button */}
        <div
          className="w-full relative group cursor-pointer overflow-hidden max-h-[520px]"
          onClick={() => setIsModalOpen(true)}
        >
          {heroImgSrc ? (
            <Image
              src={heroImgSrc}
              alt={project.title}
              width={1600}
              height={900}
              unoptimized
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] max-h-[520px] object-top"
            />
          ) : (
            <div className="w-full h-[350px] bg-white/5 flex items-center justify-center border border-white/10">
              <FiImage className="w-12 h-12 text-white/20" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/0" />

          {/* Glass View Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <div
                className="absolute w-16 h-16 rounded-full animate-ping opacity-50"
                style={{ background: `rgba(${rgb}, 0.5)` }}
              />
              <button
                className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border shadow-xl transition-all duration-300 hover:bg-white/20"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  color: '#ffffff'
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsModalOpen(true)
                }}
              >
                <FiEye className="w-6 h-6 transition-colors duration-300" style={{ color: project.accentColor }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      {study ? (
        <section className="py-24">
          <div className="w-full max-w-[78rem] mx-auto px-4">
            <div className="grid lg:grid-cols-[1fr_340px] gap-16">
              <div className="space-y-16">
                <ContentBlock title="Overview" body={study.overview} />
                <ContentBlock title="The Challenge" body={study.challenge} />
                <ContentBlock title="Our Solution" body={study.solution} />

                <div>
                  <SectionLabel label="How We Did It" />
                  <h2 className="text-2xl font-bold text-white mb-8">Our Process</h2>
                  <div className="space-y-4">
                    {study.process.map((step, i) => (
                      <ProcessStep key={i} step={step} accentColor={project.accentColor} />
                    ))}
                  </div>
                </div>

                {study.testimonial && (
                  <blockquote
                    className="rounded-2xl p-8 border-l-4"
                    style={{
                      background: `rgba(${rgb},0.05)`,
                      borderColor: project.accentColor,
                      border: `1px solid rgba(${rgb},0.15)`,
                      borderLeft: `4px solid ${project.accentColor}`,
                    }}
                  >
                    <p className="text-white/80 text-lg leading-relaxed italic mb-5">
                      "{study.testimonial.quote}"
                    </p>
                    <footer>
                      <p className="text-white font-semibold text-sm">{study.testimonial.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">{study.testimonial.role}</p>
                    </footer>
                  </blockquote>
                )}
              </div>

              <aside className="space-y-6">
                <ProjectMeta project={project} study={study} />
                {project.behanceUrl && (
                  <a
                    href={project.behanceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    View on Behance <FiExternalLink className="w-4 h-4" />
                  </a>
                )}
                <CTASidebar rgb={rgb} />
              </aside>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-24">
          <div className="w-full max-w-[78rem] mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <p className="text-white/60 text-lg leading-relaxed mb-8">{project.description}</p>
                {project.behanceUrl && (
                  <a
                    href={project.behanceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary px-6 py-3 inline-flex"
                  >
                    View Full Project on Behance <FiExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <CTASidebar rgb={rgb} />
            </div>
          </div>
        </section>
      )}

      {/* Next Project Footer Link */}
      {nextProject && (
        <section
          className="py-16 border-t border-white/10"
        >
          <div className="w-full max-w-[78rem] mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link
                href="/portfolio"
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-200"
              >
                <FiArrowLeft className="w-4 h-4" /> All Projects
              </Link>
              <Link
                href={`/portfolio/${nextProject.slug}`}
                className="flex items-center gap-3 group"
              >
                <div className="text-right">
                  <p className="text-white/30 text-xs mb-0.5">Next Case Study</p>
                  <p className="text-white font-semibold text-sm group-hover:brand-text transition-colors">{nextProject.title}</p>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <FiArrowRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}
      <Footer />

      {/* Gallery Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />

          <div className="relative w-full max-w-5xl h-[85vh] bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#070707] shrink-0">
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">Case Study Gallery</p>
                <h3 className="text-white font-bold text-sm md:text-base leading-tight mt-0.5">{project.title}</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/50 hover:text-white hover:bg-white/5 transition-all p-2 rounded-lg border border-transparent hover:border-white/10"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Gallery / Empty View */}
            <div className="flex-1 overflow-y-auto p-6">
              {displayImages.length > 0 ? (
                <div className="flex flex-col items-center">
                  {displayImages.map((imgSrc, idx) => (
                    <div key={idx} className="w-full max-w-4xl relative min-h-[200px]">
                      {!failedImages[idx] ? (
                        <Image
                          src={imgSrc}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          width={1200}
                          height={1200}
                          unoptimized
                          onError={() => handleImageError(idx)}
                          className="w-full h-auto object-contain"
                        />
                      ) : (
                        <div className="w-full py-12 rounded-xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-2">
                          <FiImage className="w-8 h-8 text-white/20" />
                          <p className="text-white/30 text-xs font-mono">{imgSrc}</p>
                          <span className="text-red-400/60 text-xs">Failed to load image</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <FiImage className="w-8 h-8 text-white/30" />
                  </div>
                  <h4 className="text-white font-medium text-lg mb-1">No preview available</h4>
                  <p className="text-white/40 text-sm max-w-sm">
                    There are no additional gallery images uploaded for this project yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MetricCard({ metric, accentColor, index }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`card text-center py-7 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <p className="text-2xl md:text-3xl font-bold mb-1" style={{ color: accentColor }}>
        {metric.value}
      </p>
      {metric.label && <p className="text-white/40 text-xs leading-tight">{metric.label}</p>}
    </div>
  )
}

function SectionLabel({ label }) {
  return <p className="eyebrow mb-3">{label}</p>
}

function ContentBlock({ title, body }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <SectionLabel label={title} />
      <p className="text-white/65 leading-relaxed text-base">{body}</p>
    </div>
  )
}

function ProcessStep({ step, accentColor }) {
  const rgb = accentColor === '#e73103' ? '231,49,3' : '245,142,30'
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`flex gap-5 p-5 rounded-2xl border border-white/10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <div
        className="text-3xl font-black leading-none flex-shrink-0 select-none pt-1"
        style={{ color: `rgba(${rgb},0.2)` }}
      >
        {step.step}
      </div>
      <div>
        <h4 className="text-white font-semibold text-sm mb-1.5">{step.title}</h4>
        <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
      </div>
    </div>
  )
}

function ProjectMeta({ project, study }) {
  const items = [
    { label: 'Client', value: project.client },
    study?.service && { label: 'Service', value: study.service },
    study?.industry && { label: 'Industry', value: study.industry },
    study?.duration && { label: 'Duration', value: study.duration },
    { label: 'Category', value: project.category },
  ].filter(Boolean)

  return (
    <div
      className="rounded-2xl p-6 border border-white/10"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Project Details</p>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-start justify-between gap-4">
            <span className="text-white/30 text-xs">{item.label}</span>
            <span className="text-white/70 text-xs font-medium text-right">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CTASidebar({ rgb }) {
  return (
    <div
      className="rounded-2xl p-6 border"
      style={{
        background: `rgba(${rgb},0.05)`,
        borderColor: `rgba(${rgb},0.15)`,
      }}
    >
      <p className="text-white font-bold mb-2">Want results like these?</p>
      <p className="text-white/50 text-sm leading-relaxed mb-5">
        Book a free 30-min discovery call and we'll map out exactly what we'd do for your brand.
      </p>
      <a
        href="https://calendly.com/squadtechsolution/inquiry"
        target="_blank"
        rel="noreferrer"
        className="btn-primary w-full py-3 text-sm flex justify-center"
      >
        Book Free Call <FiArrowRight className="w-4 h-4" />
      </a>
    </div>
  )
}