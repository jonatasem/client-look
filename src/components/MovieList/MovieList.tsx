import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../api/moviesApi';
import { setMovies, likeMovie } from '../../features/moviesSlice';
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';

// Importando a interface Movie
import { Movie } from '../../interface/Movie';
import './MovieList.scss';

const MovieList: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const movies = useSelector((state: any) => state.movies.allMovies) as Movie[];
    const likedMovies = useSelector((state: any) => state.movies.likedMovies);
    const baseUrl = import.meta.env.VITE_API_URL;

    const [notification, setNotification] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getMovies = async () => {
            const moviesData = await fetchMovies();
            dispatch(setMovies(moviesData));
        };
        getMovies();
    }, [dispatch]);

    const handleLike = (id: number) => {
        dispatch(likeMovie(id));
        setNotification('Curtido com sucesso!');
        setTimeout(() => setNotification(''), 3000);
    };

    const handleSelect = (movie: Movie) => {
        navigate(`/movie/${movie.id}`);
    };

    const toggleSearch = () => {
        setIsSearchActive(!isSearchActive);
    };

    // Filtra os filmes com base no termo de busca
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className='container-list'>
            <article className='list-header'></article>
            <article className="list-center">
                <div className="head-list-left">
                    <ul>
                        <li>
                            <Link to="/liked">({likedMovies.length}) Filmes Curtidos</Link>
                        </li>
                    </ul>
                </div>
                <div className="head-list-right">
                    <p onClick={toggleSearch}><IoSearch /></p>
                    <div className={`input-search-active ${isSearchActive ? 'active' : ''}`}>
                        <input
                            type="text"
                            name="filter"
                            id="filter"
                            placeholder='Faça uma busca'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </article>
            {notification && <div className="notification-sucess">{notification}</div>}
            <ul className='container-movies'>
                {filteredMovies.map((movie: Movie) => (
                    <li key={movie.id}>
                        <img onClick={() => handleSelect(movie)} src={`${baseUrl}/${movie.img}`} alt={movie.title} />
                        <button onClick={() => handleLike(movie.id)} className='btn-like'>Curtir</button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default MovieList;
