import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addWeightEntry } from '../store/weightSlice';
import { showNotification } from '../store/notificationSlice';
import { TextField, Button, Box, Paper, Fade } from '@mui/material';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorAlert from './common/ErrorAlert';
import AnimatedContainer from './common/AnimatedContainer';
import { motion } from 'framer-motion';

const WeightEntryForm: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.weight);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (weight) {
      try {
        await dispatch(addWeightEntry({
          weight: parseFloat(weight),
          date: new Date()
        })).unwrap();
        setWeight('');
        dispatch(showNotification({
          message: 'Weight entry added successfully!',
          severity: 'success'
        }));
      } catch (err) {
        dispatch(showNotification({
          message: 'Failed to add weight entry',
          severity: 'error'
        }));
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AnimatedContainer delay={0.2}>
      <Paper sx={{ p: 3, mb: 3 }}>
        {error && (
          <Fade in timeout={300}>
            <div>
              <ErrorAlert message={error} />
            </div>
          </Fade>
        )}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              type="number"
              label="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              inputProps={{ step: "0.1" }}
              fullWidth
              disabled={loading}
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={loading}
              >
                Add Entry
              </Button>
            </motion.div>
          </Box>
        </form>
      </Paper>
    </AnimatedContainer>
  );
};

export default WeightEntryForm; 