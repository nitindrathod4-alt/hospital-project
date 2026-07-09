import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/layout.css';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/patients', label: 'Patients', icon: '👥' },
    { path: '/doctors', label: 'Doctors', icon: '👨‍⚕️' },
    { path: '/appointments', label: 'Appointments', icon: '📅' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle sidebar">
        ☰
      </button>
      <nav className={`sidebar $${isOpen ? 'open' : 'closed'}`}>
        <ul className="nav-menu">
          {menuItems.map(item => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-link $${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
