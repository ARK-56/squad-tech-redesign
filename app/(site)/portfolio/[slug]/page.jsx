import { redirect } from 'next/navigation'
import { projects } from '../../../../src/data/portfolio'
import { caseStudies } from '../../../../src/data/caseStudies'
import CaseStudyPage from '../../../../src/pages/CaseStudyPage'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  const study = caseStudies[slug]
  return {
    title: `${project.title} — Case Study`,
    description: study?.overview || project.description,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: { images: [project.image] },
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  if (!projects.some((p) => p.slug === slug)) redirect('/portfolio')
  return <CaseStudyPage />
}
