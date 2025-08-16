import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForm.css';

const SignupPage = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    
    // Get the list of users from localStorage, or create an empty list
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if the email already exists
    const userExists = users.some(user => user.email === email);
    
    if (userExists) {
      alert('An account with this email already exists!');
      return;
    }
    
    // Add the new user to the list
    const newUser = { name, email, password };
    users.push(newUser);
    
    // Save the updated list back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Call the onSignup function from App.jsx to set the current user
    onSignup(newUser);
    
    // Redirect to the profile page
    navigate('/profile');
  };

  return (
    <div className="auth-container">
      {/* ... (your background shapes) ... */}
      <div className="auth-form-card animate-fade-in-up">
        <h2>Create Your Account</h2>
        <form className="auth-form" onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign Up</button>
        </form>
        <span>Already have an account? <Link to="/login">Login</Link></span>
      </div>
    </div>
  );
};

export default SignupPage;