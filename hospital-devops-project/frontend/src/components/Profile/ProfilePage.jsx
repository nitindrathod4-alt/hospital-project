import React, { useState } from 'react';
import { authService } from '../../services/authService';
import '../styles/components.css';

export const ProfilePage = () => {
  const user = authService.getCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(formData));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  if (!user) {
    return <div className="error-message">No user information available</div>;
  }

  return (
    <div className="page-container">
      <h1>User Profile</h1>
      {!isEditing ? (
        <div className="profile-view">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="profile-info">
                <h2>{user.name}</h2>
                <p className="profile-role">{user.role}</p>
              </div>
            </div>
            <div className="profile-details">
              <div className="detail-row">
                <label>Email:</label>
                <span>{user.email}</span>
              </div>
              <div className="detail-row">
                <label>Role:</label>
                <span className="role-badge">{user.role}</span>
              </div>
              {user.phone && (
                <div className="detail-row">
                  <label>Phone:</label>
                  <span>{user.phone}</span>
                </div>
              )}
            </div>
            <button onClick={() => setIsEditing(true)} className="btn-primary">
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-edit">
          <form onSubmit={handleSubmit} className="form">
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
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
