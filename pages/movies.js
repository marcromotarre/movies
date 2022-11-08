import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getMovies, getMoviesGallery, getNetflixMovies } from "../lib/mutations";

// pages/about.js
export default function About() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = async () => {
    const movies = await getMoviesGallery();
    setMovies(movies);
    console.log("loaded");
  };

  return (
    <div>
      <h1>Movies</h1>
      <ImageList
        sx={{ width: "100vW", height: "100vH" }}
        cols={2}
        rowHeight={"fit-content"}
      >
        {movies &&
          movies
            .filter((_) => _.image !== null)
            .filter((_, index) => index < 10)
            .map((movie) => (
              <ImageListItem key={movie.id}>
                <img
                  style={{ color: "red", borderRadius: "10px" }}
                  src={`https://www.themoviedb.org/t/p/w1280/${movie.image}`}
                  srcSet={`https://www.themoviedb.org/t/p/w1280/${movie.image}`}
                  alt={movie.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={"hola"}
                  subtitle={"item.author"}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${"item.title"}`}
                    ></IconButton>
                  }
                />
              </ImageListItem>
            ))}
      </ImageList>
    </div>
  );
}

//algoritmo bola de nieve
