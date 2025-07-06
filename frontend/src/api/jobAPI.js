import axios from "axios";

const API_URL = "http://localhost:8000/api/jobs/";

export const fetchJobs = (params) => axios.get(API_URL, { params });

export const fetchJobById = (id) => axios.get(`${API_URL}${id}/`);

export const updateJob = (id, job) => axios.put(`${API_URL}${id}/`, job);

export const deactivateJob = (id) => axios.patch(`${API_URL}${id}/deactivate/`);

export const createJob = (job) =>
  axios.post("http://localhost:8000/api/jobs/", job);
