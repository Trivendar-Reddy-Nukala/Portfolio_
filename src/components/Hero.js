// components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -180 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
        delay: 0.5
      }
    }
  };

  return (
    <section id="home" className="hero-section">
      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content">
          <motion.div className="hero-text" variants={textVariants}>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I'm
              <motion.span
                className="name-highlight"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {' '}Trivendar Reddy
              </motion.span>
            </motion.h1>
            <motion.h2
              className="hero-subtitle"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Full Stack Developer
            </motion.h2>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              MERN Stack Specialist | Hackathon Winner | Building Scalable Web Applications
            </motion.p>
            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="cta-button primary"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                View Work
              </motion.a>
              <motion.a
                href="#contact"
                className="cta-button secondary"
                whileHover={{ scale: 1.05, borderColor: 'white' }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image-container"
            variants={imageVariants}
          >
            <motion.div
              className="image-circle"
              animate={{
                rotate: 360,
                transition: {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }}
            >
              <div className="image-ring ring-1"></div>
              <div className="image-ring ring-2"></div>
              <div className="image-ring ring-3"></div>
            </motion.div>
            <div className="profile-image-placeholder">
              <img src="photo.jpg" alt="Trivendar Reddy" />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.5,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        >
          <div className="scroll-line"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
