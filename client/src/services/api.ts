import axios from 'axios';
import { WeightEntry, UserProgress } from '../types/weight';

const API_URL = 'http://localhost:5000/api/weight';

export const weightService = {
  addEntry: async (weight: number, date: Date): Promise<WeightEntry> => {
    const response = await axios.post(`${API_URL}/entry`, { weight, date });
    return response.data;
  },

  getProgress: async (): Promise<UserProgress> => {
    const response = await axios.get(`${API_URL}/progress`);
    return response.data;
  },

  setInitialWeight: async (initialWeight: number, targetWeight: number): Promise<void> => {
    await axios.post(`${API_URL}/initial`, { initialWeight, targetWeight });
  }
}; 