import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownOpen((current) => !current);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Animation variants
  const navItemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 }
    })
  };

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95,
      transition: { duration: 0.15, ease: "easeIn" }
    }
  };

  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  const mainLinks = [
    { href: '/', label: 'HOME' },
    { href: '/services', label: 'SERVICES' },
    { href: '/portfolio', label: 'PORTFOLIO' },
    { href: '/about', label: 'ABOUT US' }
  ];

  const extraLinks = [
    { href: '/blog', label: 'BLOG' },
    { href: '/career', label: 'CAREERS' },
    { href: '/privacy-policy', label: 'PRIVACY POLICY' },
    { href: '/terms-and-condition', label: 'TERMS & CONDITIONS' }
  ];

  return (
    <header className="header z-30 fixed top-0 w-full backdrop-blur-sm bg-black/60">
      <nav className="navbar">
        <div className="flex items-center justify-between w-full">
          {/* Logo with Hover Animation */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.a 
              className="navbar-brand flex items-center" 
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl font-bold tracking-tighter text-white">VORTEX CUBES</span>
            </motion.a>
          </motion.div>
          
          {/* Navigation in center */}
          <motion.div 
            className="hidden lg:flex items-center flex-1 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ul className="navbar-nav">
              {mainLinks.map((item, i) => (
                <motion.li 
                  key={item.href}
                  custom={i}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.a 
                    href={item.href} 
                    className={`nav-link${isActive(item.href) ? ' active' : ''}`}
                    whileHover={{ color: '#3B82F6' }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.a>
                </motion.li>
              ))}
              
              {/* Dropdown for extra pages */}
              <motion.li 
                className="relative"
                custom={mainLinks.length}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                ref={dropdownRef}
              >
                <button 
                  onClick={toggleDropdown}
                  className={`nav-link flex items-center gap-1 ${isDropdownOpen ? 'active' : ''}`}
                >
                  PAGES
                  <svg 
                    width="10" 
                    height="6" 
                    viewBox="0 0 10 6" 
                    fill="none" 
                      className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      style={{ marginLeft: '0.5em' }}
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      className="dropdown-card"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="dropdown-grid">
                        {extraLinks.map((link) => (
                          <a 
                            key={link.href} 
                            href={link.href} 
                            className={`dropdown-item ${isActive(link.href) ? 'active' : ''}`}
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            </ul>
          </motion.div>
          
          {/* Action buttons on right */}
          <motion.div 
            className="hidden lg:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.a 
              href="/contact" 
              className="contact-btn"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              CONTACT US
            </motion.a>
          </motion.div>
          
          {/* Mobile menu toggle */}
          <motion.button 
            className="lg:hidden flex flex-col gap-1 w-6 h-6 justify-center items-center"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="block w-full h-0.5 bg-white transition-all"
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            ></motion.span>
            <motion.span 
              className="block w-full h-0.5 bg-white transition-all"
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            ></motion.span>
            <motion.span 
              className="block w-full h-0.5 bg-white transition-all"
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            ></motion.span>
          </motion.button>
        </div>
        
        {/* Mobile menu with Slide Down Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="lg:hidden absolute top-full left-0 right-0 bg-dark border-t border-gray-800"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul className="flex flex-col p-4 overflow-y-auto max-h-[80vh]">
                {[...mainLinks, ...extraLinks, { href: '/contact', label: 'CONTACT US' }].map((item, i) => (
                  <motion.li 
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <motion.a 
                      href={item.href} 
                      className={`nav-link block py-2${isActive(item.href) ? ' active' : ''}`}
                      whileHover={{ x: 5, color: '#3B82F6' }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
