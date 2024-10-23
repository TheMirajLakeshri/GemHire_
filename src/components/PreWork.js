import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Search, Briefcase, Settings, Menu, X, LogOut } from 'lucide-react';
import './PreWork.css';

const ProfileSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('previousWork');
  const navigate = useNavigate();
  
  const navItems = [
    { id: 'profile', icon: <User size={20} />, label: 'Profile', route: '/employee-dashboard' },
    { id: 'findJob', icon: <Search size={20} />, label: 'Find Job', route: '/JobProfile' },
    { id: 'previousWork', icon: <Briefcase size={20} />, label: 'Previous Work' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Setting', route: '/Settings' },
    { id: 'logout', icon: <LogOut size={20} />, label: 'Logout' }
  ];

  const handleNavigation = (id, route) => {
    setActiveNav(id);
    setIsSidebarOpen(false);
    if (route) navigate(route);
  };

  return (
    <div className="profile-page">
      <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

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
                else if (item.id === 'findJob') {
                  navigate('/JobProfile'); // Redirect to /find-job or another route you want
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

      <div className="main-content">
        {activeNav === 'previousWork' && (
          <div className="previous-work-container">
            <h2 className="title">Previous Work</h2>
            <div className="previous-work-section">
              <table className="work-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>GSTID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Payment</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>1</td><td>#12345</td><td>Mahavir Brothers</td><td>Mahavir Brothers</td><td>Bend Glass</td><td>31,000</td><td>100%</td></tr>
                  <tr><td>2</td><td>#12346</td><td>Jayvendra Brothers</td><td>Jayvendra Brothers</td><td>Eye Glass</td><td>24,000</td><td>72%</td></tr>
                  <tr><td>3</td><td>#12306</td><td>Will John</td><td>Will John</td><td>Eye Glass</td><td>26,000</td><td>92%</td></tr>
                </tbody>
              </table>
              <button className="load-more-btn">Load More</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
