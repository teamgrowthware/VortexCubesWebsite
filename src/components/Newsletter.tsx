import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { sendNewsletterEmail } from '../services/email';

const Newsletter: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = new FormData(e.currentTarget);
    const email = form.get('email') as string;

    try {
      await sendNewsletterEmail(email);
      setStatus('success');
      formRef.current?.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="section bg-dark relative overflow-hidden">
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
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-4 mb-10"
            >
              <div
                className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full mx-auto"
                style={{ maxWidth: '400px' }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-8 h-12 rounded-full border border-gray-800 text-white focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/40 transition-all placeholder:text-gray-500 bg-dark/80 text-sm"
                  required
                />
                <motion.button
                  type="submit"
                  className="px-8 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold uppercase tracking-tight whitespace-nowrap transition-all shadow-lg hover:shadow-orange-500/25 flex-none text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </motion.button>
              </div>
            </form>

            {status === 'success' && (
              <p className="text-green-400 text-sm mt-0 mb-6">Subscribed successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-0 mb-6">Subscription failed. Please try again.</p>
            )}

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
