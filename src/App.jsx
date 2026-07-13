import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import BotonArriba from './components/BotonArriba'
import ScrollToTop from './components/ScrollToTop'
import Inicio from './pages/Inicio'
import Mapa from './pages/Mapa'
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
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </AnimatePresence>
      <BotonArriba />
    </>
  )
}

export default App
