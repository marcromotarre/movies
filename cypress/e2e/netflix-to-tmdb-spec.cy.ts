import { should } from "chai";
import { createStyleRegistry } from "styled-jsx";
import { createNetflixMovie } from "../../lib/mutations";
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

// important class = gallerySpinLoader

//netflix tiene 4368
describe.skip("empty spec", () => {
  it("Enter netflix", () => {
    // get all netflix movies
    cy.request("GET", "http://localhost:3002/api/netflix-movies").then(
      (response) => {
        let movies = [];
        movies = [...response.body];
        /*movies = [
          { id: 501, title: "El lobo de Wall Street", releaseYear: 2014 },
        ];*/
        movies.forEach((movie, index) => {
          const url = `https://api.themoviedb.org/3//search/movie?api_key=${TMDB_API_KEY}&language=${LANGUAGE}&page=1&query=el%20lobo%20de%20wall%20street!`;
          const TMDB_API_KEY = "480ff227df49aaa3c76ea70d0462d207";
          const LANGUAGE = "es-ES";
        });
      }
    );
  });
});

