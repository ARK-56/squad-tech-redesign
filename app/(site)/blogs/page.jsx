import BlogPage from '../../../src/pages/BlogPage'

export const metadata = {
  title: "Blog — Marketing Strategies & Insights",
  description: "Practical marketing frameworks, case studies, and hard-won lessons from the team behind 200+ delivered projects.",
  alternates: { canonical: '/blogs' },
}

export default function Page() {
  return <BlogPage />
}
