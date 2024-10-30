import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import useLogout from '../hooks/useLogout';
import pb from "../lib/pocketbase"; // Import your PocketBase instance
import { toast } from 'react-toastify';
import CreateJobModal from './CreateJobModal'; // Import your CreateJobModal component
import './company-dashboard.css';

import img1 from '../img/p1.jpg';
import img2 from '../img/p2.jpg';
import img3 from '../img/p3.jpg';
import img4 from '../img/p4.jpg';

import {
    Blocks ,
    Users,
    Search,
    Settings,
    LogOut,
    ChevronDown,
    Timer,
    CalendarClock,
    SquareUserRound,
    ListCheck ,
    CalendarCheck ,
} from 'lucide-react';

const CompanyDetails = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
    const [activeNav, setActiveNav] = useState(null); // State for active navigation item
    const [userData, setUserData] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
    const [selectedTime, setSelectedTime] = useState("This Month"); // State for selected time period
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const logout = useLogout();

    useEffect(() => {
        if (pb.authStore.isValid) {
          const loggedInUser = pb.authStore.model; // This contains user data
          setUserData(loggedInUser);
        } else {
          console.log("User is not logged in.");
          toast.error("User is not logged in");
          navigate("/");
        }
      }, []);

    const navItems = [
        { id: 'Dashboard', icon: <Blocks  size={20} />, label: 'Dashboard' },
        { id: 'ListedJobs', icon: <ListCheck size={20} />, label: 'Listed Jobs' },
        { id: 'Attendance', icon: <CalendarCheck size={20} />, label: 'Attendance' },
        { id: 'Settings', icon: <Settings size={20} />, label: 'Setting' },
        { id: 'logout', icon: <LogOut size={20} />, label: 'Logout', action: logout }
      ];

    const statsData = [
        { title: 'Total Employee', value: 550, icon: <Users size={20} />},
        { title: 'Present', value: 525,icon: <SquareUserRound size={20} /> },
        { title: 'Late', value: 20, icon: <Timer size={20} />},
        { title: 'Annual Leave', value: 5 , icon: <CalendarClock size={20} />}
    ];
    
    const employeeData = [
        { name: 'Yuraj Doshi', role: 'Accountant', date: '18/03/2022', img: img1  },
        { name: 'Robert Yuya', role: 'Accountant', date: '18/03/2022', img: img2  },
        { name: 'Smith Armstrong', role: 'Assorter', date: '25/03/2022', img: img3  },
        { name: 'Deo Abraham', role: 'Assorter', date: '27/03/2022', img: img4  },
        { name: 'Yuraj Doshi', role: 'Accountant', date: '18/03/2022', img: img1  },
        { name: 'Robert Yuya', role: 'Accountant', date: '18/03/2022', img: img2  },
        { name: 'Smith Armstrong', role: 'Assorter', date: '25/03/2022', img: img3  },
        { name: 'Deo Abraham', role: 'Assorter', date: '27/03/2022', img: img4  },
        { name: 'Yuraj Doshi', role: 'Accountant', date: '18/03/2022', img: img1  },
        { name: 'Robert Yuya', role: 'Accountant', date: '18/03/2022', img: img2  },
        { name: 'Smith Armstrong', role: 'Assorter', date: '25/03/2022', img: img3  },
        { name: 'Deo Abraham', role: 'Assorter', date: '27/03/2022', img: img4  }
    ];

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
        setDropdownOpen(false); // Close the dropdown after selection
    };

    const openModal = () => {
        setIsModalOpen(true); // Open modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close modal
    };

    return (
        <>   
        <div className='Company'>
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
                                if (item.id === 'logout') {
                                    item.action(); // Perform logout action
                                } else {
                                    setActiveNav(item.id); // Set active navigation
                                    setIsSidebarOpen(false); // Close sidebar

                                    // Redirect based on item clicked
                                    if (item.id === 'ListedJobs') {
                                        navigate('/listed-jobs'); 
                                    } else if (item.id === 'Attendance') {
                                        navigate('/employee-attendance'); 
                                    } else if (item.id === 'Settings') {
                                        navigate('/'); 
                                    }
                                }
                            }}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>


            <div className="dashboard">
                <div className="dashboard-header">
                    <h1>Welcome Mahvir Brothers</h1>
                    <p>Curve yourself like a Diamond and shine</p>
                    <button className="create-work-btn" onClick={openModal}>Create Work</button>
                </div>

                <div className="stats-cards">
                    {statsData.map((stat, index) => (
                        <div key={index} className="stats-card">
                            <div className="stats-card-content">
                                <h3 className="stats-title">{stat.title}</h3>
                                <div className="stats-info">
                                    <span className="stats-value">{stat.value}</span>
                                    <span className="stats-icon">{stat.icon}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="employees-section">
                    <div className="employees-header">
                        <h2>Employees</h2>
                        <div className="dropdown" onClick={toggleDropdown}>
                            {selectedTime} <ChevronDown size={16} />
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <div onClick={() => handleTimeSelection("This Month")}>This Month</div>
                                    <div onClick={() => handleTimeSelection("Last Month")}>Last Month</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="employee-list">
                        {employeeData.map((employee, index) => (
                            <div key={index} className="employee-card">
                                <img src={employee.img} alt={employee.name} className="employee-avatar" />
                                <div className="employee-details">
                                    <div className="employee-name">{employee.name}</div>
                                    <div className="employee-role">{employee.role}</div>
                                </div>
                                <div className="employee-date">{employee.date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isModalOpen && <CreateJobModal closeModal={closeModal} />}
            </div>
        </>
    );
};

export default CompanyDetails;
