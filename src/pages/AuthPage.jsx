import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

// Assuming you have these images in your public/img folder
const log_svg = 'public/img/log.svg';
const register_svg = 'public/img/register.svg';


const AuthPage = ({ onLogin }) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();

  // States for the Sign In form
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // States for the Sign Up form
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  // Add these two lines with your other useState hooks
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const handleSignUpClick = () => setIsSignUpMode(true);
  const handleSignInClick = () => setIsSignUpMode(false);

  // --- LOGIN LOGIC ---
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted...");

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(user => user.email === signInEmail && user.password === signInPassword);

    if (foundUser) {
      console.log("✅ User found:", foundUser);
      if (typeof onLogin === 'function') {
        onLogin(foundUser);
        console.log("Navigating to /profile...");
        navigate('/profile');
      } else {
        console.error("🚨 'onLogin' prop is not a function!");
        alert("Login failed: App is not configured correctly.");
      }
    } else {
      console.log("❌ User not found or password incorrect.");
      alert('Invalid email or password!');
    }
  };

  // --- SIGNUP LOGIC ---
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log("Signup submitted...");

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === signUpEmail);

    if (userExists) {
      alert('An account with this email already exists!');
      return;
    }

    const newUser = { name: signUpName, email: signUpEmail, password: signUpPassword };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful! Please log in to continue.');
    setIsSignUpMode(false); // Switch to the sign-in panel
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign In Form with working logic */}
          <form action="#" className="sign-in-form" onSubmit={handleLoginSubmit}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input 
                type="email" 
                placeholder="Email" 
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input 
                type={showSignInPassword ? "text" : "password"} // Dynamic type
                placeholder="Password" 
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                required
              />
              <i 
                className={`fas ${showSignInPassword ? "fa-eye-slash" : "fa-eye"} eye-icon`}
                onClick={() => setShowSignInPassword(!showSignInPassword)}
              ></i>
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>

          {/* Sign Up Form with working logic */}
          <form action="#" className="sign-up-form" onSubmit={handleSignUpSubmit}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input 
                type="text" 
                placeholder="Username" 
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input 
                type="email" 
                placeholder="Email" 
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input 
                type={showSignUpPassword ? "text" : "password"} // Dynamic type
                placeholder="Password" 
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                required
              />
              <i 
                className={`fas ${showSignUpPassword ? "fa-eye-slash" : "fa-eye"} eye-icon`}
                onClick={() => setShowSignUpPassword(!showSignUpPassword)}
              ></i>
            </div>
            <input type="submit" className="btn" value="Sign up" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src={log_svg} className="image" alt="Sign up illustration" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <img src={register_svg} className="image" alt="Sign in illustration" />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;