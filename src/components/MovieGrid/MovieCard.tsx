import { motion } from 'framer-motion';
import { Star, Calendar, Play, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/movie';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const formatVoteCount = (count: number): string => {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
};

export const MovieCard = ({ movie, index = 0 }: MovieCardProps) => {
  const isLowConfidence = movie.voteCount > 0 && movie.voteCount < 50;
  const hasRating = movie.voteCount > 0;

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <motion.article
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
        className="relative bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm
                   rounded-2xl overflow-hidden shadow-xl border border-white/10
                   group cursor-pointer h-full flex flex-col"
      >
        <div className="relative overflow-hidden aspect-[2/3]">
          <motion.img
            src={movie.posterPath}
            alt={movie.title}
            loading="lazy"
            className="w-full h-full object-cover"
            transition={{ duration: 0.4 }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent
                        opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

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

          {hasRating && (
            <div className="absolute top-3 right-3 bg-black/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5
                         flex items-center gap-1.5 border border-white/10">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="text-white font-semibold text-xs">
                {movie.voteAverage.toFixed(1)}
              </span>
            </div>
          )}

          {movie.releaseDate && (
            <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5
                         flex items-center gap-1.5 border border-white/10">
              <Calendar className="w-3.5 h-3.5 text-red-400" />
              <span className="text-white font-semibold text-xs">
                {new Date(movie.releaseDate).getFullYear()}
              </span>
            </div>
          )}

          {movie.video && (
            <div className="absolute bottom-3 left-3 bg-red-600/90 backdrop-blur-sm rounded-md px-2 py-1
                         text-[10px] font-bold uppercase tracking-wide text-white border border-white/10">
              Video
            </div>
          )}
        </div>

        <div className="p-4 space-y-2 flex flex-col flex-1">
          <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-red-400
                       transition-colors duration-300">
            {movie.title}
          </h3>

          {movie.originalLanguage && movie.originalLanguage !== 'en' && (
            <p className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">
              {movie.originalTitle !== movie.title ? movie.originalTitle : movie.originalLanguage}
            </p>
          )}

          <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed flex-1">
            {movie.overview}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div
              className="flex items-center gap-1"
              title={hasRating ? `${formatVoteCount(movie.voteCount)} votes` : 'Not enough votes'}
            >
              <Star
                className={`w-3.5 h-3.5 ${hasRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`}
              />
              <span
                className={`font-semibold text-xs ${
                  isLowConfidence ? 'text-gray-400' : 'text-white'
                }`}
              >
                {hasRating ? movie.voteAverage.toFixed(1) : 'NR'}
              </span>
              {hasRating && (
                <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                  <Users className="w-2.5 h-2.5" />
                  {formatVoteCount(movie.voteCount)}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1 justify-end">
              {movie.genres.slice(0, 2).map((genre) => (
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
      </motion.article>
    </Link>
  );
};