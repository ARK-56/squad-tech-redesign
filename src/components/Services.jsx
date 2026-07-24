'use client'

import { memo } from 'react'
import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'
import { services } from '../data/services'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Services() {
  const { ref, visible } = useScrollReveal()

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="w-full max-w-[78rem] mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          ref={ref}
          className={`max-w-3xl mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="eyebrow mb-4">Services</p>
          <h2 className="section-title mb-4">
            Six Breakthrough Services to{' '}
            <span className="brand-text">Scale Your Business</span>
          </h2>
          <p className="section-copy max-w-2xl">
            From high-speed websites to hyper-targeted marketing campaigns, we deploy relentless
            creative execution and custom tech to prove our absolute worth.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/services" className="btn-secondary px-8 py-3">
            View All Services <FiArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

const ServiceCard = memo(function ServiceCard({ service, index }) {
  const { ref, visible } = useScrollReveal()

  return (
    <Link
      href={`/services/${service.slug}`}
      ref={ref}
      className={`group card cursor-pointer relative overflow-hidden transition-all duration-700 block ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 70}ms`,
        borderColor: `rgba(${service.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.25)`,
        boxShadow: `0 0 18px rgba(${service.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.12)`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 0 32px rgba(${service.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.28)`
        e.currentTarget.style.borderColor = `rgba(${service.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.5)`
        e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = `0 0 18px rgba(${service.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.12)`
        e.currentTarget.style.borderColor = `rgba(${service.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.25)`
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
      }}
    >
      {/* Hover top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)` }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{
          background: `rgba(${service.accentColor === '#e73103' ? '231,49,3' : '245,142,30'}, 0.12)`,
          border: `1px solid rgba(${service.accentColor === '#e73103' ? '231,49,3' : '245,142,30'}, 0.2)`,
        }}
      >
        <service.icon className="w-5 h-5" style={{ color: service.accentColor }} />
      </div>

      {/* Title + arrow */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-base">{service.title}</h3>
        <FiArrowUpRight
          className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0"
          style={{ color: service.accentColor }}
        />
      </div>

      <p className="text-white/50 text-sm leading-relaxed mb-5">{service.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-xs font-medium border border-white/10 text-white/40"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
})
