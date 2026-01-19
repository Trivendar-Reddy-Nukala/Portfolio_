// components/Skills.jsx
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const skills = [
    { name: 'React.js', level: 90, category: 'frontend' },
    { name: 'HTML5', level: 90, category: 'frontend' },
    { name: 'Node.js', level: 85, category: 'backend' },
    { name: 'MongoDB', level: 80, category: 'database' },
    { name: 'Express.js', level: 85, category: 'backend' },
    { name: 'JavaScript', level: 90, category: 'language' },
    { name: 'Java', level: 85, category: 'language' },
    { name: 'Python', level: 75, category: 'language' },
    { name: 'Git', level: 80, category: 'tools' },
    { name: 'Tailwind CSS', level: 85, category: 'frontend' },
    { name: 'MySQL', level: 75, category: 'database' },
    { name: 'RESTful APIs', level: 90, category: 'backend' },
    { name: 'Java', level: 90, category: 'Programming Language' },
    { name: 'javascript', level: 90, category: 'Programming Language' },
    { name: 'python', level: 90, category: 'Programming Language' },
    { name: 'C', level: 90, category: 'Programming Language' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };


  return (
    <section id="skills" className="skills-section" ref={ref}>
      <motion.div
        className="skills-container"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Skills & Technologies
        </motion.h2>

        {/* Simple grid of skills */}
        <motion.div
          className="skills-grid animated-skills-bg"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {['Frontend', 'Backend', 'Database', 'Tools', 'Programming Language'].map((category, idx) => (
            <motion.div
              key={idx}
              className="skill-category"
              whileHover={{ scale: 1.08, boxShadow: '0 0 30px #00ffe7, 0 0 60px #0051ff' }}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 + idx * 0.2, type: 'spring' }}
            >
              <h3 style={{
                background: 'linear-gradient(90deg, #00ffe7, #0051ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
                fontSize: '1.5rem',
                letterSpacing: '0.1rem',
                marginBottom: '1rem'
              }}>{category}</h3>
              <div className="category-skills">
                {skills
                  .filter(s => s.category.toLowerCase() === category.toLowerCase())
                  .map((skill, i) => (
                    <motion.span
                      key={i}
                      className="skill-tag animated-skill-tag"
                      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.1, type: 'spring' }}
                      whileHover={{
                        scale: 1.2,
                        boxShadow: '0 0 20px #00ffe7, 0 0 40px #0051ff',
                        background: 'linear-gradient(90deg, #00ffe7, #0051ff)',
                        color: '#000',
                        borderColor: '#00ffe7'
                      }}
                    >
                      <span style={{ fontWeight: 'bold' }}>{skill.name}</span>
                    </motion.span>
                  ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
