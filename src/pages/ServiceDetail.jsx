import { memo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiArrowUpRight } from 'react-icons/fi'
import { services } from '../data/services'
import useScrollReveal from '../hooks/useScrollReveal'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)

  if (!service) return <Navigate to="/services" replace />

  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3)
  const rgb = service.accentColor === '#e73103' ? '231,49,3' : '245,142,30'

  return (
    <div>
      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse, rgba(${rgb},0.08) 0%, transparent 65%)` }}
        />
        <div className="w-full max-w-[78rem] mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-6 font-medium">
            <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link to="/services" className="hover:text-white/60 transition-colors">Services</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/60">{service.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
                style={{
                  color: service.accentColor,
                  background: `rgba(${rgb},0.08)`,
                  borderColor: `rgba(${rgb},0.2)`,
                }}
              >
                <service.icon className="w-3.5 h-3.5" />
                {service.title}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                {service.tagline}
              </h1>
              <p className="section-copy text-lg mb-8">{service.longDesc}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://calendly.com/squadtechsolution/inquiry"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary px-6 py-3 text-sm"
                >
                  Get Started Free <FiArrowRight className="w-4 h-4" />
                </a>
                <Link to="/contact" className="btn-secondary px-6 py-3 text-sm">
                  Ask a Question
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {service.stats.map((stat, i) => (
                <div
                  key={i}
                  className="card text-center py-8"
                  style={{ borderColor: i === 1 ? `rgba(${rgb},0.2)` : undefined }}
                >
                  <p
                    className="text-3xl font-bold mb-2"
                    style={{ color: service.accentColor }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-xs leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FeaturesBlock service={service} />
            <ProcessBlock service={service} />
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow mb-3">Explore More</p>
              <h2 className="section-title">Other <span className="brand-text">Services</span></h2>
            </div>
            <Link to="/services" className="btn-secondary px-5 py-2.5 text-sm shrink-0">
              View All <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {otherServices.map((s, i) => (
              <OtherServiceCard key={i} service={s} />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

function FeaturesBlock({ service }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <p className="eyebrow mb-4">What's Included</p>
      <h2 className="section-title mb-8">
        Everything in <span className="brand-text">This Service</span>
      </h2>
      <div className="space-y-3">
        {service.features.map((feat, i) => (
          <div key={i} className="flex items-start gap-3">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `rgba(${service.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.12)` }}
            >
              <FiCheck className="w-3 h-3" style={{ color: service.accentColor }} />
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{feat}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProcessBlock({ service }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <p className="eyebrow mb-4">Our Process</p>
      <h2 className="section-title mb-8">
        How We <span className="brand-text">Deliver</span>
      </h2>
      <div className="space-y-5">
        {service.process.map((step, i) => (
          <div
            key={i}
            className="flex gap-5 p-5 rounded-2xl border border-white/10 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div
              className="text-4xl font-black leading-none flex-shrink-0 select-none"
              style={{ color: `rgba(${service.accentColor === '#e73103' ? '231,49,3' : '245,142,30'},0.15)` }}
            >
              {step.step}
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-1.5">{step.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const OtherServiceCard = memo(function OtherServiceCard({ service }) {
  const rgb = service.accentColor === '#e73103' ? '231,49,3' : '245,142,30'
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group card block relative overflow-hidden transition-all duration-300 hover:border-white/20"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)` }}
      />
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.2)` }}
      >
        <service.icon className="w-4 h-4" style={{ color: service.accentColor }} />
      </div>
      <h3 className="text-white font-semibold text-sm mb-1.5">{service.title}</h3>
      <p className="text-white/40 text-xs leading-relaxed mb-4">{service.tagline}</p>
      <span
        className="inline-flex items-center gap-1.5 text-xs font-semibold"
        style={{ color: service.accentColor }}
      >
        Learn More <FiArrowUpRight className="w-3 h-3" />
      </span>
    </Link>
  )
})
