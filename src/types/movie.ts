export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profilePath: string;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profilePath: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  watchUrl: string;
}

export interface Collection {
  id: number;
  name: string;
  posterPath: string;
  backdropPath: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logoPath: string;
  originCountry: string;
}

export interface WatchProvider {
  providerName: string;
  logoPath: string;
  displayPriority: number;
}

export interface WatchProviderGroup {
  buy: WatchProvider[];
  rent: WatchProvider[];
  flatrate: WatchProvider[];
  link: string;
}

export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  originalLanguage: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  adult: boolean;
  video: boolean;
  genreIds: number[];
  genres: string[];
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  tagline: string;
  status: string;
  imdbId: string | null;
  homepage: string | null;
  budget: number;
  revenue: number;
  originCountry: string[];
  spokenLanguages: string[];
  belongsToCollection: Collection | null;
  productionCompanies: ProductionCompany[];
  cast: CastMember[];
  crew: CrewMember[];
  videos: Video[];
}

export interface Paginated<T> {
  movies: T[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

export interface SearchResult extends Movie {
  mediaType: 'movie' | 'tv' | 'person' | 'unknown';
}

export type BrowseCategory =
  | 'popular'
  | 'trending'
  | 'top_rated'
  | 'now_playing'
  | 'upcoming';