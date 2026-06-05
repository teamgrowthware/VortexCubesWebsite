import React from 'react';
import { motion, type Variants } from 'framer-motion';

// Parent container variant to stagger child animations
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    }
  }
};

// SVG path variant for writing the wave line
const pathVariants: Variants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 1.2, ease: "easeInOut" }
  }
};

// Bubble items variant that animates opacity and slides into place
const bubbleVariants: Variants = {
  hidden: (isBottom: boolean) => ({
    opacity: 0,
    y: isBottom ? 40 : -40
  }),
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Sectors: React.FC = () => {
  // 8 curated industries with premium inline SVG icons (excluding Real Estate)
  const industries = [
    {
      name: 'IT & Software',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
        </svg>
      ),
      dotColor: '#3b82f6',
      chevronColor: '#3b82f6',
    },
    {
      name: 'E-Commerce',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      dotColor: '#6b7280',
      chevronColor: '#6b7280',
    },
    {
      name: 'FinTech',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      dotColor: '#3b82f6',
      chevronColor: '#3b82f6',
    },
    {
      name: 'Healthcare',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      dotColor: '#6b7280',
      chevronColor: '#6b7280',
    },
    {
      name: 'EdTech',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      ),
      dotColor: '#3b82f6',
      chevronColor: '#3b82f6',
    },
    {
      name: 'Startups & SaaS',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2S2 7 2 12s10 10 10 10 10-5 10-10S12 2 12 2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      dotColor: '#6b7280',
      chevronColor: '#6b7280',
    },
    {
      name: 'Enterprises',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      dotColor: '#3b82f6',
      chevronColor: '#3b82f6',
    },
    {
      name: 'Logistics Tech',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
      dotColor: '#6b7280',
      chevronColor: '#6b7280',
    }
  ];

  // Configuration matching viewBox 0 0 1200 400
  const width = 1200;
  const padding = 100;
  const activeWidth = width - padding * 2;
  const S = activeWidth / 7; // spacing between 8 items
  const A = 80; // amplitude of horizontal wave
  const centerY = 200;

  // Coordinate list for absolute placing
  const points = industries.map((ind, i) => {
    const x = padding + i * S;
    const isBottom = i % 2 === 0;
    const y = isBottom ? centerY + A : centerY - A;
    return {
      ...ind,
      x,
      y,
      isBottom,
    };
  });

  // SVG path definition
  let pathD = `M 20 ${centerY}`;
  pathD += ` C 50 ${centerY}, 60 ${points[0].y}, ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const pCurrent = points[i];
    const pNext = points[i + 1];
    const controlX1 = pCurrent.x + S / 2;
    const controlY1 = pCurrent.y;
    const controlX2 = pNext.x - S / 2;
    const controlY2 = pNext.y;
    pathD += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${pNext.x} ${pNext.y}`;
  }
  const lastPoint = points[points.length - 1];
  pathD += ` C ${lastPoint.x + 40} ${lastPoint.y}, ${width - 50} ${centerY}, ${width - 20} ${centerY}`;

  return (
    <section id="sectors" className="section bg-dark overflow-hidden relative">
      {/* Scoped styles for the premium animations */}
      <style>{`
        /* Scoped heights and dimensions for custom layout components */
        .orbital-wrapper {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 32px;
        }

        .orbital-track {
          width: 1200px;
          height: 440px;
          position: relative;
          margin-left: auto;
          margin-right: auto;
          margin-top: 16px;
          margin-bottom: 16px;
          user-select: none;
        }

        .orbital-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 400px;
          pointer-events: none;
          z-index: 0;
        }

        .industry-group {
          position: absolute;
          width: 140px;
          height: 400px;
          z-index: 10;
        }

        .ring-outer-dashed {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 96px;
          height: 96px;
          border-radius: 9999px;
          border: 1px dashed rgba(160, 160, 160, 0.3);
          transition: all 0.3s;
          pointer-events: none;
        }

        .ring-inner-solid {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 82px;
          height: 82px;
          border-radius: 9999px;
          border: 1px solid rgba(49, 49, 49, 0.4);
          background-color: rgba(10, 10, 10, 0.2);
          transition: all 0.3s;
          pointer-events: none;
        }

        .circle-filled-core {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 66px;
          height: 66px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .connector-line-vert {
          position: absolute;
          width: 0;
          left: 50%;
          border-left: 1px dashed rgba(160, 160, 160, 0.3);
          transition: border-color 0.3s;
        }

        .indicator-dot {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          transition: transform 0.3s;
        }


        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 1023px) {
          .scroll-fade-mask {
            mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          }
        }
      `}</style>

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

        {/* Alternating Orbital Track Container */}
        <div className="orbital-wrapper custom-scrollbar scroll-fade-mask">
          
          {/* Animated Parent Container observed via whileInView to trigger child variants */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={containerVariants}
            className="orbital-track"
          >
            
            {/* SVG Horizontal Wave Line */}
            <svg
              viewBox="0 0 1200 400"
              className="orbital-svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                  <stop offset="15%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                  <stop offset="85%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Flowing Wave */}
              <motion.path
                d={pathD}
                stroke="url(#wave-gradient)"
                strokeWidth="2"
                fill="none"
                variants={pathVariants}
              />

              {/* Start / End Dots */}
              <circle cx="20" cy="200" r="4.5" fill="#3b82f6" opacity="0.8" />
              <circle cx="1180" cy="200" r="4.5" fill="#3b82f6" opacity="0.8" />
            </svg>

            {/* Interactive Orbital Badges & Connectors */}
            {points.map((point) => {
              return (
                <motion.div
                  key={point.name}
                  className="industry-group"
                  style={{
                    left: `${point.x - 70}px`, // Center-align horizontally
                    top: 0
                  }}
                  variants={bubbleVariants}
                  custom={point.isBottom}
                >
                  {/* Label Element */}
                  <div
                    className="absolute w-full text-center px-2 pointer-events-none"
                    style={{
                      top: point.isBottom ? '40px' : '360px',
                      transform: 'translateY(-50%)'
                    }}
                  >
                    <span className="industry-title text-sm font-semibold tracking-wider text-text-light transition-colors duration-300">
                      {point.name}
                    </span>
                  </div>

                  {/* Vertical Connector Line */}
                  <div
                    className="connector-line-vert"
                    style={{
                      top: point.isBottom ? '58px' : '170px',
                      height: '112px'
                    }}
                  />

                  {/* Small Indicator Dot near label */}
                  <div
                    className="indicator-dot"
                    style={{
                      top: point.isBottom ? '58px' : '336px',
                      backgroundColor: point.dotColor
                    }}
                  />

                  {/* Chevrons pointing up or down */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 transition-transform duration-300"
                    style={{
                      top: point.isBottom ? '146px' : '238px',
                      '--chevron-dir': point.isBottom ? '-4px' : '4px'
                    } as React.CSSProperties}
                  >
                    {point.isBottom ? (
                      <svg className="chevron-icon w-3 h-3 transition-transform duration-300" style={{ color: point.chevronColor }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 21l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="chevron-icon w-3 h-3 transition-transform duration-300" style={{ color: point.chevronColor }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 3l-7 7-7-7" />
                      </svg>
                    )}
                  </div>

                  {/* Orbital Bubble badging */}
                  <div
                    className="absolute w-24 h-24"
                    style={{
                      left: '50%',
                      top: `${point.y}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Outer concentric dashed circle */}
                    <div className="outer-ring outer-ring-dashed ring-outer-dashed" />

                    {/* Inner concentric solid ring */}
                    <div className="outer-ring ring-inner-solid" />

                    {/* Solid Filled Interactive Circle */}
                    <button
                      className={`inner-circle-filled circle-filled-core ${
                        point.isBottom
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-none'
                          : 'bg-[#18181b] border border-gray-800'
                      }`}
                    >
                      <span className={`transition-transform duration-300 ${point.isBottom ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        {point.icon}
                      </span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sectors;
