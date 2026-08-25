import { useRef, useEffect, useState } from 'react';

/**
 * Custom hook for parallax scroll effect
 * @param offset - How much the element should move (default: 50)
 * @returns ref - Attach to the element that should have parallax effect
 */
export const useParallax = (offset: number = 50) => {
  const ref = useRef<HTMLDivElement>(null);
  const [yOffset, setYOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const element = ref.current;
        const elementRect = element.getBoundingClientRect();
        
        // Calculate how much of the element is visible in viewport
        const elementTop = elementRect.top;
        const windowHeight = window.innerHeight;
        
        // Only apply parallax when element is in viewport
        if (elementTop < windowHeight && elementTop > -elementRect.height) {
          // Calculate scroll percentage relative to element position
          const scrollPercent = (windowHeight - elementTop) / windowHeight;
          setYOffset(scrollPercent * offset - offset / 2);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return { ref, yOffset };
};

/**
 * Custom hook for parallax with perspective
 * @param strength - How strong the parallax effect should be (0-1)
 * @returns ref - Attach to the element that should have parallax effect
 */
export const useParallaxStrength = (strength: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);
  const [yOffset, setYOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollY = window.scrollY;
        const elementTop = ref.current.getBoundingClientRect().top;
        
        // Apply parallax with strength multiplier
        setYOffset((scrollY - elementTop) * strength);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [strength]);

  return { ref, yOffset };
};

/**
 * Custom hook for detecting when element enters viewport (for triggering animations)
 */
export const useInView = (options = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // Optional: unobserve after first intersection
        // observer.unobserve(entry.target);
      } else {
        setIsInView(false);
      }
    }, {
      threshold: 0.1,
      ...options
    });

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return { ref, isInView };
};
