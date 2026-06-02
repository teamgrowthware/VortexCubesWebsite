import React from 'react';
import { motion } from 'framer-motion';

const Sectors: React.FC = () => {
  const industries = [
    'IT & Software', 'E-Commerce', 'FinTech',
    'Healthcare', 'EdTech', 'Startups & SaaS',
    'Enterprises', 'Real Estate', 'Logistics Tech'
  ];

  return (
    <section id="sectors" className="section bg-dark overflow-hidden">
      <div className="container">
        <motion.div
          className="flex flex-col justify-center items-center text-center gap-y-4 mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="badge">Industries we serve</div>
          <h2 className="text-h2 font-bold uppercase">For Every Industry We have <span className="gradient-text">Solution</span></h2>
          <p className="text-lg text-text-light max-w-4xl">
            We deliver custom software solutions for every industry, enhancing productivity,
            streamlining operations, and driving growth with innovative, reliable, and scalable technology.
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
            {[...industries, ...industries, ...industries, ...industries].map((industry, index) => (
              <motion.div
                key={`top-${index}`}
                className="card gradient-border bg-secondary/30 p-6 flex items-center justify-center text-center w-[250px] shrink-0"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderColor: 'rgba(59, 130, 246, 0.5)'
                }}
              >
                <span className="text-white font-medium whitespace-nowrap">{industry}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Row: Right to Left */}
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {[...[...industries].reverse(), ...[...industries].reverse(), ...[...industries].reverse(), ...[...industries].reverse()].map((industry, index) => (
              <motion.div
                key={`bottom-${index}`}
                className="card gradient-border bg-secondary/30 p-6 flex items-center justify-center text-center w-[250px] shrink-0"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderColor: 'rgba(59, 130, 246, 0.5)'
                }}
              >
                <span className="text-white font-medium whitespace-nowrap">{industry}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sectors;
