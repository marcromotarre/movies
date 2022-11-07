import { ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getMovies, getNetflixMovies } from "../lib/mutations";

// pages/about.js
export default function About() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = async () => {
    const movies = await getMovies();
    setMovies(movies);
    console.log("loaded");
  };

  return (
    <div>
      <h1>Movies</h1>
      <ImageList
        sx={{ width: "100vW", height: "100vH" }}
        cols={10}
        rowHeight={"fit-content"}
      >
        {movies &&
          movies
            .filter((_) => _.image !== null)
            .filter((_, index) => index < 100)
            .map((movie) => (
              <ImageListItem key={movie.id}>
                <img
                  src={`https://www.themoviedb.org/t/p/w1280/${movie.image}`}
                  srcSet={`https://www.themoviedb.org/t/p/w1280/${movie.image}`}
                  alt={movie.name}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
      </ImageList>
    </div>
  );
}

//algoritmo bola de nieve