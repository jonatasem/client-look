import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../interface/Movie';

interface MoviesState {
    allMovies: Movie[];
    likedMovies: Movie[];
    selectedMovie: Movie | null;
}

const getLikedMoviesFromLocalStorage = (): Movie[] => {
    const storedMovies = localStorage.getItem('likedMovies');
    return storedMovies ? JSON.parse(storedMovies) : [];
};

const initialState: MoviesState = {
    allMovies: [],
    likedMovies: getLikedMoviesFromLocalStorage(),
    selectedMovie: null,
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<Movie[]>) => {
            state.allMovies = action.payload;
        },
        likeMovie: (state, action: PayloadAction<number>) => {
            const movie = state.allMovies.find(movie => movie.id === action.payload);
            if (movie && !state.likedMovies.some(likedMovie => likedMovie.id === movie.id)) {
                state.likedMovies.push(movie);
                localStorage.setItem('likedMovies', JSON.stringify(state.likedMovies)); // Persistir
            }
        },
        unLikeMovie: (state, action: PayloadAction<number>) => {
            const movieIndex = state.likedMovies.findIndex(movie => movie.id === action.payload);
            if (movieIndex !== -1) {
                state.likedMovies.splice(movieIndex, 1);
                localStorage.setItem('likedMovies', JSON.stringify(state.likedMovies)); // Persistir
            }
        },
        selectMovie: (state, action: PayloadAction<Movie | null>) => {
            state.selectedMovie = action.payload;
        },
        clearSelectedMovie: (state) => {
            state.selectedMovie = null;
        },
    },
});

export const { setMovies, likeMovie, unLikeMovie, selectMovie, clearSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;