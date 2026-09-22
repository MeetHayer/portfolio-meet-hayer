import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClickPreview from '@/components/ClickPreview'
import SiteAtmosphere from '@/components/SiteAtmosphere'
import CursorAura from '@/components/CursorAura'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Projects from '@/pages/Projects'
import Writing from '@/pages/Writing'
import Contact from '@/pages/Contact'
import { Helmet } from 'react-helmet-async'

export default function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>Manmeet Singh Hayer</title>
        <meta name="description" content="Finance & Computer Science graduate. FP&A, investment analysis, and automation." />
      </Helmet>

      <svg aria-hidden="true" className="absolute w-0 h-0 overflow-hidden" focusable="false">
        <defs>
          <linearGradient id="click-preview-stroke-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
      <SiteAtmosphere />
      <Header />
      <ClickPreview />
      <main className="relative z-10 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <CursorAura />
    </div>
  )
}
