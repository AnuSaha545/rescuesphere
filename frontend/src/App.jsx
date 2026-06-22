import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Requests from "./pages/Requests";
import Resources from "./pages/Resources";
import SubmitRequest from "./pages/SubmitRequest";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <div className="container mt-4">

        <Routes>

          <Route path="/" element={<Dashboard />} />
          <Route path="/submit" element={<SubmitRequest />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/resources" element={<Resources />} />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;