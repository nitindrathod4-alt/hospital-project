import React, { useState, useEffect } from 'react';
import { patientService } from '../../services/patientService';
import { doctorService } from '../../services/doctorService';
import { appointmentService } from '../../services/appointmentService';
import '../styles/dashboard.css';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [patients, doctors, appointments] = await Promise.all([
        patientService.getAllPatients(),
        doctorService.getAllDoctors(),
        appointmentService.getAllAppointments(),
      ]);

      setStats({
        patients: patients.length || 0,
        doctors: doctors.length || 0,
        appointments: appointments.length || 0,
      });
    } catch (err) {
      setError('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Patients</h3>
            <p className="stat-number">{stats.patients}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍⚕️</div>
          <div className="stat-content">
            <h3>Total Doctors</h3>
            <p className="stat-number">{stats.doctors}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Total Appointments</h3>
            <p className="stat-number">{stats.appointments}</p>
          </div>
        </div>
      </div>
      <div className="dashboard-info">
        <h2>Welcome to Hospital Management System</h2>
        <p>Use the navigation menu to manage patients, doctors, and appointments.</p>
      </div>
    </div>
  );
};
