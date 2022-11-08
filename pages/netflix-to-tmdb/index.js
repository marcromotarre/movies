// pages/index.js
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import useSWR from "swr";
import {
  createCast,
  createCrew,
  createFilmaffinityMovie,
  createMovie,
  createMovieCredits,
  createNetflixMovieNotFound,
  deleteMovies,
  getMovies,
  getNetflixMovies,
  getSearchTMDB,
  LinkNetflixMovie,
} from "../../lib/mutations";

export default function Home() {
  // lets get all netflix movies

  // lets search into tmdb to get the movie
  const [onlyOne, setOnlyOne] = useState(false);
  const linkMovie = () => {
    LinkNetflixMovie({
      id: 456750,
      name: "Game Over, Man!",
      netflixMovieId: 80169617,
    });
  };

  const linkNetflixMoviesToTMDB = async () => {
    const netflixMovies = await getNetflixMovies();

    const TMDB_API_KEY = "480ff227df49aaa3c76ea70d0462d207";
    const LANGUAGE = "es-ES";

    for (let index = 0; index < netflixMovies.length; index++) {
      const netflixMovie = netflixMovies[index];
      const { data: movieSearch } = await axios(
        `https://api.themoviedb.org/3//search/movie?api_key=${TMDB_API_KEY}&language=${LANGUAGE}&page=1&query=${netflixMovie.title}&year=${netflixMovie.releaseYear}`
      );

      if (movieSearch.results.length > 0) {
        if (movieSearch.results.length === 1) {
          const movie = movieSearch.results[0];
          const { data: movieDetails } = await axios(
            ` https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=${LANGUAGE}`
          );
          const { data: credits } = await axios(
            ` https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${TMDB_API_KEY}&language=${LANGUAGE}`
          );
          createMovie({
            id: movie.id,
            name: movie.title,
            netflixMovieId: netflixMovie.id,
            image: movie.poster_path,
            year: parseInt(movieDetails.release_date.split("-")[0]),
          });
          createMovieCredits({ movieId: movie.id });

          const { cast, crew } = credits;
          createCast(
            cast.map((c) => ({
              ...c,
              person_id: c.id,
              movieCreditsId: movie.id,
            }))
          );
          createCrew(
            crew.map((c) => ({
              ...c,
              movieCreditsId: movie.id,
            }))
          );
        } else {
          createNetflixMovieNotFound({
            ...netflixMovie,
            type: "MORE_THAN_ONE",
          });
        }
      } else {
        createNetflixMovieNotFound({
          ...netflixMovie,
          type: "NOT_FOUND",
        });
      }
    }

    /* netflixMovies.forEach((netflixMovie, index) => {
      setTimeout(function () {
        fetch(
          `https://api.themoviedb.org/3//search/movie?api_key=${TMDB_API_KEY}&language=${LANGUAGE}&page=1&query=${netflixMovie.title}&year=${netflixMovie.releaseYear}`
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Something went wrong");
          })
          .then((responseJson) => {
            if (responseJson.results.length === 0) {
              console.log("movie not found");
            } else if (responseJson.results.length === 1) {
              const movie = responseJson.results[0];
              fetch(
                ` https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${TMDB_API_KEY}&language=${LANGUAGE}`
              )
                .then((response) => {
                  if (response.ok) {
                    return response.json();
                  }
                  throw new Error("Something went wrong");
                })
                .then((movieDetailsResponse) => {
                  console.log(movieDetailsResponse);
                  debugger;
                  createMovie({
                    id: movie.id,
                    name: movie.title,
                    netflixMovieId: netflixMovie.id,
                    image: movie.poster_path,
                    year: parseInt(movie.releaseYear.split("-")[0]),
                  });

                  createMovieCredits({ movieId: movie.id });
                  // actors
                  const { cast, crew } = movieDetailsResponse;
                  createCast(
                    cast.map((c) => ({
                      ...c,
                      person_id: c.id,
                      movieCreditsId: movie.id,
                    }))
                  );
                  createCrew(
                    crew.map((c) => ({
                      ...c,
                      movieCreditsId: movie.id,
                    }))
                  );

                  // directors

                  //movieDetailsResponse.genres

                  console.log("movie created");
                });
            } else {
            }
          })
          .catch((error) => {});
      }, 100 * index);
    });*/
  };

  const fetchPopular = async () => {
    let promises = [];

    const TMDB_API_KEY = "480ff227df49aaa3c76ea70d0462d207";
    const LANGUAGE = "es-ES";

    //for (const netflixMovie of netflixMovies) {

    /*const contents = 
      await setTimeout(() => {  console.log("World!"); }, 5000);*/
  };

  const createNewFilmaffinityMovie = () => {
    createNetflixMovieNotFound({
      id: 13,
      title: "This is the real shit",
      year: 2012,
    });
  };

  const _deleteMovies = () => {
    deleteMovies();
  };

  const getAllNetflixMovies = () => {
    getNetflixMovies();
  };

  const createFilmaffinity = () => {
    createFilmaffinityMovie({
      id: 203,
      rating: 2,
      votes: 130,
      name: "daaa",
      movie: { id: 6957 },
    });
  };

  return (
    <nav>
      <button onClick={() => getAllNetflixMovies()}>
        Get All Netlix Movies
      </button>
      <button onClick={() => createNewFilmaffinityMovie()}>
        ADD new movie
      </button>

      <button onClick={() => linkNetflixMoviesToTMDB()}>
        link Netflix Movies To TMDB
      </button>

      <button onClick={() => createFilmaffinity()}>CreateFilmaffinity</button>

      <button onClick={() => _deleteMovies()}>Delete Movies</button>
      <Link href="/about">About</Link>
    </nav>
  );
}
