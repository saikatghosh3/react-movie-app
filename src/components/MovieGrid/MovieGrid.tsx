import { Movie } from '../../types/movie';
import { MovieCard } from './MovieCard';
import { Pagination } from '../ui/Pagination';

interface MovieGridProps {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const MovieGrid = ({ movies, totalPages, currentPage, onPageChange }: MovieGridProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      <div className="flex justify-center">
        <Pagination 
          totalPages={Math.min(totalPages, 500)}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};