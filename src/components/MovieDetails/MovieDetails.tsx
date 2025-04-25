import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "../../api/moviesApi";
import "./MovieDetails.scss";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const baseUrl = import.meta.env.VITE_API_URL; // Definindo a URL base

  useEffect(() => {
    const getMovieDetails = async () => {
      if (id) {
        setLoading(true);
        try {
          const details = await fetchMovieDetails(Number(id));
          setMovieDetails(details);
        } catch (error) {
          console.error("Erro ao buscar detalhes do filme:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    getMovieDetails();
  }, [id]);

  if (loading) return <div style={{ textAlign: "center" }}>Carregando...</div>;
  if (!movieDetails)
    return <div style={{ textAlign: "center" }}>Filme não encontrado.</div>;

  return (
    <section className="container-details">
      <article className="details-head">
        <h2>{movieDetails.title}</h2>
        <button className="btn-voltar">
          <Link to="/">Voltar</Link>
        </button>
      </article>

      <article className="details-main">
        <div className="details-main-left">
          <img
            src={`${baseUrl}/${movieDetails.img}`}
            alt={movieDetails.title}
          />
          <p className="descript-details">{movieDetails.description}</p>
        </div>
        <div className="details-main-right">
          <video controls>
            <source src={movieDetails.src} type="video/mp4" />
            Seu navegador não suporta a tag de vídeo.
          </video>
        </div>
      </article>
    </section>
  );
};

export default MovieDetails;
