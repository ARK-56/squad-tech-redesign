import { redirect } from 'next/navigation'
import { themeCategories } from '../../../../src/data/themes'
import ThemeCategoryPage from '../../../../src/pages/ThemeCategoryPage'

export function generateStaticParams() {
  return Object.keys(themeCategories).map((category) => ({ category }))
}

export async function generateMetadata({ params }) {
  const { category } = await params
  const cat = themeCategories[category]
  if (!cat) return {}
  return {
    title: cat.name,
    description: cat.subheadline,
    alternates: { canonical: `/themes/${category}` },
  }
}

export default async function Page({ params }) {
  const { category } = await params
  if (!themeCategories[category]) redirect('/themes')
  return <ThemeCategoryPage />
}
