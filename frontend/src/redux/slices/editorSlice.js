
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../utils/api"

const EDITOR_URL = '/api/editor';

const getConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

// Author management actions
export const getAllAuthors = createAsyncThunk(
  'submissions/getAllAuthors',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(`${EDITOR_URL}/authors`, getConfig(token));
      return response.data.data.authors;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const toggleAuthorStatus = createAsyncThunk(
  'submissions/toggleAuthorStatus',
  async ({ authorId, isActive, note }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await api.put(
        `${EDITOR_URL}/authors/${authorId}/toggle-status`,
        { isActive, note },
        getConfig(token)
      );
      return response.data.data.author;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  submissions: [],
  currentSubmission: null,
  journalStats: [],
  authors: [], // Add this
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  canEdit: false,
};

const editorSlice= createSlice({
    name: 'editor',
      initialState,
      reducers: {
        reset: (state) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = false;
          state.message = '';
        },
        clearCurrentSubmission: (state) => {
          state.currentSubmission = null;
        },
      },
      extraReducers:(builder)=>{
        builder
        // Author management
.addCase(getAllAuthors.pending, (state) => {
  state.isLoading = true;
})
.addCase(getAllAuthors.fulfilled, (state, action) => {
  state.isLoading = false;
  state.authors = action.payload;
  console.log(action.payload)
})
.addCase(getAllAuthors.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
})
.addCase(toggleAuthorStatus.pending, (state) => {
  state.isLoading = true;
})
.addCase(toggleAuthorStatus.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  // Update the author in the authors array
  const index = state.authors.findIndex(a => a._id === action.payload._id);
  if (index !== -1) {
    state.authors[index] = action.payload;
  }
})
.addCase(toggleAuthorStatus.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
});
      }
})

export const { reset, clearCurrentSubmission } = editorSlice.actions;
export default editorSlice.reducer;