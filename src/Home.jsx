import React from 'react';
import './Home.css'; // Import your CSS file for styling

export default function Home() {
  return (
    <div className="home-container">
      <img src="./logo.jpg" className="centered-image" alt="Headshot" />
      <div className="footer-placeholder"></div> {/* This will create space for the footer */}
    </div>
  );
}


