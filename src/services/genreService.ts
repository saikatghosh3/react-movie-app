import { TMDB_CONFIG } from '../config/tmdb';
import { Genre } from '../types/movie';

const FALLBACK_GENRES: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

let cachedGenres: Genre[] | null = null;
let inFlight: Promise<Genre[]> | null = null;

const fetchGenres = async (): Promise<Genre[]> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/genre/movie/list?api_key=${TMDB_CONFIG.API_KEY}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.genres) || data.genres.length === 0) {
      throw new Error('Empty genre payload');
    }
    return data.genres.map((genre: { id: number; name: string }) => ({
      id: genre.id,
      name: genre.name
    }));
  } catch (error) {
    console.warn('Falling back to static genre list:', error);
    return FALLBACK_GENRES;
  }
};

export const getGenres = async (): Promise<Genre[]> => {
  if (cachedGenres) return cachedGenres;
  if (!inFlight) {
    inFlight = fetchGenres().then((genres) => {
      cachedGenres = genres;
      inFlight = null;
      return genres;
    });
  }
  return inFlight;
};

export const getGenreMap = async (): Promise<Map<number, string>> => {
  const genres = await getGenres();
  return new Map(genres.map((genre) => [genre.id, genre.name]));
};

export const getGenreName = (genreId: number, genreMap: Map<number, string>): string => {
  return genreMap.get(genreId) ?? `Genre ${genreId}`;
};