import { memo } from 'react'
import { FiZap, FiShield, FiTrendingUp, FiUsers, FiHeart } from 'react-icons/fi'
import PageHero from '../components/PageHero'
import useScrollReveal from '../hooks/useScrollReveal'

const values = [
  {
    icon: FiZap,
    title: 'Move at Startup Speed',
    desc: 'We don\'t have 6-week scoping sessions. We move fast, iterate faster, and ship work that matters.',
    color: '#e73103',
  },
  {
    icon: FiShield,
    title: 'Zero-Risk Everything',
    desc: 'We put our work up first. Every engagement begins with a guarantee, not a down payment.',
    color: '#f58e1e',
  },
  {
    icon: FiTrendingUp,
    title: 'Data Over Opinion',
    desc: 'Every decision is measured. We replace gut feel with dashboards, A/B tests, and real attribution.',
    color: '#e73103',
  },
  {
    icon: FiUsers,
    title: 'Clients Are Partners',
    desc: 'We don\'t treat clients as accounts. We embed in their growth as if it were our own business.',
    color: '#f58e1e',
  },
  {
    icon: FiHeart,
    title: 'Hungry by Default',
    desc: 'Complacency doesn\'t last here. We\'re always looking at what the best in the world are doing — and doing it better.',
    color: '#e73103',
  },
]

const stats = [
  { value: '200+', label: 'Projects Delivered', color: '#e73103' },
  { value: '67+', label: 'Global Clients', color: '#f58e1e' },
  { value: '98%', label: 'Satisfaction Rate', color: '#e73103' },
  { value: '10M+', label: 'Impressions Generated', color: '#f58e1e' },
  { value: '7', label: 'Core Disciplines', color: '#e73103' },
  { value: '$0', label: 'Required Upfront', color: '#f58e1e' },
]

const team = [
  { role: 'Growth & Strategy', count: '8 specialists' },
  { role: 'Creative & Brand', count: '6 designers' },
  { role: 'Development', count: '7 engineers' },
  { role: 'Media Production', count: '4 producers' },
  { role: 'SEO & Paid Media', count: '5 analysts' },
]

export default function AboutPage() {
  const { ref, visible } = useScrollReveal()

  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title="The Hungry Agency That"
        titleAccent="Out-Works Everyone"
        subtitle="Squadtech Solution is a full-service digital agency on a mission to make world-class engineering and marketing accessible to ambitious brands — risk free."
        breadcrumbs={[{ label: 'About' }]}
      />

      {/* Mission */}
      <section className="pb-24">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              ref={ref}
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <p className="eyebrow mb-4">Our Mission</p>
              <h2 className="section-title mb-6">
                We Exist to Spark{' '}
                <span className="brand-text">Rapid, Authentic Growth</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-5">
                Founded in New York, Squadtech Solution was built by a team that had been on both sides of the
                agency relationship — and were frustrated by both. As clients, we\'d been overcharged and
                under-served. As practitioners, we knew how much more was possible when a team actually cared.
              </p>
              <p className="text-white/60 leading-relaxed mb-5">
                So we built the agency we always wished existed: one that puts the work up first, guarantees
                results, and treats every client\'s growth as its own. We call it the zero-risk model, and it\'s
                changed how we win, how we work, and how we retain.
              </p>
              <p className="text-white/60 leading-relaxed">
                Today, we serve ambitious brands across the US, UK, Germany, and beyond — from pre-seed startups
                to scaling SaaS companies — with a team of 30+ hungry specialists across growth, engineering,
                design, and media.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <StatCard key={i} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <ValuesHeader />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {values.map((v, i) => (
              <ValueCard key={i} value={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Team structure */}
      <section className="py-24" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <TeamImage />
            <TeamInfo team={team} />
          </div>
        </div>
      </section>

    </div>
  )
}

const StatCard = memo(function StatCard({ stat, index }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`card text-center py-7 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <p className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
      <p className="text-white/40 text-xs leading-tight">{stat.label}</p>
    </div>
  )
})

const ValuesHeader = memo(function ValuesHeader() {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`max-w-2xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <p className="eyebrow mb-4">Our Values</p>
      <h2 className="section-title">
        The Principles We{' '}
        <span className="brand-text">Never Compromise On</span>
      </h2>
    </div>
  )
})

const ValueCard = memo(function ValueCard({ value, index }) {
  const { ref, visible } = useScrollReveal()
  const rgb = value.color === '#e73103' ? '231,49,3' : '245,142,30'
  return (
    <div
      ref={ref}
      className={`card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.2)` }}
      >
        <value.icon className="w-5 h-5" style={{ color: value.color }} />
      </div>
      <h4 className="text-white font-semibold mb-2">{value.title}</h4>
      <p className="text-white/50 text-sm leading-relaxed">{value.desc}</p>
    </div>
  )
})

const TeamImage = memo(function TeamImage() {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`rounded-2xl overflow-hidden border border-white/10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, rgba(231,49,3,0.08), rgba(245,142,30,0.04))' }}
    >
      <img
        src="/images/portfolio-5.avif"
        alt="Squadtech team"
        className="w-full h-full object-cover opacity-80"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
})

const TeamInfo = memo(function TeamInfo({ team }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <p className="eyebrow mb-4">Our Team</p>
      <h2 className="section-title mb-6">
        30+ Specialists,{' '}
        <span className="brand-text">One Mission</span>
      </h2>
      <p className="text-white/60 leading-relaxed mb-8">
        No juniors on your account. Every specialist on our team has been hand-picked for their hunger,
        their expertise, and their ability to communicate clearly. We operate in cross-functional pods
        that move together — strategy, creative, tech, and analytics in lock-step.
      </p>
      <div className="space-y-3">
        {team.map((t, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-5 py-4 rounded-xl border border-white/10"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <span className="text-white/70 text-sm font-medium">{t.role}</span>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                color: i % 2 === 0 ? '#e73103' : '#f58e1e',
                background: `rgba(${i % 2 === 0 ? '231,49,3' : '245,142,30'},0.1)`,
              }}
            >
              {t.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
})
