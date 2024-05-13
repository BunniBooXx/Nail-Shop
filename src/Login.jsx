import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
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
    try {
      const response = await fetch(`http://localhost:5000/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const accessToken = response.headers.get('Authorization');
      console.log(response)
      console.log(response.headers)
      console.log(accessToken)
  
      if (response.ok && accessToken) {
        console.log('Login successful');
        setMessage('Login successful');
  
        localStorage.setItem('token', accessToken);
        navigate('/shop');
      } else {
        console.error('Invalid credentials');
        setMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Error in login request:', error);
      setMessage('Network error');
    }
  };
  

  const token = localStorage.getItem('token');

  return (
    <div className="background">
      <div className="login-container">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" onChange={handleInputChange} value={formData.username} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={handleInputChange} value={formData.password} />
          </div>
          {message && <div className="message">{message}</div>}
          <button className= "login-button" type="submit">Login</button>
        </form>
        {token && token !== "" && token !== undefined && (
          <div>You are logged in with this token: {token}</div>
        )}
      </div>
    </div>
  );
}

export default Login;




