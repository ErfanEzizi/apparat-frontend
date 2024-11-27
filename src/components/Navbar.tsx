import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
    const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-primary-light text-white p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 gap-5">
          <Link to="/" className="text-2xl font-bold">
            <img src="/logo_1.svg" alt="aparat_logo" className="w-9"/>
          </Link>
          {isAuthenticated && role === "CLIENT" && (
            <Link to="/jobs/create" className="hover:text-gray-200">
              Create Job
            </Link>
          )}
          {isAuthenticated && role === "CLIENT" && (
            <Link to="/jobs/applicants" className="hover:text-gray-200">
              Job Applicants
            </Link>
          )}
          {isAuthenticated && role === "CREATOR" && (
            <Link to="/jobs" className="hover:text-gray-200">
              Find Jobs
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/profile" className="hover:text-gray-200">
              Profile
            </Link>
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="mr-4 bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
