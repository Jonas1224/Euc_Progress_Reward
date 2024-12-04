import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { fetchProgress } from './store/weightSlice';
import { Container, Typography, Box } from '@mui/material';
import InitialSetup from './components/InitialSetup';
import WeightEntryForm from './components/WeightEntryForm';
import ProgressChart from './components/ProgressChart';
import CoinsDisplay from './components/CoinsDisplay';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { initialWeight } = useSelector((state: RootState) => state.weight);

  useEffect(() => {
    dispatch(fetchProgress());
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Weight Loss Progress Tracker
        </Typography>
        
        <InitialSetup />
        
        {initialWeight > 0 && (
          <>
            <CoinsDisplay />
            <WeightEntryForm />
            <ProgressChart />
          </>
        )}
      </Box>
    </Container>
  );
};

export default App;
