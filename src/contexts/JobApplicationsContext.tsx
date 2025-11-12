import React, { createContext, useContext, useState } from 'react';

// Types
export interface JobApplication {
  applicationId: number;
  userId: number;
  appliedDate: string;
  respondedDate: string | null;
  company: string;
  jobTitle: string;
  seniority: string;
  jobType: string;
  workMode: string;
  industry: string;
  locationCity: string;
  locationCountry: string;
  sourcePlatform: string;
  status: string;
  salaryCurrency: string;
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: string;
  requiredSkills: string;
  listedTechStack: string;
  yearsExperienceRequired: number;
  postingUrl: string;
  finalOutcome: string;
  rejectionReason: string | null;
  offerReceivedDate: string | null;
  hiredSalary: number | null;
  name: string;
  email: string;
  experienceYears: number;
  currentCity: string;
  currentCountry: string;
  primaryRoleInterest: string;
  skills: string;
}

interface JobApplicationsContextType {
  applications: Record<string, JobApplication>;
  applicationIds: number[];
  loading: boolean;
  error: string | null;
  selectedApplicationId: number | null;
  setSelectedApplicationId: (id: number | null) => void;
  filterApplications: (criteria: FilterCriteria) => JobApplication[];
}

interface FilterCriteria {
  status?: string;
  company?: string;
  jobTitle?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

const JobApplicationsContext = createContext<JobApplicationsContextType | undefined>(undefined);

export const JobApplicationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mock data that will later be replaced with API data
  const mockData = {
    "application_ids": [245, 369, 384, 615, 616, 714, 1637, 1704, 1801, 2166, 2175, 3311, 3607, 3786, 3976, 5333, 5580, 5760, 5986, 5988],
    "user_id": 19,
    "applications": {
      "384": {
        "applicationId": 384,
        "userId": 19,
        "appliedDate": "2025-07-30",
        "respondedDate": "2025-08-14",
        "company": "Cognizant Systems",
        "jobTitle": "Data Analyst",
        "seniority": "Mid",
        "jobType": "Full-time",
        "workMode": "Onsite",
        "industry": "E-commerce",
        "locationCity": "Pune",
        "locationCountry": "India",
        "sourcePlatform": "LinkedIn",
        "status": "Accepted",
        "salaryCurrency": "INR",
        "salaryMin": 14.90,
        "salaryMax": 17.10,
        "salaryPeriod": "LPA",
        "requiredSkills": "SQL, Power BI, Excel, Python, ETL",
        "listedTechStack": "SQL, Power BI, Excel, Excel, SQL",
        "yearsExperienceRequired": 2,
        "postingUrl": "https://example.com/jobs/384",
        "finalOutcome": "Rejected",
        "rejectionReason": "Position filled",
        "offerReceivedDate": null,
        "hiredSalary": null,
        "name": "Reyansh Gupta",
        "email": "user19@example.com",
        "experienceYears": 0.7,
        "currentCity": "Mumbai",
        "currentCountry": "India",
        "primaryRoleInterest": "DevOps Engineer",
        "skills": "Scikit-learn, SIEM, Power BI, HTML, OWASP, Kotlin"
      }
      // Add other applications here when implementing
    }
  };

  const [applications, setApplications] = useState<Record<string, JobApplication>>(mockData.applications);
  const [applicationIds, setApplicationIds] = useState<number[]>(mockData.application_ids);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState<number | null>(null);

  const filterApplications = (criteria: FilterCriteria): JobApplication[] => {
    return Object.values(applications).filter(app => {
      if (criteria.status && app.status !== criteria.status) return false;
      if (criteria.company && !app.company.toLowerCase().includes(criteria.company.toLowerCase())) return false;
      if (criteria.jobTitle && !app.jobTitle.toLowerCase().includes(criteria.jobTitle.toLowerCase())) return false;
      if (criteria.dateRange) {
        const appDate = new Date(app.appliedDate);
        if (appDate < criteria.dateRange.start || appDate > criteria.dateRange.end) return false;
      }
      return true;
    });
  };

  // Value to be provided by the context
  const value = {
    applications,
    applicationIds,
    loading,
    error,
    selectedApplicationId,
    setSelectedApplicationId,
    filterApplications,
  };

  return (
    <JobApplicationsContext.Provider value={value}>
      {children}
    </JobApplicationsContext.Provider>
  );
};

export const useJobApplications = () => {
  const context = useContext(JobApplicationsContext);
  if (context === undefined) {
    throw new Error('useJobApplications must be used within a JobApplicationsProvider');
  }
  return context;
};