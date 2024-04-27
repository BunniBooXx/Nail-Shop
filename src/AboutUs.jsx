import React from 'react';
import './AboutUs.css';

export default function AboutUs() {
    return (
        <div className="about-us-container">
            <div className="image-container">
                <img src="logo.jpg" alt="logo" className="cute-image" />
            </div>
            <div className="text-container">
                <h2 className="title">About Us</h2>
                <br/>
                <p className="description">
                    Welcome to Bunny Bubbles Nails, where every fingertip becomes a canvas for creativity and charm! 
                    Nestled in the heart of elegance, we pride ourselves on delivering press-on nails that sparkle with 
                    personality and radiate sophistication. At Bunny Bubbles, we believe that self-expression knows no bounds, 
                    and our collection of meticulously crafted designs caters to every style whim, from playful pastels to timeless classics. 
                    Our mission is to empower individuals to unleash their inner beauty with a touch of whimsy, one nail at a time. 
                    Crafted with love and attention to detail, our press-on nails are all handmade, ensuring that each piece is unique and special. 
                    They're not just an accessory but a statement piece that exudes confidence and grace.
                    Whether you're seeking a subtle accent or a bold statement, Bunny Bubbles Nails is your one-stop destination for all things fabulous and fun. 
                    Join us in this enchanting journey of nail artistry, where each manicure promises a sprinkle of joy and a dash of elegance.
                </p>
            </div>
        </div>
    );
}
