import { useEffect } from 'react'
import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import Benefits from '../components/Benefits'
import FeaturedProducts from '../components/FeaturedProducts'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import Gallery from '../components/Gallery'
import CTA from '../components/CTA'

const Home = () => {
  useEffect(() => {
    document.title = 'Asalkar Healthy Hub Vita — Pure Cold Pressed Oils for Healthy Living'
  }, [])

  return (
    <>
      <Hero />
      <TrustBar />
      <Benefits />
      <FeaturedProducts />
      <Process />
      <Testimonials />
      <Gallery />
      <CTA />
    </>
  )
}

export default Home