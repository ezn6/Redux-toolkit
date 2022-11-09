import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export default configureStore({
  // index.js에 store로 사용하기위한 export
  reducer: {
    user: userReducer,
  },
});
