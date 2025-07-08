import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJobById, updateJob } from "../api/jobAPI";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");

  const locations = ["Nairobi", "Mombasa", "Kisumu", "Remote"];
  const companies = ["Google", "Safaricom", "Equity Bank", "KRA"];

  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await fetchJobById(id);
        setForm(res.data);
      } catch (err) {
        console.error("❌ Error loading job:", err);
        setError("Failed to load job. Make sure the job ID exists.");
      }
    };

    loadJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(form.salary)) {
      alert("Salary must be a number");
      return;
    }

    try {
      await updateJob(id, form);
      alert("✅ Job updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("❌ Failed to update job:", err);
      alert("Failed to update job.");
    }
  };

  if (error) {
    return <div className="text-red-600 p-4 text-center">{error}</div>;
  }

  if (!form) {
    return <div className="text-center p-4">⏳ Loading job details...</div>;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full p-2 border"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border"
          required
        />

        <select
          name="company_name"
          value={form.company_name}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        >
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <input
          name="salary"
          type="number"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full p-2 border"
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJob;
