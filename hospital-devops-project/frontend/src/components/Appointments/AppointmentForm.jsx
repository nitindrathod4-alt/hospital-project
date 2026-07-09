import React, { useState, useEffect } from 'react';
import '../styles/components.css';

export const AppointmentForm = ({ appointment, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    reason: '',
    status: 'scheduled',
    notes: '',
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        ...appointment,
        appointmentDate: new Date(appointment.appointmentDate).toISOString().slice(0, 16),
      });
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      appointmentDate: new Date(formData.appointmentDate),
    });
  };

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <h2>{appointment ? 'Edit Appointment' : 'Schedule New Appointment'}</h2>
        <button onClick={onClose} className="btn-close">✕</button>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="patientId">Patient ID *</label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
              placeholder="Patient ID"
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctorId">Doctor ID *</label>
            <input
              type="text"
              id="doctorId"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
              placeholder="Doctor ID"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="appointmentDate">Date & Time *</label>
          <input
            type="datetime-local"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="reason">Reason</label>
            <input
              type="text"
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Reason for appointment"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No-Show</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes"
            rows="4"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {appointment ? 'Update Appointment' : 'Schedule Appointment'}
          </button>
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
