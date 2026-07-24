import ThemesHubPage from '../../../src/pages/ThemesHubPage'

export const metadata = {
  title: "WordPress Theme Directory — Honest Reviews",
  description: "Hand-picked WordPress themes with honest, hands-on reviews from our development team — what's genuinely good, what will fight you, and who each one is for.",
  alternates: { canonical: '/themes' },
}

export default function Page() {
  return <ThemesHubPage />
}
