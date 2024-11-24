import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import { getUserIdFromToken } from "../utils/jwt";
import { useBreadcrumb } from "../contexts/BreadcrumbContext";

const Profile: React.FC = () => {
  const userId = getUserIdFromToken();
  const [editMode, setEditMode] = useState(false);
  const { setBreadcrumb } = useBreadcrumb();


  const { data: user, isLoading, error, refetch } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/users/${userId}`);
      return data.user;
    },
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const updateUserMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await axiosInstance.put(`/users/${userId}`, data);
    },
    onSuccess: () => {
      setBreadcrumb("Profile updated successfully!", "success");
      setEditMode(false);
      refetch();
    },
    onError: () => {
      setBreadcrumb("Failed to update profile. Please try again.", "error");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate(formData);
  };

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error loading profile.</div>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      {!editMode ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button
            className="btn-primary text-white px-4 py-2 rounded hover:bg-primary-light mt-4"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="btn-primary text-white px-4 py-2 rounded hover:bg-primary-light"
          >
            {updateUserMutation.isPending ? "Updating..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
