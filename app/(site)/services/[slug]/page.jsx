import { redirect } from 'next/navigation'
import { services } from '../../../../src/data/services'
import ServiceDetail from '../../../../src/pages/ServiceDetail'

const SITE_URL = 'https://squadtechsol.com'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      type: 'website',
      title: `${service.title} | Squad Tech Solution`,
      description: service.description,
      url: `${SITE_URL}/services/${slug}`,
    },
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) redirect('/services')

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.longDesc || service.description,
    serviceType: service.title,
    url: `${SITE_URL}/services/${slug}`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} deliverables`,
      itemListElement: (service.features || []).map((feature) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: feature },
      })),
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${SITE_URL}/services/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceDetail />
    </>
  )
}
