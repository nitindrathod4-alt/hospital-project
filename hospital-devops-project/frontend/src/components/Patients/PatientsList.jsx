import React from 'react';
import '../styles/components.css';

export const PatientsList = ({ patients, onEdit, onDelete }) => {
  if (patients.length === 0) {
    return <div className="empty-state">No patients found. Add one to get started!</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient._id}>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.phone || '-'}</td>
              <td>{patient.age || '-'}</td>
              <td>{patient.gender || '-'}</td>
              <td className="actions">
                <button onClick={() => onEdit(patient)} className="btn-secondary btn-sm">
                  Edit
                </button>
                <button onClick={() => onDelete(patient._id)} className="btn-danger btn-sm">
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
