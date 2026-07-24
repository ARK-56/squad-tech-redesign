import { redirect } from 'next/navigation'
import { authors } from '../../../../src/data/authors'
import WriterPage from '../../../../src/pages/WriterPage'

export function generateStaticParams() {
  return Object.keys(authors).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const author = authors[slug]
  if (!author) return {}
  return {
    title: `${author.name} — ${author.role}`,
    description: author.bio,
    alternates: { canonical: `/writers/${slug}` },
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  if (!authors[slug]) redirect('/writers')
  return <WriterPage />
}
