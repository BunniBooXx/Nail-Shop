import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <div className="cute-image-container">
                <img src='logo.jpg' alt="Cute Image" className="cute-image" />
            </div>
            <div className="text-container">
                <h2 className="title">Bunny Bubbles Nails</h2>
                <p className="description">
                    Welcome to our whimsical world of press-on nails! At Bunny Bubbles Nails, we believe that every fingertip deserves to be a canvas for creativity and self-expression.
                </p>
                <p className="description">
                    Our collection of meticulously crafted designs is inspired by the playful and charming spirit of bunnies, bubbles, and all things cute. From pastel hues to bold patterns, our press-on nails are handmade with love and attention to detail, ensuring that each piece is truly unique and special.
                </p>
                <p className="description">
                    Whether you're seeking a subtle accent or a bold statement, our nails are designed to empower you to unleash your inner beauty and confidence. Join us on this fabulous journey and let your nails sparkle with personality!
                </p>
            </div>
        </div>
    );
};

export default AboutUs;





             