import { FiArrowRight } from 'react-icons/fi'
import useScrollReveal from '../hooks/useScrollReveal'

export default function About() {
  const { ref, visible } = useScrollReveal()

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="w-full max-w-[78rem] mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="eyebrow mb-4">ABOUT COMPANY</p>
          <h2 className="section-title mb-2">
            Sparking Rapid Growth
          </h2>
          <h2 className="section-title mb-8">
            <em className="not-italic brand-text">and Authentic Scaling</em>
          </h2>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-10"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        />

        {/* Bottom row: stat + copy + cta */}
        <div className="grid md:grid-cols-[auto_1fr] gap-12 items-start mb-16">
          {/* Stat */}
          <div className="md:w-48 flex-shrink-0">
            <div className="text-6xl font-bold brand-text" style={{ lineHeight: 1.1 }}>
              98<span style={{ fontSize: '0.4em', verticalAlign: '0.6em' }}>%</span>
            </div>
            <div className="text-white/50 text-sm font-medium mt-2">Client Satisfaction</div>
          </div>

          {/* Desc + cta */}
          <div>
            <p className="section-copy mb-6 max-w-2xl">
              Squad Tech Solution pairs up with ambitious startups and scaling enterprises that demand
              genuine business outcomes over empty promises. We inject extreme creative energy, aggressive
              conversion strategies, and flawless technical architecture to outpace competitors.
            </p>
            <a href="#contact" className="btn-primary inline-flex px-6 py-3">
              Discover More <FiArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* About image */}
        <div
          className="rounded-3xl overflow-hidden border border-white/10"
          style={{ aspectRatio: '21/8', background: 'rgba(255,255,255,0.04)' }}
        >
          <img
            src="/images/portfolio-5.avif"
            alt="Squad Tech Solution team at work"
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
