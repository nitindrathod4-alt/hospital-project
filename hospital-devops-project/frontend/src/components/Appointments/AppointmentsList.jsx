import React from 'react';
import '../styles/components.css';

export const AppointmentsList = ({ appointments, onEdit, onDelete }) => {
  if (appointments.length === 0) {
    return <div className="empty-state">No appointments found. Schedule one to get started!</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date & Time</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment._id}>
              <td>{appointment.patientId?.name || 'N/A'}</td>
              <td>{appointment.doctorId?.name || 'N/A'}</td>
              <td>{formatDate(appointment.appointmentDate)}</td>
              <td>{appointment.reason || '-'}</td>
              <td>
                <span className={`status-badge status-$${appointment.status}`}>
                  {appointment.status}
                </span>
              </td>
              <td className="actions">
                <button onClick={() => onEdit(appointment)} className="btn-secondary btn-sm">
                  Edit
                </button>
                <button onClick={() => onDelete(appointment._id)} className="btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
