import React, { useState } from "react";
import * as API from "../api/jobAPI";
import { createJob } from "../api/jobAPI"; // ✅ not "API", just the function you need

function CreateJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    company_name: "",
    location: "",
    salary: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.createJob(form);
    alert("Job created!");
    setForm({
      title: "",
      description: "",
      company_name: "",
      location: "",
      salary: "",
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            placeholder={key.replace("_", " ")}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Job
        </button>
      </form>
    </div>
  );
}

export default CreateJob;
