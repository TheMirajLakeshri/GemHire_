import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './components/LandingPage';
import AboutUsPage from './components/AboutUsPage';
import NewsPage from './components/News';
import Navbar from './components/Navbar';
import Employeedashboard from './components/employee-dashboard';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const currentLocation = useLocation();  // Correctly use useLocation inside AppContent
  const showNavbar = currentLocation.pathname !== '/employee-dashboard';  // Check if path is NOT '/employee-dashboard'

  return (
    <>
      {showNavbar && <Navbar />}  {/* Conditionally render the Navbar */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/signup" element={<LandingPage />} />
        <Route path="/employee-dashboard" element={<Employeedashboard />} />
      </Routes>
    </>
  );
}

export default App;
