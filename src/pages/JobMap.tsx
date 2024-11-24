import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import JobCard from "../components/JobCard";
import { Job } from "../types/job";
import {fetchUserApplications } from "../services/jobServices";
import custom_pin from "/custom_pin.svg"



export const customIcon = new L.Icon({
  iconUrl: custom_pin,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Fetch jobs from the backend
const fetchJobs = async (): Promise<Job[]> => {
  const { data } = await axiosInstance.get("/jobs");
  return data.jobs;
};

// Fetch the logged-in user


const JobMap: React.FC = () => {
    const { data: jobs, isLoading: jobsLoading, error: jobsError } = useQuery({
        queryKey: ["jobs"],
        queryFn: fetchJobs,
      });
    
      const { data: applications, isLoading: appsLoading, error: appsError } = useQuery({
        queryKey: ["applications"],
        queryFn: fetchUserApplications,
      });
    
      if (jobsLoading || appsLoading) return <div>Loading map...</div>;
      if (jobsError || appsError) return <div>Error loading data</div>;
    
      // Create a set of job IDs the user has applied for
      const appliedJobIds = new Set(applications?.map((app) => app.jobId));
    
      return (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Find Jobs on the Map</h1>
          <MapContainer
            center={[59.3311, 18.0597]}
            zoom={12}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {jobs?.map((job) => (
              <>
              { job.status !== "accepted" && (
                <Marker
                key={job.id}
                position={[job.latitude, job.longitude]}
                icon={customIcon}
                >
                  {/* Pass the job and hasApplied status to JobPopup */}
                  <JobCard job={job} hasApplied={appliedJobIds.has(job.id)} />
                </Marker>
              )}
              </>
            ))}
          </MapContainer>
        </div>
      );
};

export default JobMap;
