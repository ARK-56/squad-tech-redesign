import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiPhone, FiMail, FiStar } from 'react-icons/fi'
import { HiCheckCircle } from 'react-icons/hi2'

const services = [
  'Social Media Marketing',
  'SEO & PPC',
  'Brand Identity',
  'Media Production',
  'Web Development',
  'Dedicated Remote Staff',
]

const proofPoints = [
  'Zero upfront cost — we work before you pay',
  'Results guaranteed or we walk away',
  'No long-term contracts, ever',
  'Dedicated specialist on your account from day one',
  'Full-service: strategy, creative, tech & media',
]

const stats = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '67+', label: 'Global Clients' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '$0', label: 'Required Upfront' },
]

const testimonial = {
  quote: 'Their marketing guarantee gave us complete peace of mind. Within weeks, our content views multiplied and user acquisition costs dropped dramatically.',
  name: 'Alistair Vance',
  role: 'Chief Product Officer, NexaCorp Industries',
  initials: 'AV',
}

export default function StartPage() {
  const [focused, setFocused] = useState(null)

  return (
    <div className="min-h-screen font-sans">
      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10" style={{ background: 'rgba(6,6,6,0.92)', backdropFilter: 'blur(20px)' }}>
        <div className="w-full max-w-[90rem] mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/">
            <img src="/images/logo.avif" alt="Squadtech Solution" className="h-10 w-auto object-contain" loading="eager" fetchPriority="high" />
          </Link>
          <div className="flex items-center gap-6">
            <a href="tel:+12018206889" className="hidden sm:flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
              <FiPhone className="w-3.5 h-3.5" /> +1 (201) 820-6889
            </a>
            <a href="mailto:inquiry@squadtechsol.com" className="hidden md:flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
              <FiMail className="w-3.5 h-3.5" /> inquiry@squadtechsol.com
            </a>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs font-medium text-white/60" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Taking on new clients
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="pt-20 min-h-screen">
        {/* Background glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(231,49,3,0.12) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(245,142,30,0.10) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 py-12 lg:py-16">
          <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-12 xl:gap-20 items-start">

            {/* Left — copy */}
            <div className="lg:sticky lg:top-28">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 border border-white/10 text-white/60" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <FiStar className="w-3.5 h-3.5" style={{ color: '#f58e1e' }} />
                Free strategy session — no commitment required
              </div>

              {/* Headline */}
              <h1 className="font-bold leading-[1.08] mb-6 text-white" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}>
                Get a Risk-Free<br />
                <span style={{ background: 'linear-gradient(135deg, #e73103, #f58e1e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Digital Strategy
                </span><br />
                Built for Your Brand
              </h1>

              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
                Fill out the form and our team will review your goals, build a custom plan, and present it to you — completely free. No pitch deck. No pressure. Just a real strategy.
              </p>

              {/* Proof points */}
              <ul className="space-y-3 mb-10">
                {proofPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <HiCheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#e73103' }} />
                    <span className="text-white/70 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-10">
                {stats.map((stat, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 text-center py-5 px-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <p className="text-2xl font-bold mb-1" style={{ color: i % 2 === 0 ? '#e73103' : '#f58e1e' }}>{stat.value}</p>
                    <p className="text-white/40 text-xs leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="rounded-2xl border border-white/10 p-6" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="text-3xl font-serif leading-none mb-3 select-none" style={{ color: 'rgba(231,49,3,0.4)' }}>"</div>
                <p className="text-white/70 text-sm leading-relaxed mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg, #e73103, #f58e1e)' }}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-white/40 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <div className="rounded-3xl border border-white/10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                {/* Form header */}
                <div className="px-8 pt-8 pb-6 border-b border-white/10" style={{ background: 'linear-gradient(135deg, rgba(231,49,3,0.08), rgba(245,142,30,0.04))' }}>
                  <h2 className="text-white font-bold text-xl mb-1">Start Your Free Strategy Session</h2>
                  <p className="text-white/50 text-sm">We'll respond within 24 hours with a custom plan.</p>
                </div>

                {/* Actual form — posts to live endpoint */}
                <form
                  action="https://squadtechsol.com/form-submission"
                  method="POST"
                  className="start-form px-8 py-8 space-y-5"
                >
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name" required focused={focused} name="name">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        required
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                      />
                    </Field>
                    <Field label="Email Address" required focused={focused} name="email">
                      <input
                        type="email"
                        name="email"
                        placeholder="you@company.com"
                        required
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                      />
                    </Field>
                  </div>

                  {/* Company + Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Company / Brand" required focused={focused} name="company">
                      <input
                        type="text"
                        name="company"
                        placeholder="Company or brand name"
                        required
                        onFocus={() => setFocused('company')}
                        onBlur={() => setFocused(null)}
                      />
                    </Field>
                    <Field label="Phone Number" required focused={focused} name="phone">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        required
                        onFocus={() => setFocused('phone')}
                        onBlur={() => setFocused(null)}
                      />
                    </Field>
                  </div>

                  {/* Website + Budget */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Website" focused={focused} name="website">
                      <input
                        type="text"
                        name="website"
                        placeholder="www.website.com"
                        onFocus={() => setFocused('website')}
                        onBlur={() => setFocused(null)}
                      />
                    </Field>
                    <Field label="Estimated Budget" required focused={focused} name="budget">
                      <input
                        type="text"
                        name="budget"
                        placeholder="Add your estimated budget"
                        required
                        onFocus={() => setFocused('budget')}
                        onBlur={() => setFocused(null)}
                      />
                    </Field>
                  </div>

                  {/* Service */}
                  <Field label="Service Interested In" required focused={focused} name="service">
                    <select
                      name="service"
                      required
                      defaultValue=""
                      onFocus={() => setFocused('service')}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="" disabled>Choose a service</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Message */}
                  <Field label="Tell Us About Your Project" focused={focused} name="message">
                    <textarea
                      name="message"
                      placeholder="Tell us about your project, goals, timeline, or anything else that helps."
                      rows={4}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                    />
                  </Field>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: 'linear-gradient(135deg, #e73103, #f58e1e)',
                      boxShadow: '0 20px 52px rgba(231,49,3,0.28)',
                    }}
                  >
                    Send My Free Strategy Request <FiArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-center text-white/30 text-xs">
                    No spam. No contracts. 100% free consultation.
                  </p>
                </form>
              </div>

              {/* Trust badges below form */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
                {['Zero-risk guarantee', 'No upfront payment', 'Reply within 24h'].map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 text-white/40 text-xs">
                    <FiCheck className="w-3.5 h-3.5 text-green-400" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, required, children, focused, name }) {
  const isActive = focused === name
  return (
    <div>
      <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <div
        className="rounded-xl border transition-all duration-200 overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.05)',
          borderColor: isActive ? 'rgba(231,49,3,0.5)' : 'rgba(255,255,255,0.1)',
          boxShadow: isActive ? '0 0 0 3px rgba(231,49,3,0.08)' : 'none',
        }}
      >
        {children}
      </div>
    </div>
  )
}
