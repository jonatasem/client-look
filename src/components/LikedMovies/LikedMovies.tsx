import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unLikeMovie } from '../../features/moviesSlice';
import './LikedMovies.scss';
import { Link } from 'react-router-dom';

const LikedMovies: React.FC = () => {
    const dispatch = useDispatch();
    const likedMovies = useSelector((state: any) => state.movies.likedMovies);
    const [notification, setNotification] = useState('');

    const handleUnLike = (id: number) => {
        dispatch(unLikeMovie(id));
        setNotification('Removido com sucesso!');
        setTimeout(() => setNotification(''), 3000);
    };

    return (
        <section className='container-liked'>
            <li className='header-liked'>
                <h1>Filmes Curtidos</h1>
                <Link to="/" className='btn-liked-home'>Início</Link>
            </li>
            {notification && <div className="notification-sucess">{notification}</div>}
            {likedMovies.length === 0 ? (
                <div className="no-liked-movies">Você ainda não curtiu nenhum filme :/</div>
            ) : (
                <ul>
                    {likedMovies.map((movie: any) => (
                        <li key={movie.id}>
                            <p>{movie.title}</p>
                            <button onClick={() => handleUnLike(movie.id)} className='btn-dlike'>Descurtir</button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default LikedMovies;