// components/Contact.jsx
import React, { useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import { motion, useInView } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send(
      'service_l4lujpc', // replace with your EmailJS service ID
      'template_rkguxg5', // replace with your EmailJS template ID
      {
        from_name: formState.name,
        from_email: formState.email,
        message: `${formState.message}\n\nSender Email: ${formState.email}`
      },
      'UWBOOnHLge52NnA8l' // replace with your EmailJS public key
    )
      .then(
        (result) => {
          alert('Message sent successfully!');
          setFormState({ name: '', email: '', message: '' });
        },
        (error) => {
          alert('Failed to send message. Please try again later.');
        }
      );
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Trivendar-Reddy-Nukala', icon: <FaGithub size={24} /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/trivendar-reddy-nukala-0031092a7/', icon: <FaLinkedin size={24} /> },
    { name: 'LeetCode', url: 'https://leetcode.com/TrivendarReddy', icon: <FaCode size={24} /> },
    { name: 'Email', url: 'mailto:trivendarreddy25@gmail.com', icon: <FaEnvelope size={24} /> }
  ];

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <motion.div
        className="contact-container"
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
          Get In Touch
        </motion.h2>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3>Let's work together</h3>
            <p className="contact-description">
              I'm currently seeking software engineering opportunities to solve complex technical challenges.
              Feel free to reach out!
            </p>

            <div className="contact-details">
              <motion.div
                className="detail-item"
                whileHover={{ x: 10 }}
              >
                <span className="detail-icon">📍</span>
                <span>Hyderabad, India</span>
              </motion.div>
              <motion.div
                className="detail-item"
                whileHover={{ x: 10 }}
              >
                <span className="detail-icon">📧</span>
                <span>trivendarreddy25@gmail.com</span>
              </motion.div>
              <motion.div
                className="detail-item"
                whileHover={{ x: 10 }}
              >
                <span className="detail-icon">📱</span>
                <span>+91-830-905-9324</span>
              </motion.div>
            </div>

            <div className="social-links">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                  whileHover={{
                    scale: 1.2,
                    boxShadow: '0 0 20px rgba(255,255,255,0.5)'
                  }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>

          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="form-group"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="text"
                placeholder="Your Name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
              />
            </motion.div>
            <motion.div
              className="form-group"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="email"
                placeholder="Your Email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
              />
            </motion.div>
            <motion.div
              className="form-group"
              whileHover={{ scale: 1.02 }}
            >
              <textarea
                placeholder="Your Message"
                rows="6"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
              />
            </motion.div>
            <motion.button
              type="submit"
              className="submit-button"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(255,255,255,0.5)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>

        <motion.footer
          className="footer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p>© 2026 Trivendar Reddy Nukala. All rights reserved.</p>
        </motion.footer>
      </motion.div>
    </section>
  );
};

export default Contact;
