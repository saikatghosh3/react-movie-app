import { motion } from 'framer-motion';
import { MovieCard } from './MovieCard';
import { Movie } from '../types/movie';
import { Pagination } from './ui/Pagination';

interface MovieGridProps {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const MovieGrid = ({ movies, totalPages, currentPage, onPageChange }: MovieGridProps) => {
  return (
    <div className="space-y-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </motion.div>
      
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