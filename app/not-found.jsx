import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'
import WhatsAppWidget from '../src/components/WhatsAppWidget'
import NotFoundPage from '../src/pages/NotFoundPage'

export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <NotFoundPage />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  )
}
