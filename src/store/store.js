import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articlesSlice';
import sourcesReducer from './sourcesSlice';

export default configureStore({
  reducer: {
    articles: articlesReducer,
    sources: sourcesReducer,
  },
});
