import axios from "axios";
const BASE_URL =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api/jobs/";
export const fetchJobs = () => axios.get(BASE_URL);
export const fetchJobById = (id) => axios.get(`${BASE_URL}${id}/`);
export const createJob = (data) => axios.post(BASE_URL, data);
export const updateJob = (id, data) => axios.put(`${BASE_URL}${id}/`, data);
export const deactivateJob = (id) =>
  axios.patch(`${BASE_URL}${id}/`, { status: "inactive" });
