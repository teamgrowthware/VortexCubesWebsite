import React from 'react';
import { motion } from 'framer-motion';

const Newsletter: React.FC = () => {
  return (
    <section className="section bg-dark relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-1"></div>

      <div className="container">
        <div className="card gradient-border bg-gray-900/40 backdrop-blur-xl p-10 md:p-20 flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div
            className="w-full flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="badge mb-8">Stay Connected</div>
            <h2 className="text-h2 font-bold mb-6 uppercase tracking-tight">
              Join the <span className="gradient-text">Vortex Network</span>
            </h2>
            <p className="text-lg text-text-light max-w-2xl mb-12 leading-relaxed">
              Subscribe to our newsletter for the latest insights in software architecture,
              AI integration, and scalable business strategies.
            </p>

            <form
              className="flex flex-row gap-3 w-full max-w-sm mx-auto justify-center items-center mt-4 mb-10"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-8 h-12 rounded-full border border-gray-800 text-white focus:outline-none focus:border-primary transition-all placeholder:text-gray-500 bg-dark/80 text-sm"
                required
              />
              <motion.button
                type="submit"
                className="px-8 h-10 rounded-full bg-primary text-black font-bold uppercase tracking-tight whitespace-nowrap transition-all shadow-lg hover:shadow-primary/20 flex-none text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>

            <p className="text-xs text-text-light mt-8 opacity-60">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
