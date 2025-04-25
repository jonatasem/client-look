import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/moviesSlice.ts";

// Configuração do store Redux
const store = configureStore({
  reducer: {
    movies: moviesReducer, // Redutor de filmes
  },
});

export default store;
