import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import Gallery from './pages/Gallery/Gallery.jsx'
import ArtworkDetail from './pages/ArtworkDetail/ArtworkDetail.jsx'
import About from './pages/About/About.jsx'
import Commissions from './pages/Commissions/Commissions.jsx'
import Contact from './pages/Contact/Contact.jsx'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <>
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:id" element={<ArtworkDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/commissions" element={<Commissions />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
