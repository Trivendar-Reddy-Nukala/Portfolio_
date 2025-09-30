// components/About.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="about-section" ref={ref}>
      <motion.div
        className="about-container"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="about-intro">
              Computer Science student and Full Stack Developer specializing in MERN stack development
              with strong expertise in data structures and algorithms.
            </p>
            <p className="about-description">
              I'm passionate about building scalable web applications and solving complex technical challenges.
              With experience in designing, developing, and deploying full-stack solutions, I thrive in fast-paced
              environments like hackathons where innovation meets execution.
            </p>
            <motion.div
              className="education-box"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3>Education</h3>
              <p><strong>Bachelor of Engineering in Computer Science</strong></p>
              <p>Vasavi College of Engineering, Hyderabad</p>
              <p>CGPA: 9.0/10.0 | Expected May 2027</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="about-highlights"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {[
              { label: 'Experience', value: 'MERN Stack Development' },
              { label: 'Specialty', value: 'Full Stack Web Apps' },
              { label: 'Focus', value: 'Scalable Solutions' },
              { label: 'Achievement', value: 'Hackathon Winner' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="highlight-item"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.1, borderColor: 'white' }}
              >
                <span className="highlight-label">{item.label}</span>
                <span className="highlight-value">{item.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
