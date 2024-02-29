import React from 'react';
import './Signup.css';

const Signup = () => {
  return (
    <div className="background-signup">
    <div className="signup-container">
      <br/>
      <br/>
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div className="input-group">
          <label htmlFor="confirm password">Confirm Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </div>
  );
}

export default Signup;


