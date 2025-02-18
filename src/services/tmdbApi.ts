import { TMDB_CONFIG } from '../config/tmdb';
import { Movie, MovieDetails } from '../types/movie';

const formatMovieResponse = (movie: any): Movie => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  posterPath: movie.poster_path 
    ? `${TMDB_CONFIG.IMAGE_BASE_URL}/${TMDB_CONFIG.POSTER_SIZE}${movie.poster_path}`
    : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80',
  backdropPath: movie.backdrop_path
    ? `${TMDB_CONFIG.IMAGE_BASE_URL}/${TMDB_CONFIG.BACKDROP_SIZE}${movie.backdrop_path}`
    : 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80',
  releaseDate: movie.release_date,
  voteAverage: movie.vote_average,
  genres: movie.genre_ids || movie.genres?.map((g: any) => g.name) || []
});

export const tmdbApi = {
  async getMovies(page = 1) {
    try {
      const response = await fetch(
        `${TMDB_CONFIG.BASE_URL}/movie/popular?api_key=${TMDB_CONFIG.API_KEY}&page=${page}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        movies: data.results.map(formatMovieResponse),
        totalPages: data.total_pages
      };
    } catch (error) {
      console.error('Error fetching movies:', error);
      return {
        movies: [],
        totalPages: 0
      };
    }
  },

  async getMoviesByGenre(genreId: number, page = 1) {
    try {
      const response = await fetch(
        `${TMDB_CONFIG.BASE_URL}/discover/movie?api_key=${TMDB_CONFIG.API_KEY}&with_genres=${genreId}&page=${page}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        movies: data.results.map(formatMovieResponse),
        totalPages: data.total_pages
      };
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      return {
        movies: [],
        totalPages: 0
      };
    }
  },

  async getMovieDetails(id: string): Promise<MovieDetails | null> {
    try {
      const response = await fetch(
        `${TMDB_CONFIG.BASE_URL}/movie/${id}?api_key=${TMDB_CONFIG.API_KEY}&append_to_response=credits,videos`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        ...formatMovieResponse(data),
        runtime: data.runtime,
        tagline: data.tagline,
        cast: data.credits.cast.slice(0, 10),
        videos: data.videos.results
      };
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  }
};