import FAQPage from '../../../src/pages/FAQPage'
import { GROUPS } from '../../../src/data/faqs'

const SITE_URL = 'https://squadtechsol.com'

export const metadata = {
  title: "FAQ — How We Work, Timelines & Pricing",
  description: "Everything brands ask before working with us — how we work, timelines, pricing, and the fine print.",
  alternates: { canonical: '/faq' },
  openGraph: {
    type: 'website',
    title: 'FAQ — How We Work, Timelines & Pricing | Squad Tech Solution',
    description: 'Everything brands ask before working with us — how we work, timelines, pricing, and the fine print.',
    url: `${SITE_URL}/faq`,
  },
}

// FAQPage schema makes these questions eligible for rich results in search.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: GROUPS.flatMap((group) =>
    group.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    }))
  ),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE_URL}/faq` },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FAQPage />
    </>
  )
}
