import { ShieldCheck, FileCheck, Globe2, BadgeCheck, Building2, Lock, Sparkles } from 'lucide-react';

const credentials = [
  { icon: BadgeCheck, label: 'GST Registered' },
  { icon: Building2, label: 'Incorporated Entity' },
  { icon: ShieldCheck, label: 'NDA-First Engagements' },
  { icon: FileCheck, label: 'ISO-Aligned Practices' },
  { icon: Globe2, label: 'Serving US & India' },
  { icon: Lock, label: 'Secure by Default' },
  { icon: Sparkles, label: 'Senior Engineering Team' },
];

export default function CredentialsMarquee() {
  return (
    <section
      aria-label="Credentials"
      className="relative border-y border-white/[0.05] py-5 overflow-hidden bg-surface/40"
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      <div className="flex gap-10 whitespace-nowrap animate-marquee">
        {[...credentials, ...credentials].map((c, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 text-slate-400 text-[0.85rem] font-medium flex-shrink-0"
          >
            <c.icon size={15} className="text-primary-light" />
            {c.label}
            <span className="ml-10 w-1 h-1 rounded-full bg-slate-700" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}
