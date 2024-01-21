import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers as needed
  },
  // Add middleware, enhancers, or dev tools configuration if needed
});

export default store;
