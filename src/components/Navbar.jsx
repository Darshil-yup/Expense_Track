import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  // 1. State to track if the navbar should be "scrolled"
  const [scrolled, setScrolled] = useState(false);

  // 2. Function to handle the scroll event
  const handleScroll = () => {
    // If window.scrollY is more than 50, set scrolled to true
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // 3. Add a scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function to remove the listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // 4. Conditionally add the "scrolled" class to the navbar
    <nav className={scrolled ? 'navbar scrolled' : 'navbar'}>
      <NavLink to="/dashboard" className="navbar-brand">
        Expense Tracker
      </NavLink>
      <ul className="navbar-links">
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/expenses">All Expenses</NavLink></li>
        <li><NavLink to="/add-expense">Add Expense-Sujal</NavLink></li>
        <li><NavLink to="/investments">Investments</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;