import { useState, useEffect } from "react";

export default function JobForm({
  onSubmit,
  initialData = {},
  isEdit = false,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    company_name: "",
    location: "",
    salary: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({ ...form, ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Job Title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows="5"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="company_name"
        value={form.company_name}
        onChange={handleChange}
        placeholder="Company Name"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="salary"
        value={form.salary}
        onChange={handleChange}
        placeholder="Salary"
        className="w-full p-2 border rounded"
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"></button>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isEdit ? "Update Job" : "Post Job"}
      </button>
    </form>
  );
}
