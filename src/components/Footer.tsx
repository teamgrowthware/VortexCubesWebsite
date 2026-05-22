import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainerVariants, staggerItemVariants } from '../animations/motionVariants';

const Footer: React.FC = () => {
  const socialLinks = [
    { label: 'facebook', url: 'https://www.facebook.com/', path: 'M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z' },
    { label: 'twitter', url: 'https://twitter.com/', path: 'M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-53.053 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z' },
    { label: 'linkedin', url: 'https://linkedin.com/', path: 'M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z' },
    { label: 'instagram', url: 'https://instagram.com/', path: 'M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z' }
  ];

  const quickLinks = [
    { label: 'About Us', url: '/about' },
    { label: 'Portfolio', url: '/portfolio' },
    { label: 'Contact', url: '/contact' },
    { label: 'Services', url: '/services' }
  ];

  const services = [
    { label: 'Web Development', url: '/services' },
    { label: 'App Development', url: '/services' },
    { label: 'ERP Solutions', url: '/services' },
    { label: 'CRM Solutions', url: '/services' },
    { label: 'AI & Automation', url: '/services' },
    { label: 'Cloud & Security', url: '/services' }
  ];

  return (
    <footer>
      <div className="bg-dark backdrop-blur-2xl pb-10">
        <div className="container">
          <div className="pt-30 pb-20">
            <motion.div
              className="grid sm:grid-cols-12 gap-8"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Logo and Social Section */}
              <motion.div className="sm:col-span-6 lg:col-span-3" variants={staggerItemVariants}>
                <motion.a
                  className="navbar-brand inline-block"
                  href="/"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src="/Neonspark_files/company-logo.png" alt="Vortex Cubes" style={{ height: '3rem' }} className="w-auto" />
                </motion.a>
                <p className="text-text-light mt-6 mb-8">
                  Your trusted partner for comprehensive IT solutions and product development. We build custom software that drives business growth.
                </p>
                <div className="social-icons">
                  <ul className="flex gap-4 justify-center sm:justify-start">
                    {socialLinks.map((link, i) => (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <motion.a
                          aria-label={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          whileHover={{ scale: 1.2, color: '#3B82F6' }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <span className="sr-only">{link.label}</span>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            className="inline-block"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d={link.path}></path>
                          </svg>
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div className="sm:col-span-6 lg:col-span-3" variants={staggerItemVariants}>
                <h4 className="text-h5 font-semibold mb-6 text-primary">Company</h4>
                <ul className="space-y-4">
                  {quickLinks.map((link, i) => (
                    <motion.li
                      key={link.url}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href={link.url}
                        className="text-text-light transition-colors"
                        whileHover={{ color: '#3B82F6', x: 5 }}
                      >
                        {link.label}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Services */}
              <motion.div className="sm:col-span-6 lg:col-span-3" variants={staggerItemVariants}>
                <h4 className="text-h5 font-semibold mb-6 text-primary">Services</h4>
                <ul className="space-y-4">
                  {services.map((service, i) => (
                    <motion.li
                      key={service.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href={service.url}
                        className="text-text-light transition-colors"
                        whileHover={{ color: '#3B82F6', x: 5 }}
                      >
                        {service.label}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div className="sm:col-span-6 lg:col-span-3" variants={staggerItemVariants}>
                <h4 className="text-h5 font-semibold mb-6 text-primary">Contact Info</h4>
                <ul className="space-y-4">
                  <motion.li
                    className="text-text-light"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0 }}
                    viewport={{ once: true }}
                  >
                    <strong>Email:</strong> info@vortexcubes.com
                  </motion.li>
                  <motion.li
                    className="text-text-light"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    viewport={{ once: true }}
                  >
                    <strong>Phone:</strong> +91 7049820057
                  </motion.li>
                  <motion.li
                    className="text-text-light text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <strong>Address:</strong> Indore, M.P - 452010
                  </motion.li>
                </ul>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <motion.div
            className="border-t border-border pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-text-light text-sm mb-4 sm:mb-0">
                © 2025 Vortex Cubes. All rights reserved.
              </p>
              <div className="flex gap-6">
                <motion.a
                  href="/privacy"
                  className="text-text-light text-sm transition-colors"
                  whileHover={{ color: '#3B82F6' }}
                >
                  Privacy Policy
                </motion.a>
                <motion.a
                  href="/terms"
                  className="text-text-light text-sm transition-colors"
                  whileHover={{ color: '#3B82F6' }}
                >
                  Terms of Service
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
