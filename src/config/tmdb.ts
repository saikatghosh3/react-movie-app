export const TMDB_CONFIG = {
  API_KEY: import.meta.env.VITE_TMDB_API_KEY || '',
  ACCESS_TOKEN: import.meta.env.VITE_TMDB_ACCESS_TOKEN || '',
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  POSTER_SIZE: 'w500',
  PROFILE_SIZE: 'w185',
  BACKDROP_SIZE: 'w1280',
  LOGO_SIZE: 'w92'
};

const FALLBACK_POSTER =
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80';
const FALLBACK_BACKDROP =
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80';

export const FALLBACK_IMAGE = {
  poster: FALLBACK_POSTER,
  backdrop: FALLBACK_BACKDROP,
  profile: ''
};

export const imageUrl = (path: string | null | undefined, size: string): string => {
  if (!path) return '';
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
};