// Shared FAQ content. Lives in its own data module (not inside the page
// component) so the server route can read it to emit FAQPage JSON-LD —
// exports from a 'use client' module become client references and can't
// be consumed server-side.

export const GROUPS = [
  {
    group: 'How We Work',
    faqs: [
      {
        q: 'Is the free website build really free?',
        a: 'Yes. We design and build your complete homepage concept before any payment. You review it, request revisions, and only pay if you decide to move forward. If you don\'t love it, you walk away owing nothing — no kill fee, no invoice.',
      },
      {
        q: 'How can you afford to work before getting paid?',
        a: 'Because 98% of clients who see their preview choose to pay for it. We\'ve done this 200+ times — we know what converts and what impresses, so the model works financially. Confidence in the work is the whole business model.',
      },
      {
        q: 'Am I locked into a long-term contract?',
        a: 'No lock-ins. After the initial project or first retainer month, engagements run month-to-month — no long-term contracts and no cancellation fees. You can adjust, pause, or end your plan with 30 days\' notice, and the exit terms are in writing before you start.',
      },
    ],
  },
  {
    group: 'Working With Us',
    faqs: [
      {
        q: 'How fast can we start?',
        a: 'Discovery calls are usually available within 48 hours. Website concepts take 5–7 business days. Marketing campaigns typically launch within 2 weeks of kickoff. Remote staff placements present candidates within 48 hours.',
      },
      {
        q: 'Who will actually work on my account?',
        a: 'A dedicated cross-functional pod — strategist, designer/developer, and media specialist as your scope needs. You\'ll know their names before you sign, and no juniors run accounts solo.',
      },
      {
        q: 'How do you report results?',
        a: 'Monthly reports minimum, weekly reviews on Scale-tier retainers and above, and real-time dashboard access where the scope includes it. We report revenue-relevant metrics — leads, conversions, ROAS — not just impressions.',
      },
      {
        q: 'Do you work with businesses outside the US?',
        a: 'Yes — we serve clients across the US, UK, Germany, and beyond. The team operates across time zones and all engagements are fully remote-friendly.',
      },
    ],
  },
  {
    group: 'Pricing & Payment',
    faqs: [
      {
        q: 'How much does a website cost?',
        a: 'Our standard business website runs $4,500–$7,000 on approval, landing pages from $800, and e-commerce from $8,000 depending on scope. See the Pricing page for full retainer tiers across every service.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'Bank transfer and all major cards. Retainers bill monthly in advance; project work bills on approval milestones agreed in your proposal.',
      },
      {
        q: 'Can I change or cancel my retainer tier?',
        a: 'Yes — tiers can be upgraded, downgraded, or cancelled with notice per your agreement. Month-to-month means you\'re never trapped in a plan that stopped fitting.',
      },
    ],
  },
  {
    group: 'Free Resources & Partner Program',
    faqs: [
      {
        q: 'Are the downloadable resources really free?',
        a: 'Completely. You enter your email, we send the PDF. You can unsubscribe from follow-ups with one click and keep the resource.',
      },
      {
        q: 'How does the referral reward work?',
        a: 'Introduce us to a business that needs marketing, design, or development. When they sign a contract and pay their first deposit, you receive one month of premium social media marketing (a $2,800 package) managed entirely by our team, on 2–3 platforms of your choice. Details on the Partner Program page.',
      },
      {
        q: 'How does the writer track work?',
        a: 'Pitch us article ideas, publish 3 approved articles with your byline, and our design team builds and hosts your professional writer portfolio page free. One new article every 45 days keeps it live. Full details on the Partner Program page.',
      },
    ],
  },
]
