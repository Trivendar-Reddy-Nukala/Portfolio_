// components/Loader.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const Loader = () => {
  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: [0, 1, 1, 0],
      y: [50, 0, 0, -50],
      transition: {
        duration: 2,
        times: [0, 0.3, 0.7, 1],
        repeat: Infinity,
        repeatDelay: 0.5
      }
    }
  };

  const circleVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: [0, 1, 1, 0],
      opacity: [0, 1, 1, 0],
      rotate: [0, 0, 360, 360],
      transition: {
        duration: 3,
        times: [0, 0.3, 0.7, 1],
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      className="loader-container"
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
      <div className="loader-content">
        <motion.svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="loader-svg"
        >
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            stroke="white"
            strokeWidth="2"
            fill="none"
            variants={circleVariants}
            initial="initial"
            animate="animate"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="60"
            stroke="white"
            strokeWidth="1"
            fill="none"
            variants={circleVariants}
            initial="initial"
            animate="animate"
            style={{ animationDelay: '0.2s' }}
          />
        </motion.svg>
        <motion.h1
          className="loader-text"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          TRIVENDAR REDDY
        </motion.h1>
        <motion.p
          className="loader-subtext"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
        >
          Full Stack Developer
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
