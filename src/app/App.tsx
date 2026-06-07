import '@/styles/index.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, ProjectDetail } from '@/pages';
import { trackPageView } from '@/services/analytics';

function RouteAnalytics() {
  const location = useLocation();
  useEffect(() => {
    // Defer one tick so document.title reflects the new route
    const id = setTimeout(() => {
      trackPageView(location.pathname + location.search, document.title);
    }, 0);
    return () => clearTimeout(id);
  }, [location.pathname, location.search]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteAnalytics />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
