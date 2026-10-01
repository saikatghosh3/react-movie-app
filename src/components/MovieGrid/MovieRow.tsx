import { motion } from 'framer-motion';
import { Movie } from '../../types/movie';
import { MovieCard } from './MovieCard';
import { Carousel } from '../ui/Carousel';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  loading?: boolean;
  emptyMessage?: string;
}

const CARD_WIDTH = 'w-[140px] sm:w-[165px] lg:w-[185px] xl:w-[200px] shrink-0 snap-start';

const SkeletonCard = () => (
  <div className={CARD_WIDTH}>
    <div className="aspect-[2/3] rounded-2xl bg-white/5 animate-pulse" />
    <div className="mt-3 h-3 w-3/4 rounded bg-white/5 animate-pulse" />
    <div className="mt-2 h-2.5 w-1/2 rounded bg-white/5 animate-pulse" />
  </div>
);

export const MovieRow = ({
  title,
  movies,
  loading = false,
  emptyMessage
}: MovieRowProps) => {
  if (!loading && movies.length === 0) {
    if (!emptyMessage) return null;
    return (
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-gray-500">{emptyMessage}</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-white">{title}</h2>

      <Carousel ariaLabel={title} className="py-1">
        {loading
          ? Array.from({ length: 10 }, (_, i) => <SkeletonCard key={i} />)
          : movies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
                className={CARD_WIDTH}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
      </Carousel>
    </section>
  );
};