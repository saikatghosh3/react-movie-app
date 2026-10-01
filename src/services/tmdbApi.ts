import { FALLBACK_IMAGE, TMDB_CONFIG, imageUrl } from '../config/tmdb';
import {
  BrowseCategory,
  CastMember,
  Collection,
  CrewMember,
  Genre,
  Movie,
  MovieDetails,
  Paginated,
  ProductionCompany,
  SearchResult,
  Video,
  WatchProvider,
  WatchProviderGroup
} from '../types/movie';
import { getGenreMap } from './genreService';

export class TmdbApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'TmdbApiError';
    this.status = status;
  }
}

const request = async <T>(path: string, params: Record<string, string | number> = {}): Promise<T> => {
  const search = new URLSearchParams({
    api_key: TMDB_CONFIG.API_KEY,
    language: 'en-US'
  });

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    search.set(key, String(value));
  });

  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${path}?${search.toString()}`);

  if (!response.ok) {
    throw new TmdbApiError(`TMDB request failed: ${path}`, response.status);
  }

  return (await response.json()) as T;
};

const posterOf = (path: string | null): string =>
  path ? imageUrl(path, TMDB_CONFIG.POSTER_SIZE) : FALLBACK_IMAGE.poster;

const backdropOf = (path: string | null): string =>
  path ? imageUrl(path, TMDB_CONFIG.BACKDROP_SIZE) : FALLBACK_IMAGE.backdrop;

interface RawMovie {
  id: number;
  title?: string;
  original_title?: string;
  original_language?: string;
  overview?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  adult?: boolean;
  video?: boolean;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
}

const formatMovie = (raw: RawMovie, genreMap: Map<number, string>): Movie => {
  const genreIds = raw.genre_ids ?? raw.genres?.map((genre) => genre.id) ?? [];

  return {
    id: raw.id,
    title: raw.title || raw.original_title || 'Untitled',
    originalTitle: raw.original_title || raw.title || '',
    originalLanguage: raw.original_language || '',
    overview: raw.overview || '',
    posterPath: posterOf(raw.poster_path),
    backdropPath: backdropOf(raw.backdrop_path),
    releaseDate: raw.release_date || '',
    voteAverage: raw.vote_average ?? 0,
    voteCount: raw.vote_count ?? 0,
    popularity: raw.popularity ?? 0,
    adult: raw.adult ?? false,
    video: raw.video ?? false,
    genreIds,
    genres: genreIds.map((id) => genreMap.get(id) ?? `Genre ${id}`)
  };
};

interface RawVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

const VIDEO_PRIORITY: Record<string, number> = {
  Trailer: 0,
  Teaser: 1,
  Clip: 2,
  Featurette: 3,
  Behind: 4,
  'Behind the Scenes': 4,
  Interview: 5,
  Opening: 6,
  Recap: 7,
  Bloopers: 8
};

const formatVideos = (results: RawVideo[] = []): Video[] =>
  results
    .filter((video) => video.site === 'YouTube' && !!video.key)
    .sort((a, b) => {
      const typeDiff =
        (VIDEO_PRIORITY[a.type] ?? 9) - (VIDEO_PRIORITY[b.type] ?? 9);
      if (typeDiff !== 0) return typeDiff;
      if (a.official !== b.official) return a.official ? -1 : 1;
      return 0;
    })
    .map((video) => ({
      id: video.id,
      key: video.key,
      name: video.name,
      site: video.site,
      type: video.type,
      official: video.official,
      watchUrl: `https://www.youtube.com/watch?v=${video.key}`
    }));

const formatCast = (cast: RawCast[] = []): CastMember[] =>
  cast
    .slice(0, 20)
    .map((member) => ({
      id: member.id,
      name: member.name,
      character: member.character || '',
      profilePath: imageUrl(member.profile_path, TMDB_CONFIG.PROFILE_SIZE),
      order: member.order ?? 0
    }));

interface RawCast {
  id: number;
  name: string;
  character?: string;
  profile_path: string | null;
  order?: number;
}

const KEY_CREW_JOBS = new Set(['Director', 'Writer', 'Screenplay', 'Story', 'Producer']);

const formatCrew = (crew: RawCrew[] = []): CrewMember[] =>
  crew
    .filter((member) => KEY_CREW_JOBS.has(member.job))
    .map((member) => ({
      id: member.id,
      name: member.name,
      job: member.job,
      department: member.department,
      profilePath: imageUrl(member.profile_path, TMDB_CONFIG.PROFILE_SIZE)
    }));

interface RawCrew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

const formatCollection = (collection?: RawCollection): Collection | null => {
  if (!collection?.id) return null;
  return {
    id: collection.id,
    name: collection.name,
    posterPath: posterOf(collection.poster_path),
    backdropPath: backdropOf(collection.backdrop_path)
  };
};

interface RawCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

interface RawCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

const formatCompanies = (companies: RawCompany[] = []): ProductionCompany[] =>
  companies.map((company) => ({
    id: company.id,
    name: company.name,
    logoPath: imageUrl(company.logo_path, TMDB_CONFIG.LOGO_SIZE),
    originCountry: company.origin_country
  }));

interface RawDetails extends RawMovie {
  belongs_to_collection?: RawCollection | null;
  production_companies?: RawCompany[];
  credits?: { cast?: RawCast[]; crew?: RawCrew[] };
  videos?: { results?: RawVideo[] };
  runtime?: number | null;
  tagline?: string;
  status?: string;
  imdb_id?: string | null;
  homepage?: string | null;
  budget?: number;
  revenue?: number;
  origin_country?: string[];
  spoken_languages?: { name: string }[];
}

interface RawMultiResult extends RawMovie {
  media_type?: 'movie' | 'tv' | 'person';
}

interface RawListResponse {
  page: number;
  results: RawMovie[];
  total_pages: number;
  total_results: number;
}

interface RawMultiResponse {
  page: number;
  results: RawMultiResult[];
  total_pages: number;
  total_results: number;
}

const BROWSE_PATHS: Record<BrowseCategory, string> = {
  popular: '/movie/popular',
  trending: '/trending/movie/week',
  top_rated: '/movie/top_rated',
  now_playing: '/movie/now_playing',
  upcoming: '/movie/upcoming'
};

export const BROWSE_LABELS: Record<BrowseCategory, string> = {
  popular: 'Popular',
  trending: 'Trending',
  top_rated: 'Top Rated',
  now_playing: 'Now Playing',
  upcoming: 'Upcoming'
};

export type SortOption =
  | 'popularity.desc'
  | 'vote_average.desc'
  | 'primary_release_date.desc'
  | 'primary_release_date.asc'
  | 'title.asc'
  | 'revenue.desc';

export const SORT_LABELS: Record<SortOption, string> = {
  'popularity.desc': 'Most Popular',
  'vote_average.desc': 'Highest Rated',
  'revenue.desc': 'Highest Grossing',
  'primary_release_date.desc': 'Newest First',
  'primary_release_date.asc': 'Oldest First',
  'title.asc': 'A-Z'
};

interface RawWatchEntry {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
  display_priority?: number;
}

interface RawWatchRegion {
  link?: string;
  flatrate?: RawWatchEntry[];
  rent?: RawWatchEntry[];
  buy?: RawWatchEntry[];
}

interface RawWatchResponse {
  id: number;
  results: Record<string, RawWatchRegion>;
}

export const WATCH_REGION = { code: 'IN', label: 'India' } as const;

export const tmdbApi = {
  getGenres: async (): Promise<Genre[]> => {
    const genreMap = await getGenreMap();
    return Array.from(genreMap.entries()).map(([id, name]) => ({ id, name }));
  },

  getMovies: async (category: BrowseCategory = 'popular', page = 1): Promise<Paginated<Movie>> => {
    const [data, genreMap] = await Promise.all([
      request<RawListResponse>(BROWSE_PATHS[category], { page }),
      getGenreMap()
    ]);

    return {
      movies: data.results.map((movie) => formatMovie(movie, genreMap)),
      currentPage: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results
    };
  },

  searchMovies: async (query: string, page = 1): Promise<Paginated<Movie>> => {
    const [data, genreMap] = await Promise.all([
      request<RawListResponse>('/search/movie', { query, page }),
      getGenreMap()
    ]);

    return {
      movies: data.results.map((movie) => formatMovie(movie, genreMap)),
      currentPage: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results
    };
  },

  searchMulti: async (query: string, page = 1): Promise<Paginated<SearchResult>> => {
    const [data, genreMap] = await Promise.all([
      request<RawMultiResponse>('/search/multi', { query, page, include_adult: 'false' }),
      getGenreMap()
    ]);

    const movies = data.results
      .filter((item) => item.media_type !== 'person')
      .map((item) => ({
        ...formatMovie(item, genreMap),
        mediaType: item.media_type ?? 'unknown'
      }));

    return {
      movies,
      currentPage: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results
    };
  },

  discoverMovies: async (
    params: {
      genreIds?: number[];
      sortBy?: SortOption;
      year?: number;
      minVotes?: number;
      language?: string;
    } = {},
    page = 1
  ): Promise<Paginated<Movie>> => {
    const [data, genreMap] = await Promise.all([
      request<RawListResponse>('/discover/movie', {
        page,
        'with_genres': params.genreIds?.join(',') || undefined,
        'sort_by': params.sortBy ?? 'popularity.desc',
        'primary_release_year': params.year,
        'vote_count.gte': params.minVotes,
        'with_original_language': params.language,
        'include_adult': 'false'
      }),
      getGenreMap()
    ]);

    return {
      movies: data.results.map((movie) => formatMovie(movie, genreMap)),
      currentPage: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results
    };
  },

  getMoviesByGenre: async (genreId: number, page = 1): Promise<Paginated<Movie>> =>
    tmdbApi.discoverMovies({ genreIds: [genreId] }, page),

  getMovieDetails: async (id: string | number): Promise<MovieDetails> => {
    const [data, genreMap] = await Promise.all([
      request<RawDetails>('/movie/' + id, { append_to_response: 'credits,videos,external_ids' }),
      getGenreMap()
    ]);

    return {
      ...formatMovie(data, genreMap),
      runtime: data.runtime ?? null,
      tagline: data.tagline || '',
      status: data.status || '',
      imdbId: data.imdb_id || null,
      homepage: data.homepage || null,
      budget: data.budget ?? 0,
      revenue: data.revenue ?? 0,
      originCountry: data.origin_country ?? [],
      spokenLanguages: (data.spoken_languages ?? []).map((lang: { name: string }) => lang.name),
      belongsToCollection: formatCollection(data.belongs_to_collection),
      productionCompanies: formatCompanies(data.production_companies),
      cast: formatCast(data.credits?.cast),
      crew: formatCrew(data.credits?.crew),
      videos: formatVideos(data.videos?.results)
    };
  },

  getSimilarMovies: async (id: string | number, page = 1): Promise<Paginated<Movie>> => {
    const [data, genreMap] = await Promise.all([
      request<RawListResponse>(`/movie/${id}/similar`, { page }),
      getGenreMap()
    ]);

    return {
      movies: data.results.map((movie) => formatMovie(movie, genreMap)),
      currentPage: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results
    };
  },

  getRecommendations: async (id: string | number, page = 1): Promise<Paginated<Movie>> => {
    const [data, genreMap] = await Promise.all([
      request<RawListResponse>(`/movie/${id}/recommendations`, { page }),
      getGenreMap()
    ]);

    return {
      movies: data.results.map((movie) => formatMovie(movie, genreMap)),
      currentPage: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results
    };
  },

  getWatchProviders: async (
    id: string | number,
    region = WATCH_REGION.code
  ): Promise<WatchProviderGroup | null> => {
    const data = await request<RawWatchResponse>(`/movie/${id}/watch/providers`);
    const regionData = data?.results?.[region];

    if (!regionData) return null;

    const collect = (list: RawWatchEntry[] = []): WatchProvider[] =>
      list.map((entry) => ({
        providerName: entry.provider_name,
        logoPath: imageUrl(entry.logo_path, TMDB_CONFIG.LOGO_SIZE),
        displayPriority: entry.display_priority ?? 99
      }));

    const flatrate = collect(regionData.flatrate);
    const rent = collect(regionData.rent);
    const buy = collect(regionData.buy);

    if (flatrate.length === 0 && rent.length === 0 && buy.length === 0) return null;

    return { flatrate, rent, buy, link: regionData.link || '' };
  }
};