import { createSlice } from '@reduxjs/toolkit';

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchArticlesStart: state => {
      state.loading = true;
    },
    fetchArticlesSuccess: (state, action) => {
      state.loading = false;
      state.articles = action.payload;
    },
    fetchArticlesError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchArticlesStart, fetchArticlesSuccess, fetchArticlesError } =
  articlesSlice.actions;

export default articlesSlice.reducer;
