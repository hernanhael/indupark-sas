import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BotonArriba from './components/BotonArriba'
import ScrollToTop from './components/ScrollToTop'
import Inicio from './pages/Inicio'
import Plano from './pages/Plano'
import Inversion from './pages/Inversion'
import Contacto from './pages/Contacto'

function App() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Inicio />} />
          <Route path="/plano" element={<Plano />} />
          <Route path="/inversion-beneficios" element={<Inversion />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <BotonArriba />
    </>
  )
}

export default App
