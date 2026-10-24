import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, MessageCircle } from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import IntroAnimation from './components/IntroAnimation'
import Chatbot from './components/Chatbot'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Appointment from './pages/Appointment'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem('gi-intro-seen'))
  const [top, setTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { window.scrollTo({top:0, behavior:'instant'}) }, [location.pathname])
  return <>
    {showIntro && <IntroAnimation onFinish={() => {sessionStorage.setItem('gi-intro-seen','1'); setShowIntro(false)}} />}
    <ScrollProgress />
    <Navbar />
    <AnimatePresence mode="wait">
      <motion.main key={location.pathname} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:.35}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
    <Footer />
    <WhatsAppButton />
    <Chatbot />
    {top && <button className="back-top" aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}><ArrowUp size={18}/></button>}
  </>
}
