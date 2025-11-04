import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sections from './components/Sections';
import Footer from './components/Footer';
import Admin from './components/Admin';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(typeof window !== 'undefined' && window.location.hash === '#admin');

  useEffect(() => {
    function onHashChange() {
      setIsAdmin(window.location.hash === '#admin');
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (isAdmin) {
    return <Admin />;
  }

  return (
    <div className="font-['Inter','Geist','Manrope',system-ui,Arial] bg-white text-black">
      <Navbar />
      <main>
        <Hero />
        <Sections />
      </main>
      <Footer />
    </div>
  );
}
