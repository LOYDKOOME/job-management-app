<<<<<<< HEAD
// frontend/src/api/jobAPI.js
import axios from "axios";

const API_URL = "https://job-management-api.onrender.com/api/jobs/";
=======
// src/api/jobAPI.js
import axios from "axios";

const API_URL = "https://job-backend-0jq9.onrender.com/api/jobs/";
>>>>>>> d139959 (Connect frontend to deployed backend)

export const fetchJobs = (params) => axios.get(API_URL, { params });

export const fetchJobById = (id) => axios.get(`${API_URL}${id}/`);

export const updateJob = (id, job) => axios.put(`${API_URL}${id}/`, job);

export const deactivateJob = (id) => axios.patch(`${API_URL}${id}/deactivate/`);

export const createJob = (job) =>
  axios.post("https://job-backend-0jq9.onrender.com/api/jobs/", job);
