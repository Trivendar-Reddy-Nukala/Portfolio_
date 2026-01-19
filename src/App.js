// App.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import GlobeBackground from './components/GlobeBackground';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <>
            <GlobeBackground />
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Cursor />
              <Navbar />
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Achievements />
              <Contact />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div >
  );
}

export default App;
