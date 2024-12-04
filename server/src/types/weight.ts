export interface WeightEntry {
  id: string;
  weight: number;
  date: Date;
  coinsEarned: number;
}

export interface UserProgress {
  totalCoins: number;
  weightEntries: WeightEntry[];
  initialWeight: number;
  targetWeight: number;
} 