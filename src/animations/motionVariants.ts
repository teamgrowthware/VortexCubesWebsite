// Framer Motion Animation Variants

// Fade In animations
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const fadeInSlowVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2 }
  }
};

// Slide In from different directions
export const slideInFromLeftVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 }
  }
};

export const slideInFromRightVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 }
  }
};

export const slideInFromTopVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

export const slideInFromBottomVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

// Scale animations
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const scaleInSlowVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1 }
  }
};

// Rotate animations
export const rotateInVariants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.8 }
  }
};

// Hero title animation - staggered appearance
export const heroTitleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 }
  }
};

// Badge animation
export const badgeVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, type: 'spring' as const, stiffness: 100, damping: 15 }
  }
};

// Container animation with staggered children
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.6
    }
  }
};

// Card hover animation
export const cardHoverVariants = {
  rest: {
    y: 0,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
  },
  hover: {
    y: -10,
    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

// Parallax scroll variants
export const parallaxVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

// Floating animation (infinite)
export const floatingVariants = {
  float: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
};

// Glow pulse animation (infinite)
export const glowPulseVariants = {
  pulse: {
    boxShadow: [
      '0 0 20px rgba(59, 130, 246, 0.5)',
      '0 0 40px rgba(59, 130, 246, 0.8)',
      '0 0 20px rgba(59, 130, 246, 0.5)'
    ],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
};

// Shimmer animation
export const shimmerVariants = {
  shimmer: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 3,
      ease: 'linear',
      repeat: Infinity
    }
  }
};

// Bounce animation
export const bounceVariants = {
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      ease: 'easeInOut'
    }
  }
};

// Text reveal animation
export const textRevealVariants = {
  hidden: { opacity: 0 },
  visible: (custom: number) => ({
    opacity: 1,
    transition: {
      delay: custom * 0.05,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};

// Slide in with scale
export const slideScaleVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8 }
  }
};

// Flip card animation
export const flipVariants = {
  rest: { rotateY: 0 },
  hover: {
    rotateY: 180,
    transition: { duration: 0.6 }
  }
};

// Path draw animation (for SVG)
export const pathDrawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2 }
  }
};

// Stagger container for list items
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

// Item animation for staggered lists
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Side slide from left (faster)
export const sideSlideLeftVariants = {
  hidden: { opacity: 0, x: -200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7 }
  }
};

// Side slide from right (faster)
export const sideSlideRightVariants = {
  hidden: { opacity: 0, x: 200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7 }
  }
};

// Diagonal slide from top-left
export const diagonalSlideTopLeftVariants = {
  hidden: { opacity: 0, x: -100, y: -100 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8 }
  }
};

// Diagonal slide from top-right
export const diagonalSlideTopRightVariants = {
  hidden: { opacity: 0, x: 100, y: -100 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8 }
  }
};

// Diagonal slide from bottom-left
export const diagonalSlideBottomLeftVariants = {
  hidden: { opacity: 0, x: -100, y: 100 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8 }
  }
};

// Diagonal slide from bottom-right
export const diagonalSlideBottomRightVariants = {
  hidden: { opacity: 0, x: 100, y: 100 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8 }
  }
};

// Slide with rotation
export const slideRotateLeftVariants = {
  hidden: { opacity: 0, x: -100, rotate: -15 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.8 }
  }
};

// Slide with rotation from right
export const slideRotateRightVariants = {
  hidden: { opacity: 0, x: 100, rotate: 15 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.8 }
  }
};

// Skew and fade animation
export const skewVariants = {
  hidden: { opacity: 0, skewY: 10 },
  visible: {
    opacity: 1,
    skewY: 0,
    transition: { duration: 0.7 }
  }
};

// Expand and fade (growing from center)
export const expandVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 }
  }
};

// Blur fade animation
export const blurFadeVariants = {
  hidden: { opacity: 0, filter: 'blur(20px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8 }
  }
};

// Spring bounce slide from left
export const springBounceLeftVariants = {
  hidden: { opacity: 0, x: -150 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, type: 'spring', stiffness: 100, damping: 12 }
  }
};

// Spring bounce slide from right
export const springBounceRightVariants = {
  hidden: { opacity: 0, x: 150 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, type: 'spring', stiffness: 100, damping: 12 }
  }
};

// Stagger with side slide
export const staggerSideSlideLeftVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6
    }
  })
};

// Stagger with side slide right
export const staggerSideSlideRightVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6
    }
  })
};

// Stagger with alternate slides
export const staggerAlternateSlideVariants = {
  hidden: (custom: number) => ({
    opacity: 0,
    x: custom % 2 === 0 ? -100 : 100
  }),
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.6
    }
  })
};

// Roll in from left
export const rollInLeftVariants = {
  hidden: { opacity: 0, x: -200, rotate: -180 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.8 }
  }
};

// Roll in from right
export const rollInRightVariants = {
  hidden: { opacity: 0, x: 200, rotate: 180 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.8 }
  }
};

// Lift and fade animation
export const liftVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 }
  }
};

// Drop animation (falls in from above)
export const dropVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, type: 'spring', stiffness: 120, damping: 14 }
  }
};
