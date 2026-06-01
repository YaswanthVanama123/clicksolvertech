import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import TechStack from '../components/TechStack';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import Team from '../components/Team';
import LongTerm from '../components/LongTerm';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const { hash } = useLocation();

  // When the route includes a hash (e.g. arriving at /#portfolio from a detail page),
  // scroll to that section once it has mounted.
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0 });
      return;
    }
    const id = hash.slice(1);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [hash]);

  return (
    <div className="bg-bg text-white min-h-screen">
      <div className="noise-overlay" />

      <Navbar />

      <main>
        <Hero />
        <Services />
        <Portfolio />
        <TechStack />
        <Team />
        <LongTerm />
        <About />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
