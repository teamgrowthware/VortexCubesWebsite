import React from 'react';
import { motion } from 'framer-motion';

const ContactCTA: React.FC = () => {
  return (
    <section className="section bg-dark relative py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="badge bg-green-500/10 text-green-500 border-green-500/20 mb-8 px-6 py-2 rounded-full flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Available For Work
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 max-w-4xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Curious about what we can create together? Let's bring something <span className="gradient-text">extraordinary</span> to life!
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="mailto:info@vortexcubes.com"
              className="btn btn-primary px-12 py-5 text-lg font-bold rounded-full inline-flex items-center mt-8 mb-4 gap-3"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(251, 146, 60, 0.55)' }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
            <p className="text-text-light mt-6">info@vortexcubes.com</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
