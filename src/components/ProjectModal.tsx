import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjectModal } from '../contexts/ProjectModalContext';
import './ProjectModal.css';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 28 },
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

export default function ProjectModal() {
  const { selectedProject, closeModal } = useProjectModal();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal();
    }
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, closeModal]);

  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={closeModal}
        >
          <motion.div
            className="modal-container card gradient-border bg-dark"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
              ✕
            </button>

            <div className="modal-image-wrapper">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                loading="lazy"
              />
            </div>

            <div className="modal-body">
              <h2 className="gradient-text">{selectedProject.title}</h2>

              <p className="modal-description">{selectedProject.fullDescription}</p>


            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
