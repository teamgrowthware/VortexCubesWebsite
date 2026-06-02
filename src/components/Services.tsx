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
      icon: '/Neonspark_files/web-design.svg',
      title: 'Website & Application Development',
      description: 'Build custom scalable web applications, business systems and platforms optimized for top-tier performance and user engagement.',
      link: '/portfolio'
    },
    {
      id: 2,
      icon: '/Neonspark_files/web-design.svg',
      title: 'SaaS & ERP Development',
      description: 'Develop robust SaaS platforms and comprehensive ERP solutions tailored to streamline operations and drive enterprise growth.',
      link: '/portfolio'
    },
    {
      id: 3,
      icon: '/Neonspark_files/web-design.svg',
      title: 'AI Automation & Integration',
      description: 'Integrate intelligent automation workflows, AI features, and APIs to enhance productivity, efficiency, and business intelligence.',
      link: '/portfolio'
    },
    {
      id: 4,
      icon: '/Neonspark_files/web-design.svg',
      title: 'Performance Marketing & Social Media Management',
      description: 'Drive visibility and conversions with ROI-focused marketing strategies, paid campaigns, and engaging social media management.',
      link: '/portfolio'
    },
    {
      id: 5,
      icon: '/Neonspark_files/web-design.svg',
      title: 'UI/UX & Graphic Designing',
      description: 'Craft stunning, user-centric interfaces and captivating brand visuals that leave a lasting impression and improve user experience.',
      link: '/portfolio'
    },
    {
      id: 6,
      icon: '/Neonspark_files/web-design.svg',
      title: 'CI/CD & DevOps Services',
      description: 'Set up secure, automated cloud infrastructure, CI/CD pipelines, and robust deployment systems to accelerate software delivery.',
      link: '/portfolio'
    },
    {
      id: 7,
      icon: '/Neonspark_files/web-design.svg',
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
           className="grid grid-cols-1 lg:grid-cols-3 gap-8"
           variants={staggerContainerVariants}
           initial="hidden"
           animate={isInView ? "visible" : "hidden"}
           viewport={{ once: true }}
         >
           {services.map((service, index) => (
             <motion.div 
               key={service.id} 
               className="card gradient-border bg-dark"
               variants={staggerAlternateSlideVariants}
               custom={index}
               whileHover={{ 
                 y: -10,
                 boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
               }}
               transition={{ duration: 0.3 }}
             >
                <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8 relative">
                   {/* Animated Border SVG */}
                   <svg className="absolute top-0 left-0 w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                     <path 
                       className="animate-svg-path"
                       d="M0,0 L100,0 L100,100 L0,100 Z"
                     />
                   </svg>
                {/* Icon with Rotation Animation */}
                <motion.div 
                  className="flex gap-4 items-center flex-wrap mb-6"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                </motion.div>
                
                {/* Title with Gradient Text */}
                <motion.h3 
                  className="text-h4 font-medium mb-6 gradient-text"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                  viewport={{ once: true }}
                >
                  {service.title}
                </motion.h3>
                
                {/* Description */}
                <motion.p 
                  className="text-lg text-text-light mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {service.description}
                </motion.p>
                
                {/* CTA Link with Hover Animation */}
                <motion.a 
                  href={service.link}
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="/services" 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Services
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
