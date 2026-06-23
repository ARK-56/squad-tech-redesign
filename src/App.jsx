import { Analytics } from "@vercel/analytics/react"
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'

const Home = lazy(() => import('./pages/Home'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const StartPage = lazy(() => import('./pages/StartPage'))

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div
        className="w-9 h-9 rounded-full border-2 animate-spin"
        style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopColor: '#e73103' }}
      />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Standalone landing page — no navbar/footer */}
          <Route path="/start" element={<StartPage />} />

          {/* Main site layout */}
          <Route path="/*" element={
            <div className="min-h-screen font-sans">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppWidget />
            </div>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
