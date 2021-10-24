import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './_todoSlice';

export default configureStore({
  reducer: {
    todos: todoReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});
