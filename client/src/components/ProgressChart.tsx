import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Paper, Box } from '@mui/material';
import AnimatedContainer from './common/AnimatedContainer';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProgressChart: React.FC = () => {
  const { weightEntries } = useSelector((state: RootState) => state.weight);

  const data = {
    labels: weightEntries.map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Weight Progress',
        data: weightEntries.map(entry => entry.weight),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weight Progress Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const
    },
    transitions: {
      active: {
        animation: {
          duration: 400
        }
      }
    }
  };

  return (
    <AnimatedContainer delay={0.3}>
      <Paper 
        component={motion.div}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        sx={{ p: 3, mb: 3 }}
      >
        <AnimatePresence mode="wait">
          <Box 
            component={motion.div}
            key={weightEntries.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ height: 400 }}
          >
            <Line data={data} options={options} />
          </Box>
        </AnimatePresence>
      </Paper>
    </AnimatedContainer>
  );
};

export default ProgressChart; 