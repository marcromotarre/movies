// pages/index.js
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import useSWR from "swr";
import {
  createCast,
  createCrew,
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
    netflixMovies
      .forEach((netflixMovie, index) => {
        setTimeout(function () {
          const TMDB_API_KEY = "480ff227df49aaa3c76ea70d0462d207";
          const LANGUAGE = "es-ES";
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
                createNetflixMovieNotFound({
                  ...netflixMovie,
                  type: "NOT_FOUND",
                });
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

                    createMovie({
                      id: movie.id,
                      name: movie.title,
                      netflixMovieId: netflixMovie.id,
                      image: movie.poster_path,
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
                        id: 0,
                        movieCreditsId: movie.id,
                      }))
                    );

                    // directors

                    //movieDetailsResponse.genres

                    console.log("movie created");
                  });
              } else {
                createNetflixMovieNotFound({
                  ...netflixMovie,
                  type: "MORE_THAN_ONE",
                });
              }
            })
            .catch((error) => {});
        }, 100 * index);
      });
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

      <button onClick={() => _deleteMovies()}>Delete Movies</button>
      <Link href="/about">About</Link>
    </nav>
  );
}
