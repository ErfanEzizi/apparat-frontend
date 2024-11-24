export type Job = {
    id: string;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    status: string;
    date: string;
    clientId: string;
    jobApplications: JobApplication[];
  };

export type JobPopupProps = {
    job: Omit<Job, "jobApplications" | "latitude" | "longitude">; // Remove fields not used in JobPopup
    hasApplied: boolean;
  };

export  type Applicant = {
    id: string;
    username: string;
    email: string;
  };
  
export  type JobApplication = {
    id: string;
    photographer: Applicant;
  };
