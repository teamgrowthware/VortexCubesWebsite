import React from 'react';
import { motion } from 'framer-motion';
import {
  badgeVariants,
  heroTitleVariants,
  containerVariants,
  staggerItemVariants
} from '../animations/motionVariants';
import { useParallaxStrength } from '../animations/hooks';

const Hero: React.FC = () => {
  const { ref: parallaxRef, yOffset } = useParallaxStrength(0.5);

  return (
    <section className="hero bg-dark relative z-10 min-h-screen flex items-center justify-center overflow-hidden py-24">
      {/* Parallax Background */}
      <motion.div
        ref={parallaxRef}
        style={{ y: yOffset }}
        className="absolute top-0 left-0 -z-1 w-full hidden sm:block"
      >
        <svg
          className="w-full"
          width="1920"
          height="907"
          viewBox="0 0 1920 907"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="light-dramatic-entrance" style={{ mixBlendMode: 'plus-lighter' }}>
            <path d="M1920 0V907H0V0H1920Z" fill="url(#paint0_radial_1_2)"></path>
          </g>
          <defs>
            <radialGradient id="paint0_radial_1_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6"></stop>
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0"></stop>
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      <div className="container relative z-10">
        <motion.div
          className="flex flex-col justify-center items-center text-center overflow-visible"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge with Scale Animation */}
          <motion.div
            className="badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-900/50 backdrop-blur-sm"
            variants={badgeVariants}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4" cy="4" r="3" fill="#3B82F6" className="animate-pulse"></circle>
            </svg>
            <span className="text-sm font-medium text-white">Innovation Meets Engineering</span>
          </motion.div>

          {/* Title with Slide In and Scale */}
          <motion.h1
            className="mt-8 mb-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white uppercase tracking-tight"
            variants={heroTitleVariants}
          >
            We Build <span className="gradient-text">SCALABLE SYSTEMS</span>
            <br />
            & SAAS PLATFORMS
          </motion.h1>

          {/* Subtitle with Fade In */}
          <motion.p
            className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl leading-relaxed"
            variants={staggerItemVariants}
          >
            We specialize in creating innovative technology solutions that drive business growth.
            From custom software development to AI integration, we help companies stay ahead of the curve.
          </motion.p>

          {/* Buttons Container with Staggered Animation */}
          <motion.div
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Primary: white pill button with Hover Animation */}
            <motion.a
              href="/portfolio"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.875rem 2.25rem',
                background: '#ffffff',
                color: '#0a0a0a',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'transform 0.25s, box-shadow 0.25s, background 0.25s',
                boxShadow: '0 2px 12px rgba(255,255,255,0.12)',
                whiteSpace: 'nowrap',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 4px 24px rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW WORK
            </motion.a>

            {/* Secondary: dark pill button with border and Hover Animation */}
            <motion.a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.875rem 2.25rem',
                background: 'rgba(20,20,20,0.85)',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderRadius: '9999px',
                border: '1px solid rgba(255,255,255,0.25)',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'transform 0.25s, border-color 0.25s, background 0.25s',
                whiteSpace: 'nowrap',
              }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.55)', background: 'rgba(40,40,40,0.9)' }}
              whileTap={{ scale: 0.95 }}
            >
              REQUEST DEMO
            </motion.a>
          </motion.div>

          {/* Stats Section with Staggered Animation */}
          <motion.div
            className="flex items-center text-center flex-col sm:flex-row overflow-visible"
            style={{ gap: 'clamp(2.5rem, 6vw, 5.5rem)', marginTop: '1.5rem', position: 'relative', top: '48px' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItemVariants}>
              <motion.div
                className="text-4xl md:text-5xl font-bold text-white"
                whileInView={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
              >
                75+
              </motion.div>
              <div className="text-base md:text-lg text-white">Projects Completed</div>
            </motion.div>

            <motion.div variants={staggerItemVariants}>
              <motion.div
                className="text-4xl md:text-5xl font-bold text-white"
                whileInView={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
              >
                98%
              </motion.div>
              <div className="text-base md:text-lg text-white">Client Satisfaction</div>
            </motion.div>

            <motion.div variants={staggerItemVariants}>
              <motion.div
                className="text-4xl md:text-5xl font-bold text-white"
                whileInView={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
              >
                5+
              </motion.div>
              <div className="text-base md:text-lg text-white">Years Experience</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Banner Image at Bottom */}
      <motion.div
        className="absolute bottom-0 -z-1 w-full"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      >
        <img
          alt="banner image"
          fetchPriority="high"
          loading="eager"
          width="1200"
          height="430"
          decoding="async"
          className="w-full xl:h-auto object-cover"
          style={{ color: 'transparent' }}
          src="/Neonspark_files/banner-shape.png"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
