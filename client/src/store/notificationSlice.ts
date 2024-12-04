import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationState {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  open: boolean;
}

const initialState: NotificationState = {
  message: '',
  severity: 'info',
  open: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<Omit<NotificationState, 'open'>>) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = true;
    },
    hideNotification: (state) => {
      state.open = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer; 