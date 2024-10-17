import React from 'react';
import { useLocation } from 'react-router-dom';
import './HeroSection.css';
import ToggleLogin from "./ToggleLogin";
import ToggleSignup from "./ToggleSignup";

const HeroSection = () => {
  const location = useLocation();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Find the Job that Fits You</h1>
        <p>Discover job listings, company, and job profiles.</p>
        {/* Uncomment this if you want the search bar */}
        {/* <div className="search-bar">
          <input type="text" placeholder="Job Title, Company, or Keyword" />
          <input type="text" placeholder="Location" />
          <button>Search</button>
        </div> */}
      </div>
      {location.pathname === '/signup' ? <ToggleSignup /> : <ToggleLogin />}
    </section>
  );
};

export default HeroSection;
