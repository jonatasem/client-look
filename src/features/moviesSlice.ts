import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../interface/Movie";

// Estado inicial da aplicação com filmes
interface MoviesState {
  allMovies: Movie[];
  likedMovies: Movie[];
  selectedMovie: Movie | null;
}

// Função para obter filmes curtidos do Local Storage
const getLikedMoviesFromLocalStorage = (): Movie[] => {
  const storedMovies = localStorage.getItem("likedMovies");
  return storedMovies ? JSON.parse(storedMovies) : [];
};

// Estado inicial
const initialState: MoviesState = {
  allMovies: [],
  likedMovies: getLikedMoviesFromLocalStorage(),
  selectedMovie: null,
};

// Criação do slice de filmes
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.allMovies = action.payload; // Define todos os filmes
    },
    likeMovie: (state, action: PayloadAction<number>) => {
      const movie = state.allMovies.find(
        (movie) => movie.id === action.payload,
      );
      // Adiciona filme à lista de curtidos se não estiver lá
      if (
        movie &&
        !state.likedMovies.some((likedMovie) => likedMovie.id === movie.id)
      ) {
        state.likedMovies.push(movie);
        localStorage.setItem("likedMovies", JSON.stringify(state.likedMovies)); // Persistir
      }
    },
    unLikeMovie: (state, action: PayloadAction<number>) => {
      const movieIndex = state.likedMovies.findIndex(
        (movie) => movie.id === action.payload,
      );
      // Remove filme da lista de curtidos se existir
      if (movieIndex !== -1) {
        state.likedMovies.splice(movieIndex, 1);
        localStorage.setItem("likedMovies", JSON.stringify(state.likedMovies)); // Persistir
      }
    },
    selectMovie: (state, action: PayloadAction<Movie | null>) => {
      state.selectedMovie = action.payload; // Seleciona um filme
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null; // Limpa a seleção de filme
    },
  },
});

// Exporta as ações do slice
export const {
  setMovies,
  likeMovie,
  unLikeMovie,
  selectMovie,
  clearSelectedMovie,
} = moviesSlice.actions;

export default moviesSlice.reducer;
