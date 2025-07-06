import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

export default function JobView() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await API.get(`/jobs/${id}/`);
      setJob(res.data);
    };
    fetchJob();
  }, [id]);

  if (!job) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-gray-600">
        {job.company_name} — {job.location}
      </p>
      <p className="mt-2 text-lg text-green-700 font-semibold">${job.salary}</p>
      <p className="mt-4 text-gray-800 whitespace-pre-wrap">
        {job.description}
      </p>
      <p className="mt-6 text-sm text-gray-500">Status: {job.status}</p>
    </div>
  );
}
