import React from "react";
import { Popup } from "react-leaflet";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import { getUserIdFromToken } from "../utils/jwt";
import { JobPopupProps } from "../types/job";
import { useBreadcrumb } from "../contexts/BreadcrumbContext";


const applyForJob = async (jobId: string): Promise<void> => {
  const photographerId = getUserIdFromToken();
  if (!photographerId) {
    throw new Error("User ID not found. Please log in again.");
  }
  await axiosInstance.post(`/jobs/${jobId}/apply`, { photographerId });
};


const JobCard: React.FC<JobPopupProps> = ({ job, hasApplied }) => {
  const { setBreadcrumb } = useBreadcrumb();

  const { mutate, status } = useMutation<void, Error, string>({
    mutationFn: applyForJob,
    onSuccess: () => {
      setBreadcrumb("Application submitted successfully!", "success");
    },
    onError: (err) => {
      setBreadcrumb(err.message || "Failed to apply for the job. Please try again.", "error");
    },
  });

  return (
    <Popup>
      <h2 className="font-bold">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.description}</p>
      <p>Status: {job.status}</p>
      <p>Date: {new Date(job.date).toLocaleDateString()}</p>
      <p>Client ID: {job.clientId}</p>
      <button
        className={`mt-2 px-4 py-2 rounded ${
          hasApplied
            ? "bg-gray-500 text-white cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={() => mutate(job.id)}
        disabled={hasApplied || status === "pending"}
      >
        {hasApplied ? "Already Applied" : status === "pending" ? "Applying..." : "Apply for Job"}
      </button>
    </Popup>
  );
};

export default JobCard;
