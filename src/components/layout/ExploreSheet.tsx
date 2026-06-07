import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronRight,
  Layers,
  Folder,
  Building2,
  Workflow,
  Users,
  MessageSquare,
  MessageCircleQuestion,
  ArrowRight,
} from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const sections = [
  { id: 'services', label: 'Services', icon: Layers },
  { id: 'portfolio', label: 'Our Work', icon: Folder },
  { id: 'enviromaster', label: 'Enviromaster', icon: Building2 },
  { id: 'how-we-ship', label: 'How We Ship', icon: Workflow },
  { id: 'about', label: 'About Us', icon: Users },
  { id: 'faq', label: 'FAQ', icon: MessageCircleQuestion },
  { id: 'contact', label: 'Contact', icon: MessageSquare },
];

const footerLinks = [
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Talk to the Founder', href: 'mailto:hanithavanama@clicksolvertech.com' },
];

export default function ExploreSheet({ open, onClose }: Props) {
  // Esc to close + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const handleSectionClick = (id: string) => {
    onClose();
    // Wait for sheet exit, then scroll
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update hash without re-triggering scroll
      history.replaceState(null, '', `#${id}`);
    }, 220);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-start justify-center"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '-4%', opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '-4%', opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:max-w-2xl m-0 sm:m-6 max-h-[100dvh] sm:max-h-[88vh] overflow-hidden rounded-none sm:rounded-3xl border-0 sm:border border-white/[0.08] shadow-card flex flex-col"
            style={{
              background: 'rgba(8, 8, 20, 0.96)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Explore ClickSolver"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white text-bg flex items-center justify-center shadow-button active:scale-95 transition"
            >
              <X size={17} strokeWidth={2.5} />
            </button>

            <div className="overflow-y-auto px-5 sm:px-8 pt-6 pb-8 sm:pt-9 sm:pb-10">
              {/* Brand block */}
              <div className="mb-7 pr-14">
                <h2 className="font-display font-[800] text-white text-2xl tracking-tight mb-1">
                  Click<span className="gradient-text bg-[length:200%_200%] animate-gradient-x">Solver</span>{' '}
                  Technologies
                </h2>
                <p className="text-slate-400 text-sm leading-snug">
                  Engineering smart solutions. Serving US &amp; India.
                </p>
              </div>

              {/* Section nav grid */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSectionClick(s.id)}
                      className="flex items-center justify-between gap-2 py-3.5 text-left text-white text-base sm:text-[1.05rem] font-display font-600 hover:text-primary-light active:scale-[0.99] transition group"
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <s.icon size={15} className="text-slate-500 group-hover:text-primary-light transition flex-shrink-0" />
                        <span className="truncate">{s.label}</span>
                      </span>
                      <ChevronRight size={14} className="text-slate-600 group-hover:text-primary-light transition flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer links */}
              <div className="pt-5 border-t border-white/[0.06] flex flex-col gap-3">
                {footerLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={(e) => {
                      if (l.href.startsWith('#')) {
                        e.preventDefault();
                        handleSectionClick(l.href.slice(1));
                      } else {
                        onClose();
                      }
                    }}
                    className="inline-flex items-center justify-between gap-2 text-primary-light hover:text-white text-[15px] font-medium active:scale-[0.99] transition"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {l.label}
                      <ArrowRight size={13} />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
