import React, { useState } from 'react';
import './SideBar.css'; // Ensure CSS is updated accordingly

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);  // Toggle sidebar
  const [isServicesOpen, setIsServicesOpen] = useState(false);  // Toggle submenu for services

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      <nav className="sidebar-nav">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li>
            <button className="submenu-btn" onClick={toggleServices}>
              Services {isServicesOpen ? '-' : '+'}
            </button>
            {isServicesOpen && (
              <ul className="submenu">
                <li><a href="#web-dev">Web Development</a></li>
                <li><a href="#mobile-dev">Mobile Development</a></li>
                <li><a href="#seo">SEO Optimization</a></li>
              </ul>
            )}
          </li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
