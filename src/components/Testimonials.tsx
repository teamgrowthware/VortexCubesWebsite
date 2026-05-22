import React from 'react';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      text: "Vortex Cubes completely overhauled our legacy ERP system. The transition to their custom cloud architecture reduced our operational latency by 40%.",
      author: "CEO, TechInnovate"
    },
    {
      text: "Their team doesn't just write code; they understand business logic. The SaaS platform they built for us scaled to 10,000+ users seamlessly within the first month.",
      author: "Founder, ScaleUp SaaS"
    },
    {
      text: "We partnered with Vortex Cubes for our digital growth strategy. Their data-driven approach and targeted funnels increased our lead conversion rate by exactly 150%.",
      author: "Marketing Director, GlobalReach"
    },
    {
      text: "Security and compliance were our top concerns. Vortex built a banking-grade web application for us with flawless architecture and deep integration capabilities.",
      author: "CTO, FinServe Network"
    },
    {
      text: "The automated logistics dashboard they created gave us real-time visibility into our supply chain. Outstanding UI/UX and rock-solid backend performance.",
      author: "Operations Manager, Logistix"
    }
  ];

  return (
    <section className="section bg-dark relative overflow-hidden">
      <div className="container">
        <motion.div
          className="flex flex-col justify-center items-center text-center gap-y-4 mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="badge">Testimonials</div>
          <h2 className="text-h2 font-bold uppercase">Trusted by <span className="gradient-text">Innovative Leaders</span></h2>
          <p className="text-lg text-text-light max-w-4xl">
            Hear straight from our partners about the impact of our engineered solutions and growth strategies on their businesses.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-visible mt-10">
          <motion.div
            className="flex gap-8 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
          >
            {[...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (
              <motion.div
                key={`review-${index}`}
                className="card gradient-border bg-secondary/20 p-4 flex flex-col justify-between shrink-0"
                style={{ width: '320px', height: '350px' }}
                whileHover={{ y: -10 }}
              >
                <div>
                  <div className="flex gap-1 mb-5 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg text-white italic mb-6">"{review.text}"</p>
                </div>
                <div className="mt-4">
                  <p className="text-primary font-bold">{review.author}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
