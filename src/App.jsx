import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Sections from './components/Sections'
import Footer from './components/Footer'
import Admin from './components/Admin'

function App() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const isAdmin = useMemo(() => hash === '#admin', [hash])

  if (isAdmin) {
    return <Admin />
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-inter">
      <Navbar />
      <Hero />
      <Sections />
      <Footer />
    </div>
  )
}

export default App
