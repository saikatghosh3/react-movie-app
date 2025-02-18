export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  genres: string[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  tagline: string;
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
  videos: {
    id: string;
    key: string;
    name: string;
    type: string;
  }[];
}

export interface Genre {
  id: number;
  name: string;
}