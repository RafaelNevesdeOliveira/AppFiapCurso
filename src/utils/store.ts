// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../app/features/users/userSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
