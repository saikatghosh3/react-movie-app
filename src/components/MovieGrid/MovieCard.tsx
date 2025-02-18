import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg"
    >
      <Link to={`/movie/${movie.id}`}>
        <img
          src={movie.posterPath}
          alt={movie.title}
          className="w-full h-[400px] object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2">{movie.title}</h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {movie.overview}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-white">{movie.voteAverage.toFixed(1)}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {movie.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-1 text-xs rounded-full bg-primary-500/20 text-primary-300"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};