import { redirect } from 'next/navigation'
import { industries } from '../../../../src/data/industries'
import IndustryPage from '../../../../src/pages/IndustryPage'

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const industry = industries[slug]
  if (!industry) return {}
  return {
    title: `Digital Marketing for ${industry.name}`,
    description: industry.subheadline || industry.headline,
    alternates: { canonical: `/for/${slug}` },
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  if (!industries[slug]) redirect('/services')
  return <IndustryPage />
}
