import React, { useState, useEffect } from 'react';
import { appointmentService } from '../../services/appointmentService';
import { AppointmentsList } from './AppointmentsList';
import { AppointmentForm } from './AppointmentForm';
import '../styles/components.css';

export const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentService.getAllAppointments();
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingAppointment(null);
    setShowForm(true);
  };

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingAppointment(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingAppointment) {
        await appointmentService.updateAppointment(editingAppointment._id, formData);
      } else {
        await appointmentService.createAppointment(formData);
      }
      await fetchAppointments();
      handleFormClose();
    } catch (err) {
      setError('Failed to save appointment');
    }
  };

  const handleDeleteClick = async (id) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      try {
        await appointmentService.deleteAppointment(id);
        await fetchAppointments();
      } catch (err) {
        setError('Failed to delete appointment');
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Appointments</h1>
        <button onClick={handleAddClick} className="btn-primary">
          + Schedule Appointment
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AppointmentForm
              appointment={editingAppointment}
              onSubmit={handleFormSubmit}
              onClose={handleFormClose}
            />
          </div>
        </div>
      )}
      {loading ? (
        <div className="loading">Loading appointments...</div>
      ) : (
        <AppointmentsList
          appointments={appointments}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      )}
    </div>
  );
};
