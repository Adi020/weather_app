import { configureStore } from '@reduxjs/toolkit';
import modal from './slices/modal.slice';

const store = configureStore({
  reducer: {
    modal,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
