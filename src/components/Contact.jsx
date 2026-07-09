import { useState } from 'react'
import { FiSend, FiMapPin, FiPhone, FiMail, FiCalendar } from 'react-icons/fi'
import useScrollReveal from '../hooks/useScrollReveal'

const info = [
  { icon: FiMapPin, label: 'Address', value: '276 Holten Ave, New York, United States' },
  { icon: FiPhone, label: 'Phone', value: '+1 (201) 820-6889', href: 'tel:+12018206889' },
  { icon: FiMail, label: 'Email', value: 'inquiry@squadtechsol.com', href: 'mailto:inquiry@squadtechsol.com' },
]

export default function Contact() {
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
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="w-full max-w-[78rem] mx-auto px-4">
        {/* Header */}
        <div
          ref={ref}
          className={`max-w-2xl mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="eyebrow mb-4">Let's build</p>
          <h2 className="section-title">
            Deploy a High-Converting Strategy,{' '}
            <span className="brand-text">Risk-Free</span>
          </h2>
          <p className="section-copy mt-4 max-w-xl">
            Book a free breakthrough call with our hungry engineering team today. Let us draft your
            layout risk-free and build a digital identity worth talking about.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: info + CTA */}
          <div>
            <div className="space-y-4 mb-8">
              {info.map((item, i) => (
                <div key={i} className="card flex items-start gap-4 p-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: i % 2 === 0 ? 'rgba(231,49,3,0.12)' : 'rgba(245,142,30,0.12)', border: `1px solid ${i % 2 === 0 ? 'rgba(231,49,3,0.2)' : 'rgba(245,142,30,0.2)'}` }}
                  >
                    <item.icon className="w-4.5 h-4.5" style={{ color: i % 2 === 0 ? '#e73103' : '#f58e1e' }} />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</div>
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
                <FiCalendar className="w-4 h-4" /> Schedule a Discovery Call
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="card p-7 md:p-8">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'linear-gradient(135deg, #e73103, #f58e1e)' }}
                >
                  <span className="text-white text-2xl">✓</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-white/50">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">Your Name</label>
                    <input
                      type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 border border-white/10 focus:border-white/25"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 border border-white/10 focus:border-white/25"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">Service Interested In</label>
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
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">Your Message</label>
                  <textarea
                    required rows={5} value={form.message}
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
        </div>
      </div>
    </section>
  )
}
