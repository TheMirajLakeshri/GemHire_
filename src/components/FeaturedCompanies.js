import React from 'react';
import './FeaturedCompanies.css';

const FeaturedCompanies = () => {
  return (
    <section className="featured-companies">
      <h2>Top Companies using our software</h2>
      <div className="companies-grid">
        <div className="company-card">Mahindra Brothers</div>
        <div className="company-card">Vasupujya</div>
        <div className="company-card">Nihiar</div>
        <div className="company-card">Gitanjali</div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;
