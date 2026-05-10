import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { MovieGrid } from '../components/MovieGrid/MovieGrid';
import { tmdbApi } from '../services/tmdbApi';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ScrollToTop } from '../components/ScrollToTop';
import { Search, Film, TrendingUp, Sparkles } from 'lucide-react';

export const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let data;
        if (searchQuery) {
          data = await tmdbApi.searchMovies(searchQuery, currentPage);
        } else {
          data = await tmdbApi.getMovies(currentPage);
        }
        
        setMovies(data.movies || data.results || []);
        setTotalPages(data.totalPages || 1);
        
        if (data.totalResults === 0) {
          console.log('No movies found for:', searchQuery);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [currentPage, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      <main className="relative">
        {/* Hero Background Gradient */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-red-500/5 via-red-500/2 to-transparent pointer-events-none" />
        
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative">
          
          {/* Welcome Section - Only show when not searching */}
          <AnimatePresence>
            {!searchQuery && !loading && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-12"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg shadow-red-500/20">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white">
                      Popular Movies
                    </h1>
                    <p className="text-gray-400 mt-1">
                      Discover trending and popular movies
                    </p>
                  </div>
                </div>
                
                {/* Stats Bar */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                    <Film className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-300">
                      <span className="text-white font-semibold">{movies.length}</span> movies loaded
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">
                      Page <span className="text-white font-semibold">{currentPage}</span> of {Math.min(totalPages, 500)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Results Header */}
          <AnimatePresence>
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-12"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      Search Results
                    </h1>
                    <p className="text-gray-400 text-lg">
                      Found <span className="text-white font-semibold">{movies.length}</span> movies for{' '}
                      <span className="text-red-400 font-semibold">"{searchQuery}"</span>
                    </p>
                    
                    {/* Clear Search Button */}
                    <button
                      onClick={() => {
                        const url = new URL(window.location.href);
                        url.searchParams.delete('search');
                        window.history.pushState({}, '', url);
                        window.location.reload();
                      }}
                      className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white 
                               rounded-xl border border-white/5 transition-all duration-200 text-sm flex items-center gap-2"
                    >
                      ✕ Clear search
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col justify-center items-center h-[60vh] gap-6"
              >
                <LoadingSpinner />
                <div className="text-center">
                  <p className="text-gray-400 text-lg font-medium">
                    {searchQuery ? 'Searching movies...' : 'Loading movies...'}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {searchQuery ? 'Finding the best matches for you' : 'Fetching the latest releases'}
                  </p>
                </div>
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

          {/* No Results State */}
          {!loading && movies.length === 0 && searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
              <p className="text-gray-400 text-center max-w-md">
                We couldn't find any movies matching "{searchQuery}". Try different keywords or browse our popular movies.
              </p>
            </motion.div>
          )}
        </div>
      </main>
      
      <ScrollToTop />
    </div>
  );
};