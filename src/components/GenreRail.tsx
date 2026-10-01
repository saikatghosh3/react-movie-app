import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Loader2 } from 'lucide-react';
import { Carousel } from './ui/Carousel';
import { tmdbApi } from '../services/tmdbApi';
import { genreIcon } from '../config/browse';
import { Genre } from '../types/movie';

interface GenreRailProps {
  activeGenreId?: number;
}

export const GenreRail = ({ activeGenreId }: GenreRailProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { genreId } = useParams();

  const active = activeGenreId ?? (genreId ? Number(genreId) : undefined);

  useEffect(() => {
    let mounted = true;
    tmdbApi
      .getGenres()
      .then((data) => {
        if (mounted) setGenres(data);
      })
      .catch((error) => console.error('Error loading genres:', error))
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const skeleton = useMemo(() => Array.from({ length: 10 }, (_, i) => i), []);

  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-3">Browse by Genre</h2>

      <Carousel ariaLabel="Genres" fadeEdges={false} className="py-1">
        {loading
          ? skeleton.map((i) => (
              <div
                key={i}
                className="shrink-0 w-28 h-9 rounded-full bg-white/5 animate-pulse"
              />
            ))
          : genres.map((genre) => {
              const isActive = active === genre.id;
              return (
                <button
                  key={genre.id}
                  onClick={() => navigate(`/genre/${genre.id}`)}
                  className={`shrink-0 snap-start inline-flex items-center gap-2 h-9 px-4 rounded-full
                              text-sm font-medium whitespace-nowrap border transition-all duration-200
                              ${
                                isActive
                                  ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-500/25'
                                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                              }`}
                >
                  <span className="text-base leading-none">{genreIcon(genre.id)}</span>
                  {genre.name}
                  {isActive && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
      </Carousel>
    </section>
  );
};

export const GenreRailSkeleton = () => (
  <div className="flex items-center gap-2 text-gray-500 text-sm">
    <Loader2 className="w-4 h-4 animate-spin" />
    Loading genres
  </div>
);