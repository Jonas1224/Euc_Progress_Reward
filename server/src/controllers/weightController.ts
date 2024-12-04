import { Request, Response } from 'express';
import { WeightEntry, UserProgress } from '../types/weight';

// Temporary storage (will be replaced with a database later)
let userProgress: UserProgress = {
  totalCoins: 0,
  weightEntries: [],
  initialWeight: 0,
  targetWeight: 0
};

export const addWeightEntry = (req: Request, res: Response) => {
  try {
    const { weight, date } = req.body;
    const lastEntry = userProgress.weightEntries[userProgress.weightEntries.length - 1];
    
    // Calculate coins earned (1 coin per 0.1 kg lost)
    const weightLost = lastEntry ? lastEntry.weight - weight : userProgress.initialWeight - weight;
    const coinsEarned = Math.max(0, Math.floor(weightLost * 10));

    const newEntry: WeightEntry = {
      id: Date.now().toString(),
      weight,
      date: new Date(date),
      coinsEarned
    };

    userProgress.weightEntries.push(newEntry);
    userProgress.totalCoins += coinsEarned;

    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error adding weight entry' });
  }
};

export const getProgress = (req: Request, res: Response) => {
  try {
    res.json(userProgress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress' });
  }
};

export const setInitialWeight = (req: Request, res: Response) => {
  try {
    const { initialWeight, targetWeight } = req.body;
    userProgress.initialWeight = initialWeight;
    userProgress.targetWeight = targetWeight;
    res.json({ message: 'Initial weight set successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error setting initial weight' });
  }
}; 