import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchJobs, deactivateJob } from "../api/jobAPI";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  const loadJobs = async () => {
    try {
      const res = await fetchJobs();
      setJobs(res.data);
    } catch (err) {
      console.error("❌ Failed to load jobs:", err);
      setError("Failed to fetch job listings. Please try again.");
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDeactivate = async (id) => {
    if (!window.confirm("Are you sure you want to deactivate this job?"))
      return;
    try {
      await deactivateJob(id);
      loadJobs();
    } catch (err) {
      console.error("❌ Failed to deactivate job:", err);
      alert("Failed to deactivate job.");
    }
  };

  if (error) {
    return (
      <div className="text-red-600 p-4 text-center font-medium">{error}</div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center p-4 text-gray-700 font-medium">
        No jobs found.
      </div>
    );
  }

  return (
    <div className="p-4 max-w-5xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Job Listings
      </h1>
      <div className="flex justify-end mb-4">
        <Link
          to="/jobs/create"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
        >
          + Post Job
        </Link>
      </div>
      <table className="w-full border border-gray-300 text-left text-sm font-medium text-gray-800">
        <thead className="bg-gray-100 text-base text-gray-700 uppercase">
          <tr>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Company</th>
            <th className="p-3 border">Location</th>
            <th className="p-3 border">Salary</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-t hover:bg-gray-50 transition">
              <td className="p-3 border font-semibold">{job.title}</td>
              <td className="p-3 border">{job.company_name}</td>
              <td className="p-3 border">{job.location}</td>
              <td className="p-3 border">Ksh {job.salary.toLocaleString()}</td>
              <td className="p-3 border capitalize">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    job.status === "active" ? "bg-green-600" : "bg-red-500"
                  }`}
                >
                  {job.status}
                </span>
              </td>
              <td className="p-3 border space-x-2">
                <Link
                  to={`/jobs/edit/${job.id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded font-medium"
                >
                  Edit
                </Link>
                {job.status === "active" && (
                  <button
                    onClick={() => handleDeactivate(job.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded font-medium"
                  >
                    Deactivate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
