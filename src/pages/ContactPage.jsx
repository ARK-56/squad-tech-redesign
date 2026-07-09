import { useState } from 'react'
import { FiSend, FiMapPin, FiPhone, FiMail, FiCalendar, FiArrowRight } from 'react-icons/fi'
import PageHero from '../components/PageHero'
import useScrollReveal from '../hooks/useScrollReveal'

const info = [
  { icon: FiMapPin, label: 'Address', value: '276 Holten Ave, New York, United States', href: null },
  { icon: FiPhone, label: 'Phone', value: '+1 (201) 820-6889', href: 'tel:+12018206889' },
  { icon: FiMail, label: 'Email', value: 'inquiry@squadtechsol.com', href: 'mailto:inquiry@squadtechsol.com' },
]

const faqs = [
  {
    q: 'How does the zero-risk model work?',
    a: 'We build your project first — fully designed and developed — before any payment is required. If you love it, you pay. If not, you walk away at zero cost.',
  },
  {
    q: 'How quickly can you start?',
    a: 'We can usually begin within 2–5 business days of an initial call. Most projects are in your hands within 2–4 weeks.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. We serve clients across the US, UK, Europe, and beyond. Our team operates across multiple time zones.',
  },
  {
    q: 'What information do I need to get started?',
    a: 'Just a brief overview of your brand, your goals, and what you\'ve tried before. We handle the rest in the discovery call.',
  },
]

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Get in Touch"
        title="Let's Build Something"
        titleAccent="Risk-Free"
        subtitle="Book a free discovery call, send a message, or drop into our calendar directly. There's no commitment and no pitch — just a real conversation about your growth."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      {/* Main contact section */}
      <section className="pb-24">
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4">
          <FaqBlock />
        </div>
      </section>
    </div>
  )
}

function ContactInfo() {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Info cards */}
      <div className="space-y-4 mb-8">
        {info.map((item, i) => (
          <div key={i} className="card flex items-start gap-4 p-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: i % 2 === 0 ? 'rgba(231,49,3,0.12)' : 'rgba(245,142,30,0.12)',
                border: `1px solid ${i % 2 === 0 ? 'rgba(231,49,3,0.2)' : 'rgba(245,142,30,0.2)'}`,
              }}
            >
              <item.icon
                className="w-4 h-4"
                style={{ color: i % 2 === 0 ? '#e73103' : '#f58e1e' }}
              />
            </div>
            <div>
              <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">
                {item.label}
              </div>
              {item.href
                ? <a href={item.href} className="text-white text-sm font-medium hover:text-white/70 transition-colors">{item.value}</a>
                : <div className="text-white text-sm font-medium">{item.value}</div>
              }
            </div>
          </div>
        ))}
      </div>

      {/* Calendly CTA */}
      <div
        className="rounded-2xl p-7 border border-white/10"
        style={{ background: 'linear-gradient(135deg, rgba(231,49,3,0.1), rgba(245,142,30,0.06))' }}
      >
        <h3 className="text-white font-bold text-lg mb-2">Book a Free Discovery Call</h3>
        <p className="text-white/50 text-sm mb-5">
          30 minutes with our team. No pitch, no pressure — just an honest conversation about growing your business.
        </p>
        <a
          href="https://calendly.com/squadtechsolution/inquiry"
          target="_blank"
          rel="noreferrer"
          className="btn-primary inline-flex px-5 py-2.5 text-sm"
        >
          <FiCalendar className="w-4 h-4" /> Schedule on Calendly
        </a>
      </div>
    </div>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const { ref, visible } = useScrollReveal()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('success')
      setForm({ name: '', email: '', service: '', message: '' })
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  return (
    <div
      ref={ref}
      className={`card p-7 md:p-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {status === 'success' ? (
        <div className="text-center py-14">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #e73103, #f58e1e)' }}
          >
            <span className="text-white text-2xl font-bold">✓</span>
          </div>
          <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
          <p className="text-white/50 text-sm">We'll be in touch within 24 business hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-white font-bold text-lg mb-5">Send a Message</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 border border-white/10 focus:border-white/25"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="john@company.com"
                className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 border border-white/10 focus:border-white/25"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              />
            </div>
          </div>
          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
              Service Interested In
            </label>
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full rounded-xl px-4 py-3 text-white/70 text-sm outline-none transition-all duration-200 border border-white/10 focus:border-white/25"
              style={{ background: 'rgba(10,10,10,0.95)' }}
            >
              <option value="">Select a service...</option>
              <option>Social Media Marketing</option>
              <option>SEO &amp; PPC</option>
              <option>Brand Identity</option>
              <option>Media Production</option>
              <option>Web Development</option>
              <option>Dedicated Remote Staff</option>
              <option>Not sure — let's discuss</option>
            </select>
          </div>
          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
              Your Message
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us about your project, goals, and timeline..."
              className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 border border-white/10 focus:border-white/25 resize-none"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Sending…' : <><span>Send Message</span> <FiSend className="w-4 h-4" /></>}
          </button>
        </form>
      )}
    </div>
  )
}

function FaqBlock() {
  const { ref, visible } = useScrollReveal()

  return (
    <div>
      <div
        ref={ref}
        className={`max-w-2xl mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <p className="eyebrow mb-4">FAQ</p>
        <h2 className="section-title">
          Common <span className="brand-text">Questions</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {faqs.map((faq, i) => (
          <FaqCard key={i} faq={faq} index={i} />
        ))}
      </div>
    </div>
  )
}

function FaqCard({ faq, index }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`card transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <h4 className="text-white font-semibold text-sm mb-2">{faq.q}</h4>
      <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
    </div>
  )
}
