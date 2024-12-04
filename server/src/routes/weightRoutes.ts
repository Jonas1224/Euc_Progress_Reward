import express from 'express';
import { addWeightEntry, getProgress, setInitialWeight } from '../controllers/weightController';

const router = express.Router();

router.post('/entry', addWeightEntry);
router.get('/progress', getProgress);
router.post('/initial', setInitialWeight);

export default router; 