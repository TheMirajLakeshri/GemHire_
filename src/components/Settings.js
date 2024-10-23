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
import './Settings.css';

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '1234 Elm Street',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update user data, e.g., make an API call
    console.log('Updated Info:', formData);
  };

  return (
    <div>
      <div className='tittleSetting'> <h2>Personal Information</h2></div>
      {/* Title is outside the container now */}
      <div className="personal-info"> {/* Container for the form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="update-btn">Update Info</button>
        </form>
      </div>
    </div>
  );
};

const ProfileSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('settings');
  const navigate = useNavigate();

  const navItems = [
    { id: 'profile', icon: <User size={20} />, label: 'Profile' },
    { id: 'findJob', icon: <Search size={20} />, label: 'Find Job' },
    { id: 'previousWork', icon: <Briefcase size={20} />, label: 'Previous Work' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
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
                  navigate('/employee-dashboard');
                } else if (item.id === 'findJob') {
                  navigate('/JobProfile');
                } else if (item.id === 'previousWork') {
                  navigate('/PreWork');
                } else if (item.id === 'settings') {
                  navigate('/settings');
                } else if (item.id === 'logout') {
                  // Handle logout functionality
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
      <div className="main-content">
        {activeNav === 'settings' && <PersonalInfo />}
        {/* Add other content for different nav items */}
      </div>
    </div>
  );
};

export default ProfileSection;
