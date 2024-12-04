import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setInitialWeights } from '../store/weightSlice';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';

const InitialSetup: React.FC = () => {
  const [initialWeight, setInitialWeight] = useState<string>('');
  const [targetWeight, setTargetWeight] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { initialWeight: currentInitial } = useSelector((state: RootState) => state.weight);

  if (currentInitial > 0) {
    return null; // Don't show if initial weight is already set
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialWeight && targetWeight) {
      dispatch(setInitialWeights({
        initialWeight: parseFloat(initialWeight),
        targetWeight: parseFloat(targetWeight)
      }));
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Welcome! Let's set up your weight loss goals
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            type="number"
            label="Current Weight (kg)"
            value={initialWeight}
            onChange={(e) => setInitialWeight(e.target.value)}
            required
            inputProps={{ step: "0.1" }}
          />
          <TextField
            type="number"
            label="Target Weight (kg)"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            required
            inputProps={{ step: "0.1" }}
          />
          <Button type="submit" variant="contained" color="primary">
            Start Tracking
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default InitialSetup; 