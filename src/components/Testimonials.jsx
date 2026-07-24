'use client'

import { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { testimonials } from '../data/testimonials'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const { ref, visible } = useScrollReveal()

  useEffect(() => {
    if (!autoplay) return
    const t = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [autoplay])

  const prev = () => { setAutoplay(false); setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length) }
  const next = () => { setAutoplay(false); setCurrent((c) => (c + 1) % testimonials.length) }

  const t = testimonials[current]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="w-full max-w-[78rem] mx-auto px-4">
        {/* Header */}
        <div
          ref={ref}
          className={`max-w-2xl mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="eyebrow mb-4">Testimonials</p>
          <h2 className="section-title">
            Validated by Founders Who{' '}
            <span className="brand-text">Demand Direct Outcomes</span>
          </h2>
          <p className="section-copy mt-4 max-w-xl">
            Our clients value speed and certainty: bold conversion pipelines, striking creative assets, and
            software optimized to close inbound deals.
          </p>
          <a
            href="https://uk.trustpilot.com/review/squadtechsol.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 group"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            {/* Trustpilot star logo */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="4" fill="#00B67A"/>
              <path d="M12 16.5l-4.5 2.7 1.2-5-4-3.5 5.2-.4L12 5.5l2.1 4.8 5.2.4-4 3.5 1.2 5z" fill="white"/>
            </svg>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#00B67A" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              <span className="text-white/40 text-xs leading-none">Rated <span className="text-white/70 font-semibold">Excellent</span> on Trustpilot</span>
            </div>
          </a>
        </div>

        {/* Main testimonial */}
        <div
          className="card p-8 md:p-12 mb-6 relative overflow-hidden"
        >
          {/* Big quote mark */}
          <div
            className="absolute top-4 left-8 text-[8rem] leading-none font-serif select-none pointer-events-none"
            style={{ color: 'rgba(231,49,3,0.08)' }}
          >"</div>

          <div className="relative z-10">
            {/* Tag */}
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 border border-white/10"
              style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)' }}
            >
              {t.tag}
            </span>

            {/* Quote */}
            <blockquote className="text-lg md:text-xl text-white/85 leading-relaxed mb-8 max-w-3xl">
              "{t.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color === '#e73103' ? '#f58e1e' : '#e73103'})` }}
              >
                {t.initials}
              </div>
              <div>
                <div className="text-white font-semibold">{t.name}</div>
                <div className="text-white/50 text-sm">{t.role}, {t.company} · {t.country}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-12">
          <button onClick={prev} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setAutoplay(false); setCurrent(i) }}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                style={i === current ? { background: 'linear-gradient(90deg, #e73103, #f58e1e)', width: '2rem' } : {}}
              />
            ))}
          </div>
          <button onClick={next} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mini grid + photos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {testimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => { setAutoplay(false); setCurrent(i) }}
              className={`card text-left p-4 transition-all duration-200 ${i === current ? 'border-white/20' : 'opacity-50 hover:opacity-100'}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color === '#e73103' ? '#f58e1e' : '#e73103'})` }}
                >
                  {item.initials}
                </div>
                <div>
                  <div className="text-white text-xs font-semibold">{item.name}</div>
                  <div className="text-white/40 text-xs">{item.company}</div>
                </div>
              </div>
              <p className="text-white/40 text-xs leading-relaxed line-clamp-2">"{item.quote}"</p>
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
