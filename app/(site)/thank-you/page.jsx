import { Suspense } from 'react'
import ThankYouPage from '../../../src/pages/ThankYouPage'

export const metadata = {
  title: "Thank You",
  alternates: { canonical: '/thank-you' },
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <Suspense>
      <ThankYouPage />
    </Suspense>
  )
}
