// src/Home.jsx
import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="image-container">
        <img src="./logo.jpg" className="centered-image" alt="Headshot" />
      </div>
      <div className="footer-placeholder"></div>
    </div>
  );
}

