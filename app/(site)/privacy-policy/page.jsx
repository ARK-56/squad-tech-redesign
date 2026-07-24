import PrivacyPolicyPage from '../../../src/pages/PrivacyPolicyPage'

export const metadata = {
  title: "Privacy Policy",
  description: "What we collect, why we collect it, and the choices you have.",
  alternates: { canonical: '/privacy-policy' },
}

export default function Page() {
  return <PrivacyPolicyPage />
}
