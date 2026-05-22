import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
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
    if (isMobileDropdownOpen) setIsMobileDropdownOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownOpen((current) => !current);
  };

  const toggleMobileDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileDropdownOpen((current) => !current);
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

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle || '';
    }
    return () => {
      document.body.style.overflow = originalStyle || '';
    };
  }, [isMenuOpen]);

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

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const drawerVariants: Variants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { type: "spring", damping: 25, stiffness: 200 }
    },
    exit: { 
      x: '100%',
      transition: { type: "spring", damping: 25, stiffness: 200 }
    }
  };

  const mobileNavItemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.06, duration: 0.3, ease: "easeOut" }
    })
  };

  const mobileDropdownVariants: Variants = {
    hidden: { 
      height: 0,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeInOut" }
    },
    visible: { 
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
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
              <img src="/Neonspark_files/company-logo.png" alt="Vortex Cubes" style={{ height: '3rem' }} className="w-auto" />
            </motion.a>
          </motion.div>
          
          {/* Navigation in center */}
          <motion.div 
            className="desktop-nav-wrapper hidden lg:flex items-center flex-1 justify-center"
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
            className="desktop-contact-wrapper hidden lg:flex items-center gap-4"
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
            className="hamburger-toggle lg:hidden flex flex-col gap-1 w-6 h-6 justify-center items-center z-50"
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
        
        {/* Right-Side Drawer with Backdrop */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                className="mobile-backdrop"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={toggleMenu}
              />
              
              {/* Right Drawer */}
              <motion.div
                className="mobile-drawer"
                variants={drawerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Drawer Header Spacer */}
                <div className="mobile-drawer-header" />
                
                {/* Nav Items */}
                <ul className="mobile-nav-list">
                  {mainLinks.map((item, i) => (
                    <motion.li 
                      key={item.href}
                      custom={i}
                      variants={mobileNavItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.a 
                        href={item.href} 
                        className={`mobile-nav-link${isActive(item.href) ? ' active' : ''}`}
                        whileHover={{ x: 8, color: '#3B82F6' }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </motion.a>
                    </motion.li>
                  ))}
                  
                  {/* Mobile PAGES Dropdown / Accordion */}
                  <motion.li
                    custom={mainLinks.length}
                    variants={mobileNavItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <button 
                      onClick={toggleMobileDropdown}
                      className="mobile-nav-link mobile-dropdown-toggle"
                    >
                      <span>PAGES</span>
                      <motion.svg 
                        width="12" 
                        height="12" 
                        viewBox="0 0 10 6" 
                        fill="none"
                        animate={{ rotate: isMobileDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                    </button>
                    
                    <AnimatePresence>
                      {isMobileDropdownOpen && (
                        <motion.div
                          className="mobile-dropdown-content"
                          variants={mobileDropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          <ul className="mobile-dropdown-list">
                            {extraLinks.map((link, i) => (
                              <motion.li 
                                key={link.href}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                              >
                                <a 
                                  href={link.href} 
                                  className={`mobile-dropdown-item${isActive(link.href) ? ' active' : ''}`}
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsMobileDropdownOpen(false);
                                  }}
                                >
                                  {link.label}
                                </a>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                  
                  {/* Contact Us - as last item */}
                  <motion.li
                    custom={mainLinks.length + 1}
                    variants={mobileNavItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.a 
                      href="/contact" 
                      className="mobile-contact-btn"
                      whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      CONTACT US
                    </motion.a>
                  </motion.li>
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
