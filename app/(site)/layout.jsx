import Navbar from '../../src/components/Navbar'
import Footer from '../../src/components/Footer'
import WhatsAppWidget from '../../src/components/WhatsAppWidget'

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
      <WhatsAppWidget />
    </div>
  )
}
