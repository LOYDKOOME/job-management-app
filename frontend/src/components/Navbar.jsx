import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold hover:text-blue-300">
        JobBoard
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-300">
          Home
        </Link>
        <Link
          to="/jobs/create"
          className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
        >
          Post Job
        </Link>
      </div>
    </nav>
  );
}
