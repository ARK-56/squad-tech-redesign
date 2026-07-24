import { redirect } from 'next/navigation'
import { services } from '../../../../src/data/services'
import { serviceLandings } from '../../../../src/data/serviceLandings'
import ServiceLandingPage from '../../../../src/pages/ServiceLandingPage'

export function generateStaticParams() {
  return Object.keys(serviceLandings).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  const landing = serviceLandings[slug]
  if (!service || !landing) return {}
  return {
    title: service.title,
    description: landing.subheadline,
    alternates: { canonical: `/lp/${slug}` },
    // Paid-traffic landing pages — intentionally kept out of search
    robots: { index: false, follow: false },
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  if (!services.some((s) => s.slug === slug) || !serviceLandings[slug]) redirect('/services')
  return <ServiceLandingPage />
}
