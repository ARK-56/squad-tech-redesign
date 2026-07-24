import { Suspense } from 'react'
import ResourcesPage from '../../../src/pages/ResourcesPage'

export const metadata = {
  title: "Free Marketing Tools & Templates",
  description: "Free frameworks, checklists, and templates from our team — the same ones we use across 200+ client engagements.",
  alternates: { canonical: '/resources' },
}

export default function Page() {
  return (
    <Suspense>
      <ResourcesPage />
    </Suspense>
  )
}
