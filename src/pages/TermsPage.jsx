'use client'

import PageHero from '../components/PageHero'
import Footer from '../components/Footer'

const sections = [
  {
    title: '1. Agreement',
    body: [
      'These Terms of Service govern your use of squadtechsol.com and the free programs offered on it. By using the site, downloading a resource, or applying to the Writer Program, you agree to these terms. Client service engagements are governed by their own written agreements, which take precedence over these terms where they conflict.',
    ],
  },
  {
    title: '2. Our Payment Model',
    body: [
      'Descriptions of our payment model on this site are summaries. The exact scope, deliverables, guarantee conditions, and payment terms for any engagement are defined in the individual proposal and agreement you sign with us. Marketing statements on this website do not by themselves constitute a contractual guarantee.',
    ],
  },
  {
    title: '3. Free Resources',
    body: [
      'Our downloadable templates, checklists, and guides are free for your business use. You may use and adapt them internally. You may not resell them, redistribute them as your own lead magnets, or remove Squad Tech Solution attribution.',
      'Requesting a resource requires a valid email address; delivery is by email. You can unsubscribe from any follow-up communication at any time.',
    ],
  },
  {
    title: '4. Partner Program — Content Track (Write for Us)',
    body: [
      'Participation in the Writer Program is subject to editorial acceptance. To earn a portfolio page, a writer must have 3 articles approved and published. To keep the portfolio page live, the writer must contribute at least 1 approved article every 45 days; pages of inactive contributors are paused, not deleted, and are restored on the next published article.',
      'Articles published on our blog remain on our blog permanently, credited to the author. Writers retain the right to link to and reference their published work anywhere. We may edit submissions for clarity, SEO, and brand fit, and may decline or remove content at our discretion.',
      'Submissions must be original work, not published elsewhere, and free of undisclosed AI-generated filler, plagiarism, or promotional links to third parties. Portfolio pages carry a "Powered by Squad Tech Solution" credit.',
    ],
  },
  {
    title: '4a. Partner Program — Referral Track',
    body: [
      'A referral qualifies for the reward only when the referred client signs a service agreement with us and pays their first deposit. The reward is one month of our premium Social Media Marketing package on 2–3 platforms chosen by the partner, delivered by our team within 60 days of qualification.',
      'The reward has no cash value, is non-transferable, and cannot be exchanged for other services or discounts. One reward is earned per qualifying referred client. Referrals of existing clients, active prospects already in our pipeline, or the partner\'s own business do not qualify. We may modify or close the referral track for future referrals at any time; qualified rewards are always honoured.',
    ],
  },
  {
    title: '5. Intellectual Property',
    body: [
      'All site content — design, copy, graphics, downloadable resources, and code — is owned by Squad Tech Solution or its licensors and protected by copyright. Guest article copyright is licensed to us for publication as described in Section 4.',
    ],
  },
  {
    title: '6. Acceptable Use',
    body: [
      'You agree not to misuse the site: no scraping at scale, no attempting to access non-public areas, no submitting malicious code through forms, and no using our forms or email flows to send spam.',
    ],
  },
  {
    title: '7. Third-Party Links',
    body: [
      'The site links to third-party platforms (Calendly, LinkedIn, Trustpilot, WhatsApp, social networks). We are not responsible for their content or privacy practices; your use of them is governed by their own terms.',
    ],
  },
  {
    title: '8. Disclaimers',
    body: [
      'Content on this site — including blog articles, resources, and statistics — is provided for general information and reflects our experience. It is not legal, financial, or professional advice for your specific situation. Results referenced in case studies and testimonials are specific to those clients and are not a promise of identical outcomes.',
      'The site is provided "as is". To the maximum extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement, and our total liability arising from your use of this website is limited to $100.',
    ],
  },
  {
    title: '9. Governing Law',
    body: [
      'These terms are governed by the laws of the State of New York, United States, without regard to conflict-of-law rules. Disputes will be resolved in the state or federal courts located in New York.',
    ],
  },
  {
    title: '10. Changes & Contact',
    body: [
      'We may update these terms; continued use of the site after changes constitutes acceptance. Questions: inquiry@squadtechsol.com.',
    ],
  },
]

export default function TermsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Legal"
        title="Terms of"
        titleAccent="Service"
        subtitle="The ground rules for using this site, our free resources, and the Writer Program."
        breadcrumbs={[{ label: 'Terms of Service' }]}
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
