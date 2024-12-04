import express from 'express';
import cors from 'cors';
import weightRoutes from './routes/weightRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/weight', weightRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Weight Tracker API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 