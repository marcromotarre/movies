// pages/index.js
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";
import {
  createFilmaffinityMovie,
  createNetflixMovie,
  getMovieByNameTMDB,
  getNetflixMovies,
} from "../lib/mutations";

export default function Home() {
  const TMDB_API_KEY = "480ff227df49aaa3c76ea70d0462d207";
  useEffect(() => {
    fetchPopular();
  }, []);

  Promise.all(promises).then(() => self.resultingFunction(self.files));

  const fetchPopular = async () => {
    let promises = [];
    const netflixMovies = await getNetflixMovies();

    netflixMovies.forEach(function (element) {
      promises.push(
        getSearchTMDB({
          search: netflixMovie.title,
          year: netflixMovie.releaseYear,
        })
          .then((response) => {
           debugger
          })
          .catch((error) => {
            console.log("Error: ", error);
          })
      );
    });
  };

  const createNewFilmaffinityMovie = () => {
    createNetflixMovieNotFound({
      id: 13,
      title: "This is the real shit",
      year: 2012,
    });
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
      <Link href="/about">About</Link>
    </nav>
  );
}
