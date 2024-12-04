import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setInitialWeights } from '../store/weightSlice';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedContainer from './common/AnimatedContainer';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const InitialSetup: React.FC = () => {
  const [initialWeight, setInitialWeight] = useState<string>('');
  const [targetWeight, setTargetWeight] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { initialWeight: currentInitial } = useSelector((state: RootState) => state.weight);

  if (currentInitial > 0) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (initialWeight && targetWeight) {
      await dispatch(setInitialWeights({
        initialWeight: parseFloat(initialWeight),
        targetWeight: parseFloat(targetWeight)
      }));
    }
  };

  const formControls = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <AnimatedContainer>
      <Paper 
        component={motion.div}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        sx={{ p: 4, mb: 3 }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Typography variant="h5" gutterBottom align="center">
            Welcome to Weight Tracker!
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4 }}>
            Let's set up your weight loss goals
          </Typography>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <motion.div
              variants={formControls}
              custom={0}
              initial="hidden"
              animate="visible"
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FitnessCenterIcon color="primary" />
                <TextField
                  type="number"
                  label="Current Weight (kg)"
                  value={initialWeight}
                  onChange={(e) => setInitialWeight(e.target.value)}
                  required
                  inputProps={{ step: "0.1" }}
                  fullWidth
                />
              </Box>
            </motion.div>

            <motion.div
              variants={formControls}
              custom={1}
              initial="hidden"
              animate="visible"
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrackChangesIcon color="primary" />
                <TextField
                  type="number"
                  label="Target Weight (kg)"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  required
                  inputProps={{ step: "0.1" }}
                  fullWidth
                />
              </Box>
            </motion.div>

            <motion.div
              variants={formControls}
              custom={2}
              initial="hidden"
              animate="visible"
            >
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                fullWidth
                size="large"
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Tracking
              </Button>
            </motion.div>
          </Box>
        </form>
      </Paper>
    </AnimatedContainer>
  );
};

export default InitialSetup; 