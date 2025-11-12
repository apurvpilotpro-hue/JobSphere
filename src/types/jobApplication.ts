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
    rejectionReason: string | "-";
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

export interface JobApplicationsResponse {
    application_ids: number[];
    user_id: number;
    applications: {
        [key: string]: JobApplication;
    };
}

export type ApplicationStatus = 'Applied' | 'Under Review' | 'Interview' | 'Accepted' | 'Rejected' | 'Withdrawn';

export type WorkMode = 'Remote' | 'Hybrid' | 'Onsite';

export type JobType = 'Full-time' | 'Contract' | 'Part-time' | 'Internship';

export type Seniority = 'Intern' | 'Junior' | 'Mid' | 'Senior';