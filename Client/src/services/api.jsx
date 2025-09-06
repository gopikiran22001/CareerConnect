import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
};

// Jobs API
export const jobsAPI = {
  getJobs: (params) => api.get('/jobs', { params }),
  getJob: (id) => api.get(`/jobs/${id}`),
  createJob: (jobData) => api.post('/jobs', jobData),
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  applyToJob: (jobId, applicationData) => api.post(`/jobs/${jobId}/apply`, applicationData),
  getJobApplications: (jobId) => api.get(`/jobs/${jobId}/applications`),
};

// Applications API
export const applicationsAPI = {
  getMyApplications: () => api.get('/applications/my'),
  updateApplicationStatus: (id, status) => api.patch(`/applications/${id}`, { status }),
};

// Profile API
export const profileAPI = {
  updateProfile: (profileData) => api.put('/profile', profileData),
  uploadResume: (formData) => api.post('/profile/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// Companies API
export const companiesAPI = {
  getCompany: (id) => api.get(`/companies/${id}`),
  updateCompany: (id, companyData) => api.put(`/companies/${id}`, companyData),
};

export default api;