'use client'

import { memo } from 'react'
import Link from 'next/link'
import { FiArrowUpRight, FiCheckCircle } from 'react-icons/fi'
import { services } from '../data/services'
import PageHero from '../components/PageHero'
import useScrollReveal from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

const whyUs = [
  {
    title: 'See The Work First',
    desc: 'We build before you pay. You see the work before signing anything.',
    color: '#e73103',
  },
  {
    title: 'No Long-Term Contracts',
    desc: 'Every retained service runs month-to-month — cancel anytime, no cancellation fees. You stay because it works.',
    color: '#f58e1e',
  },
  {
    title: 'Dedicated Account Manager',
    desc: 'One point of contact who knows your brand, your goals, and your timeline inside out.',
    color: '#e73103',
  },
  {
    title: 'Rapid Delivery Timelines',
    desc: 'We move at startup speed. Most projects launch within 2–4 weeks, not months.',
    color: '#f58e1e',
  },
  {
    title: 'Data-Driven Execution',
    desc: 'Every decision is backed by analytics. We report on metrics that tie directly to revenue.',
    color: '#e73103',
  },
  {
    title: 'Hungry, Senior-Level Teams',
    desc: 'No juniors on your account. Every engagement is staffed with experienced specialists.',
    color: '#f58e1e',
  },
]

export default function ServicesPage() {
  const { ref, visible } = useScrollReveal()

  return (
    <div>
      <PageHero
        eyebrow="Our Services"
        title="Everything You Need to"
        titleAccent="Scale Fast"
        subtitle="Six battle-tested services — see the work before you commit. Pick one, or let us build a combined growth strategy tailored to your goals."
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* Services Grid */}
      <section className="pb-24">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 relative overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div
            ref={ref}
            className={`max-w-2xl mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <p className="eyebrow mb-4">Why Squadtech</p>
            <h2 className="section-title">
              The Standards We Hold{' '}
              <span className="brand-text">Every Engagement To</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((item, i) => (
              <WhyCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

const ServiceCard = memo(function ServiceCard({ service, index }) {
  const { ref, visible } = useScrollReveal()
  const rgb = service.accentColor === '#e73103' ? '231,49,3' : '245,142,30'

  return (
    <div
      ref={ref}
      className={`group card relative overflow-hidden flex flex-col transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)` }}
      />

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `rgba(${rgb},0.12)`, border: `1px solid rgba(${rgb},0.2)` }}
      >
        <service.icon className="w-5 h-5" style={{ color: service.accentColor }} />
      </div>

      <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
      <p className="text-white/40 text-sm leading-relaxed mb-3">{service.tagline}</p>
      <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">{service.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-6">
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

      <Link
        href={`/services/${service.slug}`}
        className="inline-flex items-center gap-2 text-sm font-semibold group/link"
        style={{ color: service.accentColor }}
      >
        Learn More
        <FiArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
      </Link>
    </div>
  )
})

const WhyCard = memo(function WhyCard({ item, index }) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: `rgba(${item.color === '#e73103' ? '231,49,3' : '245,142,30'},0.1)` }}
        >
          <FiCheckCircle className="w-4 h-4" style={{ color: item.color }} />
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-1.5">{item.title}</h4>
          <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </div>
  )
})
