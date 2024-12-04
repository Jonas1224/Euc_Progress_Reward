import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Paper, Typography, Box } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const CoinsDisplay: React.FC = () => {
  const { totalCoins } = useSelector((state: RootState) => state.weight);

  return (
    <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f5f5f5' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <MonetizationOnIcon sx={{ fontSize: 40, color: '#ffd700' }} />
        <div>
          <Typography variant="h6">Total Coins Earned</Typography>
          <Typography variant="h4" color="primary">
            {totalCoins}
          </Typography>
        </div>
      </Box>
    </Paper>
  );
};

export default CoinsDisplay; 