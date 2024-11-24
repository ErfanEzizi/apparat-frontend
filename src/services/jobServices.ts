import { Job } from "../types/job";
import { getUserIdFromToken } from "../utils/jwt";
import axiosInstance from "./axiosInstance";


type Application = {
    jobId: string;
};
  

export const fetchUserApplications = async (): Promise<Application[]> => {
    const loggedInUserId = getUserIdFromToken();
    if (!loggedInUserId) throw new Error("User ID not found. Please log in again.");
  
    const { data } = await axiosInstance.get(`/users/${loggedInUserId}/applications`);
    return data.applications;
  };

export const fetchClientJobsWithApplicants = async () => {
  const clientId = getUserIdFromToken();
  if (!clientId) throw new Error("Client ID not found. Please log in again.");

  const { data } = await axiosInstance.get(`/users/${clientId}/jobs-with-applicants`);
  return data.jobs;
};

export const applyForJob = async (jobId: string): Promise<void> => {
    const photographerId = getUserIdFromToken(); // Extract user ID from JWT
    if (!photographerId) {
      throw new Error("User ID not found. Please log in again.");
    }
  
    await axiosInstance.post(`/jobs/${jobId}/apply`, { photographerId });
  };

export const fetchJobs = async (): Promise<Job[]> => {
    const { data } = await axiosInstance.get("/jobs");
    return data.jobs;
  };
