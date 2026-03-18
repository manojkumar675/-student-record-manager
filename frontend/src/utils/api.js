import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth
export const register = (data) => API.post('/auth/register', data);
export const login    = (data) => API.post('/auth/login', data);

// Students
export const getStudents    = ()       => API.get('/students');
export const getStudent     = (id)     => API.get(`/students/${id}`);
export const addStudent     = (data)   => API.post('/students', data);
export const updateStudent  = (id, data) => API.put(`/students/${id}`, data);
export const deleteStudent  = (id)     => API.delete(`/students/${id}`);