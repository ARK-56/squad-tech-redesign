import { FiCode, FiTrendingUp, FiUsers, FiCheck, FiArrowRight, FiCalendar } from 'react-icons/fi'
import PageHero from '../components/PageHero'
import Footer from '../components/Footer'

const guarantees = [
  {
    icon: FiCode,
    color: '#e73103',
    tag: 'Web Development',
    title: 'Free Homepage Concept',
    promise: 'We design a full homepage concept for your brand before you pay a cent.',
    points: [
      'You get a real, custom homepage design — not a template mockup.',
      'Review it, request revisions, and only move forward if you love the direction.',
      'If you walk away, you owe nothing and the concept stays ours until purchased.',
      'Approve it, and we scope and build the full site at our standard fee.',
    ],
  },
  {
    icon: FiTrendingUp,
    color: '#f58e1e',
    tag: 'Marketing Retainers',
    title: 'No Long-Term Contracts',
    promise: 'Marketing retainers run month-to-month — you stay because the work performs.',
    points: [
      'Every marketing retainer is month-to-month — no long-term lock-in.',
      'Adjust, pause, or end your plan with 30 days\' notice.',
      'No cancellation fees, ever.',
      'We report on revenue-relevant metrics so you can judge the work honestly.',
    ],
  },
  {
    icon: FiUsers,
    color: '#e73103',
    tag: 'Dedicated Remote Staff',
    title: '2-Week Trial',
    promise: 'Every staff placement starts with a two-week trial.',
    points: [
      'Your chosen specialist starts on a two-week trial before any long-term commitment.',
      'Not the right fit? We swap them or you walk away — no long-term obligation.',
      'Replacement candidates are surfaced within 48 hours.',
      'You only move to a full retainer once you are happy with the match.',
    ],
  },
]

const fineprint = [
  {
    q: 'What exactly is free in the web offer?',
    a: 'The homepage concept — a complete, custom homepage design for your brand — is free. Building out the full website (additional pages, development, launch) begins once you approve the concept and is charged at our standard fee.',
  },
  {
    q: 'How do the month-to-month marketing retainers work?',
    a: 'Marketing retainers run on a rolling monthly basis with no long-term contract. You can adjust, pause, or end your plan with 30 days\' notice, and there are no cancellation fees. The scope and deliverables for each month are agreed in writing before the work begins.',
  },
  {
    q: 'Who owns the work before payment?',
    a: 'All designs, concepts, and files remain the property of Squad Tech Solution until the corresponding invoice is paid in full. On payment, ownership transfers to you along with the source files.',
  },
  {
    q: 'Is there any obligation to continue?',
    a: 'No. There are no long-term contracts. Web concepts, marketing retainers, and staff placements can each be ended within their guarantee window with no further obligation.',
  },
]

export default function GuaranteePage() {
  return (
    <div>
      <PageHero
        eyebrow="Our Guarantee"
        title="How Our"
        titleAccent="Guarantee Works"
        subtitle="We put our work up first. Each service comes with its own commitment — here is exactly what that means, in plain language, with nothing buried in fine print."
        breadcrumbs={[{ label: 'Our Guarantee' }]}
      />

      {/* Guarantee cards */}
      <section className="pb-24">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-5">
            {guarantees.map((g) => {
              const rgb = g.color === '#e73103' ? '231,49,3' : '245,142,30'
              return (
                <div key={g.title} className="card p-7 flex flex-col">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `rgba(${rgb},0.12)`, border: `1px solid rgba(${rgb},0.2)` }}
                  >
                    <g.icon className="w-5 h-5" style={{ color: g.color }} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: g.color }}>
                    {g.tag}
                  </span>
                  <h3 className="text-white font-bold text-xl mb-3">{g.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">{g.promise}</p>
                  <ul className="space-y-2.5 mt-auto">
                    {g.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-white/50 text-sm leading-relaxed">
                        <FiCheck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: g.color }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Fine print */}
      <section className="py-24" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <p className="eyebrow mb-4">The Fine Print</p>
          <h2 className="section-title mb-12">
            No Surprises,{' '}
            <span className="brand-text">Nothing Buried</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {fineprint.map((f) => (
              <div key={f.q} className="card p-6">
                <h4 className="text-white font-semibold mb-2">{f.q}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs leading-relaxed mt-8 max-w-3xl">
            This page is a plain-language summary of how our guarantees work and is not a contract. Specific
            terms, deliverables, and timelines are confirmed in your individual engagement agreement.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div
            className="rounded-3xl px-8 md:px-14 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-white/10"
            style={{ background: 'linear-gradient(135deg, rgba(231,49,3,0.12), rgba(245,142,30,0.06))' }}
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                See The Work First
              </h3>
              <p className="section-copy max-w-lg">
                See a free homepage concept for your brand — or book a call to map out the right guarantee for your goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a href="/start" className="btn-primary px-6 py-3 text-sm">
                Claim Free Offer <FiArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://calendly.com/squadtechsolution/inquiry"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary px-6 py-3 text-sm"
              >
                <FiCalendar className="w-4 h-4" /> Book Free Call
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
