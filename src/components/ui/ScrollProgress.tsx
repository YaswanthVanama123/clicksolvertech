import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Slim gradient line at the top of the page that fills as the user scrolls.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22, restDelta: 0.001 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      style={{ scaleX, opacity: show ? 1 : 0 }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-gradient-primary origin-left transition-opacity duration-300 pointer-events-none"
    />
  );
}
