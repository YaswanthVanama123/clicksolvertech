import type { Variants, Transition } from 'framer-motion';

/** The site's signature easing curve — matches CSS `cubic-bezier(0.22, 1, 0.36, 1)` */
export const ease: Transition['ease'] = [0.22, 1, 0.36, 1];

/** Standard fade-up: opacity 0 + 24px below → opacity 1 + final position */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

/** Smaller, snappier fade-up for inline elements */
export const fadeUpSm: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

/** Pure fade with no movement */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease } },
};

/** Slide-in from the left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

/**
 * Stagger container — children with `fadeUp`/`fadeUpSm`/`fade` will animate
 * in sequence when the container becomes visible.
 *
 *   <motion.div variants={stagger(0.08, 0.1)} initial="hidden" whileInView="visible">
 *     <motion.div variants={fadeUp}>...</motion.div>
 *     <motion.div variants={fadeUp}>...</motion.div>
 *   </motion.div>
 */
export const stagger = (childDelay = 0.08, initialDelay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: childDelay, delayChildren: initialDelay },
  },
});

/** Default `whileInView` config used across the site */
export const inViewOnce = {
  once: true as const,
  margin: '-80px' as const,
};
