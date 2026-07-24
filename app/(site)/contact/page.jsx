import ContactPage from '../../../src/pages/ContactPage'

export const metadata = {
  title: "Contact Us",
  description: "Book a free discovery call or send us a message — no commitment, no pitch. Just a real conversation about your growth.",
  alternates: { canonical: '/contact' },
}

export default function Page() {
  return <ContactPage />
}
