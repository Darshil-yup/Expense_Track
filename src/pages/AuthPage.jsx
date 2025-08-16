import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; // We will create this new CSS file

const AuthPage = ({ onLogin, onSignup }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // State for Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State for Signup form
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(user => user.email === loginEmail && user.password === loginPassword);
    if (foundUser) {
      onLogin(foundUser);
      navigate('/profile');
    } else {
      alert('Invalid email or password!');
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === signupEmail);
    if (userExists) {
      alert('An account with this email already exists!');
      return;
    }
    const newUser = { name: signupName, email: signupEmail, password: signupPassword };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! Please log in to continue.');
    setIsFlipped(false); // Flip back to the login form
  };

  return (
    <div className="auth-page-container">
      <div className={`flip-card ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="flip-card-inner">
          {/* Front of the card (Login) */}
          <div className="flip-card-front">
            <div className="auth-form-card">
              <h2>Welcome Back!</h2>
              <form className="auth-form" onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                <button type="submit">Login</button>
              </form>
              <span className="form-footer">
                Don't have an account? <button onClick={() => setIsFlipped(true)} className="flip-button">Sign Up</button>
              </span>
            </div>
          </div>

          {/* Back of the card (Signup) */}
          <div className="flip-card-back">
            <div className="auth-form-card">
              <h2>Create Account</h2>
              <form className="auth-form" onSubmit={handleSignup}>
                <input type="text" placeholder="Full Name" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
                <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
                <button type="submit">Sign Up</button>
              </form>
              <span className="form-footer">
                Already have an account? <button onClick={() => setIsFlipped(false)} className="flip-button">Login</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;