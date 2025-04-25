import { Movie } from "../interface/Movie";

// URL da API
const apiUrl = import.meta.env.VITE_API_URL + "/api/movies";

// Função para buscar todos os filmes
export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Erro ao buscar filmes");
    }
    const data: Movie[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Função para buscar detalhes de um filme
export const fetchMovieDetails = async (id: number): Promise<Movie | null> => {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar detalhes do filme");
    }
    const data: Movie = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
