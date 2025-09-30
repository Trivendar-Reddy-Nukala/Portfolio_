// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
// Removed mobile toggle icons
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  // Removed mobileOpen state

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Achievements', 'Contact'];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="nav-logo" variants={itemVariants}>
        <span className="logo-text">TR</span>
      </motion.div>
      <ul className="nav-links">
        {navItems.map((item, index) => (
          <motion.li key={index} variants={itemVariants}>
            <a
              href={`#${item.toLowerCase()}`}
              className={activeSection === item.toLowerCase() ? 'active' : ''}
              onClick={() => setActiveSection(item.toLowerCase())}
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.span>
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Navbar;
