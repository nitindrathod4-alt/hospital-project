import React, { useState, useEffect } from 'react';
import { patientService } from '../../services/patientService';
import { PatientsList } from './PatientsList';
import { PatientForm } from './PatientForm';
import '../styles/components.css';

export const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await patientService.getAllPatients();
      setPatients(data);
    } catch (err) {
      setError('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingPatient(null);
    setShowForm(true);
  };

  const handleEditClick = (patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingPatient(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingPatient) {
        await patientService.updatePatient(editingPatient._id, formData);
      } else {
        await patientService.createPatient(formData);
      }
      await fetchPatients();
      handleFormClose();
    } catch (err) {
      setError('Failed to save patient');
    }
  };

  const handleDeleteClick = async (id) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      try {
        await patientService.deletePatient(id);
        await fetchPatients();
      } catch (err) {
        setError('Failed to delete patient');
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Patients</h1>
        <button onClick={handleAddClick} className="btn-primary">
          + Add Patient
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <PatientForm
              patient={editingPatient}
              onSubmit={handleFormSubmit}
              onClose={handleFormClose}
            />
          </div>
        </div>
      )}
      {loading ? (
        <div className="loading">Loading patients...</div>
      ) : (
        <PatientsList
          patients={patients}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      )}
    </div>
  );
};
