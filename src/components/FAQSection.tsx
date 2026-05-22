import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What services do you provide?",
      answer: "We provide comprehensive digital solutions including Web & SaaS Product Development, Digital Growth Strategy, Automation & AI Integrations, and Cloud Infrastructure management."
    },
    {
      question: "How do I start working with you?",
      answer: "You can start by booking a discovery call or sending an inquiry through our contact form. We'll discuss your goals and provide a tailored roadmap for your project."
    },
    {
      question: "What design tools do you use?",
      answer: "We use modern industry-standard tools like Figma for design, and cutting-edge technologies like React, Next.js, and Node.js for development."
    },
    {
      question: "How long does a project take?",
      answer: "Project timelines vary depending on complexity. A typical custom landing page can take 2-4 weeks, while complex SaaS platforms may take 3-6 months."
    },
    {
      question: "Do you provide revisions?",
      answer: "Yes, we believe in a collaborative process. We provide multiple revision rounds at key milestones to ensure the final product aligns perfectly with your vision."
    },
    {
      question: "What industries do you work with?",
      answer: "We work across diverse sectors including FinTech, E-Commerce, Healthcare, EdTech, Real Estate, and Logistics Tech, helping businesses of all sizes scale."
    }
  ];

  return (
    <section id="faq" className="section bg-dark">
      <div className="container">
        <motion.div
          className="flex flex-col justify-center items-center text-center gap-y-4 mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="badge">FAQ's</div>
          <h2 className="text-h2 font-bold uppercase">Common <span className="gradient-text">Questions</span></h2>
          <p className="text-lg text-text-light max-w-4xl">
            Find answers to common questions about our design process, services, and how we build scalable solutions.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="card gradient-border bg-secondary/20 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full px-2 py-1 text-left flex justify-between items-center"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-text-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
