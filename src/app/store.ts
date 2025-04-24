import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/moviesSlice.ts';

const store = configureStore({
    reducer: {
        movies: moviesReducer,
    },
});

export default store;