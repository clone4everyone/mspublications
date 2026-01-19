import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import submissionReducer from './slices/submissionSlice';
import emailReducer from './slices/emailSlice';
import editorReducer from './slices/editorSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    submissions: submissionReducer,
    emails: emailReducer,
    editor: editorReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;