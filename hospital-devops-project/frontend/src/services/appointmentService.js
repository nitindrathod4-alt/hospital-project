import api from './api';

export const appointmentService = {
  getAllAppointments: async () => {
    const response = await api.get('/appointments');
    return response.data;
  },

  getAppointmentById: async (id) => {
    const response = await api.get(`/appointments/$id`);
    return response.data;
  },

  createAppointment: async (appointmentData) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },

  updateAppointment: async (id, appointmentData) => {
    const response = await api.put(`/appointments/$id`, appointmentData);
    return response.data;
  },

  deleteAppointment: async (id) => {
    const response = await api.delete(`/appointments/$id`);
    return response.data;
  },

  getAppointmentsByDoctor: async (doctorId) => {
    const response = await api.get(`/appointments/doctor/$doctorId`);
    return response.data;
  },

  getAppointmentsByPatient: async (patientId) => {
    const response = await api.get(`/appointments/patient/$patientId`);
    return response.data;
  },
};
