import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { MovieGrid, MovieRow } from '../components/MovieGrid';
import { GenreRail } from '../components/GenreRail';
import { SelectMenu } from '../components/ui/SelectMenu';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import { ScrollToTop } from '../components/ScrollToTop';
import { Search, Film, X, Flame, Star, Play, Calendar, SlidersHorizontal, Globe } from 'lucide-react';
import { tmdbApi, BROWSE_LABELS, SORT_LABELS, type SortOption } from '../services/tmdbApi';
import { BrowseCategory, Movie } from '../types/movie';
import { getLanguage, toLanguageOptions } from '../config/browse';
import { friendlyError } from '../utils/format';

const CATEGORIES = Object.keys(BROWSE_LABELS) as BrowseCategory[];

const CATEGORY_ICONS: Record<BrowseCategory, typeof Flame> = {
  popular: Film,
  trending: Flame,
  top_rated: Star,
  now_playing: Play,
  upcoming: Calendar
};

const SORT_OPTIONS = Object.keys(SORT_LABELS).map((value) => ({
  value,
  label: SORT_LABELS[value as SortOption]
}));

const LANGUAGE_OPTIONS = toLanguageOptions();

const CATEGORY_SORT: Record<BrowseCategory, SortOption> = {
  popular: 'popularity.desc',
  trending: 'popularity.desc',
  top_rated: 'vote_average.desc',
  now_playing: 'primary_release_date.desc',
  upcoming: 'primary_release_date.asc'
};

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const language = searchParams.get('lang') ?? '';
  const languageLabel = getLanguage(language).label;

  const [category, setCategory] = useState<BrowseCategory>('popular');
  const [sortBy, setSortBy] = useState<SortOption>('popularity.desc');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let data;

      if (searchQuery) {
        data = await tmdbApi.searchMovies(searchQuery, currentPage);
      } else if (language) {
        data = await tmdbApi.discoverMovies(
          {
            language,
            sortBy: category === 'popular' || category === 'trending' ? sortBy : CATEGORY_SORT[category],
            minVotes: category === 'top_rated' ? 500 : undefined
          },
          currentPage
        );
      } else {
        data = await tmdbApi.getMovies(category, currentPage);
      }

      setMovies(data.movies);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalResults);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError(friendlyError(err));
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [category, currentPage, language, searchQuery, sortBy]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (searchQuery || language) {
      setTrending([]);
      setTrendingLoading(false);
      return;
    }

    let active = true;
    setTrendingLoading(true);

    tmdbApi
      .getMovies('trending', 1)
      .then((data) => {
        if (active) setTrending(data.movies.slice(0, 16));
      })
      .catch((err) => console.error('Error fetching trending:', err))
      .finally(() => {
        if (active) setTrendingLoading(false);
      });

    return () => {
      active = false;
    };
  }, [searchQuery, language]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, language]);

  const handleCategoryChange = (next: BrowseCategory) => {
    setCategory(next);
    setSortBy(CATEGORY_SORT[next]);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearSearch = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('search');
    setSearchParams(next);
    setCurrentPage(1);
  };

  const handleLanguageChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set('lang', value);
    } else {
      next.delete('lang');
    }
    setSearchParams(next);
    setCurrentPage(1);
  };

  const activeLabel = BROWSE_LABELS[category];

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="relative">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative">
          {!searchQuery && (
            <>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg shadow-red-500/20">
                  {(() => {
                    const Icon = CATEGORY_ICONS[category];
                    return <Icon className="w-6 h-6 text-white" />;
                  })()}
                </div>
                <div className="min-w-0">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                    {language ? `${languageLabel} Movies` : `${activeLabel} Movies`}
                  </h1>
                  <p className="text-gray-400 mt-1">
                    {language
                      ? `Discover top ${languageLabel} movies`
                      : activeLabel === 'Trending'
                        ? 'What everyone is watching this week'
                        : `Discover the ${activeLabel.toLowerCase()} movies on TMDB`}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 mb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {CATEGORIES.map((item) => {
                  const Icon = CATEGORY_ICONS[item];
                  const isActive = item === category;
                  return (
                    <button
                      key={item}
                      onClick={() => handleCategoryChange(item)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200 border ${
                        isActive
                          ? 'bg-red-600 text-white border-red-500/40 shadow-lg shadow-red-500/20'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {BROWSE_LABELS[item]}
                    </button>
                  );
                })}
              </div>

              <div className="mb-8">
                <GenreRail />
              </div>

              {!language && (
                <div className="mb-12">
                  <MovieRow title="Trending This Week" movies={trending} loading={trendingLoading} />
                </div>
              )}

              <div className="flex flex-wrap items-end gap-4 mb-6 p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                <SelectMenu
                  label="Sort by"
                  value={sortBy}
                  options={SORT_OPTIONS}
                  onChange={handleSortChange}
                  icon={<SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />}
                  width="min-w-[220px] flex-1 sm:max-w-xs"
                />

                <SelectMenu
                  label="Language"
                  value={language}
                  options={LANGUAGE_OPTIONS}
                  onChange={handleLanguageChange}
                  searchable
                  icon={<Globe className="w-4 h-4 text-gray-400 shrink-0" />}
                  width="min-w-[200px] flex-1 sm:max-w-[240px]"
                />

                <p className="ml-auto text-sm text-gray-500 mb-2.5">
                  <span className="text-white font-semibold">
                    {totalResults.toLocaleString('en-US')}
                  </span>{' '}
                  movies
                </p>
              </div>
            </>
          )}

          {searchQuery && (
            <div className="flex items-start gap-4 mb-10">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Search Results</h1>
                <p className="text-gray-400">
                  Found <span className="text-white font-semibold">{totalResults.toLocaleString('en-US')}</span>{' '}
                  {totalResults === 1 ? 'movie' : 'movies'} for{' '}
                  <span className="text-red-400 font-semibold">"{searchQuery}"</span>
                </p>
                <button
                  onClick={handleClearSearch}
                  className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white
                           rounded-xl border border-white/5 transition-all duration-200 text-sm
                           inline-flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear search
                </button>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col justify-center items-center h-[50vh] gap-6"
              >
                <LoadingSpinner />
                <p className="text-gray-400">
                  {searchQuery ? 'Searching movies...' : `Loading ${activeLabel.toLowerCase()} movies...`}
                </p>
              </motion.div>
            ) : error ? (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ErrorState
                  title="Could not load movies"
                  message={friendlyError(error)}
                  onRetry={fetchMovies}
                />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MovieGrid
                  movies={movies}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <ScrollToTop />
    </div>
  );
};