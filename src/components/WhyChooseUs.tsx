import React from 'react';
import { motion } from 'framer-motion';
import {
  staggerContainerVariants,
} from '../animations/motionVariants';
import { useInView } from '../animations/hooks';

const WhyChooseUs: React.FC = () => {
  const { ref: containerRef, isInView } = useInView();

  const features = [
    {
      id: 1,
      title: 'High-Performance Systems',
      description: 'Lightning-fast architecture optimized for heavy workloads and rapid scaling.',
      image: '/Neonspark_files/UnlimitedRevisions.svg'
    },
    {
      id: 2,
      title: 'Enterprise-Grade Security',
      description: 'Advanced data protection and compliance measures built into every layer.',
      image: '/Neonspark_files/LifetimeSupport.svg'
    },
    {
      id: 3,
      title: 'Custom Product Engineering',
      description: 'Tailor-made software solutions designed precisely for your business needs.',
      image: '/Neonspark_files/UnlimitedRevisions(1).svg'
    },
    {
      id: 4,
      title: 'AI & Automation Ready',
      description: 'Future-proof integrations to automate workflows and enhance intelligence.',
      image: '/Neonspark_files/CustomDesignSolutions.svg'
    },
    {
      id: 5,
      title: 'Data-Driven Growth',
      description: 'Marketing and analytics strategies focused entirely on ROI and conversions.',
      image: '/Neonspark_files/UnlimitedRevisions.svg'
    },
    {
      id: 6,
      title: 'Global Delivery Network',
      description: 'Reliable cloud deployments and support teams spanning across time zones.',
      image: '/Neonspark_files/LifetimeSupport.svg'
    }
  ];

  return (
    <section className="section flex flex-col justify-center items-center text-center gap-y-4 mb-14 bg-dark">
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
            transition={{ duration: 0.5, ease: "backOut" }}
            viewport={{ once: true }}
          >
            Why Choose Us
          </motion.div>

          <motion.h2
            className="text-h2 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Engineering digital excellence. Built to scale.
          </motion.h2>

          <motion.p
            className="text-lg text-text-light max-w-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            At Vortex Cubes, we don't just write code—we build comprehensive
            technology ecosystems. We pair elite software engineering with
            strategic digital growth initiatives to ensure your product not only
            functions flawlessly but dominates its market.
          </motion.p>
        </motion.div>

        {/* Features Alternating Layout */}
        <motion.div
          ref={containerRef}
          className="space-y-12"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={feature.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
              >
                {/* IMAGE */}
                <motion.div
                  className={`w-full h-full flex ${isEven ? "lg:justify-start" : "lg:justify-end lg:order-2"
                    }`}
                  initial={{
                    opacity: 0,
                    x: isEven ? -80 : 80,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                >
                  <div className="w-full max-w-[610px]">
                    <motion.img
                      alt={feature.title}
                      fetchPriority="high"
                      loading="lazy"
                      width="610"
                      height="363"
                      decoding="async"
                      className="rounded-2xl h-[260px] md:h-[320px] object-cover w-full"
                      style={{ color: "transparent" }}
                      src={feature.image}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                {/* CONTENT */}
                <motion.div
                  className={`w-full flex ${isEven ? "lg:justify-end" : "lg:justify-start lg:order-1"
                    }`}
                  initial={{
                    opacity: 0,
                    x: isEven ? 80 : -80,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                    delay: 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  <div className="w-full max-w-[610px] space-y-4">
                    {/* Icon */}
                    <motion.div className="flex gap-4 items-center flex-wrap mb-4">
                      <motion.div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>
                    </motion.div>

                    {/* Title */}
                    <motion.h3 className="text-h4 font-medium mb-4 gradient-text">
                      {feature.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p className="text-lg text-text-light leading-relaxed">
                      {feature.description}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Learn More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/about"
            className="btn btn-primary mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More About Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
