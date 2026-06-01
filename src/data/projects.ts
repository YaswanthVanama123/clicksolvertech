import { Folder, Globe, Smartphone, type LucideIcon } from 'lucide-react';

export type Category = 'Web' | 'Mobile';

export type Project = {
  id: number;
  slug: string;
  title: string;
  client: string;
  category: Category;
  tags: string[];
  desc: string;
  impact: string;
  href?: string;
  icon: LucideIcon;
  gradient: string;
  accentColor: string;
  badgeColor: string;
  details: {
    overview: string[];
    role: string[];
    techStack: { label: string; items: string[] }[];
    features: { title: string; desc: string }[];
    challenges: { challenge: string; solution: string }[];
    outcomes: string[];
  };
};

export const projects: Project[] = [
  {
    id: 1,
    slug: 'enviromaster',
    title: 'Enviromaster',
    client: 'Enterprise Sales Workflow & Pricing Automation',
    category: 'Web',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS', 'LaTeX'],
    desc: 'Enterprise sales automation platform that streamlines proposal creation, service pricing, quotation generation, and sales workflows. Includes dynamic pricing engines, business pricing rules, profitability calculations, and automated PDF generation with LaTeX.',
    impact: 'In production · Dynamic pricing · Automated PDF quotations',
    href: 'https://salesform.enviromasternva.com/',
    icon: Globe,
    gradient: 'from-cyan-500/20 to-blue-500/10',
    accentColor: 'text-cyan-400',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    details: {
      overview: [
        'Enviromaster is an enterprise sales automation platform designed to remove the manual, error-prone work that slows down service-business sales teams. Before the platform, generating a customer proposal meant juggling spreadsheets, static pricing documents, and copy-paste workflows that struggled to scale.',
        'The platform centralises customer proposal creation, service pricing, quotation generation, and the broader sales workflow into a single, structured system — with dynamic pricing rules and automated PDF generation built in.',
      ],
      role: [
        'Designed and built the React.js frontend, including dynamic pricing UIs, proposal builders, and customer management screens.',
        'Built scalable REST APIs and backend services with Node.js and Express.js to power pricing, quotations, and workflow engines.',
        'Modeled and optimized PostgreSQL schemas for pricing rules, service catalogs, proposals, and customer data.',
        'Implemented an automated PDF generation pipeline using LaTeX for proposals, agreements, and customer reports.',
        'Collaborated directly with stakeholders to gather requirements, troubleshoot production issues, and iterate on business logic.',
      ],
      techStack: [
        { label: 'Frontend', items: ['React.js', 'JavaScript', 'HTML & CSS', 'Responsive UI'] },
        { label: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'LaTeX (PDF gen)'] },
        { label: 'Database', items: ['PostgreSQL', 'Optimized queries', 'Relational schema'] },
        { label: 'Infra & DevOps', items: ['Docker', 'AWS', 'Git', 'CI/CD'] },
      ],
      features: [
        { title: 'Dynamic Pricing Engine', desc: 'Configurable pricing that supports service frequency, business rules, and profitability calculations — pricing updates flow through proposals without manual rework.' },
        { title: 'Proposal & Quotation Builder', desc: 'Structured proposal creation that captures customer details, selected services, and pricing — with versioning and reusable templates.' },
        { title: 'Automated PDF Generation', desc: 'LaTeX-powered pipeline that produces professional proposals, agreements, pricing sheets, and customer reports automatically from structured data.' },
        { title: 'Sales Workflow Automation', desc: 'End-to-end workflow that moves a deal from initial customer entry through pricing, proposal, agreement, and hand-off — reducing manual coordination.' },
        { title: 'Scalable REST APIs', desc: 'Clean, documented APIs backing every workflow — designed for performance, testability, and future integrations.' },
        { title: 'Responsive Dashboards', desc: 'Frontend dashboards built for operations teams to track proposals, pricing, and workflow status in real time.' },
      ],
      challenges: [
        { challenge: 'Pricing logic varied widely by customer, service type, frequency, and business rules — making a static pricing model unworkable.', solution: 'Built a configurable pricing engine that treats rules as data, so new pricing scenarios can be added without code changes. Profitability calculations live alongside the pricing rules to keep margins visible at quote time.' },
        { challenge: 'Producing professional, consistent proposal PDFs from structured data — at scale, with branded layouts and dynamic content.', solution: 'Implemented an automated LaTeX pipeline that generates polished PDFs from proposal data. Templates handle branding, sections, and dynamic content blocks, so the same engine produces proposals, agreements, and customer reports.' },
        { challenge: 'Translating evolving business requirements from stakeholders into stable backend workflows.', solution: 'Worked directly with stakeholders to map the workflow, then modeled it as discrete API endpoints and database entities so changes could be made incrementally without destabilizing the whole system.' },
      ],
      outcomes: [
        'Cut down manual proposal preparation by automating pricing and PDF generation end-to-end.',
        'Deepened experience designing flexible domain models (pricing rules as data) instead of hardcoding business logic.',
        'Hands-on experience integrating non-typical tools (LaTeX) into a modern web stack to solve a real product problem.',
        'Built confidence translating ambiguous business rules into shippable software, working directly with stakeholders.',
      ],
    },
  },
  {
    id: 2,
    slug: 'inventory-management',
    title: 'Inventory Management System',
    client: 'Enterprise Inventory Tracking & Operations Platform',
    category: 'Web',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Playwright'],
    desc: 'Full-stack inventory platform for stock operations, tracking, and business workflows. Modules for stock checkout, reconciliation, quantity discrepancy handling, delivery tracking, and real-time updates — with Playwright-based automation for repetitive flows.',
    impact: 'Real-time stock ops · Discrepancy handling · Playwright automation',
    href: 'https://inventory.enviromasternva.com/',
    icon: Folder,
    gradient: 'from-violet-500/20 to-purple-500/10',
    accentColor: 'text-violet-400',
    badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    details: {
      overview: [
        'Inventory accuracy is one of those problems that quietly costs businesses every day — miscounts, missed deliveries, stale data, and reconciliation work that piles up. This platform replaces that with a single source of truth: stock operations, inventory tracking, and the business workflows around them, all in one place.',
        'The system handles the end-to-end inventory lifecycle: checkout, reconciliation, discrepancy handling, delivery tracking, and live updates. Repetitive verification and validation flows are offloaded to Playwright-based automation so the team can focus on real exceptions instead of routine checks.',
      ],
      role: [
        'Designed and built React.js dashboards for stock visibility, checkout flows, and discrepancy management.',
        'Built scalable Node.js / Express APIs for inventory operations, with PostgreSQL as the source of truth.',
        'Modeled inventory schemas to handle real-time updates, quantity discrepancies, and delivery lifecycle events.',
        'Implemented Playwright-based automation for repetitive inventory processes, data validation, and workflow verification — improving operational efficiency.',
        'Containerised the app with Docker and deployed to AWS for reliable, scalable production hosting.',
      ],
      techStack: [
        { label: 'Frontend', items: ['React.js', 'JavaScript', 'Responsive dashboards'] },
        { label: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs'] },
        { label: 'Data', items: ['PostgreSQL', 'Optimized queries', 'Transactional ops'] },
        { label: 'Automation & Infra', items: ['Playwright', 'Docker', 'AWS', 'Git & CI/CD'] },
      ],
      features: [
        { title: 'Stock Checkout', desc: 'Structured checkout flow that moves stock between states reliably, with validation and audit trail.' },
        { title: 'Inventory Reconciliation', desc: 'Tools for matching expected vs actual inventory counts and resolving differences without spreadsheet shuffling.' },
        { title: 'Discrepancy Handling', desc: 'Dedicated workflow for quantity discrepancies — flag, investigate, resolve — with status tracked at every step.' },
        { title: 'Delivery Tracking', desc: 'End-to-end visibility on deliveries, tied back to inventory movements so stock levels stay accurate.' },
        { title: 'Real-time Inventory Updates', desc: "Live updates so dashboards reflect the true state of stock as it changes, not yesterday's snapshot." },
        { title: 'Playwright Workflow Automation', desc: 'Automated runs for repetitive validation, data checks, and operational verification — reduces manual QA load.' },
      ],
      challenges: [
        { challenge: 'Inventory state changes from many places at once — checkout, delivery, reconciliation. Keeping counts accurate under concurrent updates is tricky.', solution: 'Modeled inventory operations as transactional database changes so updates either fully succeed or fully roll back. Real-time UI updates surface the resulting state without users having to refresh.' },
        { challenge: "Repetitive verification steps were eating into the operations team's time and were error-prone when done manually.", solution: "Built Playwright-based automation for the most repetitive flows — validation, workflow checks, and operational verification. The team's time freed up to focus on exceptions instead of routine checks." },
        { challenge: 'Quantity discrepancies needed a clear, auditable resolution path — not a slack thread.', solution: 'Designed a discrepancy workflow with explicit states (flagged, investigating, resolved) and an audit log so every adjustment is traceable.' },
      ],
      outcomes: [
        'Improved inventory visibility and accuracy with real-time dashboards and transactional updates.',
        'Reduced repetitive manual work via Playwright automation — a great lesson in identifying which workflows are worth automating vs which are worth redesigning.',
        'Deeper experience modeling event-driven, state-heavy domains in PostgreSQL.',
        'Sharpened skills in containerization and AWS deployment for production reliability.',
      ],
    },
  },
  {
    id: 3,
    slug: 'clicksolver',
    title: 'ClickSolver',
    client: 'On-Demand Instant Services Platform',
    category: 'Mobile',
    tags: ['React', 'React Native', 'Node.js', 'Express', 'PostgreSQL', 'AWS'],
    desc: 'On-demand services platform connecting customers with nearby service providers for instant bookings. End-to-end flows for service discovery, real-time booking, provider matching, and live status tracking — designed mobile-first for both customer and provider apps.',
    impact: 'Mobile-first · Real-time matching · Live booking lifecycle',
    icon: Smartphone,
    gradient: 'from-emerald-500/20 to-teal-500/10',
    accentColor: 'text-emerald-400',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    details: {
      overview: [
        'ClickSolver is an on-demand services marketplace — think "open the app, find a nearby provider, book in seconds." The product solves the friction of finding trusted service providers when you need help fast, and gives providers a way to receive real-time job requests in their area.',
        'The platform spans a React Native mobile app for customers and providers, a Node.js + Express backend for matching and booking, and a PostgreSQL data layer. Real-time updates keep both sides in sync as a booking progresses.',
      ],
      role: [
        'Built ClickSolver end-to-end as a full-stack team, owning everything from the mobile UI to the backend services.',
        'Designed and built the React Native mobile experience for customers and service providers.',
        'Built backend services in Node.js / Express for booking, provider matching, and real-time status tracking.',
        'Modeled data in PostgreSQL for users, providers, services, bookings, and location-based queries.',
        'Designed UX flows for the moments that matter most: discovery, booking confirmation, provider matching, and live status updates.',
        'Deployed on AWS for reliable, scalable hosting.',
      ],
      techStack: [
        { label: 'Mobile', items: ['React Native', 'JavaScript', 'Native APIs'] },
        { label: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'Real-time updates'] },
        { label: 'Data', items: ['PostgreSQL', 'Location-based queries', 'Booking lifecycle'] },
        { label: 'Infra', items: ['AWS', 'Git & CI/CD'] },
      ],
      features: [
        { title: 'Service Discovery', desc: 'Customers browse and find nearby providers across service categories with location-aware results.' },
        { title: 'Instant Booking', desc: 'One-tap booking flow with confirmation and clear expectations on timing, pricing, and provider details.' },
        { title: 'Provider Matching', desc: 'Matches incoming requests to the right nearby providers based on availability and service type.' },
        { title: 'Real-time Status Tracking', desc: 'Live booking status — accepted, on the way, in progress, completed — visible to both customer and provider.' },
        { title: 'Provider App', desc: 'Companion experience for providers to receive requests, accept jobs, and manage their workflow.' },
        { title: 'Mobile-First UX', desc: 'Designed for the small screen first — fast taps, minimal forms, clear status, offline-tolerant flows.' },
      ],
      challenges: [
        { challenge: 'Matching customers with the right nearby providers in near real-time — and keeping both sides updated as the booking moves through its lifecycle.', solution: 'Modeled bookings as a lifecycle of explicit states with real-time updates pushed to both customer and provider apps, so the UI always reflects the latest state without polling.' },
        { challenge: 'Designing a single codebase that delivers a great experience to two very different users (customers and providers).', solution: 'Built a unified React Native app with role-aware screens and shared infrastructure, so both flows benefit from the same auth, networking, and design system without duplicating code.' },
      ],
      outcomes: [
        'Shipped a full mobile-first product end-to-end — mobile app, APIs, database, and deployment.',
        'Deeper experience with React Native for production mobile apps, not just demos.',
        'Learned to think about consumer UX patiently — the "first 10 seconds" of a service-booking app matter more than feature breadth.',
        'Built intuition for real-time, multi-actor systems — where state has to stay in sync across devices.',
      ],
    },
  },
  {
    id: 4,
    slug: 'salesform-mobile',
    title: 'Inventory Salesform — Mobile App',
    client: 'React Native companion for field sales & inventory',
    category: 'Mobile',
    tags: ['React Native', 'Node.js', 'Express', 'PostgreSQL', 'REST APIs'],
    desc: 'Mobile companion to the Enviromaster sales and inventory platform. Lets field teams capture sales entries, manage stock checkouts, and sync inventory updates on the go — with offline-friendly forms and a touch-first interface.',
    impact: 'Field-ready · Offline-tolerant forms · Same backend as web',
    icon: Smartphone,
    gradient: 'from-amber-500/20 to-orange-500/10',
    accentColor: 'text-amber-400',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    details: {
      overview: [
        "Field teams shouldn't have to wait until they're back at a desktop to log a sale or update inventory. This mobile app extends the Enviromaster web platform into a touch-first tool that field reps can use directly on-site — capturing sales entries, managing stock checkouts, and syncing inventory updates as they happen.",
        'The mobile experience shares the same backend and data model as the web platform, so anything captured on the ground is immediately visible to operations on the web dashboards.',
      ],
      role: [
        'Designed and built the React Native app for sales and inventory workflows in the field.',
        'Reused the existing Enviromaster Node.js / Express APIs and PostgreSQL data model — designing mobile-friendly endpoints where needed.',
        'Built offline-friendly forms that tolerate intermittent connectivity and sync once the device is back online.',
        'Designed the UX with a touch-first mindset — large tap targets, minimal typing, and clear error states.',
      ],
      techStack: [
        { label: 'Mobile', items: ['React Native', 'JavaScript', 'Offline-tolerant forms'] },
        { label: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs'] },
        { label: 'Data', items: ['PostgreSQL', 'Shared schema with web'] },
      ],
      features: [
        { title: 'Field Sales Entry', desc: 'Reps capture sales directly on-site — no double entry, no waiting for desktop access.' },
        { title: 'Stock Checkout', desc: 'Mobile-first checkout flow that updates inventory in real time as items leave the warehouse or are issued.' },
        { title: 'Inventory Sync', desc: 'Tight integration with the central platform so mobile updates flow straight into the web dashboards.' },
        { title: 'Offline-friendly Forms', desc: 'Forms gracefully handle no-signal moments — data is held and synced as soon as connectivity returns.' },
        { title: 'Touch-first Interface', desc: "Big tap targets, minimal typing, and clear visual feedback — designed for hands that aren't always free." },
        { title: 'Shared Backend', desc: 'Reuses the Enviromaster API surface and data model so mobile and web stay perfectly consistent.' },
      ],
      challenges: [
        { challenge: 'Field reps often work in areas with patchy connectivity — a form that fails on submit is worse than no form at all.', solution: 'Built offline-friendly forms that hold submissions locally and sync to the backend once the device is back online, with clear feedback so users know nothing is lost.' },
        { challenge: 'Keeping mobile and web in lockstep without duplicating business logic across two codebases.', solution: 'Reused the existing Enviromaster APIs and PostgreSQL schema as the single source of truth — the mobile app is a new client on top, not a parallel system.' },
      ],
      outcomes: [
        'Brought the sales and inventory workflows to where the work actually happens — out in the field.',
        'Practical experience designing for offline-first, where "the network might fail" is the default assumption.',
        'Reinforced the value of sharing backend infrastructure between web and mobile rather than rebuilding it.',
      ],
    },
  },
];
