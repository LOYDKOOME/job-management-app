import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/jobs/";

export const fetchJobs = () => axios.get(BASE_URL);
export const fetchJobById = (id) => axios.get(`${BASE_URL}${id}/`);
export const createJob = (jobData) => axios.post(BASE_URL, jobData);
export const updateJob = (id, jobData) => axios.put(`${BASE_URL}${id}/`, jobData);
export const deactivateJob = (id) => axios.patch(`${BASE_URL}${id}/`, { status: "inactive" });
