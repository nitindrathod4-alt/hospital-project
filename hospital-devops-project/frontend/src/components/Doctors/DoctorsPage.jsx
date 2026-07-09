import React, { useState, useEffect } from 'react';
import { doctorService } from '../../services/doctorService';
import { DoctorsList } from './DoctorsList';
import { DoctorForm } from './DoctorForm';
import '../styles/components.css';

export const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await doctorService.getAllDoctors();
      setDoctors(data);
    } catch (err) {
      setError('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingDoctor(null);
    setShowForm(true);
  };

  const handleEditClick = (doctor) => {
    setEditingDoctor(doctor);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingDoctor(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingDoctor) {
        await doctorService.updateDoctor(editingDoctor._id, formData);
      } else {
        await doctorService.createDoctor(formData);
      }
      await fetchDoctors();
      handleFormClose();
    } catch (err) {
      setError('Failed to save doctor');
    }
  };

  const handleDeleteClick = async (id) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      try {
        await doctorService.deleteDoctor(id);
        await fetchDoctors();
      } catch (err) {
        setError('Failed to delete doctor');
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Doctors</h1>
        <button onClick={handleAddClick} className="btn-primary">
          + Add Doctor
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <DoctorForm
              doctor={editingDoctor}
              onSubmit={handleFormSubmit}
              onClose={handleFormClose}
            />
          </div>
        </div>
      )}
      {loading ? (
        <div className="loading">Loading doctors...</div>
      ) : (
        <DoctorsList
          doctors={doctors}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      )}
    </div>
  );
};
