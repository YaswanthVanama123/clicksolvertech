import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, Globe, Clock, CheckCircle2, Loader2, MessageSquare, ChevronDown, AlertTriangle, ArrowRight } from 'lucide-react';
import { submitContactMessage } from '../lib/contact';
import { track } from '../lib/analytics';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@clicksolvertech.com',
    sub: 'We reply within 4 business hours',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 302 723 0991',
    sub: 'Mon–Fri, 9am–6pm EST',
  },
  {
    icon: Globe,
    label: 'Website',
    value: 'www.clicksolvertech.com',
    sub: 'Serving globally',
  },
  {
    icon: Clock,
    label: 'Availability',
    value: 'Currently Accepting Projects',
    sub: 'Limited slots for Q2 2026',
  },
];

const services = [
  'Full-Stack Web App',
  'Mobile App (iOS/Android)',
  'Cloud & DevOps',
  'Legacy Modernization',
  'API / Backend',
  'Database Architecture',
  'Security Audit',
  'Other',
];

const budgets = [
  'Prefer not to say',
  'Under $10K',
  '$10K – $50K',
  '$50K – $150K',
  '$150K – $500K',
  '$500K+',
];

// ── Custom Dropdown ─────────────────────────────────────────────────────────
interface CustomSelectProps {
  options: string[];
  value: string;
  placeholder?: string;
  onChange: (val: string) => void;
  required?: boolean;
}

function CustomSelect({ options, value, placeholder = 'Select...', onChange, required }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const displayed = value || placeholder;
  const isPlaceholder = !value;

  return (
    <div ref={ref} className="relative">
      {/* Hidden native input for form validation */}
      {required && (
        <input
          tabIndex={-1}
          required
          value={value}
          onChange={() => {}}
          className="absolute inset-0 opacity-0 pointer-events-none w-full"
        />
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-3 bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-left transition-all focus:outline-none ${
          open
            ? 'border-primary/50 bg-white/[0.06]'
            : 'border-white/[0.08] hover:border-white/[0.15]'
        }`}
      >
        <span className={isPlaceholder ? 'text-slate-600' : 'text-white'}>
          {displayed}
        </span>
        <ChevronDown
          size={15}
          className={`text-slate-500 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-50 mt-2 w-full rounded-xl border border-white/[0.1] overflow-hidden shadow-card"
            style={{ background: '#0D0D1E', backdropFilter: 'blur(20px)' }}
          >
            {options.map((opt) => {
              const isSelected = opt === value;
              return (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => { onChange(opt); setOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors ${
                      isSelected
                        ? 'text-primary-light bg-primary/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-light flex-shrink-0" />
                    )}
                    {!isSelected && <span className="w-1.5 h-1.5 flex-shrink-0" />}
                    {opt}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
// ────────────────────────────────────────────────────────────────────────────

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const id = await submitContactMessage(form);
      track('contact_submit', {
        service: form.service,
        budget: form.budget || 'unspecified',
        has_company: form.company.length > 0,
        submission_id: id,
      });
      setStatus('success');
    } catch (err) {
      console.error('[contact] submit failed', err);
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      track('contact_submit_error');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-primary/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-5">
            <span className="section-badge">
              <MessageSquare size={12} />
              Get In Touch
            </span>
          </div>
          <h2 className="section-title mb-5">
            Let's Build Something{' '}
            <span className="gradient-text">Remarkable</span>
          </h2>
          <p className="section-desc mx-auto">
            Tell us about your project. We'll respond within 4 hours with
            an honest assessment and a path forward.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 xl:gap-14">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card rounded-xl p-5 flex gap-4"
              >
                <div className="card-icon-wrap flex-shrink-0">
                  <info.icon size={18} className="text-primary-light" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium mb-0.5">{info.label}</div>
                  <div className="text-white font-medium text-sm">{info.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{info.sub}</div>
                </div>
              </motion.div>
            ))}

            {/* CEO direct line */}
            <motion.a
              href="mailto:hanithavanama@clicksolvertech.com"
              onClick={() => track('ceo_email_click')}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65 }}
              whileHover={{ y: -3 }}
              className="glass-card rounded-xl p-5 flex items-center gap-4 group hover:border-primary/40 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 font-display font-700 text-white text-base shadow-button">
                VH
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-light mb-0.5">
                  Talk to the founder
                </div>
                <div className="text-white font-display font-600 text-sm">
                  Vanama Krishna Hanitha
                </div>
                <div className="text-xs text-slate-500 truncate">
                  hanithavanama@clicksolvertech.com
                </div>
              </div>
              <ArrowRight
                size={15}
                className="text-slate-500 group-hover:text-primary-light group-hover:translate-x-0.5 transition flex-shrink-0"
              />
            </motion.a>

            {/* Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75 }}
              className="glass-card rounded-xl p-5 bg-gradient-to-br from-primary/10 to-secondary/5"
            >
              <h4 className="font-display font-600 text-white text-sm mb-3">
                The ClickSolver Technologies Promise
              </h4>
              <ul className="space-y-2">
                {[
                  'NDA signed before any discussion',
                  'Free architecture review on engagement',
                  'Weekly sprint demos, no surprises',
                  '30-day post-launch warranty',
                ].map((p) => (
                  <li key={p} className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-3"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-5">
                  <CheckCircle2 size={32} className="text-emerald-400" />
                </div>
                <h3 className="font-display font-700 text-xl text-white mb-3">
                  Message Received!
                </h3>
                <p className="text-slate-400 text-sm leading-[1.8] max-w-sm">
                  Thank you for reaching out. A senior member of our team will
                  review your project and respond within 4 business hours.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setErrorMsg('');
                    setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' });
                  }}
                  className="btn-ghost text-sm mt-6"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-5 sm:p-7 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { name: 'name', label: 'Your Name', placeholder: 'Jane Smith', type: 'text' },
                    { name: 'email', label: 'Work Email', placeholder: 'jane@company.com', type: 'email' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-medium text-slate-400 mb-2">
                        {field.label} <span className="text-primary-light">*</span>
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        required
                        value={(form as any)[field.name]}
                        onChange={handleChange}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">
                      Service Needed <span className="text-primary-light">*</span>
                    </label>
                    <CustomSelect
                      options={services}
                      value={form.service}
                      placeholder="Select a service..."
                      onChange={(val) => setForm({ ...form, service: val })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">
                      Budget Range
                    </label>
                    <CustomSelect
                      options={budgets}
                      value={form.budget}
                      placeholder="Prefer not to say"
                      onChange={(val) => setForm({ ...form, budget: val })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">
                    Tell Us About Your Project <span className="text-primary-light">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe what you're building, your current stack (if any), timeline, and any specific challenges..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.06] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={15} />
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/[0.06] px-4 py-3 text-sm text-rose-200">
                    <AlertTriangle size={15} className="text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-rose-100">Couldn't send your message.</div>
                      <p className="text-rose-300/90 text-xs leading-[1.6] mt-1">
                        {errorMsg || 'Please try again, or email contact@clicksolvertech.com directly.'}
                      </p>
                    </div>
                  </div>
                )}

                <p className="text-center text-xs text-slate-600">
                  We take your privacy seriously. No spam, ever. Your details are used
                  solely to respond to your inquiry.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
