'use client'

import { useEffect, useRef, useState } from 'react'
import { FiArrowRight, FiCalendar, FiVolume2, FiVolumeX } from 'react-icons/fi'
import { HiCheckCircle } from 'react-icons/hi2'
import { companyStats, heroStats } from '../data/stats'

const proofChips = [
  'No upfront payment',
  '7 years delivering',
  'No contracts',
]

const stats = heroStats

export default function Hero() {
  const orbRef = useRef(null)
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  useEffect(() => {
    let rafId = null
    const handleMouseMove = (e) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        if (orbRef.current) {
          const x = (e.clientX / window.innerWidth - 0.5) * 20
          const y = (e.clientY / window.innerHeight - 0.5) * 20
          orbRef.current.style.transform = `translate(${x}px, ${y}px)`
        }
        rafId = null
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section id="home" className="relative overflow-hidden" style={{ paddingTop: '5.5rem', paddingBottom: '3rem' }}>
      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={orbRef}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full transition-transform duration-700 ease-out"
          style={{ background: 'radial-gradient(circle, rgba(231,49,3,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,142,30,0.08) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[78rem] mx-auto px-4">
        {/* Two-column hero */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center mb-16">
          {/* Left */}
          <div className="animate-fade-up">
            {/* Trust strip */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10"
              style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.7)' }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Trusted by 67+ global clients
            </div>

            {/* Eyebrow */}
            <p className="eyebrow mb-4">FULL-SERVICE DIGITAL MARKETING AGENCY</p>

            {/* Headline */}
            <h1 className="font-bold leading-[1.1] mb-5" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
              <span className="brand-text">Marketing & Web Design</span>
            </h1>

            {/* Copy */}
            <p className="section-copy mb-8 max-w-xl">
              Squad Tech Solution is a full-service digital marketing agency delivering social media marketing,
              SEO & Google Ads, custom web development, and brand identity — you see the work before you pay.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a href="/start" className="btn-primary px-6 py-3">
                Claim Free Offer <FiArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://calendly.com/squadtechsolution/inquiry"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary px-6 py-3"
              >
                <FiCalendar className="w-4 h-4" /> Book Free Call
              </a>
            </div>

            {/* Proof chips */}
            <div className="flex flex-wrap gap-3 mb-6">
              {proofChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-white/10 text-white/60"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <HiCheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {chip}
                </span>
              ))}
            </div>

            {/* Service chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['Social Media Marketing', 'SEO & Google Ads', 'Web Development', 'Brand Identity', 'Media Production'].map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full text-xs font-medium text-white/40 border border-white/08"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Trustpilot badge */}
            <a
              href="https://uk.trustpilot.com/review/squadtechsol.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="#00B67A" />
                <path d="M12 16.5l-4.5 2.7 1.2-5-4-3.5 5.2-.4L12 5.5l2.1 4.8 5.2.4-4 3.5 1.2 5z" fill="white" />
              </svg>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#00B67A" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white/40 text-xs leading-none">Rated <span className="text-white/70 font-semibold">Excellent</span> on Trustpilot</span>
              </div>
            </a>
          </div>

          {/* Right - video placeholder */}
          <div className="relative hidden lg:block animate-fade-up animate-delay-200">
            <div
              className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[5/3]"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover opacity-90"
              >
                {/* <source src="/videos/Promotional-Intro-Squad-Tech-Solution.mp4" type="video/mp4" /> */}
                <source src="/videos/hero-video.mp4" type="video/mp4" />
              </video>

              {/* Mute button on top right */}
              <button
                onClick={toggleMute}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full border border-white/10 bg-black/60 hover:bg-black/80 hover:border-white/20 transition-all text-white/80 hover:text-white"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <FiVolumeX className="w-4 h-4" />
                ) : (
                  <FiVolume2 className="w-4 h-4" />
                )}
              </button>

              {/* Tag overlays */}
              {/* <div className="absolute bottom-4 left-4 flex gap-2">
                {['Social media · SEO · Web design', 'See the work first', '200+ brands grown'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/80 border border-white/10"
                    style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div> */}
            </div>

            {/* Float cards */}
            <div
              className="absolute -top-4 -left-6 rounded-2xl px-4 py-3 border border-white/10 animate-float"
              style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)', animationDuration: '4s' }}
            >
              <div className="text-2xl font-bold brand-text">{companyStats.projects.value}</div>
              <div className="text-xs text-white/50 font-medium">{companyStats.projects.label}</div>
            </div>

            <div
              className="absolute -right-6 rounded-2xl px-4 py-3 border border-white/10 animate-float"
              style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)', animationDuration: '4.5s', animationDelay: '1s' }}
            >
              <div className="text-2xl font-bold text-green-400">{companyStats.satisfaction.value}</div>
              <div className="text-xs text-white/50 font-medium">{companyStats.satisfaction.label}</div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

function parsestat(value) {
  const prefix = value.startsWith('+') ? '+' : ''
  const suffix = value.replace(/[0-9.]/g, '').replace('+', '')
  const num = parseFloat(value.replace(/[^0-9.]/g, ''))
  return { prefix, suffix, num }
}

function StatCard({ stat }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState('0')
  const [started, setStarted] = useState(false)
  const { prefix, suffix, num } = parsestat(stat.value)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true)
        observer.disconnect()
        const duration = 1400
        const steps = 40
        const interval = duration / steps
        let step = 0
        const timer = setInterval(() => {
          step++
          const progress = step / steps
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = Math.round(eased * num)
          setDisplay(String(current))
          if (step >= steps) clearInterval(timer)
        }, interval)
      }
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [num, started])

  return (
    <div ref={ref} className="card text-center py-5 px-4 hover:border-white/20 transition-all duration-300">
      <div className="text-2xl md:text-3xl font-bold mb-1 brand-text">
        {prefix}{display}{suffix}
      </div>
      <div className="text-xs text-white/50 font-medium uppercase tracking-wider">{stat.label}</div>
    </div>
  )
}
