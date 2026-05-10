
import { motion } from 'framer-motion';
import { Star, Calendar, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm 
                   rounded-2xl overflow-hidden shadow-xl border border-white/10
                   group cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[2/3]">
          <motion.img
            src={movie.posterPath}
            alt={movie.title}
            className="w-full h-full object-cover"
            transition={{ duration: 0.4 }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent 
                        opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 
                        group-hover:opacity-100 transition-all duration-300">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center 
                       shadow-2xl shadow-red-500/50"
            >
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </motion.div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-black/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 
                       flex items-center gap-1.5 border border-white/10">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-white font-semibold text-xs">
              {movie.voteAverage?.toFixed(1) || 'N/A'}
            </span>
          </div>

          {/* Year Badge */}
          {movie.releaseDate && (
            <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 
                         flex items-center gap-1.5 border border-white/10">
              <Calendar className="w-3.5 h-3.5 text-red-400" />
              <span className="text-white font-semibold text-xs">
                {new Date(movie.releaseDate).getFullYear()}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-red-400 
                       transition-colors duration-300">
            {movie.title}
          </h3>
          
          <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
            {movie.overview}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="text-white font-semibold text-xs">
                {movie.voteAverage?.toFixed(1)}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {movie.genres?.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-0.5 text-[10px] font-medium rounded-full 
                           bg-white/5 text-gray-300 border border-white/5
                           group-hover:bg-red-500/10 group-hover:text-red-300 
                           group-hover:border-red-500/20 transition-all duration-300"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};