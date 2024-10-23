import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Search, 
  Briefcase, 
  Settings,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import './JobProfile.css';

const ProfileSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Set 'findJob' as the default active nav item
  const [activeNav, setActiveNav] = useState('findJob');
  const navigate = useNavigate();

  const jobListings = [
    {
      company: "Mahvir Brothers",
      position: "Bend Glass Expert",
      location: "Dadar, Mumbai",
      salary: "₹1000/day",
      availablePositions: 50,
      requirements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam."
    },
    {
      company: "Mahvir Brothers",
      position: "Bend Glass Expert",
      location: "Dadar, Mumbai",
      salary: "₹1000/day",
      availablePositions: 50,
      requirements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam."
    },
    {
      company: "Mahvir Brothers",
      position: "Bend Glass Expert",
      location: "Dadar, Mumbai",
      salary: "₹1000/day",
      availablePositions: 50,
      requirements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam."
    },
    {
      company: "Mahvir Brothers",
      position: "Bend Glass Expert",
      location: "Dadar, Mumbai",
      salary: "₹1000/day",
      availablePositions: 50,
      requirements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam."
    }
  ];

  const navItems = [
    { id: 'profile', icon: <User size={20} />, label: 'Profile' },
    { id: 'findJob', icon: <Search size={20} />, label: 'Find Job' },
    { id: 'previousWork', icon: <Briefcase size={20} />, label: 'Previous Work' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Setting' },
    { id: 'logout', icon: <LogOut size={20} />, label: 'Logout' }
  ];

  return (
    <div className="profile-page">
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo">
          <div className="logo-icon" />
          <span className="logo-text">GemHire</span>
        </div>
        
        <nav className="nav-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveNav(item.id);
                setIsSidebarOpen(false);
                if (item.id === 'profile') {
                  navigate('/employee-dashboard'); // Redirect to /find-job or another route you want
                }
                else if (item.id === 'previousWork') {
                  navigate('/PreWork'); // Redirect to /find-job or another route you want
                }
                else if (item.id === 'settings') {
                  navigate('/Settings'); // Redirect to /find-job or another route you want
                }
                else if(item.id==='logout')
                {
                  
                }
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="main-content">
       <div className="title"> <h2>Find Jobs</h2></div>
        <div className="job-grid">
          {jobListings.map((job, index) => (
            <div key={index} className="job-card">
              <div className="job-card-image">
                <img 
                  src="/images/findjob.jpg" // Replace with actual image path
                  alt="Job"
                />
              </div>
              
              <div className="job-card-content">
                <h3 className="company-name">{job.company}</h3>
                <div className="job-details">
                  <p className="requirements">Requirement: {job.requirements}</p>
                  <p>Address: {job.location}</p>
                  <p>Available position: {job.availablePositions}</p>
                  <p>Type of work: {job.position}</p>
                  <p>Payment: {job.salary}</p>
                </div>
                <button className="apply-button">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProfileSection;
