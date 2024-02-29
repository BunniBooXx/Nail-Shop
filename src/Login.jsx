import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="background">
    <div className="login-container">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      <h2 className="login-title">Login</h2>
      <form className="login-form">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default Login;