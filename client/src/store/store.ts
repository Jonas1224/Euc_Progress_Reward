import { configureStore } from '@reduxjs/toolkit';
import weightReducer from './weightSlice';
import notificationReducer from './notificationSlice';

export const store = configureStore({
  reducer: {
    weight: weightReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 