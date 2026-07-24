'use client'

import PageHero from '../components/PageHero'
import Footer from '../components/Footer'

const sections = [
  {
    title: '1. Who We Are',
    body: [
      'Squad Tech Solution ("we", "us", "our") is a full-service digital marketing agency located at 276 Holten Ave, Staten Island, NY 10309-4028, United States. This policy explains what personal data we collect through squadtechsol.com, why we collect it, and the choices you have.',
      'Questions about this policy or your data can be sent to inquiry@squadtechsol.com.',
    ],
  },
  {
    title: '2. Information We Collect',
    body: [
      'Information you give us directly: your name, email address, phone number, company name, and project details when you submit our contact form, start-a-project form, or request a free resource download.',
      'Information collected automatically: standard analytics data such as pages visited, time on site, device and browser type, approximate location (city level), and referral source. This is collected via Google Analytics and Vercel Analytics using cookies and similar technologies.',
      'We do not knowingly collect data from children under 16, and we do not collect payment card details through this website.',
    ],
  },
  {
    title: '3. How We Use Your Information',
    body: [
      'To respond to enquiries and project requests you submit.',
      'To deliver free resources you request by email, and — where you have opted in — to send occasional marketing emails about our services and content. Every marketing email includes an unsubscribe link.',
      'To understand how visitors use the site so we can improve content, performance, and conversion paths.',
      'To comply with legal obligations and enforce our Terms of Service.',
    ],
  },
  {
    title: '4. Legal Bases (GDPR)',
    body: [
      'Where the EU/UK General Data Protection Regulation applies, we process your data on the following bases: consent (resource downloads, marketing emails), legitimate interest (analytics, responding to enquiries), and contract (delivering services you engage us for).',
    ],
  },
  {
    title: '5. Cookies & Analytics',
    body: [
      'We use cookies and similar technologies for analytics (Google Analytics 4, Vercel Analytics) and, where applicable, advertising measurement (Meta Pixel, Google Ads conversion tracking). These help us measure which pages and campaigns perform.',
      'You can control cookies through your browser settings. Blocking analytics cookies does not affect your ability to use the site.',
    ],
  },
  {
    title: '6. Who We Share Data With',
    body: [
      'We never sell your personal data. We share it only with service providers who process it on our behalf: Resend (transactional email delivery), Vercel (hosting and analytics), Google (analytics and advertising), and Calendly (call scheduling, if you book a call). Each provider is bound by its own data processing terms.',
    ],
  },
  {
    title: '7. Data Retention',
    body: [
      'Enquiry and lead data is retained for as long as needed to serve you and for up to 24 months after last contact, unless you ask us to delete it sooner. Analytics data is retained per Google Analytics settings (14 months).',
    ],
  },
  {
    title: '8. Your Rights',
    body: [
      'Depending on your location, you may have the right to access, correct, delete, or export the personal data we hold about you, to object to or restrict processing, and to withdraw consent at any time. California residents have equivalent rights under the CCPA/CPRA, including the right to know and the right to opt out of "sharing" for cross-context advertising.',
      'To exercise any right, email inquiry@squadtechsol.com — we respond within 30 days.',
    ],
  },
  {
    title: '9. Security & International Transfers',
    body: [
      'Data is transmitted over HTTPS and stored with providers that maintain industry-standard security controls. As our providers operate in the United States, your data may be processed there; transfers from the EU/UK rely on Standard Contractual Clauses maintained by those providers.',
    ],
  },
  {
    title: '10. Changes to This Policy',
    body: [
      'We may update this policy as our services evolve. The "Last updated" date below reflects the latest revision. Material changes will be highlighted on this page.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        titleAccent="Policy"
        subtitle="What we collect, why we collect it, and the choices you have. Plain English, no legalese walls."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />
      <section className="pb-24">
        <div className="w-full max-w-[56rem] mx-auto px-4">
          {sections.map((s) => (
            <div key={s.title} className="mb-10">
              <h2 className="text-white font-bold text-lg mb-3">{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="text-white/55 text-sm leading-relaxed mb-3">{p}</p>
              ))}
            </div>
          ))}
          <p className="text-white/30 text-xs mt-12">Last updated: July 16, 2026</p>
        </div>
      </section>
      <Footer />
    </div>
  )
}
