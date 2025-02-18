import { Movie } from '../types/movie';

// This would typically fetch from an API
export const getMovies = async (): Promise<Movie[]> => {
  return [
    {
      id: 1,
      title: "Inception",
      overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      posterPath: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80",
      releaseDate: "2010-07-16",
      voteAverage: 8.8,
      genres: ["Action", "Sci-Fi", "Thriller"]
    },
    {
      id: 2,
      title: "The Dark Knight",
      overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      posterPath: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80",
      releaseDate: "2008-07-18",
      voteAverage: 9.0,
      genres: ["Action", "Crime", "Drama"]
    }
  ];
};