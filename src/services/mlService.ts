import axios from 'axios';

const ML_API_BASE_URL = 'http://localhost:5000'; // Change this to your Flask API URL

export interface JobRecommendation {
  jobId: string;
  title: string;
  company: string;
  skills: string[];
  matchScore: number;
  description: string;
  applicationLink?: string;
}

class MLRecommendationService {
  private api;

  constructor() {
    this.api = axios.create({
      baseURL: ML_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getJobRecommendations(userId: number): Promise<JobRecommendation[]> {
    try {
      const response = await this.api.get(`/recommendations/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching job recommendations:', error);
      throw error;
    }
  }

  async updateUserProfile(userId: number, skills: string[]): Promise<void> {
    try {
      await this.api.post(`/update-profile/${userId}`, { skills });
    } catch (error) {
      console.error('Error updating user profile for ML model:', error);
      throw error;
    }
  }

  async provideFeedback(userId: number, jobId: string, interested: boolean): Promise<void> {
    try {
      await this.api.post(`/feedback`, {
        userId,
        jobId,
        interested,
      });
    } catch (error) {
      console.error('Error sending recommendation feedback:', error);
      throw error;
    }
  }
}

export const mlService = new MLRecommendationService();