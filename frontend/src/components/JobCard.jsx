import API from "../api";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job, onJobUpdate }) {
  const navigate = useNavigate();

  const handleDeactivate = async () => {
    await API.patch(`/jobs/${job.id}/deactivate/`);
    onJobUpdate();
  };

  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600">
        {job.company_name} - {job.location}
      </p>
      <p className="mt-2 text-sm text-gray-500">
        {job.description.slice(0, 100)}...
      </p>
      <p className="mt-1 text-green-600 font-bold">${job.salary}</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => navigate(`/jobs/${job.id}`)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          View
        </button>
        <button
          onClick={() => navigate(`/jobs/edit/${job.id}`)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDeactivate}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"></button>
          Deactivate
        </button>
      </div>
    </div>
  );
}
