import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface TechItem {
  name: string;
  slug?: string;
  showLabel?: boolean;
  customIcon?: React.ReactNode;
}

interface TechCategory {
  id: string;
  label: string;
  gridClass: string;
  items: TechItem[];
}

const Technologies: React.FC = () => {
  const restApiIcon = (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="restApiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect x="16" y="16" width="6" height="6" rx="1" stroke="url(#restApiGrad)" />
      <rect x="2" y="16" width="6" height="6" rx="1" stroke="url(#restApiGrad)" />
      <rect x="9" y="2" width="6" height="6" rx="1" stroke="url(#restApiGrad)" />
      <path d="M12 8v8" stroke="url(#restApiGrad)" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" stroke="url(#restApiGrad)" />
    </svg>
  );

  const techCategories: TechCategory[] = [
    {
      id: 'biz-app',
      label: 'FrontEnd Technologies',
      gridClass: 'panel-biz-app',
      items: [
        { name: 'React.js', slug: 'react' },
        { name: 'Next.js', slug: 'nextdotjs' },
        { name: 'TypeScript', slug: 'typescript' },
        { name: 'Tailwind CSS', slug: 'tailwindcss' }
      ]
    },
    {
      id: 'data-ai',
      label: 'Backend Technologies',
      gridClass: 'panel-data-ai',
      items: [
        { name: 'Node.js', slug: 'nodedotjs' },
        { name: 'Express.js', slug: 'express' },
        { name: 'Python', slug: 'python' },
        { name: 'FastAPI', slug: 'fastapi' },
        { name: 'REST APIs', customIcon: restApiIcon, showLabel: true },
        { name: 'AWS', slug: 'amazonwebservices' }
      ]
    },
    {
      id: 'databases',
      label: 'DataBase',
      gridClass: 'panel-databases',
      items: [
        { name: 'MongoDB', slug: 'mongodb', showLabel: true },
        { name: 'PostgreSQL', slug: 'postgresql', showLabel: true }
      ]
    },
    {
      id: 'frontend',
      label: 'Interperior SaaS & ERP',
      gridClass: 'panel-frontend',
      items: []
    },
    {
      id: 'cloud',
      label: 'QA & Automation',
      gridClass: 'panel-cloud',
      items: [
        { name: 'Jenkins', slug: 'jenkins' },
        { name: 'Docker', slug: 'docker' },
        { name: 'Kubernetes', slug: 'kubernetes' },
        { name: 'Git', slug: 'git' },
        { name: 'Linux', slug: 'linux' }
      ]
    },
    {
      id: 'qa',
      label: 'UI/UX & Graphics',
      gridClass: 'panel-qa',
      items: []
    },
    {
      id: 'devops',
      label: 'Digital & Social Media',
      gridClass: 'panel-devops',
      items: []
    }
  ];

  const renderIcon = (item: TechItem) => {
    if (item.customIcon) {
      return item.customIcon;
    }
    if (!item.slug) return null;
    return (
      <img
        src={`/tech-icons/${item.slug}.svg`}
        alt={item.name}
        style={{
          height: '34px',
          width: 'auto',
          maxWidth: '110px',
          objectFit: 'contain'
        }}
        className="transition-all duration-300"
      />
    );
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id="technologies" className="section bg-dark overflow-hidden">
      <div className="container">
        <motion.div
          className="flex flex-col justify-center items-center text-center gap-y-4 mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="badge">Technologies</div>
          <h2 className="tech-stack-title text-h2 font-light">
            Tech stack
          </h2>
          <p className="text-lg text-text-light max-w-4xl">
            We build state-of-the-art applications using industry-leading technologies, frameworks, and modern tools to ensure robust and scalable solutions.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          className="tech-stack-grid mt-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {techCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className={`tech-panel ${category.gridClass}`}
              role="region"
              aria-label={category.label}
            >
              <span className="tech-category-label">{category.label}</span>
              <div className="tech-logo-row">
                {category.items.map((item) => (
                  <div key={item.name} className="tech-logo-item" title={item.name}>
                    {item.showLabel ? (
                      <div className="tech-logo-with-text">
                        {renderIcon(item)}
                        <span className="tech-logo-text">{item.name}</span>
                      </div>
                    ) : (
                      renderIcon(item)
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
