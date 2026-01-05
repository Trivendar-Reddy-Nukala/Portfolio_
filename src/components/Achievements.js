// components/Achievements.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Achievements.css';

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const achievements = [
    {
      title: 'Techsaviskaar 3.0 Winner',
      description: 'Led 4-person team to victory against 500+ teams nationwide',
      date: 'April 2025',
      icon: '🏆'
    },
    {
      title: 'NPTEL Elite',
      description: 'Data Structures and Algorithms in Java certification',
      date: '2025',
      icon: '🎓'
    },
    {
      title: 'CGPA: 9.0/10.0',
      description: 'Bachelor of Engineering in Computer Science',
      date: 'Expected May 2027',
      icon: '📚'
    },
    {
      title: 'NPTEL Elite Badge',
      description: 'C Programming Certification',
      date: '2024',
      icon: '💻'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const achievementVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section id="achievements" className="achievements-section" ref={ref}>
      <motion.div
        className="achievements-container"
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
          Achievements & Certifications
        </motion.h2>

        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="achievement-card"
              variants={achievementVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 15px 30px rgba(255,255,255,0.3)',
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="achievement-icon"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              >
                {achievement.icon}
              </motion.div>
              <h3 className="achievement-title">{achievement.title}</h3>
              <p className="achievement-description">{achievement.description}</p>
              <span className="achievement-date">{achievement.date}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Achievements;
