import { useEffect, useRef, useState } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import WhyChooseUs from './components/WhyChooseUs';
import Sectors from './components/Sectors';
import GlobalNet from './components/GlobalNet';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import Newsletter from './components/Newsletter';
import ContactCTA from './components/ContactCTA';
import { projects, type Project } from './data/projects';
import { useProjectModal } from './contexts/ProjectModalContext';
import { sendContactEmail } from './services/email';

type LinkItem = {
  label: string;
  href: string;
};

type DetailSection = {
  title: string;
  description: string;
};

type ServiceDetail = {
  title: string;
  badge: string;
  description: string;
  intro: string;
  benefits: string[];
  process: DetailSection[];
  deliverables: string[];
  cta: string;
};

const serviceCards = [
  {
    title: 'Web & SaaS Product Development',
    description: 'Build custom scalable web applications, SaaS platforms, admin dashboards and business systems optimized for performance.',
    href: '/services/web-design',
  },
  {
    title: 'Digital Growth & Marketing Strategy',
    description: 'Craft holistic digital plans including SEO, paid ads, funnels and audience targeting to boost visibility and conversions.',
    href: '/services/marketing',
  },
  {
    title: 'Performance Websites & Conversion Design',
    description: 'High-speed responsive websites and landing pages focused on engagement and conversion optimization.',
    href: '/services/web-design',
  },
  {
    title: 'Automation, AI & Smart Integrations',
    description: 'Integrate automation workflows, AI features, APIs and smart tools to enhance productivity and intelligence.',
    href: '/services/automation',
  },
  {
    title: 'Social Media & Paid Campaign Management',
    description: 'Manage brand growth, social media content, Meta & Google ads and ROI-focused performance campaigns.',
    href: '/services/marketing',
  },
  {
    title: 'Cloud, DevOps & Data-Driven Insights',
    description: 'Setup secure cloud infrastructure, CI/CD pipelines, analytics tracking and performance reporting systems.',
    href: '/services/devops',
  },
];

const aboutStats = [
  { value: '5+', label: 'Years Experience' },
  { value: '500+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '25+', label: 'Global Nodes' },
];

const teamMembers = [
  ['Alice Williams', 'Chief Executive Officer'],
  ['John Smith', 'Lead Developer'],
  ['Emma Johnson', 'UI/UX Designer'],
  ['Michael Brown', 'Marketing Manager'],
  ['Olivia Davis', 'Project Manager'],
  ['James Wilson', 'Software Engineer'],
  ['Sophia Martinez', 'Content Strategist'],
  ['Liam Garcia', 'QA Specialist'],
  ['Isabella Rodriguez', 'Customer Success Manager'],
  ['Benjamin Lee', 'DevOps Engineer'],
  ['Mia Hernandez', 'Graphic Designer'],
  ['Elijah Clark', 'Data Analyst'],
];

const faqItems = [
  {
    question: 'What types of projects do you take on?',
    answer: 'We work across brand strategy, websites, design, marketing, SEO, and product launches for startups and growing businesses.',
  },
  {
    question: 'How do we start a project?',
    answer: 'We usually start with a discovery call so we can understand your goals, scope, timeline, and the level of support you need.',
  },
  {
    question: 'Do you handle both design and development?',
    answer: 'Yes. Our workflow is set up to cover visual design, build implementation, and launch support in one place.',
  },
  {
    question: 'Can you help improve an existing website?',
    answer: 'Absolutely. We can refine content, redesign sections, improve performance, or rebuild the site if that is the right move.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Timelines vary by scope, but we keep the process structured so you always know what is happening next.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer: 'Yes. We can stay involved for maintenance, updates, optimization, and future growth work.',
  },
];

const pricingPlans = [
  {
    name: 'Professional Plan',
    price: '$99.00',
    period: 'Per User month',
    features: [
      'Custom Software Development',
      'Scalable Cloud Solutions',
      'Data Analytics & Reporting',
      '3 Workflow Automations',
      'Basic Analytics Dashboard',
      'Ongoing Support',
    ],
  },
  {
    name: 'Enterprise Plan',
    price: '$199.00',
    period: 'Per User month',
    features: [
      'Dedicated Strategy Workshops',
      'Advanced Integrations',
      'Expanded Reporting',
      'Team Training',
      'Priority Support',
      'Custom Roadmap Planning',
    ],
  },
];

const serviceDetails: Record<string, ServiceDetail> = {
  '/services/copy-writer': {
    title: 'Professional Copywriting Services',
    badge: 'Service Details',
    description: 'Transform your brand voice with persuasive copy that makes every landing page, campaign, and message work harder.',
    intro: 'We write clear, benefit-led copy that sounds like your brand and nudges visitors toward action without feeling forced.',
    benefits: ['Brand voice clarity', 'Higher conversion potential', 'Faster campaign launch'],
    process: [
      { title: 'Discovery', description: 'We learn your audience, product, and positioning before writing a single line.' },
      { title: 'Drafting', description: 'We create copy blocks for pages, emails, and campaign assets with a consistent voice.' },
      { title: 'Refinement', description: 'We iterate on the language until the message feels sharp and natural.' },
      { title: 'Delivery', description: 'You get organized copy ready for design, development, and deployment.' },
    ],
    deliverables: ['Landing page copy', 'Email sequences', 'Ad copy', 'Brand messaging guide'],
    cta: 'Need copy that sounds sharper and sells better? Let us shape your message.',
  },
  '/services/marketing': {
    title: 'Digital Marketing Strategy & Campaigns',
    badge: 'Service Details',
    description: 'Accelerate growth with focused digital marketing plans that connect audience insight, creative ideas, and measurable outcomes.',
    intro: 'We turn marketing into a system with clear objectives, channel alignment, and practical reporting so your team knows what is working.',
    benefits: ['Channel clarity', 'Measurable growth', 'Better campaign coordination'],
    process: [
      { title: 'Audit', description: 'We review your current channels, messaging, and audience performance.' },
      { title: 'Strategy', description: 'We define the campaigns and content mix that best supports your goals.' },
      { title: 'Execution', description: 'We roll out targeted assets across the right platforms.' },
      { title: 'Optimization', description: 'We monitor performance and refine the plan to improve results over time.' },
    ],
    deliverables: ['Campaign strategy', 'Content calendar', 'Performance reports', 'Optimization plan'],
    cta: 'Want marketing with more structure and less guesswork? We can build that system.',
  },
  '/services/project-management': {
    title: 'Project Management & Consulting',
    badge: 'Service Details',
    description: 'Bring calm and clarity to your work with a delivery process that keeps teams aligned and moving.',
    intro: 'We help you define scope, set expectations, and keep execution on track so your projects land on time and with fewer surprises.',
    benefits: ['Clear milestones', 'Better team alignment', 'Reduced delivery risk'],
    process: [
      { title: 'Planning', description: 'We map the timeline, responsibilities, and dependencies up front.' },
      { title: 'Coordination', description: 'We keep stakeholders aligned and decisions moving.' },
      { title: 'Tracking', description: 'We monitor progress and identify blockers early.' },
      { title: 'Delivery', description: 'We ensure handoff is clean and the final output is ready for launch.' },
    ],
    deliverables: ['Project plan', 'Timeline management', 'Stakeholder updates', 'Launch checklist'],
    cta: 'Need a steadier delivery process for your next launch? Let us help.',
  },
  '/services/seo': {
    title: 'Search Engine Optimization (SEO)',
    badge: 'Service Details',
    description: 'Improve visibility, attract qualified traffic, and build long-term search performance with a practical SEO system.',
    intro: 'Our SEO work focuses on the fundamentals that move the needle: technical health, keyword targeting, on-page structure, and ongoing monitoring.',
    benefits: ['Better rankings', 'More organic traffic', 'Long-term ROI'],
    process: [
      { title: 'Website Audit', description: 'We identify technical issues, speed concerns, and content gaps that affect visibility.' },
      { title: 'Keyword Research', description: 'We target relevant, high-value terms based on search intent and opportunity.' },
      { title: 'On-Page Work', description: 'We improve headers, copy, metadata, and internal linking across the site.' },
      { title: 'Monitoring', description: 'We track progress, refine priorities, and keep the strategy moving forward.' },
    ],
    deliverables: ['SEO audit', 'Keyword map', 'On-page recommendations', 'Performance tracking'],
    cta: 'Ready to build stronger organic visibility? We will help you get there.',
  },
  '/services/uiux-design': {
    title: 'UI/UX Design Services',
    badge: 'Service Details',
    description: 'Create interfaces that feel modern, easy to use, and aligned with how your customers actually move through a product.',
    intro: 'We design clear, intentional experiences that reduce friction and make every interaction feel natural.',
    benefits: ['Cleaner user flows', 'Stronger usability', 'Higher perceived quality'],
    process: [
      { title: 'Research', description: 'We gather insight from users, stakeholders, and the current experience.' },
      { title: 'Wireframes', description: 'We sketch the structure before polishing the visual layer.' },
      { title: 'Design', description: 'We craft interface systems that feel consistent and premium.' },
      { title: 'Handoff', description: 'We package the work for development with clear guidance.' },
    ],
    deliverables: ['User flows', 'Wireframes', 'Visual design', 'Prototype handoff'],
    cta: 'Need an interface that feels easier and more polished? We can design it.',
  },
  '/services/web-design': {
    title: 'Custom Website Design & Development',
    badge: 'Service Details',
    description: 'Build a site that looks premium, performs well, and gives your brand a confident first impression.',
    intro: 'We combine design and development so the final site feels cohesive, responsive, and easy to manage.',
    benefits: ['Tailored brand presence', 'Responsive build', 'Smooth launch process'],
    process: [
      { title: 'Discovery', description: 'We define the purpose, structure, and visual direction together.' },
      { title: 'Design', description: 'We build the look and feel around your brand and content.' },
      { title: 'Development', description: 'We implement the experience with maintainable frontend code.' },
      { title: 'Launch', description: 'We test, refine, and prepare the site for release.' },
    ],
    deliverables: ['Responsive website', 'Component-based structure', 'Launch-ready pages', 'Style guide support'],
    cta: 'Want a site that feels custom instead of generic? Let’s build it.',
  },
};

const legalPages: Record<string, { title: string; badge: string; description: string; points: string[] }> = {
  '/faq': {
    title: 'Frequently Asked Questions',
    badge: 'FAQ',
    description: 'Quick answers to common questions about our process, timelines, and support.',
    points: [
      'We tailor the process to the project scope.',
      'You will always know the current stage of the work.',
      'We can support both one-off builds and ongoing partnerships.',
    ],
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    badge: 'Legal',
    description: 'We treat your information carefully and only use it to support the work and communication you ask for.',
    points: [
      'We keep contact details for project coordination.',
      'We only share data with tools required to deliver the service.',
      'You can request updates or deletion where applicable.',
    ],
  },
  '/terms-and-condition': {
    title: 'Terms and Condition',
    badge: 'Legal',
    description: 'These terms outline the basic expectations for project scope, communication, and delivery.',
    points: [
      'Scope changes may affect timeline and cost.',
      'Final handoff happens once agreed deliverables are complete.',
      'Any third-party services remain subject to their own terms.',
    ],
  },
  '/teams': {
    title: 'Our Team',
    badge: 'People',
    description: 'A snapshot of the people who help shape the work behind the scenes and in delivery.',
    points: [
      'Design, development, strategy, and support all work together.',
      'We keep the collaboration process practical and responsive.',
      'Every project gets the right mix of specialist skills.',
    ],
  },
  '/career': {
    title: 'Career',
    badge: 'Careers',
    description: 'We are always interested in thoughtful people who care about craft, clarity, and collaboration.',
    points: [
      'We value ownership and communication.',
      'Remote-friendly roles can be discussed by project.',
      'Send us a message if you want to explore future opportunities.',
    ],
  },
  '/career/full-stack-developer': {
    title: 'Full Stack Developer',
    badge: 'Career Details',
    description: 'A flexible role for someone who enjoys building polished frontend experiences and reliable backend integrations.',
    points: [
      'Work across implementation, testing, and refinement.',
      'Collaborate closely with design and content.',
      'Comfort with modern JavaScript and component-based workflows helps a lot.',
    ],
  },
  '/elements': {
    title: 'Elements',
    badge: 'Components',
    description: 'A lightweight showcase of reusable UI pieces used across this template.',
    points: [
      'Cards, badges, buttons, and content sections.',
      'Reusable layout blocks for fast page creation.',
      'A consistent dark neon visual system.',
    ],
  },
};

function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function PageHero({
  badge,
  title,
  description,
  ctas,
  compact,
}: {
  badge: string;
  title: string;
  description: string;
  ctas?: LinkItem[];
  compact?: boolean;
}) {
  return (
    <section className={`page-hero bg-dark relative z-10 overflow-hidden hero-sheen ${compact ? 'pt-24 md:pt-28 pb-10 md:pb-14' : 'pt-24 md:pt-28 pb-16 md:pb-20'}`}>
      <svg
        className="absolute top-0 left-0 -z-1 w-full hidden sm:block"
        width="1920"
        height="907"
        viewBox="0 0 1920 907"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="light-dramatic-entrance" style={{ mixBlendMode: 'plus-lighter' }}>
          <path d="M1920 0V907H0V0H1920Z" fill="url(#pageHeroGlow)"></path>
        </g>
        <defs>
          <radialGradient id="pageHeroGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6"></stop>
            <stop offset="1" stopColor="#3B82F6" stopOpacity="0"></stop>
          </radialGradient>
        </defs>
      </svg>
      <div className="container">
        <div className="flex flex-col items-center text-center pb-4 pt-4">
          <div className="badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-900/50 backdrop-blur-sm motion-pop">
            <span className="text-sm font-medium text-white">{badge}</span>
          </div>
          <h1 className="mt-8 mb-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white max-w-5xl motion-rise">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-text-light max-w-3xl leading-relaxed motion-fade">
            {description}
          </p>
          {ctas ? (
            <div className="flex flex-wrap gap-4 justify-center mt-8 motion-rise motion-delay-2">
              {ctas.map((cta) => (
                <a key={cta.href} href={cta.href} className={cta.href === '/contact' ? 'btn btn-primary' : 'btn'}>
                  {cta.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-y-4 mb-14">
      <div className="badge">{badge}</div>
      <h2 className="text-h2 font-bold">{title}</h2>
      {description ? <p className="text-lg text-text-light max-w-3xl">{description}</p> : null}
    </div>
  );
}

function FeatureGrid({
  items,
}: {
  items: { title: string; description: string; image: string; tags?: string[] }[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {items.map((item) => (
        <div key={item.title} className="card gradient-border bg-secondary/50 overflow-hidden">
          <div className="px-8 sm:px-10 pt-8 sm:pt-10">
            <h3 className="text-h4 font-medium mb-6 gradient-text">{item.title}</h3>
            <p className="text-lg text-text-light mb-8">{item.description}</p>
          </div>
          <div className={`px-8 sm:px-10 ${item.tags ? '' : 'pb-8 sm:pb-10'}`}>
            <img
              alt={item.title}
              loading="lazy"
              className="rounded-2xl h-[240px] sm:h-[300px] object-cover w-full"
              src={item.image}
            />
          </div>
          {item.tags ? (
            <div className="px-8 sm:px-10 pb-8 sm:pb-10 pt-6">
              <div className="flex gap-3 flex-wrap">
                {item.tags.map((tag) => (
                  <span key={tag} className="badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function PortfolioCarouselGrid({
  items,
}: {
  items: Project[];
}) {
  const { openModal } = useProjectModal();

  function Card({ item }: { item: Project }) {
    return (
      <div
        className="card gradient-border bg-dark overflow-hidden flex flex-col"
        style={{ cursor: 'pointer' }}
        onClick={() => openModal(item)}
      >
        <div className="px-5 pt-5 pb-3">
          <h3 className="text-base font-semibold gradient-text mb-1">{item.title}</h3>
          <p className="text-sm text-text-light leading-snug">{item.description}</p>
        </div>
        <div className="mx-5 mb-4 mt-4 rounded-xl overflow-hidden" style={{ height: '170px' }}>
          <img
            alt={item.title}
            src={item.image}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        {item.tags && (
          <div className="px-5 pb-5 flex gap-2 flex-wrap mt-auto">
            {item.tags.map((tag) => (
              <span key={tag} className="badge" style={{ fontSize: '11px', padding: '2px 8px' }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.title} item={item} />
      ))}
    </div>
  );
}

const timelineIcons = ['🔍', '🎨', '⚡', '🚀', '🔧', '📊'];

function Timeline({
  items,
}: {
  items: DetailSection[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item, index) => (
        <div key={item.title} className="card gradient-border bg-secondary/50 relative overflow-hidden" style={{ padding: '20px 22px' }}>
          <div style={{ position: 'absolute', top: '10px', right: '14px', fontSize: '40px', fontWeight: '800', lineHeight: 1, color: 'rgba(59,130,246,0.1)', fontFamily: 'monospace', userSelect: 'none' }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
              {timelineIcons[index] ?? '⚙️'}
            </div>
            <h3 className="text-h5 font-semibold" style={{ paddingRight: '36px' }}>{item.title}</h3>
          </div>
          <p className="text-text-light" style={{ fontSize: '14px' }}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

function BulletGrid({
  items,
}: {
  items: string[];
}) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item) => (
        <li key={item} className="card gradient-border bg-secondary/50 flex items-start gap-3">
          <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-dark text-xs font-semibold">
            ✓
          </span>
          <span className="text-text-light">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-text-light">
          <span className="mt-1 text-primary">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const jobOpenings = [
  {
    title: 'Senior Full Stack Developer',
    location: 'Remote / Global',
    type: 'Full-time',
    description: 'Lead the development of scalable SaaS products using React, Node.js, and TypeScript.',
    href: '/career/full-stack-developer',
  },
  {
    title: 'UI/UX Product Designer',
    location: 'Remote',
    type: 'Full-time',
    description: 'Craft intuitive and beautiful digital experiences for our global clients.',
    href: '/contact',
  },
  {
    title: 'Digital Growth Strategist',
    location: 'Remote',
    type: 'Full-time',
    description: 'Drive measurable results through SEO, paid campaigns, and performance marketing.',
    href: '/contact',
  },
];

const careerBenefits = [
  { title: 'Remote-First', icon: '🌍', desc: 'Work from anywhere in the world with a flexible schedule.' },
  { title: 'Growth Budget', icon: '📈', desc: 'Annual budget for courses, books, and conferences.' },
  { title: 'Premium Health', icon: '🏥', desc: 'Comprehensive health and wellness coverage for you and your family.' },
  { title: 'Modern Tech', icon: '💻', desc: 'Work with the latest tools and technologies in a fast-paced environment.' },
];

function CareerBenefitIcon({ title }: { title: string }) {
  const shared = {
    className: 'w-6 h-6 text-white',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (title === 'Remote-First') {
    return (
      <svg {...shared}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c3 3 3 15 0 18" />
        <path d="M12 3c-3 3-3 15 0 18" />
      </svg>
    );
  }

  if (title === 'Growth Budget') {
    return (
      <svg {...shared}>
        <path d="M4 20h16" />
        <path d="M7 16v-4" />
        <path d="M12 16V9" />
        <path d="M17 16V6" />
      </svg>
    );
  }

  if (title === 'Premium Health') {
    return (
      <svg {...shared}>
        <rect x="4.5" y="6.5" width="15" height="11" rx="2.5" />
        <path d="M12 9v6" />
        <path d="M9 12h6" />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <rect x="3.5" y="5" width="17" height="12" rx="1.8" />
      <path d="M8 19h8" />
      <path d="M10 17h4" />
    </svg>
  );
}

function HomePage() {
  usePageTitle('Vortex Cubes | Scalable Systems & SaaS Platforms');

  return (
    <>
      <Hero />
      <WhyChooseUs />
      <Sectors />
      <Services />
      <GlobalNet />
      <Testimonials />
      <Projects />
      <FAQSection />
      <Newsletter />
      <ContactCTA />
    </>
  );
}

function AboutPage() {
  usePageTitle('About Us | Vortex Cubes');

  return (
    <>
      <PageHero
        badge="About Us"
        title="We create impactful experiences for every client."
        description="We are a group of creators and problem-solvers who combine strategy, design, and development to build thoughtful digital experiences."
        ctas={[
          { label: 'View Services', href: '/services' },
          { label: 'Contact Us', href: '/contact' },
        ]}
      />

      <section className="section bg-dark">
        <div className="container">
          <SectionTitle
            badge="Who We Are"
            title="We create impactful experiences for our clients every time"
            description="The goal is simple: create digital work that feels clear, reliable, and memorable."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="card gradient-border bg-secondary/50 text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-text-light">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-dark">
        <div className="container">
          <SectionTitle
            badge="Core Values"
            title="The principles that define how we work"
            description="Our team balances collaboration, innovation, and integrity on every project."
          />
          <FeatureGrid
            items={[
              {
                title: 'Collaboration',
                description: 'We work closely with clients and keep communication open from discovery to delivery.',
                image: '/Neonspark_files/banner-shape.png',
              },
              {
                title: 'Innovation',
                description: 'We stay curious and apply modern tools in ways that support the actual business goal.',
                image: '/Neonspark_files/vortexCart.png',
              },
              {
                title: 'Integrity',
                description: 'We value transparency, honest feedback, and a process that is easy to trust.',
                image: '/Neonspark_files/LuminaMarketplace.png',
              },
              {
                title: 'Craft',
                description: 'We care about the small details because they shape the whole experience.',
                image: '/Neonspark_files/ZenithD2C.png',
              },
            ]}
          />
        </div>
      </section>

      <section className="section bg-dark">
        <div className="container">
          <SectionTitle
            badge="How We Work"
            title="A simple, strategic workflow"
            description="We keep the process structured so every project has momentum and clarity."
          />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <svg width="520" height="520" viewBox="0 0 520 520" style={{ maxWidth: '100%' }} aria-label="Agile workflow diagram" role="img">
              <defs>
                <style>{`
                  @keyframes dashFlow { to { stroke-dashoffset: -90; } }
                  @keyframes halo { 0%,100% { opacity: .65; } 50% { opacity: .95; } }
                `}</style>
                <radialGradient id="agileGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(260 120) rotate(90) scale(340 340)">
                  <stop stopColor="rgba(255,255,255,0.16)" />
                  <stop offset="0.5" stopColor="rgba(255,255,255,0.08)" />
                  <stop offset="1" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <linearGradient id="ringGrad" x1="110" y1="110" x2="410" y2="410" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0.95" />
                </linearGradient>
                <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="rgba(0,0,0,0.65)" />
                </filter>
              </defs>
              <circle cx="260" cy="260" r="230" fill="url(#agileGlow)" style={{ animation: 'halo 3.2s ease-in-out infinite' }} />
              <circle cx="260" cy="260" r="190" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
              <circle cx="260" cy="260" r="190" fill="none" stroke="url(#ringGrad)" strokeWidth="3" strokeDasharray="12 10" style={{ animation: 'dashFlow 3.2s linear infinite' }} opacity="0.85" />
              <g filter="url(#nodeShadow)">
                <circle cx="260" cy="260" r="54" fill="rgba(10,10,10,0.82)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
                <circle cx="260" cy="260" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              </g>
              <text x="260" y="255" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" fontFamily="system-ui, -apple-system, Segoe UI, sans-serif" letterSpacing="2">AGILE</text>
              <text x="260" y="276" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="10" fontWeight="600" fontFamily="system-ui, -apple-system, Segoe UI, sans-serif" letterSpacing="1.6">WORKFLOW</text>

              <g transform="translate(260 70)" filter="url(#nodeShadow)">
                <circle r="48" fill="rgba(10,10,10,0.82)" stroke="#ffffff" strokeWidth="2.2" />
                <circle r="48" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
                <g transform="translate(-14 -16)" stroke="white" strokeOpacity="0.9" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="10" cy="10" r="7" />
                  <path d="M16 16 L23 23" />
                </g>
                <text y="18" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="system-ui, -apple-system, Segoe UI, sans-serif">Discover</text>
              </g>

              <g transform="translate(450 260)" filter="url(#nodeShadow)">
                <circle r="48" fill="rgba(10,10,10,0.82)" stroke="#ffffff" strokeWidth="2.2" />
                <circle r="48" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
                <g transform="translate(-16 -18)" stroke="white" strokeOpacity="0.9" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 20 L18 8" />
                  <path d="M18 8 L22 12" />
                  <path d="M6 20 L10 24" />
                  <path d="M10 24 L22 12" />
                </g>
                <text y="18" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="system-ui, -apple-system, Segoe UI, sans-serif">Design</text>
              </g>

              <g transform="translate(260 450)" filter="url(#nodeShadow)">
                <circle r="48" fill="rgba(10,10,10,0.82)" stroke="#ffffff" strokeWidth="2.2" />
                <circle r="48" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
                <g transform="translate(-17 -18)" stroke="white" strokeOpacity="0.9" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 8 L4 14 L10 20" />
                  <path d="M24 8 L30 14 L24 20" />
                  <path d="M18 6 L16 22" />
                </g>
                <text y="18" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="system-ui, -apple-system, Segoe UI, sans-serif">Develop</text>
              </g>

              <g transform="translate(70 260)" filter="url(#nodeShadow)">
                <circle r="48" fill="rgba(10,10,10,0.82)" stroke="#ffffff" strokeWidth="2.2" />
                <circle r="48" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
                <g transform="translate(-16 -18)" stroke="white" strokeOpacity="0.9" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18 L22 18" />
                  <path d="M22 18 L18 14" />
                  <path d="M22 18 L18 22" />
                  <path d="M10 10 L18 10" />
                  <path d="M10 26 L18 26" />
                </g>
                <text y="18" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="system-ui, -apple-system, Segoe UI, sans-serif">Deliver</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

    </>
  );
}

function ServicesPage() {
  usePageTitle('Services | Vortex Cubes');

  return (
    <>
      <PageHero
        badge="Our Services"
        title="Expert IT services designed to elevate your business"
        description="We craft impactful experiences for your customers, transforming their journey and ensuring every interaction feels intentional."
        compact
        ctas={[
          { label: 'Book a Call', href: '/contact' },
          { label: 'View Projects', href: '/portfolio' },
        ]}
      />

      <section className="section bg-dark" style={{ paddingTop: '40px' }}>
        <div className="container">
          <SectionTitle
            badge="Services"
            title="Everything your digital presence needs"
            description="From strategy to execution, we keep the work cohesive so your brand feels consistent everywhere."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCards.map((service) => {
              return (
                <div
                  key={service.title}
                  className="card gradient-border bg-dark relative overflow-hidden flex flex-col"
                  style={{
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                    transform: 'translateY(0)',
                    minHeight: '320px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-12px)';
                    e.currentTarget.style.boxShadow =
                      '0 25px 50px rgba(59, 130, 246, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Animated Border SVG */}
                  <svg
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                  >
                    <path
                      className="animate-svg-path"
                      d="M0,0 L100,0 L100,100 L0,100 Z"
                    />
                  </svg>

                  <div className="px-6 pt-6 pb-6 relative z-10 flex flex-col h-full">

                    {/* Top Content */}
                    <div>
                      <h3 className="text-xl font-semibold gradient-text mb-4 leading-snug">
                        {service.title}
                      </h3>

                      <p
                        className="text-[15px] text-text-light"
                        style={{ lineHeight: '1.8' }}
                      >
                        {service.description}
                      </p>
                    </div>

                    {/* Bottom Right Button */}
                    <div className="mt-auto flex justify-end pt-6">
                      <a
                        href="/portfolio"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-300 text-sm font-medium text-white group"
                      >
                        Learn More

                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function PortfolioPage() {
  usePageTitle('Portfolio | Vortex Cubes');

  return (
    <>
      <PageHero
        badge="Portfolio"
        title="Your tomorrow, enhanced today with tech forward thinking"
        description="We craft digital experiences that help teams move faster, convert better, and show up more confidently."
        ctas={[
          { label: 'Start a Project', href: '/contact' },
          { label: 'Browse Services', href: '/services' },
        ]}
      />
      <section className="section bg-dark">
        <div className="container">
          <SectionTitle
            badge="Recent Projects"
            title="Selected work and outcomes"
            description="A few examples of how we approach design, development, and product experience."
          />
          <PortfolioCarouselGrid items={projects} />
        </div>
      </section>
    </>
  );
}

function CareerPage() {
  usePageTitle('Careers | Vortex Cubes');

  return (
    <>
      <PageHero
        badge="Join the Team"
        title="Build the future of digital products with us"
        description="We are always looking for passionate individuals who care about craft, collaboration, and creating meaningful work."
        ctas={[
          { label: 'View Openings', href: '#openings' },
          { label: 'Our Culture', href: '#culture' },
        ]}
      />

      <section id="culture" className="section bg-dark">
        <div className="container">
          <SectionTitle
            badge="Our Culture"
            title="A place where craft meets collaboration"
            description="We believe that the best work happens when talented people are given the autonomy and support they need to excel."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerBenefits.map((benefit, i) => (
              <div key={benefit.title} className="card gradient-border bg-secondary/50 relative overflow-hidden hover:scale-105 transition-all" style={{ padding: '20px 22px' }}>
                <div style={{ position: 'absolute', top: '10px', right: '14px', fontSize: '36px', fontWeight: '800', lineHeight: 1, color: 'rgba(255,255,255,0.18)', fontFamily: 'monospace', userSelect: 'none' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div className="w-9 h-9 rounded-lg bg-black/40 flex items-center justify-center">
                    <CareerBenefitIcon title={benefit.title} />
                  </div>
                  <h3 className="text-base font-bold" style={{ paddingRight: '32px' }}>{benefit.title}</h3>
                </div>
                <p className="text-text-light" style={{ fontSize: '13px', lineHeight: '1.6' }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="openings" className="section bg-dark">
        <div className="container">
          <SectionTitle
            badge="Open Positions"
            title="Current opportunities"
            description="Explore our active openings and see where you might fit into the team."
          />
          <div className="space-y-6 max-w-4xl mx-auto">
            {jobOpenings.map((job) => (
              <div key={job.title} className="card gradient-border bg-secondary/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 hover:border-primary transition-all group">
                <div>
                  <div className="flex gap-3 mb-2">
                    <span className="text-primary text-sm font-semibold">{job.location}</span>
                    <span className="text-text-light text-sm">•</span>
                    <span className="text-text-light text-sm">{job.type}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-text-light">{job.description}</p>
                </div>
                <a href={job.href} className="btn btn-primary whitespace-nowrap">Apply Now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-dark border-t border-white/5">
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(168,85,247,0.08))', border: '1px solid rgba(168,85,247,0.25)', borderRadius: '20px', padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px' }}>💼</div>
            <div>
              <h2 className="text-3xl font-bold mb-3">Don&apos;t see a perfect fit?</h2>
              <p className="text-text-light max-w-xl mx-auto" style={{ fontSize: '16px', lineHeight: '1.7' }}>
                We are always open to meeting talented people. Send us your resume and tell us how you think you can help Vortex Cubes grow.
              </p>
            </div>
            <a href="/contact" className="btn btn-primary">General Application</a>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  usePageTitle('Contact | Vortex Cubes');

  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = new FormData(e.currentTarget);
    const budget = form.get('budget') as string;
    const message = form.get('message') as string;
    const params = {
      from_name: form.get('from_name') as string,
      from_email: form.get('from_email') as string,
      message: budget ? `${message}\n\nBudget: ${budget}` : message,
      to_name: 'Vortex Cubes',
    };

    try {
      await sendContactEmail(params);
      setStatus('success');
      formRef.current?.reset();
    } catch (err) {
      console.error('Email send error:', err);
      setStatus('error');
      setErrorMsg('Failed to send message. Please try again later.');
    }
  };

  return (
    <>
      <PageHero
        badge="Contact"
        title="Have a project? Let’s talk."
        description="Your ideas are safe with us, and we’re quick to respond with a clear next step."
        ctas={[
          { label: 'Email Us', href: 'mailto:hello@vortexcubes.com' },
          { label: 'View Services', href: '/services' },
        ]}
      />
      <section className="section bg-dark">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="card gradient-border bg-secondary/50">
              <h2 className="text-h3 font-bold mb-6">Tell us about your project</h2>
              <p className="text-text-light mb-8">
                Share a few details and we'll follow up with a plan that fits your timeline and scope.
              </p>
              <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <input className="w-full rounded-lg bg-dark/80 border border-white/10 px-4 py-3 text-white" type="text" name="from_name" placeholder="Your Name" required />
                <input className="w-full rounded-lg bg-dark/80 border border-white/10 px-4 py-3 text-white" type="email" name="from_email" placeholder="Your Email" required />
                <input className="w-full rounded-lg bg-dark/80 border border-white/10 px-4 py-3 text-white" type="text" name="budget" placeholder="Project Budget" />
                <textarea className="w-full rounded-lg bg-dark/80 border border-white/10 px-4 py-3 text-white min-h-[180px]" name="message" placeholder="Tell us about your project" required />
                <button type="submit" className="btn btn-primary justify-center" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending...' : 'Request a project'}
                </button>
                {status === 'success' && (
                  <p className="text-green-400 text-sm mt-2">Message sent successfully! We'll get back to you soon.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-400 text-sm mt-2">{errorMsg}</p>
                )}
              </form>
            </div>
            <div className="card gradient-border bg-secondary/50 flex flex-col justify-center items-center text-center">
              <h3 className="text-h3 font-semibold mb-6">Get in Touch</h3>
              <p className="text-text-light mb-10 text-base leading-relaxed max-w-sm">
                Have questions? Reach out to us directly through any of the channels below. We're here to help and happy to discuss your project.
              </p>
              <div className="space-y-4 text-lg mt-4 w-full">
                <p className="text-white">Email: <a href="mailto:hello@vortexcubes.com" className="hover:text-blue-400 transition">info@vortexcubes.com</a></p>
                <p className="text-white">Phone: <a href="tel:+15551234567" className="hover:text-blue-400 transition">+91 7049820057</a></p>
                <p className="text-white">Address: Indore, M.P - 452010</p>
              </div>
              <a href="mailto:hello@vortexcubes.com" className="btn btn-primary mt-4">Send Email</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <SectionTitle badge="Process" title="What happens next?" description="Here's exactly what to expect after you reach out." />
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 0, position: 'relative', flexWrap: 'wrap' }}>
            {[
              { n: '01', title: 'We review your request', desc: 'Our team reads your submission and responds quickly with an acknowledgment.', color: '#3b82f6' },
              { n: '02', title: 'We clarify scope & goals', desc: 'We ask a few quick questions to understand your timeline, priorities, and constraints.', color: '#a855f7' },
              { n: '03', title: 'We propose next steps', desc: 'We outline the best approach, whether that is a call, a proposal, or a quick start.', color: '#06b6d4' },
              { n: '04', title: 'We keep it simple', desc: 'Communication stays clear, direct, and on your schedule throughout the entire process.', color: '#10b981' },
            ].map((step, i, arr) => (
              <div key={step.n} style={{ flex: '1 1 200px', position: 'relative', textAlign: 'center', padding: '0 16px' }}>
                {i < arr.length - 1 && (
                  <div style={{ position: 'absolute', top: '28px', left: 'calc(50% + 28px)', width: 'calc(100% - 56px)', height: '2px', background: `linear-gradient(90deg, ${step.color}, ${arr[i + 1].color})`, zIndex: 0, pointerEvents: 'none' }} />
                )}
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: `linear-gradient(135deg, ${step.color}33, ${step.color}66)`, border: `2px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', position: 'relative', zIndex: 1, fontSize: '16px', fontWeight: '700', color: 'white' }}>
                  {step.n}
                </div>
                <h4 style={{ fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>{step.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div className="mb-12">
            <h2 className="text-h3 font-bold mb-2 text-center">Visit Our Office</h2>
            <p className="text-text-light text-center mb-8">Find us at our headquarters in the heart of the tech district</p>
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', filter: 'brightness(0.85) contrast(1.1)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.69288440469!2d75.78144833070579!3d22.723951637371997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1779432487563!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0, display: 'block' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceDetailPage({ pathname }: { pathname: string }) {
  const detail = serviceDetails[pathname];

  usePageTitle(`${detail?.title ?? 'Service'} | Vortex Cubes`);

  if (!detail) {
    return <NotFoundPage />;
  }

  return (
    <>
      <PageHero
        badge={detail.badge}
        title={detail.title}
        description={detail.description}
        ctas={[
          { label: 'Book a Call', href: '/contact' },
          { label: 'View Services', href: '/services' },
        ]}
      />
      <section className="section bg-dark">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="card gradient-border bg-secondary/50">
                <h2 className="text-h3 font-bold mb-6">Overview</h2>
                <p className="text-lg text-text-light">{detail.intro}</p>
              </div>
              <div className="card gradient-border bg-secondary/50">
                <h2 className="text-h3 font-bold mb-6">Our Process</h2>
                <Timeline items={detail.process} />
              </div>
            </div>
            <div className="space-y-8">
              <div className="card gradient-border bg-secondary/50">
                <h3 className="text-h4 font-semibold mb-4">Benefits</h3>
                <InfoList items={detail.benefits} />
              </div>
              <div className="card gradient-border bg-secondary/50">
                <h3 className="text-h4 font-semibold mb-4">Deliverables</h3>
                <BulletGrid items={detail.deliverables} />
              </div>
              <div className="card gradient-border bg-secondary/50">
                <p className="text-text-light mb-6">{detail.cta}</p>
                <a href="/contact" className="btn btn-primary w-full justify-center">
                  Start a Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function LegalPage({ pathname }: { pathname: string }) {
  const page = legalPages[pathname];

  usePageTitle(`${page?.title ?? 'Page'} | Vortex Cubes`);

  if (!page) {
    return null;
  }

  return (
    <>
      <PageHero badge={page.badge} title={page.title} description={page.description} />
      <section className="section bg-dark">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="card gradient-border bg-secondary/50">
              <div className="space-y-6">
                {page.points.map((point) => (
                  <p key={point} className="text-lg text-text-light">
                    {point}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function PricingPage() {
  usePageTitle('Pricing | Vortex Cubes');
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="section bg-dark pt-40 md:pt-56 pb-24 md:pb-32 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Content & Toggle */}
          <div className="lg:col-span-5 flex flex-col gap-y-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-900/50 backdrop-blur-sm w-fit">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span className="text-sm font-medium text-white uppercase tracking-wider">Pricing plan</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              Our <span className="italic font-light">Pricing Plan</span>
            </h1>

            <p className="text-lg md:text-xl text-text-light max-w-md leading-relaxed">
              For detailed information on each plan, please contact our team.
            </p>

            <div className="pricing-toggle-container">
              <button
                type="button"
                className={`pricing-toggle-btn ${!isYearly ? 'active' : ''}`}
                onClick={() => setIsYearly(false)}
              >
                monthly
              </button>
              <button
                type="button"
                className={`pricing-toggle-btn ${isYearly ? 'active' : ''}`}
                onClick={() => setIsYearly(true)}
              >
                yearly
              </button>
            </div>
          </div>

          {/* Right Side: Pricing Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className="pricing-card">
                <div className="pricing-card-header">
                  <h3 className="pricing-card-name">{plan.name}</h3>
                  <div className="pricing-card-price">{isYearly ? `$${(parseFloat(plan.price.replace('$', '')) * 10).toFixed(2)}` : plan.price}</div>
                  <p className="pricing-card-period">{isYearly ? 'Per User year' : plan.period}</p>
                </div>

                <div className="mt-4">
                  <h4 className="pricing-features-title">What&apos;s Included</h4>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="pricing-feature-item">
                        <span className="pricing-feature-check">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <a href="/contact" className="pricing-btn w-full block">
                    Choose Plan
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamPage() {
  usePageTitle('Teams | Vortex Cubes');

  return (
    <>
      <PageHero
        badge="Teams"
        title="Meet the talented team who make it happen"
        description="A collaborative group of specialists across design, development, content, and delivery."
      />
      <section className="section bg-dark">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map(([name, role]) => (
              <div key={name} className="card gradient-border bg-secondary/50 text-center">
                <img alt={name} className="w-full h-[240px] rounded-2xl object-cover mb-6" src="/Neonspark_files/CourtneyHenry.png" />
                <h3 className="text-h5 font-semibold">{name}</h3>
                <p className="text-text-light">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FaqPage() {
  usePageTitle('FAQ | Vortex Cubes');

  return (
    <>
      <PageHero
        badge="FAQ"
        title="Frequently asked questions"
        description="A quick reference for common questions about our services, process, and support."
      />
      <section className="section bg-dark">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item) => (
              <div key={item.question} className="card gradient-border bg-secondary/50">
                <h3 className="text-h5 font-semibold mb-4">{item.question}</h3>
                <p className="text-text-light">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function NotFoundPage() {
  usePageTitle('Page Not Found | Vortex Cubes');

  return (
    <>
      <PageHero
        badge="404"
        title="This page could not be found"
        description="The route does not match one of the supported pages in this template."
        ctas={[
          { label: 'Go Home', href: '/' },
          { label: 'Contact', href: '/contact' },
        ]}
      />
    </>
  );
}

export function PageRouter({ pathname }: { pathname: string }) {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';

  if (normalizedPath === '/' || normalizedPath === '') {
    return <HomePage />;
  }

  if (normalizedPath === '/about') return <AboutPage />;
  if (normalizedPath === '/services') return <ServicesPage />;
  if (normalizedPath === '/portfolio' || normalizedPath === '/work') return <PortfolioPage />;
  if (normalizedPath === '/contact') return <ContactPage />;
  if (normalizedPath === '/teams') return <TeamPage />;
  if (normalizedPath === '/faq') return <FaqPage />;
  if (normalizedPath === '/career') return <CareerPage />;
  if (normalizedPath === '/privacy-policy' || normalizedPath === '/terms-and-condition' || normalizedPath === '/elements' || normalizedPath === '/career/full-stack-developer') {
    return <LegalPage pathname={normalizedPath} />;
  }

  if (normalizedPath.startsWith('/services/')) {
    return <ServiceDetailPage pathname={normalizedPath} />;
  }

  return <NotFoundPage />;
}
