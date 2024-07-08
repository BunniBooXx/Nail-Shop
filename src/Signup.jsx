import React, { useState } from 'react';
import './Signup.css';


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 201) {
        console.log('Signup successful');
        setMessage('Signup successful');
        showNotification('Signup successful', 'success');
      } else if (response.status === 409) {
        console.error('Signup failed:', data.message);
        setMessage(data.message);
        showNotification(data.message, 'error');
      } else {
        console.error('Signup failed:', data.message);
        setMessage('Signup failed');
        showNotification('Signup failed', 'error');
      }
    } catch (error) {
      console.error('Error in signup request:', error);
      setMessage('Network error');
      showNotification('Network error', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification({ ...notification, visible: false });
    }, 3000);
  };

  return (
    <div className="background-signup">
      <div className="signup-container">
        <br />
        <br />
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" onChange={handleInputChange} value={formData.username} />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={handleInputChange} value={formData.email} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={handleInputChange} value={formData.password} />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleInputChange} value={formData.confirmPassword} />
          </div>
          {message && <div className="message">{message}</div>}
          <button className="signup-button"type="submit">Sign Up</button>
        </form>
      </div>
      
      {notification.visible && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default Signup;

