import { lazy, Suspense, useEffect } from 'react';
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

const ScrollStage = lazy(() => import('@/three/ScrollStage'));

export default function Home() {
  const { hash } = useLocation();

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
      <Suspense fallback={null}>
        <ScrollStage className="pointer-events-none fixed inset-0 z-0" />
      </Suspense>

      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 65% at 50% 45%, rgba(3,3,10,0.78) 0%, rgba(3,3,10,0.58) 55%, rgba(3,3,10,0.26) 100%)',
        }}
      />

      <div className="noise-overlay" />

      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
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

      <div className="relative z-10">
        <Footer />
      </div>

      <MobileStickyCTA />
    </div>
  );
}
