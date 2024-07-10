import React from 'react';
import './DevInfo.css';

const DevInfo = () => {
    return (
        <div className="dev-info-container">
            <div className="image-container-dev">
                <div className="dev-info-image">
                    <img src="./headshot.jpg" alt="headshot" />
                </div>
            </div>
            <div className="dev-info-text">
                <h2 className="cute-heading">Meet Our Lovely Developer</h2>
                <br/>
                <p className="cute-paragraph">
                    Hi there! I'm Jaqueline Smith, the proud owner of Bunny Bubbles Nails. 
                    After attending Coding Temple and honing my software engineering skills, 
                    I decided to infuse my passion for creativity into my business endeavors. 
                    Here at Bunny Bubbles, I utilize my expertise in the React framework, leveraging Daisy UI and Tailwind CSS to craft delightful user experiences. Oh, and did I mention? 
                    Those adorable images on our website? All thanks to the magic of AI!
                </p>
            </div>
        </div>
    );
}

export default DevInfo;



