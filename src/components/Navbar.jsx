import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

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
