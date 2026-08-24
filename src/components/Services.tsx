import React from 'react';
import { motion } from 'framer-motion';
import {
  staggerContainerVariants,
  staggerAlternateSlideVariants
} from '../animations/motionVariants';
import { useInView } from '../animations/hooks';

const Services: React.FC = () => {
  const { ref: containerRef, isInView } = useInView();

  const services = [
    {
      id: 1,
      icon: (
        <svg className="w-5 h-5 text-orange-300 group-hover:text-orange-200 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Website & Application Development',
      description: 'Build custom scalable web applications, business systems and platforms optimized for top-tier performance and user engagement.',
      link: '/portfolio'
    },
    {
      id: 2,
      icon: (
        <svg className="w-5 h-5 text-orange-300 group-hover:text-orange-200 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: 'SaaS & ERP Development',
      description: 'Develop robust SaaS platforms and comprehensive ERP solutions tailored to streamline operations and drive enterprise growth.',
      link: '/portfolio'
    },
    {
      id: 3,
      icon: (
        <svg className="w-5 h-5 text-orange-300 group-hover:text-orange-200 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI Automation & Integration',
      description: 'Integrate intelligent automation workflows, AI features, and APIs to enhance productivity, efficiency, and business intelligence.',
      link: '/portfolio'
    },
    {
      id: 4,
      icon: (
        <svg className="w-5 h-5 text-orange-300 group-hover:text-orange-200 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      title: 'Performance Marketing & SMM',
      description: 'Drive visibility and conversions with ROI-focused marketing strategies, paid campaigns, and engaging social media management.',
      link: '/portfolio'
    },
    {
      id: 5,
      icon: (
        <svg className="w-5 h-5 text-orange-300 group-hover:text-orange-200 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: 'UI/UX & Graphic Designing',
      description: 'Craft stunning, user-centric interfaces and captivating brand visuals that leave a lasting impression and improve user experience.',
      link: '/portfolio'
    },
    {
      id: 6,
      icon: (
        <svg className="w-5 h-5 text-orange-300 group-hover:text-orange-200 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      title: 'CI/CD & DevOps Services',
      description: 'Set up secure, automated cloud infrastructure, CI/CD pipelines, and robust deployment systems to accelerate software delivery.',
      link: '/portfolio'
    },
    {
      id: 7,
      icon: (
        <svg className="w-5 h-5 text-orange-300 group-hover:text-orange-200 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      title: 'Staff Augmentation',
      description: 'Scale your team with top-tier tech talent and dedicated professionals tailored to meet your project\'s specific needs and deadlines.',
      link: '/portfolio'
    }
  ];

  return (
    <section className="section bg-dark">
      <div className="container">
        {/* Header Section */}
        <motion.div
          className="flex flex-col justify-center items-center text-center gap-y-4 mb-14"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="badge"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, ease: 'backOut' }}
            viewport={{ once: true }}
          >
            Services
          </motion.div>
          <motion.h2
            className="text-h2 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Comprehensive Digital Services — From Development to Growth
          </motion.h2>
          <motion.p
            className="text-lg text-text-light max-w-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We build scalable technology systems and growth-driven marketing strategies to help businesses scale smarter.
          </motion.p>
        </motion.div>

        {/* Services Grid with Staggered Animation */}
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="text-left card bg-[#0b0c10]/80 border border-orange-600/60 hover:border-orange-900 rounded-xl transition-all duration-600 flex flex-col group "
              variants={staggerAlternateSlideVariants}
              custom={index}
              whileHover={{
                y: -4,
                boxShadow: '0 10px 25px -8px rgba(250, 124, 21, 0.28)',
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 sm:p-5 flex flex-col flex-grow text-left">
                {/* Header: Icon + Title */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 mt-1 p-2 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white/90 group-hover:text-orange-300 transition-colors duration-300 leading-snug mt-0.5">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-400/90 leading-relaxed flex-grow">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
