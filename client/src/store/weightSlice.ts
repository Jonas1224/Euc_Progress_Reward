import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WeightEntry, UserProgress } from '../types/weight';
import { weightService } from '../services/api';

export interface WeightState extends UserProgress {
  loading: boolean;
  error: string | null;
}

const initialState: WeightState = {
  totalCoins: 0,
  weightEntries: [],
  initialWeight: 0,
  targetWeight: 0,
  loading: false,
  error: null
};

export const addWeightEntry = createAsyncThunk(
  'weight/addEntry',
  async ({ weight, date }: { weight: number; date: Date }) => {
    return await weightService.addEntry(weight, date);
  }
);

export const fetchProgress = createAsyncThunk(
  'weight/fetchProgress',
  async () => {
    return await weightService.getProgress();
  }
);

export const setInitialWeights = createAsyncThunk(
  'weight/setInitial',
  async ({ initialWeight, targetWeight }: { initialWeight: number; targetWeight: number }) => {
    await weightService.setInitialWeight(initialWeight, targetWeight);
    return { initialWeight, targetWeight };
  }
);

export const redeemReward = createAsyncThunk(
  'weight/redeemReward',
  async (cost: number) => {
    // In a real app, you might want to call an API here
    return cost;
  }
);

const weightSlice = createSlice({
  name: 'weight',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWeightEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(addWeightEntry.fulfilled, (state, action: PayloadAction<WeightEntry>) => {
        state.loading = false;
        state.weightEntries.push(action.payload);
        state.totalCoins += action.payload.coinsEarned;
      })
      .addCase(addWeightEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add entry';
      })
      .addCase(fetchProgress.fulfilled, (state, action: PayloadAction<UserProgress>) => {
        return { ...state, ...action.payload, loading: false };
      })
      .addCase(setInitialWeights.fulfilled, (state, action) => {
        state.initialWeight = action.payload.initialWeight;
        state.targetWeight = action.payload.targetWeight;
      })
      .addCase(redeemReward.fulfilled, (state, action) => {
        state.totalCoins -= action.payload;
      });
  }
});

export default weightSlice.reducer; 