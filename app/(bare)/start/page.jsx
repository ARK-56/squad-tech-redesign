import { Suspense } from 'react'
import StartPage from '../../../src/pages/StartPage'

export const metadata = {
  title: "Start a Project — Free Strategy Session",
  description: "Fill out the form and our team will review your goals, build a custom plan, and present it to you — completely free.",
  alternates: { canonical: '/start' },
}

export default function Page() {
  return (
    <Suspense>
      <StartPage />
    </Suspense>
  )
}
