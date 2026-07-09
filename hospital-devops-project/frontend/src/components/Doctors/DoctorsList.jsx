import React from 'react';
import '../styles/components.css';

export const DoctorsList = ({ doctors, onEdit, onDelete }) => {
  if (doctors.length === 0) {
    return <div className="empty-state">No doctors found. Add one to get started!</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Phone</th>
            <th>License</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor._id}>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
              <td>{doctor.specialization || '-'}</td>
              <td>{doctor.phone || '-'}</td>
              <td>{doctor.licenseNumber || '-'}</td>
              <td className="actions">
                <button onClick={() => onEdit(doctor)} className="btn-secondary btn-sm">
                  Edit
                </button>
                <button onClick={() => onDelete(doctor._id)} className="btn-danger btn-sm">
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
