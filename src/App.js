import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './components/LandingPage';
import AboutUsPage from './components/AboutUsPage';
import NewsPage from './components/News';
import Navbar from './components/Navbar';
import Employeedashboard from './components/employee-dashboard';
import JobProfile from './components/JobProfile';
import PreWork from './components/PreWork';
import Settings from './components/Settings';
import EmployeeDetails from './components/employee-detail';
import CompanyDetails from './components/company-dashboard';
import EmployeeAttendance from './components/employee-attendance';
import CreateJobModal from './components/CreateJobModal';
import JobsPage from './components/ListedJobs';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const currentLocation = useLocation();  
  const showNavbar = !['/employee-dashboard','/listed-jobs','/company-dashboard','/employee-attendance', '/JobProfile','/PreWork','/Settings','/employee-detail'].includes(currentLocation.pathname);  // Exclude both paths

  return (
    <>
      {showNavbar && <Navbar />}  {/* Conditionally render the Navbar */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/signup" element={<LandingPage />} />
        <Route path="/employee-dashboard" element={<Employeedashboard />} />
        <Route path="/JobProfile" element={<JobProfile />} />
        <Route path="/PreWork" element={<PreWork />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/EmployeeDeatils" element={<EmployeeDetails />} />
        <Route path="/company-dashboard" element={<CompanyDetails />} />
        <Route path="/employee-attendance" element={<EmployeeAttendance />} />
        <Route path="/create-job" element={<CreateJobModal />} />
        <Route path="/listed-jobs" element={<JobsPage />} />
      </Routes>
    </>
  );
}

export default App;
