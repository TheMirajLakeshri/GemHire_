import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import useLogout from '../hooks/useLogout';
import pb from "../lib/pocketbase"; 
import { toast } from 'react-toastify';
import './ListedJobs.css';

import {
    ListCheck ,
    CalendarCheck ,
    Settings,
    LogOut,
    Blocks 
} from 'lucide-react';

const JobsPage = () => {
    const navigate = useNavigate(); 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
    const [activeNav, setActiveNav] = useState(null); 
    const [userData, setUserData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const logout = useLogout();
    const [visibleJobsCount, setVisibleJobsCount] = useState(3); // State for number of jobs to show initially
    const [showOptions, setShowOptions] = useState(Array(8).fill(false)); // Track visibility of options for each job
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility


    useEffect(() => {
        if (pb.authStore.isValid) {
          const loggedInUser = pb.authStore.model;
          setUserData(loggedInUser);
        } else {
          console.log("User is not logged in.");
          toast.error("User is not logged in");
          navigate("/");
        }
    }, []);

    const navItems = [
        { id: 'Dashboard', icon: <Blocks  size={20} />, label: 'Dashboard' },
        { id: 'ListedJobs', icon: <ListCheck  size={20} />, label: 'Listed Jobs' },
        { id: 'Attendance', icon: <CalendarCheck  size={20} />, label: 'Attendance' },
        { id: 'settings', icon: <Settings size={20} />, label: 'Setting' },
        { id: 'logout', icon: <LogOut size={20} />, label: 'Logout', action: logout }
    ];

    const [jobs, setJobs] = useState([
        {
            title: 'Job Title 1',
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
            time: '10 AM to 6 PM',
            location: 'Dadar, Mumbai',
            date: '10 Aug 2024',
            payment: '₹XXX per day',
        },
        {
            title: 'Job Title 2',
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
            time: '10 AM to 6 PM',
            location: 'Dadar, Mumbai',
            date: '15 July 2024',
            payment: '₹XXX per day',
        },
        {
            title: 'Job Title 3',
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
            time: '10 AM to 6 PM',
            location: 'Dadar, Mumbai',
            date: '3 July 2024',
            payment: '₹XXX per day',
        },
        {
            title: 'Job Title 4',
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
            time: '10 AM to 6 PM',
            location: 'Dadar, Mumbai',
            date: '3 July 2024',
            payment: '₹XXX per day',
        },
        {
            title: 'Job Title 5',
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
            time: '10 AM to 6 PM',
            location: 'Dadar, Mumbai',
            date: '3 July 2024',
            payment: '₹XXX per day',
        },
        {
            title: 'Job Title 6',
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
            time: '10 AM to 6 PM',
            location: 'Dadar, Mumbai',
            date: '3 July 2024',
            payment: '₹XXX per day',
        },
        {
            title: 'Job Title 7',
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
            time: '10 AM to 6 PM',
            location: 'Dadar, Mumbai',
            date: '3 July 2024',
            payment: '₹XXX per day',
        },
        {
            title: 'Job Title 8',
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
            time: '10 AM to 6 PM',
            location: 'Dadar, Mumbai',
            date: '3 July 2024',
            payment: '₹XXX per day',
        },
    ]);

    const toggleOptions = (index) => {
        setShowOptions((prevOptions) =>
            prevOptions.map((option, i) => (i === index ? !option : option))
        );
    };

    // Function to handle loading more jobs
    const handleLoadMore = () => {
        setVisibleJobsCount((prevCount) => prevCount + 3);
    };

    const handleRemoveJob = (index) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            setJobs((prevJobs) => prevJobs.filter((_, i) => i !== index));
            setShowOptions(Array(jobs.length - 1).fill(false)); // Reset options state
        }
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
                                    item.action(); 
                                } else {
                                    setActiveNav(item.id);
                                    setIsSidebarOpen(false); 

                                    if (item.id === 'ListedJobs') {
                                        navigate('/listed-jobs'); 
                                    } 
                                    if (item.id === 'Dashboard') {
                                        navigate('/company-dashboard'); 
                                    }
                                    if (item.id === 'Attendance') {
                                        navigate('/employee-attendance'); 
                                    } 
                                    else if (item.id === 'settings') {
                                        navigate('/Settings'); 
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

            <div className="jobs-page">
                <div className="jobs-header">
                    <h1>Jobs</h1>
                    <button className="create-job-btn">Create Job</button>
                </div>

                <div className="job-list-section">
                    <h2>Created Jobs</h2>
                    <div className="job-list">
                        {jobs.slice(0, visibleJobsCount).map((job, index) => (
                            <div key={index} className="job-card">
                                <div className="job-card-header">
                                    <div className="job-icon">📝</div>
                                    <div className="job-title">{job.title}</div>
                                    <div className="job-options" onClick={() => toggleOptions(index)}>⋮</div>
                                    {showOptions[index] && (
                                    <button className="remove-btn" onClick={() => handleRemoveJob(index)}>
                                        Remove
                                    </button>
                                )}
                                </div>
                                <p className="job-description">{job.description}</p>
                                <div className="job-info">
                                    <p>Job Time: {job.time}</p>
                                    <p>Location: {job.location}</p>
                                    <p>Date: {job.date}</p>
                                    <br />
                                    <p id="salary">Payment: {job.payment}</p>
                                </div>
                               
                            </div>
                        ))}
                    </div>
                    
                    {visibleJobsCount < jobs.length && (
                        <button className="load-more-btn" onClick={handleLoadMore}>
                            Load More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobsPage;
