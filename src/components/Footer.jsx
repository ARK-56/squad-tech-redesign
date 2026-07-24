'use client'

import { FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'
import NewsletterCTA from './NewsletterCTA'

const quickLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Careers', href: '/careers' },
  { label: 'Partner Program', href: '/partners' },
  { label: 'Contact', href: '/contact' },
]
const Resources = [
  { label: 'Free Tools & Templates', href: '/resources' },
  { label: 'Theme Directory', href: '/themes' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Our Guarantee', href: '/guarantee' },
  { label: 'Write for Us', href: '/write-for-us' },
]

const industryLinks = [
  { label: 'For E-Commerce', href: '/for/ecommerce' },
  { label: 'For SaaS', href: '/for/saas' },
  { label: 'For Healthcare', href: '/for/healthcare' },
  { label: 'For Real Estate', href: '/for/real-estate' },
]

const serviceLinks = [
  { label: 'Social Media Marketing', slug: 'social-media-marketing' },
  { label: 'SEO & PPC', slug: 'seo-ppc' },
  { label: 'Brand Identity', slug: 'brand-identity' },
  { label: 'Media Production', slug: 'media-production' },
  { label: 'Web Development', slug: 'web-development' },
  { label: 'Dedicated Remote Staff', slug: 'dedicated-remote-staff' },
]

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/squadtechsolution', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor" className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none" /></svg> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/squadtechsolution', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v2" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
  { label: 'Facebook', href: 'https://www.facebook.com/squadtechsolution', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor" className="w-4 h-4"><path d="M15 8h3V3h-3a5 5 0 0 0-5 5v3H7v5h3v5h5v-5h3l1-5h-4V8a1 1 0 0 1 1-1Z" /></svg> },
  { label: 'Pinterest', href: 'https://www.pinterest.com/SquadTechSolution', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-4 h-4"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.141-.828 3.329-.236.995.499 1.806 1.476 1.806 1.772 0 3.135-1.867 3.135-4.561 0-2.386-1.715-4.052-4.163-4.052-2.836 0-4.498 2.126-4.498 4.324 0 .856.329 1.773.74 2.274a.3.3 0 0 1 .069.284c-.075.314-.243.995-.276 1.134-.044.183-.146.221-.336.133-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" /></svg> },
  { label: 'Behance', href: 'https://www.behance.net/squadtechsolution', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.2.561 1.877 1.894 1.877.906 0 1.451-.438 1.638-1.025l2.224.177zM15.998 13h3.952c-.066-1.513-.71-2.32-1.895-2.32-1.257 0-1.93.806-2.057 2.32zM10.454 8.867C11.546 8.364 12 7.45 12 6.5 12 4.547 10.688 3 8 3H2v18h6.463c2.996 0 5.158-1.473 5.158-4.195 0-1.744-.87-2.927-3.167-3.938zM5.5 6h2.3c.97 0 1.7.501 1.7 1.5S8.77 9 7.8 9H5.5V6zm2.7 9.5H5.5V12h2.7c1.13 0 1.8.6 1.8 1.7s-.67 1.8-1.8 1.8z" /></svg> },
  { label: 'YouTube', href: 'https://www.youtube.com/@SquadTechSolution', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" /></svg> },
  { label: 'TikTok', href: 'https://www.tiktok.com/@squadtechsolution', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.14 8.14 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" /></svg> },
  { label: 'X', href: 'https://x.com/squadtechsol', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.261 5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.4)' }}>
      {/* CTA Banner */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="w-full max-w-[78rem] mx-auto px-4 py-14">
          <div
            className="rounded-3xl px-8 md:px-14 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden border border-white/10"
            style={{ background: 'linear-gradient(135deg, rgba(231,49,3,0.12), rgba(245,142,30,0.06))' }}
          >
            <div
              className="absolute right-0 top-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(231,49,3,0.08), transparent 70%)' }}
            />
            <div className="relative z-10">
              <p className="eyebrow mb-3">Let's build</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Deploy a High-Converting Strategy
              </h3>
              <p className="section-copy max-w-lg">
                Ready to partner with a hungry agency that guarantees outcomes? See the work before you pay.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a href="mailto:inquiry@squadtechsol.com" className="btn-primary px-6 py-3 text-sm">
                Send an Email <FiArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://calendly.com/squadtechsolution/inquiry"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary px-6 py-3 text-sm"
              >
                Schedule a Discovery Call
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="w-full max-w-[78rem] mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
          {/* Brand block */}
          <div>
            <img
              src="/images/logo.avif"
              alt="Squadtech Solution"
              className="h-12 w-auto object-contain mb-5"
              onError={(e) => {
                e.target.style.display = 'none'
                const fallback = e.target.nextSibling
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            <span className="hidden items-center gap-2 mb-5 text-white font-bold text-xl">
              Squad<span className="brand-text">Tech</span>
            </span>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Hungry minds delivering high-performance engineering for ambitious brands worldwide.
            </p>
            <div className="space-y-2 text-sm mb-6">
              <p className="flex gap-3"><strong className="text-white/30 w-16 flex-shrink-0">Address</strong><span className="text-white/60">276 Holten Ave, Staten Island, NY 10309-4028, United States</span></p>
              <p className="flex gap-3"><strong className="text-white/30 w-16 flex-shrink-0">Phone</strong><a href="tel:+12018206889" className="text-white/60 hover:text-white transition-colors">+1 (201) 820-6889</a></p>
              <p className="flex gap-3"><strong className="text-white/30 w-16 flex-shrink-0">Email</strong><a href="mailto:inquiry@squadtechsol.com" className="text-white/60 hover:text-white transition-colors">inquiry@squadtechsol.com</a></p>
            </div>
          </div>

          {/* Quick links & Resources */}
          <div>
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Quick Links</p>
            <div className="space-y-3">
              {quickLinks.map((item) =>
                item.href.startsWith('http') ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="block text-white/50 text-sm hover:text-white transition-colors duration-200">{item.label}</a>
                ) : (
                  <Link key={item.label} href={item.href} className="block text-white/50 text-sm hover:text-white transition-colors duration-200">{item.label}</Link>
                )
              )}
            </div>

            <p className="text-white text-xs font-semibold uppercase tracking-widest mt-8 mb-5">Resources</p>
            <div className="space-y-3">
              {Resources.map((item) =>
                item.href.startsWith('http') ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="block text-white/50 text-sm hover:text-white transition-colors duration-200">{item.label}</a>
                ) : (
                  <Link key={item.label} href={item.href} className="block text-white/50 text-sm hover:text-white transition-colors duration-200">{item.label}</Link>
                )
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Services</p>
            <div className="space-y-3">
              {serviceLinks.map((item) => (
                <Link key={item.slug} href={`/services/${item.slug}`} className="block text-white/50 text-sm hover:text-white transition-colors duration-200">{item.label}</Link>
              ))}
            </div>

            <p className="text-white text-xs font-semibold uppercase tracking-widest mt-8 mb-5">Industries</p>
            <div className="space-y-3">
              {industryLinks.map((item) => (
                <Link key={item.href} href={item.href} className="block text-white/50 text-sm hover:text-white transition-colors duration-200">{item.label}</Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-5">Social</p>
            <div className="grid grid-cols-4 gap-2">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-orange-400/30 flex items-center justify-center transition-all duration-200"
                  style={{ background: 'rgba(245,142,30,0.1)', color: '#f58e1e' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #e73103, #f58e1e)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,142,30,0.1)'; e.currentTarget.style.color = '#f58e1e' }}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <p className="text-white text-xs font-semibold uppercase tracking-widest mt-8 mb-3">Newsletter</p>
            <p className="text-white/40 text-xs leading-relaxed mb-4">One practical growth playbook per week.</p>
            <NewsletterCTA variant="button" />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-white/30 text-sm">© {year} Squad Tech Solution. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-white/30 text-sm hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/30 text-sm hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
