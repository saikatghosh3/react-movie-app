import { Movie } from '../../types/movie';
import { MovieCard } from './MovieCard';
import { Pagination } from '../ui/Pagination';
import { Film } from 'lucide-react';

interface MovieGridProps {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const MovieGrid = ({ movies, totalPages, currentPage, onPageChange }: MovieGridProps) => {
  const cappedPages = Math.min(totalPages, 500);

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <Film className="w-10 h-10 text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
        <p className="text-gray-400 text-center max-w-md">
          We couldn&apos;t find anything to show. Try a different keyword or browse by category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>

      {cappedPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            totalPages={cappedPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};