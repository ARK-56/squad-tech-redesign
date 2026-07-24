'use client'

import Hero from '../components/Hero'
import Clients from '../components/Clients'
import Services from '../components/Services'
import WorkEthic from '../components/WorkEthic'
import About from '../components/About'
import Portfolio from '../components/Portfolio'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Blog from '../components/Blog'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Services />
      <WorkEthic />
      <About />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Blog />
      <Contact />
      <Footer />
    </>
  )
}
