import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { tmdbApi } from '../services/tmdbApi';
import { MovieDetails as MovieDetailsType } from '../types/movie';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Clock, Calendar, Star } from 'lucide-react';

export const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      setLoading(true);
      const data = await tmdbApi.getMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-[50vh]">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <Header />
        <div className="text-center text-white mt-8">Movie not found</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900">
        <div 
          className="h-[400px] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${movie.backdropPath})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-xl text-gray-300 mb-4">{movie.tagline}</p>
              )}
              <div className="flex flex-wrap gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{movie.runtime} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(movie.releaseDate).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>{movie.voteAverage.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-gray-300">{movie.overview}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {movie.cast.map((actor) => (
                    <div key={actor.id} className="text-center">
                      <img
                        src={actor.profile_path 
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : 'https://via.placeholder.com/185x278'}
                        alt={actor.name}
                        className="w-full rounded-lg mb-2"
                      />
                      <p className="font-medium text-white">{actor.name}</p>
                      <p className="text-sm text-gray-400">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div>
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold text-white mb-4">Details</h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-medium text-gray-400">Genres</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre}
                          className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};