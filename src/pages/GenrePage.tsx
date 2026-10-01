import { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Header } from '../components/Header';
import { MovieGrid } from '../components/MovieGrid';
import { GenreRail } from '../components/GenreRail';
import { SelectMenu } from '../components/ui/SelectMenu';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import { tmdbApi, SORT_LABELS, SortOption } from '../services/tmdbApi';
import { toLanguageOptions } from '../config/browse';
import { Movie } from '../types/movie';
import { friendlyError } from '../utils/format';

const SORT_OPTIONS = Object.keys(SORT_LABELS).map((value) => ({
  value,
  label: SORT_LABELS[value as SortOption]
}));

const CURRENT_YEAR = new Date().getFullYear();

const YEAR_OPTIONS = [
  { value: '', label: 'Any year' },
  ...Array.from({ length: 30 }, (_, i) => {
    const year = CURRENT_YEAR - i;
    return { value: String(year), label: String(year) };
  })
];

const MIN_VOTE_OPTIONS = [
  { value: '0', label: 'Any votes' },
  { value: '100', label: '100+ votes' },
  { value: '500', label: '500+ votes' },
  { value: '1000', label: '1000+ votes' },
  { value: '5000', label: '5000+ votes' }
];

const LANGUAGE_OPTIONS = toLanguageOptions();

export const GenrePage = () => {
  const { genreId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genreName, setGenreName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [sortBy, setSortBy] = useState<SortOption>('popularity.desc');
  const [year, setYear] = useState<string>('');
  const [minVotes, setMinVotes] = useState<string>('0');
  const [language, setLanguage] = useState<string>(searchParams.get('lang') ?? '');

  useEffect(() => {
    setLanguage(searchParams.get('lang') ?? '');
  }, [searchParams]);

  useEffect(() => {
    if (!genreId) return;
    tmdbApi
      .getGenres()
      .then((genres) => {
        const found = genres.find((genre) => genre.id === Number(genreId));
        setGenreName(found?.name ?? '');
      })
      .catch(() => setGenreName(''));
  }, [genreId]);

  const fetchMovies = useCallback(async () => {
    if (!genreId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await tmdbApi.discoverMovies(
        {
          genreIds: [Number(genreId)],
          sortBy,
          year: year ? Number(year) : undefined,
          minVotes: Number(minVotes) || undefined,
          language: language || undefined
        },
        currentPage
      );

      setMovies(data.movies);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalResults);
    } catch (err) {
      console.error('Error fetching movies by genre:', err);
      setError(friendlyError(err));
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [genreId, sortBy, year, minVotes, language, currentPage]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const resetPage = () => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateLanguage = (value: string) => {
    setLanguage(value);
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set('lang', value);
    } else {
      next.delete('lang');
    }
    setSearchParams(next, { replace: true });
  };

  const resetFilters = () => {
    setSortBy('popularity.desc');
    setYear('');
    setMinVotes('0');
    updateLanguage('');
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasFilters = sortBy !== 'popularity.desc' || year !== '' || minVotes !== '0' || language !== '';

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg shadow-red-500/20">
            <SlidersHorizontal className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{genreName || 'Browse'}</h1>
            <p className="text-gray-400 text-sm">
              <span className="text-white font-semibold">
                {totalResults.toLocaleString('en-US')}
              </span>{' '}
              movies found
            </p>
          </div>
        </div>

        <div className="mb-8">
          <GenreRail />
        </div>

        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
          <SelectMenu
            label="Sort by"
            value={sortBy}
            options={SORT_OPTIONS}
            onChange={(value) => {
              setSortBy(value as SortOption);
              resetPage();
            }}
            icon={<SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />}
            width="min-w-[180px] flex-1 sm:max-w-[240px]"
          />

          <SelectMenu
            label="Release year"
            value={year}
            options={YEAR_OPTIONS}
            searchable
            onChange={(value) => {
              setYear(value);
              resetPage();
            }}
            width="min-w-[150px] flex-1 sm:max-w-[200px]"
          />

          <SelectMenu
            label="Minimum rating votes"
            value={minVotes}
            options={MIN_VOTE_OPTIONS}
            onChange={(value) => {
              setMinVotes(value);
              resetPage();
            }}
            width="min-w-[160px] flex-1 sm:max-w-[220px]"
          />

          <SelectMenu
            label="Language"
            value={language}
            options={LANGUAGE_OPTIONS}
            searchable
            onChange={(value) => {
              updateLanguage(value);
              resetPage();
            }}
            width="min-w-[160px] flex-1 sm:max-w-[220px]"
          />
        </div>

        {hasFilters && (
          <button
            onClick={resetFilters}
            className="mb-6 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white
                       rounded-xl border border-white/5 text-sm transition-all inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset filters
          </button>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <ErrorState title="Could not load movies" message={error} onRetry={fetchMovies} />
        ) : movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <SlidersHorizontal className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No movies match these filters</h3>
            <p className="text-gray-400 max-w-md">
              Try loosening the rating minimum or clearing the year and language filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-all"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <MovieGrid
            movies={movies}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};