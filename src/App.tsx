import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateJob from "./pages/CreateJob";
import JobMap from "./pages/JobMap";
import JobApplicants from "./pages/JobApplicants";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          {/* Navbar is shown only on private routes */}
          <Route element={<NavbarWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<JobMap />} />
            <Route path="/jobs/create" element={<CreateJob />} />
            <Route path="/jobs/applicants" element={<JobApplicants />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

// Wrapper Component for Navbar + Content
const NavbarWrapper: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
