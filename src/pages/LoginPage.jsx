import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css'; // We will update this CSS

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(user => user.email === email && user.password === password);
    
    if (foundUser) {
      onLogin(foundUser);
      navigate('/profile');
    } else {
      alert('Invalid email or password!');
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="form-column">
        {/* Animated background will be created here by CSS */}
        <div className="background-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <div className="auth-form-card">
          <h2>Welcome Back!</h2>
          <p>Login to continue your financial journey.</p>
          <form className="auth-form" onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Your Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <input 
              type="password" 
              placeholder="Your Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <button type="submit">Login</button>
          </form>
          <span className="form-footer">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;