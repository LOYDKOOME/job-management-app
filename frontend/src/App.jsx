import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import JobView from "./pages/JobView";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/create" element={<CreateJob />} />
        <Route path="/jobs/edit/:id" element={<EditJob />} />
        <Route path="/jobs/:id" element={<JobView />} />
      </Routes>
    </BrowserRouter>
  );
}
