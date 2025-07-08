import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../api/jobAPI";

const CreateJob = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    company_name: "",
    location: "",
    salary: "",
    status: "active",
  });

  const locations = ["Nairobi", "Mombasa", "Kisumu", "Remote"];
  const companies = ["Safaricom", "Google", "KRA", "Equity Bank"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert salary to number
    const jobData = {
      ...form,
      salary: parseInt(form.salary),
    };

    if (isNaN(jobData.salary)) {
      alert("Salary must be a number");
      return;
    }

    try {
      await createJob(jobData);
      alert("Job created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Failed to create job. Check console for details.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Job Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Company</label>
          <select
            name="company_name"
            value={form.company_name}
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

        <div>
          <label className="block font-semibold">Location</label>
          <select
            name="location"
            value={form.location}
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

        <div>
          <label className="block font-semibold">Salary</label>
          <input
            name="salary"
            type="number"
            value={form.salary}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
