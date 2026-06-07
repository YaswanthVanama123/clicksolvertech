import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, Footer, CredentialsMarquee, MobileStickyCTA } from '@/components/layout';
import { ScrollProgress } from '@/components/ui';
import Hero from '@/features/hero';
import Services from '@/features/services';
import TechStack from '@/features/techstack';
import Portfolio from '@/features/portfolio';
import EnviromasterSpotlight from '@/features/enviromaster';
import EngineeringPractices from '@/features/engineering';
import About from '@/features/about';
import Team from '@/features/team';
import LongTerm from '@/features/longterm';
import Testimonials from '@/features/testimonials';
import Faq from '@/features/faq';
import Contact from '@/features/contact';

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
    <div className="bg-bg min-h-screen text-white">
      <div className="noise-overlay" />

      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <CredentialsMarquee />
        <Services />
        <Portfolio />
        <EnviromasterSpotlight />
        <EngineeringPractices />
        <TechStack />
        <Team />
        <LongTerm />
        <About />
        <Testimonials />
        <Faq />
        <Contact />
      </main>

      <Footer />

      <MobileStickyCTA />
    </div>
  );
}
