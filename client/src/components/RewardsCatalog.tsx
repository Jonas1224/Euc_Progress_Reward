import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { Paper, Typography, Grid, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import AnimatedContainer from './common/AnimatedContainer';
import { showNotification } from '../store/notificationSlice';
import { redeemReward } from '../store/weightSlice';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WeekendIcon from '@mui/icons-material/Weekend';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SpaIcon from '@mui/icons-material/Spa';

interface Reward {
  id: string;
  name: string;
  cost: number;
  description: string;
  icon: React.ReactNode;
}

const rewards: Reward[] = [
  {
    id: '1',
    name: 'Cheat Meal',
    cost: 50,
    description: 'Enjoy one guilt-free cheat meal',
    icon: <RestaurantIcon sx={{ fontSize: '3rem', color: '#ff9800' }} />
  },
  {
    id: '2',
    name: 'Rest Day',
    cost: 75,
    description: 'Take a day off from your workout routine',
    icon: <WeekendIcon sx={{ fontSize: '3rem', color: '#4caf50' }} />
  },
  {
    id: '3',
    name: 'New Workout Gear',
    cost: 100,
    description: 'Reward yourself with new exercise equipment',
    icon: <FitnessCenterIcon sx={{ fontSize: '3rem', color: '#2196f3' }} />
  },
  {
    id: '4',
    name: 'Spa Day',
    cost: 150,
    description: 'Treat yourself to a relaxing spa day',
    icon: <SpaIcon sx={{ fontSize: '3rem', color: '#e91e63' }} />
  }
];

const RewardCard: React.FC<{ reward: Reward; onRedeem: () => void; disabled: boolean }> = ({ 
  reward, 
  onRedeem, 
  disabled 
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Paper
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 2 }}>
        {reward.icon}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {reward.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
        {reward.description}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" color="primary">
          {reward.cost} 🪙
        </Typography>
        <Button
          variant="contained"
          onClick={onRedeem}
          disabled={disabled}
          size="small"
        >
          Redeem
        </Button>
      </Box>
    </Paper>
  </motion.div>
);

const RewardsCatalog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalCoins } = useSelector((state: RootState) => state.weight);

  const handleRedeem = (reward: Reward) => {
    if (totalCoins >= reward.cost) {
      dispatch(redeemReward(reward.cost));
      dispatch(showNotification({
        message: `Successfully redeemed ${reward.name}!`,
        severity: 'success'
      }));
    } else {
      dispatch(showNotification({
        message: 'Not enough coins to redeem this reward',
        severity: 'error'
      }));
    }
  };

  return (
    <AnimatedContainer delay={0.4}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Rewards Catalog
        </Typography>
        <Grid container spacing={3}>
          {rewards.map((reward) => (
            <Grid item xs={12} sm={6} md={3} key={reward.id}>
              <RewardCard
                reward={reward}
                onRedeem={() => handleRedeem(reward)}
                disabled={totalCoins < reward.cost}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </AnimatedContainer>
  );
};

export default RewardsCatalog; 