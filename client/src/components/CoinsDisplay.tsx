import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Paper, Typography, Box } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedContainer from './common/AnimatedContainer';

const CoinsDisplay: React.FC = () => {
  const { totalCoins } = useSelector((state: RootState) => state.weight);
  const [displayedCoins, setDisplayedCoins] = useState(0);

  // Animate coin count
  useEffect(() => {
    const duration = 1000; // 1 second animation
    const steps = 60; // 60 steps for smooth animation
    const increment = (totalCoins - displayedCoins) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      if (currentStep < steps) {
        setDisplayedCoins(prev => 
          Math.round(prev + increment)
        );
        currentStep++;
      } else {
        setDisplayedCoins(totalCoins);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalCoins]);

  const coinSparkle = {
    initial: { scale: 1, rotate: 0 },
    animate: { 
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  return (
    <AnimatedContainer delay={0.1}>
      <Paper 
        component={motion.div}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        sx={{ 
          p: 3, 
          mb: 3, 
          backgroundColor: '#f5f5f5',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <motion.div
            variants={coinSparkle}
            initial="initial"
            animate="animate"
          >
            <MonetizationOnIcon 
              sx={{ 
                fontSize: 40, 
                color: '#ffd700',
                filter: 'drop-shadow(0 0 2px rgba(255, 215, 0, 0.5))'
              }} 
            />
          </motion.div>
          <div>
            <Typography variant="h6">Total Coins Earned</Typography>
            <Typography 
              variant="h4" 
              color="primary"
              component={motion.div}
              layout
            >
              {displayedCoins}
            </Typography>
          </div>
        </Box>
        <AnimatePresence>
          {totalCoins > displayedCoins && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{
                position: 'absolute',
                top: '50%',
                right: '20px',
                color: '#4caf50'
              }}
            >
              <Typography variant="body2">
                +{(totalCoins - displayedCoins).toFixed(1)}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </AnimatedContainer>
  );
};

export default CoinsDisplay; 