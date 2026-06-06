import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ExploreSheet from './ExploreSheet';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass border-0 py-2.5' : 'bg-transparent py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between gap-3">
          {/* Brand — text only, like Apple */}
          <a
            href="#"
            className="font-display font-[900] text-[1.05rem] sm:text-[1.1rem] text-white tracking-tight whitespace-nowrap min-w-0"
          >
            <span className="hidden sm:inline">
              Click<span className="gradient-text bg-[length:200%_200%] animate-gradient-x">Solver</span>
              <span className="ml-1.5 text-slate-400 font-600">Technologies</span>
            </span>
            <span className="sm:hidden">
              Click<span className="gradient-text bg-[length:200%_200%] animate-gradient-x">Solver</span>
            </span>
          </a>

          {/* Action pills — Apple style */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => setExploreOpen(true)}
              className="inline-flex items-center text-[13px] sm:text-sm font-medium text-white px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.12] hover:bg-white/[0.12] active:scale-95 transition-all"
            >
              Explore
            </button>
            <a
              href="#contact"
              className="inline-flex items-center text-[13px] sm:text-sm font-medium text-white px-4 py-1.5 rounded-full bg-gradient-primary shadow-button hover:shadow-glow active:scale-95 transition-all"
            >
              <span className="hidden sm:inline">Start a Project</span>
              <span className="sm:hidden">Start</span>
            </a>
          </div>
        </div>
      </motion.header>

      <ExploreSheet open={exploreOpen} onClose={() => setExploreOpen(false)} />
    </>
  );
}
