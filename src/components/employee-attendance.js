import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import useLogout from '../hooks/useLogout';
import pb from "../lib/pocketbase"; // Import your PocketBase instance
import { toast } from 'react-toastify';

import img1 from '../img/p1.jpg';
import img2 from '../img/p2.jpg';
import img3 from '../img/p3.jpg';
import img4 from '../img/p4.jpg';
import {
    Blocks ,
    ListCheck ,
    Settings,
    LogOut,
    ChevronDown,
    CalendarCheck ,
} from 'lucide-react';
import './employee-attendance.css';

const EmployeeAttendance = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
    const [activeNav, setActiveNav] = useState(null); // State for active navigation item
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState("This Month");
    const logout = useLogout();

    // Initialize employee data with `status` state
    const [employeeAttendanceData, setEmployeeAttendanceData] = useState([
        { no: 1, id: 12345, name: 'Yuraj Doshi', role: 'Accountant', status: 'Present', img: img1, attendance: '95%' },
        { no: 2, id: 67890, name: 'Robert Yuya', role: 'Accountant', status: 'Present', img: img2, attendance: '89%' },
        { no: 3, id: 54321, name: 'Smith Armstrong', role: 'Assorter', status: 'Absent', img: img3, attendance: '72%' },
        { no: 4, id: 98765, name: 'Deo Abraham', role: 'Assorter', status: 'Present', img: img4, attendance: '98%' },
        { no: 5, id: 12345, name: 'Yuraj Doshi', role: 'Accountant', status: 'Present', img: img1, attendance: '95%' },
        { no: 6, id: 67890, name: 'Robert Yuya', role: 'Accountant', status: 'Present', img: img2, attendance: '89%' },
        { no: 7, id: 54321, name: 'Smith Armstrong', role: 'Assorter', status: 'Absent', img: img3, attendance: '72%' },
        { no: 8, id: 98765, name: 'Deo Abraham', role: 'Assorter', status: 'Present', img: img4, attendance: '98%' },
        { no: 9, id: 12345, name: 'Yuraj Doshi', role: 'Accountant', status: 'Present', img: img1, attendance: '70%' },
        { no: 10, id: 67890, name: 'Robert Yuya', role: 'Accountant', status: 'Present', img: img2, attendance: '89%' },
    ]);

    const navItems = [
        { id: 'Dashboard', icon: <Blocks  size={20} />, label: 'Dashboard' },
        { id: 'ListedJobs', icon: <ListCheck  size={20} />, label: 'Listed Job' },
        { id: 'EmployeeAttendance', icon: <CalendarCheck size={20} />, label: 'Attendance' },
        { id: 'Settings', icon: <Settings size={20} />, label: 'Setting' },
        { id: 'logout', icon: <LogOut size={20} />, label: 'Logout', action: logout }
    ];

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
        setDropdownOpen(false);
    };

    // Function to update the status of an employee
    const updateStatus = (index, newStatus) => {
        const updatedData = [...employeeAttendanceData];
        updatedData[index].status = newStatus;
        setEmployeeAttendanceData(updatedData);
    };

    return (
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
                                        navigate('/ListedJobs'); 
                                    }
                                    if (item.id === 'Dashboard') {
                                        navigate('/company-dashboard'); 
                                    }
                                    if (item.id === 'ListedJobs') {
                                        navigate('/listed-jobs'); 
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
            <div className="employee-attendance">
                <div className="attendance-header">
                    <h2>Employee Attendance</h2>
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
                <div className="employee-table">
                    <div className="header-row">
                        <div className="header">No</div>
                        <div className="header">ID</div>
                        <div className="header">Name</div>
                        <div className="header">Attendance</div>
                        <div className="header">Status</div>
                        <div className="header">Mark Attendance</div>
                    </div>
                    {employeeAttendanceData.map((employee, index) => (
                        <div key={employee.no} className="employee-row">
                            <div className="cell">{employee.no}</div>
                            <div className="cell">{employee.id}</div>
                            <div className="cell">{employee.name}</div>
                            <div className="cell">{employee.attendance}</div>
                            <div className="cell">
                                <span className={`status ${employee.status.toLowerCase()}`}>
                                    {employee.status}
                                </span>
                            </div>
                            <div className="cell">
                                <button onClick={() => updateStatus(index, 'Present')} className="status-button present">Present</button>
                                <button onClick={() => updateStatus(index, 'Absent')} className="status-button absent">Absent</button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <button className="load-more">Load More</button> */}
            </div>
        </div>
    );
};

export default EmployeeAttendance;
