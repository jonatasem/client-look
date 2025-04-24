import { Movie } from '../interface/Movie';

const apiUrl = import.meta.env.VITE_API_URL + "/api/movies";

export const fetchMovies = async (): Promise<Movie[]> => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erro ao buscar filmes');
        }
        const data: Movie[] = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const fetchMovieDetails = async (id: number): Promise<Movie | null> => {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar detalhes do filme');
        }
        const data: Movie = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
