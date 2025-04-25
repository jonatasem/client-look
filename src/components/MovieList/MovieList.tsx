import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../api/moviesApi";
import { setMovies, likeMovie } from "../../features/moviesSlice";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Movie } from "../../interface/Movie";
import "./MovieList.scss";

const MovieList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state: any) => state.movies.allMovies) as Movie[];
  const likedMovies = useSelector((state: any) => state.movies.likedMovies);
  const baseUrl = import.meta.env.VITE_API_URL; // URL base

  const [notification, setNotification] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      const moviesData = await fetchMovies();
      dispatch(setMovies(moviesData)); // Define os filmes no estado
    };
    getMovies();
  }, [dispatch]);

  const handleLike = (id: number) => {
    dispatch(likeMovie(id)); // Curtir filme
    setNotification("Curtido com sucesso!");
    setTimeout(() => setNotification(""), 3000); // Notificação temporária
  };

  const handleSelect = (movie: Movie) => {
    navigate(`/movie/${movie.id}`); // Navega para detalhes do filme
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive); // Alterna a busca
  };

  // Filtra os filmes com base no termo de busca
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="container-list">
      <article className="list-header"></article>
      <article className="list-center">
        <div className="head-list-left">
          <ul>
            <li>
              <Link to="/liked">({likedMovies.length}) Filmes Curtidos</Link>
            </li>
          </ul>
        </div>
        <div className="head-list-right">
          <p onClick={toggleSearch}>
            <IoSearch />
          </p>
          <div
            className={`input-search-active ${isSearchActive ? "active" : ""}`}
          >
            <input
              type="text"
              name="filter"
              id="filter"
              placeholder="Faça uma busca"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
            />
          </div>
        </div>
      </article>
      {notification && (
        <div className="notification-sucess">{notification}</div> // Exibe notificação
      )}
      <ul className="container-movies">
        {filteredMovies.map((movie: Movie) => (
          <li key={movie.id}>
            <img
              onClick={() => handleSelect(movie)} // Seleciona filme
              src={`${baseUrl}/${movie.img}`}
              alt={movie.title}
            />
            <button onClick={() => handleLike(movie.id)} className="btn-like">
              Curtir
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieList;
