import ResourcesLandingPage from '../../../../src/pages/ResourcesLandingPage'

export const metadata = {
  title: "Free Marketing Resources",
  alternates: { canonical: '/lp/resources' },
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ResourcesLandingPage />
}
