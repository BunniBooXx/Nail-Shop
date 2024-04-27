import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');

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
      const response = await fetch(`http://localhost:5000/user/signup`, {
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
      } else if (response.status === 409) {
        console.error('Signup failed:', data.message);
        setMessage(data.message);
      } else {
        console.error('Signup failed:', data.message);
        setMessage('Signup failed');
      }
    } catch (error) {
      console.error('Error in signup request:', error);
      setMessage('Network error');
    }
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
