import React from 'react';
import { motion } from 'framer-motion';
import { 
  staggerContainerVariants, 
  staggerItemVariants
} from '../animations/motionVariants';
import { useInView } from '../animations/hooks';

const Blog: React.FC = () => {
  const { ref: containerRef, isInView } = useInView();

  const posts = [
    {
      id: 1,
      title: 'AI in the Modern Workplace: A Guide for Businesses',
      excerpt: 'Explore how artificial intelligence is transforming business operations and creating new opportunities for growth and innovation.',
      image: '/Neonspark_files/post-1.jpg',
      date: '04 Apr, 2025',
      category: 'Artificial Intelligence',
      link: '/blog/post-1'
    },
    {
      id: 2,
      title: 'The Future of Remote Work: Building High-Performance Distributed Teams',
      excerpt: 'Discover strategies for creating successful remote teams and maintaining productivity in a distributed work environment.',
      image: '/Neonspark_files/post-2.jpg',
      date: '28 Mar, 2025',
      category: 'Remote Work',
      link: '/blog/post-2'
    },
    {
      id: 3,
      title: 'Cybersecurity in 2025: Protecting Your Business from Evolving Threats',
      excerpt: 'Essential cybersecurity strategies and best practices to safeguard your business in an increasingly connected world.',
      image: '/Neonspark_files/post-3.jpg',
      date: '15 Mar, 2025',
      category: 'Artificial Intelligence',
      link: '/blog/post-3'
    },
    {
      id: 4,
      title: 'Digital Transformation Roadmap: A Step-by-Step Guide for Modern Businesses',
      excerpt: 'Navigate your digital transformation journey with practical strategies and proven frameworks for successful organizational change.',
      image: '/Neonspark_files/post-4.jpg',
      date: '01 Mar, 2025',
      category: 'Digital Transformation',
      link: '/blog/post-4'
    }
  ];

  return (
    <section className="section bg-dark">
      <div className="container">
        {/* Header Section */}
        <motion.div 
          className="flex flex-col justify-center items-center text-center gap-y-4 mb-14"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="badge"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, ease: 'backOut' }}
            viewport={{ once: true }}
          >
            Blog
          </motion.div>
          <motion.h2 
            className="text-h2 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Latest Insights
          </motion.h2>
          <motion.p 
            className="text-lg text-text-light max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Stay updated with the latest trends, technologies, and best practices in the digital world 
            through our expertly crafted blog posts.
          </motion.p>
        </motion.div>
        
        {/* Blog Posts Grid with Staggered Animation */}
        <motion.div 
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          viewport={{ once: true }}
        >
          {posts.slice(0, 2).map((post, index) => (
            <motion.div 
              key={post.id}
              className="blog-card"
              variants={staggerItemVariants}
              whileHover={{ 
                y: -12,
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
              }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '2rem' }}
            >
              <div className="blog-card-image-wrapper" style={{ flexShrink: 0 }}>
                <a href={post.link} style={{ display: 'block', width: '100%', height: '100%' }}>
                  <motion.img
                    alt={post.title}
                    fetchPriority="high"
                    loading="lazy"
                    width="610"
                    height="363"
                    decoding="async"
                    className="blog-card-image"
                    style={{ color: 'transparent' }}
                    src={post.image}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                </a>
              </div>

              <div className="blog-card-content home-blog-card-content mt-4">
                <motion.span 
                  className="blog-category-tag"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {post.category}
                </motion.span>

                <motion.h4
                  className="blog-card-title home-blog-card-title"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                  viewport={{ once: true }}
                >
                  {post.title}
                </motion.h4>

                <motion.p 
                  className="blog-card-excerpt"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {post.excerpt}
                </motion.p>

                <div
                  className="blog-card-footer home-blog-card-footer mt-4"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: '10px',
                    columnGap: '12px'
                  }}
                >
                  <span className="blog-date">{post.date}</span>
                  <motion.a 
                    href={post.link}
                    className="blog-read-more"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ marginLeft: 'auto' }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                      Visit
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="/blog" 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Posts
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
