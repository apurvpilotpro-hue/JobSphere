import axios from 'axios';
import { JobApplication } from '../types/jobApplication';

const BASE_URL = 'http://localhost:8081/api';

interface UserResponse {
  email: string;
  user_id: number;
}

export const api = {
  // Get user ID by email
  getUserByEmail: async (email: string): Promise<UserResponse> => {
    try {
      const response = await axios.get(`${BASE_URL}/users/email/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Get all applications for a user
  getApplications: async (userId: number): Promise<JobApplication[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/applications/user/${userId}`);
      // Transform the response data into an array of applications
      const { applications } = response.data;
      return Object.values(applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  // Get a single application
  getApplication: async (applicationId: number): Promise<JobApplication> => {
    try {
      const response = await axios.get(`${BASE_URL}/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching application details:', error);
      throw error;
    }
  },

  // Add more API methods as needed (create, update, delete)
};