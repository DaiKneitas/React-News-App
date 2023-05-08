import { createSlice } from '@reduxjs/toolkit';

const sourcesSlice = createSlice({
  name: 'sources',
  initialState: {
    sources: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchSourcesStart: state => {
      state.loading = true;
    },
    fetchSourcesSuccess: (state, action) => {
      state.loading = false;
      state.sources = action.payload;
    },
    fetchSourcesError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchSourcesStart, fetchSourcesSuccess, fetchSourcesError } =
  sourcesSlice.actions;

export default sourcesSlice.reducer;
