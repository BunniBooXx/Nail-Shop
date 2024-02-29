import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaYoutube, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Contact.css'; // Import the new stylesheet
import TikTokIcon from './TikTok.jsx'; // Import the TikTok SVG icon
import { FaMusic } from 'react-icons/fa';

const Contact = () => {
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_cy4gtba', 'template_wb3p7ig', form.current, 'DIYtEKySAa2FGxFbF')
      .then((result) => {
        console.log(result.text);
        console.log("message sent");
        setMessageSent(true);
        setTimeout(() => setMessageSent(false), 3000); // Hide the message after 3 seconds
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <div className="contact-container">
      <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <h1 className="title">Kawaii Contact Form</h1>

        <label className="input-label">Your Name ♡</label>
        <input type="text" name="user_name" className="input-field" placeholder="Your cute name" />

        <label className="input-label">Your Email ✉</label>
        <input type="email" name="user_email" className="input-field" placeholder="Your adorable email" />

        <label className="input-label">Your Message 💬</label>
        <textarea name="message" className="input-field" placeholder="Your sweet message" />

        <button type="submit" className="submit-button">Send Your Message</button>
        <br/>
        {messageSent && (
        <div className="popup-message">
          <p>Message Sent! 💌</p>
        </div>
      )}
      </form>

      <br/>

      <div className="contact-info">
        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <p>bunnybubblenails@gmail.com</p>
        </div>
        <div className="contact-item">
          <FaPhone className="contact-icon" /> 
          <p>+1-347-530-3644</p>
        </div>
        <br/>
        <div className="social-icons">
          <a href="https://www.youtube.com/user/example" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="social-icon" />
          </a>
          <a href="https://www.instagram.com/example/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
            <FaMusic className="social-icon"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;



