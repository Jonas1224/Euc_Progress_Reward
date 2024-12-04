import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ open, message, severity, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          style={{
            position: 'fixed',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2000
          }}
        >
          <Snackbar 
            open={open} 
            autoHideDuration={4000} 
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              onClose={onClose} 
              severity={severity} 
              variant="filled"
              sx={{ minWidth: '300px' }}
            >
              {message}
            </Alert>
          </Snackbar>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification; 