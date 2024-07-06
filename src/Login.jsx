import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Login.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
  
    console.log('Backend URL:', backendUrl);
  
    try {
      const response = await fetch(`${backendUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
  
      const data = await response.json();
      const accessToken = `Bearer ${data.access_token}`;
  
      console.log('Response:', response);
      console.log('Headers:', response.headers);
      console.log('Access Token:', accessToken);
      console.log('Response Data:', data);
  
      if (response.ok && accessToken) {
        console.log('Login successful');
        setMessage('Login successful');
        localStorage.setItem('token', accessToken);
        await login(formData.username, formData.password);
        navigate('/shop');
      } else {
        console.error('Invalid credentials');
        setMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error in login request:', error);
      setMessage('Network error');
    }
  };
  

  return (
    <div className="background">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </div>
          {message && <div className="message">{message}</div>}
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;








