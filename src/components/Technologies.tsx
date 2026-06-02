import React from 'react';
import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  slug?: string;
  customIcon?: React.ReactNode;
}

const Technologies: React.FC = () => {
  const restApiIcon = (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M12 8v8" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
    </svg>
  );

  const techItems: TechItem[] = [
    { name: 'React.js', slug: 'react' },
    { name: 'Next.js', slug: 'nextdotjs' },
    { name: 'Node.js', slug: 'nodedotjs' },
    { name: 'Express.js', slug: 'express' },
    { name: 'MongoDB', slug: 'mongodb' },
    { name: 'PostgreSQL', slug: 'postgresql' },
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'Python', slug: 'python' },
    { name: 'FastAPI', slug: 'fastapi' },
    { name: 'LangChain', slug: 'langchain' },
    { name: 'Docker', slug: 'docker' },
    { name: 'Kubernetes', slug: 'kubernetes' },
    { name: 'AWS', slug: 'amazonaws' },
    { name: 'Jenkins', slug: 'jenkins' },
    { name: 'Terraform', slug: 'terraform' },
    { name: 'Git', slug: 'git' },
    { name: 'GitHub', slug: 'github' },
    { name: 'Tailwind CSS', slug: 'tailwindcss' },
    { name: 'REST APIs', customIcon: restApiIcon },
    { name: 'Linux', slug: 'linux' },
    { name: 'TensorFlow', slug: 'tensorflow' },
    { name: 'PyTorch', slug: 'pytorch' }
  ];

  const renderIcon = (item: TechItem) => {
    if (item.customIcon) {
      return item.customIcon;
    }
    return (
      <img
        src={`https://cdn.simpleicons.org/${item.slug}/ffffff`}
        alt={item.name}
        className="w-5 h-5 object-contain"
        loading="lazy"
        onError={(e) => {
          // Fallback if image fails to load
          (e.target as HTMLImageElement).src = `https://cdn.simpleicons.org/${item.slug}`;
        }}
      />
    );
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
          <h2 className="text-h2 font-bold uppercase">
            Technologies We <span className="gradient-text">Master</span>
          </h2>
          <p className="text-lg text-text-light max-w-4xl">
            We build state-of-the-art applications using industry-leading technologies, frameworks, and modern tools to ensure robust and scalable solutions.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="flex flex-col gap-6 relative w-full overflow-visible mt-10">
          {/* Top Row: Left to Right */}
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {[...techItems, ...techItems, ...techItems, ...techItems].map((item, index) => (
              <motion.div
                key={`top-${index}`}
                className="card gradient-border bg-secondary/30 p-6 flex flex-col items-center justify-center text-center w-[250px] shrink-0 gap-y-3"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderColor: 'rgba(59, 130, 246, 0.5)'
                }}
              >
                <div className="h-6 flex items-center justify-center">
                  {renderIcon(item)}
                </div>
                <span className="text-white font-medium whitespace-nowrap">{item.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Row: Right to Left */}
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {[...[...techItems].reverse(), ...[...techItems].reverse(), ...[...techItems].reverse(), ...[...techItems].reverse()].map((item, index) => (
              <motion.div
                key={`bottom-${index}`}
                className="card gradient-border bg-secondary/30 p-6 flex flex-col items-center justify-center text-center w-[250px] shrink-0 gap-y-3"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderColor: 'rgba(59, 130, 246, 0.5)'
                }}
              >
                <div className="h-6 flex items-center justify-center">
                  {renderIcon(item)}
                </div>
                <span className="text-white font-medium whitespace-nowrap">{item.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
