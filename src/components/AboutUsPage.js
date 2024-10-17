import React from 'react';
import './AboutUsPage.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const AboutUsPage = () => {
  return (
    <div className="about-page">

      <section className="about-content">
        <h1>About Gem Hire</h1>
        <p>
        Gem Hire is a job search platform designed to empower employees in their career journeys.
         We connect job seekers with top companies, providing tailored job postings that match individual 
         specifications and preferences. Our platform offers real company reviews, salary insights, and a 
         streamlined application process, ensuring that you find the perfect job that aligns with your career 
         goals.
        </p>

        <div className="about-mission">
          <h2>Our Mission</h2>
          <p>
          At Gem Hire, our mission is to simplify the job search process by offering personalized job 
          recommendations, fostering transparency through authentic company reviews, and equipping job 
          seekers with the information they need to make informed career choices.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
