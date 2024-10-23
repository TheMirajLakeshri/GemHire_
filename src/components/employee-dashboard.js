import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Search, 
  Briefcase, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import './employee-dashboard.css';
const Calendar = ({ selectedDate, onChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatMonth = (date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const isSelected = (day) => {
    return day === selectedDate?.getDate() && 
           currentDate.getMonth() === selectedDate?.getMonth() && 
           currentDate.getFullYear() === selectedDate?.getFullYear();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onChange(newDate);
  };

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const totalDays = daysInMonth(currentDate);
  const firstDay = startDayOfMonth(currentDate);
  
  const days = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDay + 1;
    return day > 0 && day <= totalDays ? day : null;
  });

  return (
    <div className="calendar-card">
      <div className="calendar-header">
        <h3 className="section-title">{formatMonth(currentDate)}</h3>
        <div className="calendar-nav">
          <button onClick={handlePrevMonth} className="hover:bg-gray-100 p-1 rounded">
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNextMonth} className="hover:bg-gray-100 p-1 rounded">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {weekDays.map(day => (
          <div key={day} className="calendar-cell weekday">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => (
          <button
            key={index}
            className={`calendar-cell ${
              day ? 'hover:bg-gray-100' : 'invisible'
            } ${isToday(day) ? 'today' : ''} ${
              isSelected(day) ? 'active' : ''
            }`}
            onClick={() => day && handleDateClick(day)}
            disabled={!day}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

const ProfileSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('profile');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const navItems = [
    { id: 'profile', icon: <User size={20} />, label: 'Profile' },
    { id: 'findJob', icon: <Search size={20} />, label: 'Find Job' },
    { id: 'previousWork', icon: <Briefcase size={20} />, label: 'Previous Work' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Setting' },
    { id: 'logout', icon: <LogOut size={20} />, label: 'Logout' }
  ];

  const basicInfo = [
    { label: 'Hire Date', value: 'August 15, 2023' },
    { label: 'Employee ID', value: 'EMP123456' },
    { label: 'Name', value: 'Mansi Maruti Borle' }
  ];

  const personalInfo = [
    { label: 'Birth Date', value: 'January 15, 1990' },
    { label: 'Address', value: '123 Tech Street, Digital City' },
    { label: 'Email', value: 'user@example.com' },
    { label: 'Phone', value: '+1 234 567 8900' }
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

                // Redirect to Find Job page if 'findJob' is clicked
                if (item.id === 'findJob') {
                  navigate('/JobProfile'); // Redirect to /find-job or another route you want
                }
                else if (item.id === 'previousWork') {
                  navigate('/PreWork'); // Redirect to /find-job or another route you want
                }
                else if (item.id === 'settings') {
                  navigate('/Settings'); // Redirect to /find-job or another route you want
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
        <div className="content-wrapper">
          {/* Profile Section */}
          <section className="profile-section">
            <div className="info-group">
              <h2 className="section-title">Basic Information</h2>
              {basicInfo.map((info, index) => (
                <div key={index} className="info-row">
                  <span className="info-label">{info.label}</span>
                  <span>{info.value}</span>
                </div>
              ))}
            </div>

            <div className="info-group">
              <h2 className="section-title">Personal Information</h2>
              {personalInfo.map((info, index) => (
                <div key={index} className="info-row">
                  <span className="info-label">{info.label}</span>
                  <span>{info.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Right Sidebar */}
          <aside className="right-sidebar">
            <div className="news-card">
              <h3 className="section-title">News</h3>
              <div className="news-placeholder" />
            </div>

            <Calendar 
              selectedDate={selectedDate}
              onChange={setSelectedDate}
            />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ProfileSection;