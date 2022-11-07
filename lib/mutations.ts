import fetcher from "./fetcher";

export const createMovie = (body: { id: number; name: string }) => {
  return fetcher(`/api/movie/create`, body);
};

export const LinkNetflixMovie = (body: {
  id: number;
  name: string;
  netflixMovieId: number;
  image: string;
}) => {
  return fetcher(`/api/movie/create`, body);
};

export const createFilmaffinityMovie = (body: { id: number; name: string }) => {
  return fetcher(`/api/filmaffinity-movie/create`, body);
};

export const createNetflixMovie = (body: {
  id: number;
  title: string;
  releaseYear: number;
}) => {
  return fetcher(`/api/netflix-movie/create`, body);
};

export const createNetflixMovieNotFound = (body: {
  id: number;
  title: string;
  releaseYear: number;
}) => {
  return fetcher(`/api/netflix-movie-not-found/create`, body);
};

export const getNetflixMovies = () => {
  return fetcher(`/api/netflix-movies`);
};

export const getMovies = () => {
  return fetcher(`/api/movie`);
};

export const deleteMovies = () => {
  return fetcher(`/api/movie/delete`);
};

export const createCast = (body: any) => {
  return fetcher(`/api/cast/create`,body);
};


export const createCrew = (body: any) => {
  return fetcher(`/api/crew/create`,body);
};


export const createMovieCredits = (body: any) => {
  return fetcher(`/api/movie-credits/create`,body);
};

const TMDB_API_KEY = "480ff227df49aaa3c76ea70d0462d207";
const LANGUAGE = "es-ES";
export const getSearchTMDB = (params: { searchText: string; year: string }) => {
  const url = `https://api.themoviedb.org/3//search/movie?api_key=${TMDB_API_KEY}&language=${LANGUAGE}&page=1&query=${params.searchText}&year=${params.year}`;
  return fetcher(url);
};
