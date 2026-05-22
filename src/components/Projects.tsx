import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainerVariants } from '../animations/motionVariants';
import { useInView } from '../animations/hooks';
import { projects, type Project } from '../data/projects';
import { useProjectModal } from '../contexts/ProjectModalContext';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { openModal } = useProjectModal();

  return (
    <motion.div
      className="card gradient-border bg-dark overflow-hidden flex flex-col"
      style={{ cursor: 'pointer' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        boxShadow: '0 16px 40px rgba(59, 130, 246, 0.35)',
      }}
      onClick={() => openModal(project)}
    >
      {/* Card Header */}
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-base font-semibold gradient-text mb-1">{project.title}</h3>
        <p className="text-sm text-text-light leading-snug">{project.description}</p>
      </div>

      {/* Project Image */}
      <div className="mx-5 mb-4 mt-4 rounded-xl overflow-hidden" style={{ height: '180px' }}>
        <img
          alt={project.title}
          src={project.image}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Tags */}
      <div className="px-5 pb-5 flex gap-2 flex-wrap mt-auto">
        {project.tags.map((tag) => (
          <span key={tag} className="badge" style={{ fontSize: '11px', padding: '2px 8px' }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

const Projects: React.FC = () => {
  const { ref: containerRef, isInView } = useInView();

  return (
    <section className="section bg-dark">
      <div className="container">
        {/* Header */}
        <motion.div
          className="flex flex-col justify-center items-center text-center gap-y-4 mb-10"
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
            Portfolio
          </motion.div>
          <motion.h2
            className="text-h2 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Recent Projects
          </motion.h2>
          <motion.p
            className="text-lg text-text-light max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explore our latest work and see how we've helped businesses transform their digital presence
            with innovative solutions and cutting-edge technology.
          </motion.p>
        </motion.div>

        {/* 3-Column Grid */}
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          viewport={{ once: true }}
        >
          {projects.slice(0, 6).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/portfolio"
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
