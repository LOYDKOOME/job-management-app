import React, { useEffect, useState } from "react";
import { fetchJobs, deactivateJob } from "../api/jobAPI";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  const loadJobs = async () => {
    const params = {};
    if (title) params.title = title;
    if (company) params.company = company;
    if (location) params.location = location;
    const res = await fetchJobs(params);
    setJobs(res.data);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadJobs();
    setCurrentPage(1);
  };

  const handleDeactivate = async (id) => {
    await deactivateJob(id);
    loadJobs();
  };

  // Filter after fetching
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company_name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Active Jobs</h1>

      {/* 🔍 Search bar for filtering */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-2 mb-4"
      >
        <input
          type="text"
          placeholder="Filter by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Filter by company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Filter by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Apply Filters
        </button>
      </form>

      {/* 🔎 Local search within results */}
      <input
        type="text"
        placeholder="Search title or company name..."
        className="border px-4 py-2 mb-4 w-full rounded"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* 🧾 Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentJobs.map((job) => (
          <div key={job.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p>
              {job.company_name} – {job.location}
            </p>
            <p className="text-gray-600">Salary: ${job.salary}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleDeactivate(job.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Deactivate
              </button>
              <a
                href={`/edit/${job.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-6 justify-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
