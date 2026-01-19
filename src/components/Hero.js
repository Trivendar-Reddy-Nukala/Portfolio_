import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">

        <h1 className="hero-title">
          Hi, I’m Trivendar — <br /> Full Stack Developer
        </h1>
        <div className="profile-photo-container">
          <img src="/photo.jpg" alt="Trivendar" className="profile-photo" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
