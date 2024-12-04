import { configureStore } from '@reduxjs/toolkit';
import weightReducer from './weightSlice';

export const store = configureStore({
  reducer: {
    weight: weightReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 