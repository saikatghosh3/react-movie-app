import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { MovieGrid } from '../components/MovieGrid';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { tmdbApi } from '../services/tmdbApi';

export const GenrePage = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await tmdbApi.getMoviesByGenre(Number(genreId), currentPage);
        setMovies(data.movies);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (genreId) {
      fetchMovies();
    }
  }, [genreId, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <LoadingSpinner />
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