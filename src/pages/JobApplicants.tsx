import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import { fetchClientJobsWithApplicants } from "../services/jobServices";
import { Job, JobApplication } from "../types/job";
import { useBreadcrumb } from "../contexts/BreadcrumbContext";

const JobApplicants: React.FC = () => {
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ["clientJobsWithApplicants"],
    queryFn: fetchClientJobsWithApplicants,
  });
  const { setBreadcrumb } = useBreadcrumb();

  const acceptApplication = useMutation({
    mutationFn: async (applicationId: string) => {
      await axiosInstance.put(`/jobs/${applicationId}/application-status`, { status: "accepted" });
    },
    onSuccess: () => {
      setBreadcrumb("Application accepted!", "success");
    },
    onError: () => {
      setBreadcrumb("Failed to accept the application. Try again.", "error");
    },
  });
  
  const declineApplication = useMutation({
    mutationFn: async (applicationId: string) => {
      await axiosInstance.put(`/jobs/${applicationId}/application-status`, { status: "declined" });
    },
    onSuccess: () => {
      setBreadcrumb("Application declined!", "success");
    },
    onError: () => {
      setBreadcrumb("Failed to decline the application. Try again.", "error");
    },
  });

  if (isLoading) return <div>Loading jobs...</div>;
  if (error) return <div>Error loading jobs.</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Applicants for Your Jobs</h1>
      {jobs?.map((job: Job) => (
        <div key={job.id} className="mb-6 border-b pb-4">
          <h2 className="text-xl font-bold">{job.title}</h2>
          <p>{job.description}</p>
          <h3 className="mt-4 text-lg font-semibold">Applicants:</h3>
          {job.jobApplications.length === 0 ? (
            <p>No applicants yet.</p>
          ) : (
            <ul>
              {job.jobApplications.map((application: JobApplication) => (
                <li key={application.id} className="mt-2">
                  <div className="flex items-center justify-between">
                    <span>
                      {application.photographer.username} ({application.photographer.email})
                    </span>
                    <div className="flex space-x-2">
                      <button
                        className="btn-primary text-white px-4 py-2 rounded hover:bg-primary-light"
                        onClick={() => acceptApplication.mutate(application.id)}
                        disabled={acceptApplication.isPending}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-950 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => declineApplication.mutate(application.id)}
                        disabled={declineApplication.isPending}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobApplicants;
