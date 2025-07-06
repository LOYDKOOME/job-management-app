import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJobById, updateJob } from "../api/jobAPI";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  const locations = ["Nairobi", "Mombasa", "Kisumu", "Remote"];
  const companies = ["Google", "Safaricom", "Equity Bank", "KRA"];
  const statusOptions = ["active", "inactive"];

  useEffect(() => {
    const loadJob = async () => {
      const res = await fetchJobById(id);
      setJob(res.data);
    };
    loadJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(job.salary)) {
      alert("Salary must be a number");
      return;
    }
    await updateJob(id, job);
    alert("Job updated successfully!");
    navigate("/");
  };

  if (!job) return <p className="p-4 text-center">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title */}
        <div>
          <label className="block font-semibold">Job Title</label>
          <input
            name="title"
            value={job.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Title"
            required
          />
        </div>

        {/* Company Name Dropdown */}
        <div>
          <label className="block font-semibold">Company Name</label>
          <select
            name="company_name"
            value={job.company_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* Location Dropdown */}
        <div>
          <label className="block font-semibold">Location</label>
          <select
            name="location"
            value={job.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block font-semibold">Salary</label>
          <input
            name="salary"
            type="number"
            value={job.salary}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Salary"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Description"
            rows="4"
            required
          />
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block font-semibold">Status</label>
          <select
            name="status"
            value={job.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Update Job
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
