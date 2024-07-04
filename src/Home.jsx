// src/Home.jsx
// src/Home.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import './Home.css';

export default function Home() {
  return (
    <>
      <Helmet>
        <link rel="preload" href="./logo.jpg" as="image" />
      </Helmet>
      <div className="home-container">
        <div className="image-container">
          <img src="./logo.jpg" className="centered-image" alt="Headshot" />
        </div>
        <div className="footer-placeholder"></div>
      </div>
    </>
  );
}

