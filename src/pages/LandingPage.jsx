import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import TextType from '../TextType';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <TextType
          as="h1"
          text={[
            "Take Control of Your Finances",
            "Track Your Daily Expenses",
            "Save for the Future"
          ]}
          typingSpeed={100}
          deletingSpeed={50}
          pauseDuration={1500}
          loop={true}
        />
        <TextType
          as="p"
          text="A simple, intuitive, and powerful way to track your expenses and save money."
          typingSpeed={40}
          initialDelay={1000}
        />

        {/* Animated Buttons */}
        <div className="cta-buttons">
          <Link to="/auth" className="cta-button animate-btn">
            Login
          </Link>
          <Link to="/auth" className="cta-button secondary animate-btn">
            Sign Up
          </Link>
        </div>
      </div>

      <div className="wave-container">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 
              58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default LandingPage;
