import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './components/LandingPage';
import AboutUsPage from './components/AboutUsPage';
import NewsPage from './components/News';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
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
      </Routes>
    </Router>
  );
}

export default App;
