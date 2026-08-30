import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, ArrowUpRight, Mail } from 'lucide-react';
import { COMPANY_EMAIL, COMPANY_MAILTO } from '@/data/contact';

type FooterLink = { label: string; href: string };

const footerLinks: Record<string, FooterLink[]> = {
  Services: [
    { label: 'Full-Stack Web', href: '#services' },
    { label: 'Mobile Apps', href: '#services' },
    { label: 'Cloud & DevOps', href: '#services' },
    { label: 'Database Design', href: '#services' },
    { label: 'Security', href: '#services' },
    { label: 'Legacy Modernization', href: '#services' },
  ],
  Company: [
    { label: 'What We Build', href: '/what-we-build' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Work', href: '#portfolio' },
    { label: 'Tech Stack', href: '#tech' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
  Technologies: [
    { label: 'React & Node.js', href: '#tech' },
    { label: 'Spring Boot', href: '#tech' },
    { label: 'Django & .NET', href: '#tech' },
    { label: 'Flutter & RN', href: '#tech' },
    { label: 'AWS / GCP / Azure', href: '#tech' },
    { label: 'Kubernetes', href: '#tech' },
  ],
};

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] pt-14 md:pt-20 pb-8 md:pb-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/[0.04] rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative glass rounded-2xl p-7 sm:p-10 md:p-14 text-center mb-14 md:mb-20 overflow-hidden border border-white/[0.08]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-secondary/[0.05]" />
          <div className="relative z-10">
            <h2 className="font-display font-[900] text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-4">
              Ready to build something{' '}
              <span className="gradient-text">extraordinary?</span>
            </h2>
            <p className="text-slate-400 text-base mb-8 max-w-xl mx-auto">
              Partner with ClickSolver Technologies — the engineering team behind
              Enviromaster, ClickSolver, and full-stack platforms shipped across India and the US.
            </p>
            <a
              href="#contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Start the Conversation
              <ArrowUpRight size={17} />
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-14">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <img
                src="/logo.png"
                alt="ClickSolver Technologies"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-display font-800 text-[1.1rem] text-white">
                Click<span className="gradient-text">Solver</span>
                <span className="ml-1.5 text-slate-400 font-600">Technologies</span>
              </span>
            </a>
            <p className="text-slate-500 text-sm leading-[1.8] mb-6 max-w-[220px]">
              Enterprise software engineering. Built by seniors.
              Delivered with precision.
            </p>
            <a
              href={COMPANY_MAILTO}
              className="flex w-fit items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors mb-6 break-all"
            >
              <Mail size={14} className="text-primary-light flex-shrink-0" />
              {COMPANY_EMAIL}
            </a>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/40 transition-all border border-white/[0.07]"
                  aria-label={s.label}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-600 text-white text-sm mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} ClickSolver Technologies. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
