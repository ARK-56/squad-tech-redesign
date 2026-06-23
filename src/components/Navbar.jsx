import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'

const serviceItems = [
  { label: 'Social Media Marketing', slug: 'social-media-marketing' },
  { label: 'SEO & PPC', slug: 'seo-ppc' },
  { label: 'Brand Identity', slug: 'brand-identity' },
  { label: 'Media Production', slug: 'media-production' },
  { label: 'Web Development', slug: 'web-development' },
  { label: 'Dedicated Remote Staff', slug: 'dedicated-remote-staff' },
]

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', dropdown: true },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setMobileServicesOpen(false) }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10' : ''
      }`}
      style={{
        background: scrolled ? 'color-mix(in srgb, #060606 72%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(22px)' : 'none',
      }}
    >
      <nav className="w-full max-w-[78rem] mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/images/logo.avif"
            alt="Squadtech Solution"
            className="h-12 w-auto object-contain"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onError={(e) => {
              e.target.style.display = 'none'
              const fb = e.target.nextSibling
              if (fb) fb.style.display = 'flex'
            }}
          />
          <span className="hidden items-center gap-2 text-white font-bold text-xl">
            Squad<span className="brand-text">Tech</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            if (link.dropdown) {
              return (
                <li key={link.href} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    onMouseEnter={() => setServicesOpen(true)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                      active ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {link.label}
                    <FiChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                    />
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-200 origin-left rounded-full ${
                        active ? 'scale-x-100' : 'scale-x-0'
                      }`}
                      style={{ background: 'linear-gradient(90deg, #e73103, #f58e1e)' }}
                    />
                  </button>

                  {/* Dropdown panel */}
                  <div
                    onMouseLeave={() => setServicesOpen(false)}
                    className={`absolute top-full left-0 mt-2 w-56 rounded-2xl border border-white/10 overflow-hidden transition-all duration-200 ${
                      servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                    style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(24px)', boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}
                  >
                    <div className="p-2">
                      <Link
                        to="/services"
                        className="flex items-center px-3 py-2 text-xs font-semibold text-white/30 uppercase tracking-widest hover:text-white/50 transition-colors"
                        onClick={() => setServicesOpen(false)}
                      >
                        All Services
                      </Link>
                      <div className="h-px bg-white/5 mx-3 mb-1" />
                      {serviceItems.map((s) => (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          onClick={() => setServicesOpen(false)}
                          className={`block px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                            pathname === `/services/${s.slug}`
                              ? 'text-white bg-white/8'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              )
            }
            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 group block ${
                    active ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-200 origin-left rounded-full ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                    style={{ background: 'linear-gradient(90deg, #e73103, #f58e1e)' }}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Link to="/start" className="btn-primary text-sm px-5 py-2.5">
            Start a Project
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl border border-white/10 text-white/70 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.04)' }}
          aria-label="Toggle menu"
        >
          {open ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden border-b border-white/10 ${
          open ? 'max-h-screen' : 'max-h-0'
        }`}
        style={{ background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(22px)' }}
      >
        <div className="w-full max-w-[78rem] mx-auto px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            if (link.dropdown) {
              return (
                <div key={link.href}>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center justify-between ${
                      active ? 'text-white bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                    <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${mobileServicesOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="pl-4 pt-1 space-y-1">
                      <Link
                        to="/services"
                        className="block px-4 py-2.5 rounded-xl text-xs text-white/40 font-semibold uppercase tracking-widest hover:text-white/60 transition-colors"
                      >
                        All Services
                      </Link>
                      {serviceItems.map((s) => (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          className={`block px-4 py-2.5 rounded-xl text-sm transition-colors duration-200 ${
                            pathname === `/services/${s.slug}`
                              ? 'text-white bg-white/5'
                              : 'text-white/50 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 block ${
                  active ? 'text-white bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="pt-2">
            <Link to="/start" className="btn-primary w-full py-3 text-sm flex justify-center">
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
