import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

export default function PageHero({ eyebrow, title, titleAccent, subtitle, breadcrumbs = [] }) {
  return (
    <section className="pt-36 pb-20 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(231,49,3,0.08) 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-[78rem] mx-auto px-4 relative z-10">
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-6 font-medium">
            <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <FiChevronRight className="w-3 h-3" />
                {crumb.href
                  ? <Link to={crumb.href} className="hover:text-white/60 transition-colors">{crumb.label}</Link>
                  : <span className="text-white/60">{crumb.label}</span>
                }
              </span>
            ))}
          </nav>
        )}

        <p className="eyebrow mb-5">{eyebrow}</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
          {title}{' '}
          {titleAccent && <span className="brand-text">{titleAccent}</span>}
        </h1>
        {subtitle && (
          <p className="section-copy max-w-2xl text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
