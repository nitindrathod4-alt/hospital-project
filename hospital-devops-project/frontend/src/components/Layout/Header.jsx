import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import '../styles/layout.css';

export const Header = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">🏥 Hospital Management</h1>
        <div className="header-right">
          {user && (
            <>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role}</span>
              </div>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
