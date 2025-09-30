// components/Projects.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projects = [
    {
      title: 'MediCamp AI',
      description: 'Real-time speech-to-speech medical translation app supporting 10+ languages with secure JWT authentication',
      tech: ['React', 'Node.js', 'MongoDB', 'Gemini API', 'JWT'],
      achievements: ['Hackathon Winner', '12 Secured API Routes', 'Rate Limiting Implemented'],
      github: 'https://github.com/Trivendar-Reddy-Nukala/MediCamp.ai'
    },
    {
      title: 'Ahara Vastra',
      description: 'Full-stack charity platform connecting NGOs with donors for food and clothing distribution',
      tech: ['MERN Stack', 'Express.js', 'Artillery', 'RESTful APIs'],
      achievements: ['15+ API Endpoints', '1000 Concurrent Users', '<150ms Latency'],
      github: 'https://github.com/Trivendar-Reddy-Nukala/AharaVastra'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, x: -100, rotateY: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 50
      }
    }
  };

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <motion.div
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Featured Projects
        </motion.h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              variants={projectVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                boxShadow: '0 20px 40px rgba(255,255,255,0.2)'
              }}
            >
              <motion.div
                className="project-number"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.2, type: 'spring' }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={i}
                    className="tech-tag"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <div className="project-achievements">
                {project.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    className="achievement-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <span className="achievement-dot">•</span>
                    {achievement}
                  </motion.div>
                ))}
              </div>

              <motion.a
                href={project.github}
                className="project-link"
                whileHover={{ x: 10 }}
              >
                View on GitHub →
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
