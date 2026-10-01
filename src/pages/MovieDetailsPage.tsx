import { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Star,
  Users,
  Play,
  ExternalLink,
  Coins,
  Landmark,
  Globe2,
  Languages,
  Layers,
  ImageOff
} from 'lucide-react';
import { Header } from '../components/Header';
import { MovieRow } from '../components/MovieGrid';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import { TrailerModal } from '../components/ui/TrailerModal';
import { tmdbApi } from '../services/tmdbApi';
import { Movie, MovieDetails as MovieDetailsType, WatchProviderGroup } from '../types/movie';
import {
  crewGroups,
  formatCurrency,
  formatReleaseDate,
  formatRuntime,
  formatVoteCount,
  friendlyError,
  getStatusTone
} from '../utils/format';

const CAST_LIMIT = 12;

const Section = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-4">
    <h2 className="text-2xl font-bold text-white">{title}</h2>
    {children}
  </section>
);

const InfoRow = ({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Clock;
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    <h3 className="flex items-center gap-2 font-medium text-gray-400 text-sm">
      <Icon className="w-4 h-4" />
      {label}
    </h3>
    <div className="mt-1.5 text-gray-200 text-sm">{value}</div>
  </div>
);

export const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [recommended, setRecommended] = useState<Movie[]>([]);
  const [providers, setProviders] = useState<WatchProviderGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [showAllCast, setShowAllCast] = useState(false);

  const fetchMovie = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    setShowAllCast(false);

    try {
      const data = await tmdbApi.getMovieDetails(id);
      setMovie(data);

      const [similarData, recommendedData, providerData] = await Promise.allSettled([
        tmdbApi.getSimilarMovies(id),
        tmdbApi.getRecommendations(id),
        tmdbApi.getWatchProviders(id, 'IN')
      ]);

      setSimilar(similarData.status === 'fulfilled' ? similarData.value.movies.slice(0, 16) : []);
      setRecommended(
        recommendedData.status === 'fulfilled' ? recommendedData.value.movies.slice(0, 16) : []
      );
      setProviders(providerData.status === 'fulfilled' ? providerData.value : null);
    } catch (err) {
      console.error('Error fetching movie details:', err);
      setError(friendlyError(err));
      setMovie(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-[60vh] bg-gray-950">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  if (error || !movie) {
    return (
      <>
        <Header />
        <div className="bg-gray-950 min-h-[60vh]">
          <ErrorState
            title="Movie not found"
            message={error ?? 'This movie could not be found or may have been removed.'}
            onRetry={fetchMovie}
          />
        </div>
      </>
    );
  }

  const trailer = movie.videos[0];
  const crew = crewGroups(movie.crew);
  const visibleCast = showAllCast ? movie.cast : movie.cast.slice(0, CAST_LIMIT);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-950">
        <div
          className="h-[420px] lg:h-[520px] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${movie.backdropPath})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-gray-950/40" />

          <div className="absolute inset-0">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-10">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full"
              >
                {movie.status && (
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-3 ${getStatusTone(
                      movie.status
                    )}`}
                  >
                    {movie.status}
                  </span>
                )}

                <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                  {movie.title}
                </h1>

                {movie.originalTitle && movie.originalTitle !== movie.title && (
                  <p className="text-gray-400 mb-2 italic">{movie.originalTitle}</p>
                )}

                {movie.tagline && (
                  <p className="text-lg text-gray-300 mb-4 max-w-2xl">{movie.tagline}</p>
                )}

                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-gray-300">
                  {movie.voteCount > 0 && (
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-white">
                        {movie.voteAverage.toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        /10 ({formatVoteCount(movie.voteCount)} votes)
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatReleaseDate(movie.releaseDate)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                </div>

                {trailer && (
                  <button
                    onClick={() => setTrailerOpen(true)}
                    className="mt-6 inline-flex items-center gap-2.5 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    Watch Trailer
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 min-w-0 space-y-10">
              {movie.overview && (
                <Section title="Overview">
                  <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                </Section>
              )}

              {(crew.Director.length > 0 || crew.Writer.length > 0) && (
                <Section title="Crew">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {crew.Director.map((name) => (
                      <div key={name} className="bg-white/5 border border-white/5 rounded-xl p-4">
                        <p className="text-xs uppercase tracking-wide text-red-400 font-semibold mb-1">
                          Directed by
                        </p>
                        <p className="text-white font-medium">{name}</p>
                      </div>
                    ))}
                    {crew.Writer.map((name) => (
                      <div key={name} className="bg-white/5 border border-white/5 rounded-xl p-4">
                        <p className="text-xs uppercase tracking-wide text-blue-400 font-semibold mb-1">
                          Written by
                        </p>
                        <p className="text-white font-medium">{name}</p>
                      </div>
                    ))}
                    {crew.Producer.slice(0, 4).map((name) => (
                      <div key={name} className="bg-white/5 border border-white/5 rounded-xl p-4">
                        <p className="text-xs uppercase tracking-wide text-yellow-400 font-semibold mb-1">
                          Produced by
                        </p>
                        <p className="text-white font-medium">{name}</p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {movie.cast.length > 0 && (
                <Section title={`Cast (${movie.cast.length})`}>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {visibleCast.map((actor) => (
                      <div key={actor.id} className="text-center group">
                        {actor.profilePath ? (
                          <img
                            src={actor.profilePath}
                            alt={actor.name}
                            loading="lazy"
                            className="w-full rounded-lg mb-2 object-cover aspect-[2/3] group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full rounded-lg mb-2 aspect-[2/3] bg-white/5 flex items-center justify-center">
                            <ImageOff className="w-6 h-6 text-gray-600" />
                          </div>
                        )}
                        <p className="font-medium text-white text-xs line-clamp-2">{actor.name}</p>
                        <p className="text-[11px] text-gray-400 line-clamp-2">
                          {actor.character}
                        </p>
                      </div>
                    ))}
                  </div>

                  {movie.cast.length > CAST_LIMIT && (
                    <button
                      onClick={() => setShowAllCast((prev) => !prev)}
                      className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl border border-white/5 transition-all text-sm font-medium"
                    >
                      {showAllCast ? 'Show less' : `Show all ${movie.cast.length} actors`}
                    </button>
                  )}
                </Section>
              )}

              {movie.videos.length > 0 && (
                <Section title="Videos & Trailers">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {movie.videos.slice(0, 6).map((video) => (
                      <a
                        key={video.id}
                        href={video.watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-4 p-3 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 rounded-xl transition-all"
                      >
                        <div className="relative w-32 shrink-0 aspect-video rounded-lg overflow-hidden bg-gray-800">
                          <img
                            src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                            alt={video.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                            <Play className="w-7 h-7 text-white fill-white" />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-wide text-red-400 font-semibold">
                            {video.type}
                            {video.official && ' · Official'}
                          </p>
                          <p className="text-sm text-white line-clamp-2 mt-1">{video.name}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </Section>
              )}

              {movie.belongsToCollection && (
                <Section title="Collection">
                  <Link
                    to={`/?search=${encodeURIComponent(movie.belongsToCollection.name)}`}
                    className="flex items-center gap-4 p-4 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 rounded-xl transition-all"
                  >
                    {movie.belongsToCollection.posterPath && (
                      <img
                        src={movie.belongsToCollection.posterPath}
                        alt={movie.belongsToCollection.name}
                        loading="lazy"
                        className="w-16 rounded-lg object-cover aspect-[2/3]"
                      />
                    )}
                    <div>
                      <p className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">
                        <Layers className="w-3.5 h-3.5" />
                        Part of
                      </p>
                      <p className="text-white font-semibold">{movie.belongsToCollection.name}</p>
                    </div>
                  </Link>
                </Section>
              )}

              <MovieRow
                title="More Like This"
                movies={similar}
                emptyMessage="No similar movies found."
              />

              <MovieRow
                title="Recommended For You"
                movies={recommended}
                emptyMessage="No recommendations available."
              />
            </div>

            <aside className="min-w-0">
              <div className="sticky top-24 space-y-6">
                {movie.genres.length > 0 && (
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                    <h3 className="font-semibold text-white mb-3">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre}
                          className="px-3 py-1 rounded-full bg-red-500/15 text-red-300 text-sm border border-red-500/20"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {providers && (
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                    <h3 className="font-semibold text-white mb-3">Where to Watch (IN)</h3>
                    <div className="space-y-3">
                      {(
                        [
                          ['Streaming', providers.flatrate],
                          ['Rent', providers.rent],
                          ['Buy', providers.buy]
                        ] as const
                      ).map(([label, list]) =>
                        list.length > 0 ? (
                          <div key={label}>
                            <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-2">
                              {label}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {list.map((provider) => (
                                <span
                                  key={provider.providerName}
                                  title={provider.providerName}
                                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden"
                                >
                                  {provider.logoPath ? (
                                    <img
                                      src={provider.logoPath}
                                      alt={provider.providerName}
                                      loading="lazy"
                                      className="w-full h-full object-contain p-1"
                                    />
                                  ) : (
                                    <Globe2 className="w-4 h-4 text-gray-500" />
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-5">
                  <h3 className="font-semibold text-white text-lg">Details</h3>

                  <InfoRow icon={Coins} label="Budget" value={formatCurrency(movie.budget)} />

                  {movie.revenue > 0 && (
                    <InfoRow
                      icon={Landmark}
                      label="Box Office"
                      value={formatCurrency(movie.revenue)}
                    />
                  )}

                  {movie.originCountry.length > 0 && (
                    <InfoRow
                      icon={Globe2}
                      label="Origin"
                      value={movie.originCountry.join(', ')}
                    />
                  )}

                  {movie.spokenLanguages.length > 0 && (
                    <InfoRow
                      icon={Languages}
                      label="Languages"
                      value={movie.spokenLanguages.join(', ')}
                    />
                  )}

                  {movie.productionCompanies.length > 0 && (
                    <div>
                      <h3 className="flex items-center gap-2 font-medium text-gray-400 text-sm mb-2">
                        <Landmark className="w-4 h-4" />
                        Production
                      </h3>
                      <div className="flex flex-col gap-1.5">
                        {movie.productionCompanies.map((company) => (
                          <span key={company.id} className="text-gray-200 text-sm">
                            {company.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {(movie.homepage || movie.imdbId) && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {movie.homepage && (
                        <a
                          href={movie.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg border border-white/5 transition-all text-sm"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Homepage
                        </a>
                      )}
                      {movie.imdbId && (
                        <a
                          href={`https://www.imdb.com/title/${movie.imdbId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 rounded-lg border border-yellow-500/20 transition-all text-sm"
                        >
                          IMDb
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                  <h3 className="flex items-center gap-2 font-semibold text-white mb-3">
                    <Users className="w-4 h-4" />
                    Popularity
                  </h3>
                  <p className="text-2xl font-bold text-white">
                    {movie.popularity.toFixed(0)}
                  </p>
                  <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min((movie.popularity / 200) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      <TrailerModal
        videos={movie.videos}
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
      />
    </>
  );
};