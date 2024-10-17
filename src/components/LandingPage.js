import React from 'react';
import HeroSection from './HeroSection';
import FeaturedCompanies from './FeaturedCompanies';
import HiringMap from "./HiringMap";
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <HiringMap />
      <FeaturedCompanies />
      <Footer />
    </div>
  );
};

export default LandingPage;
