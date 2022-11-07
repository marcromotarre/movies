import { should } from "chai";
import { createStyleRegistry } from "styled-jsx";
import { createFilmaffinityMovie } from "../../lib/mutations";
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe.skip("empty spec", () => {
  it("Enter filmaffinity", () => {
    cy.visit(`https://www.filmaffinity.com/es/`);
    cy.get("button").contains("ACEPTO").click();
    cy.request("GET", "http://localhost:3002/api/movie").then(
      (response) => {
        let movies = [];
        movies = [...response.body];
        /*movies = [
          { id: 501, title: "El lobo de Wall Street", releaseYear: 2014 },
        ];*/
        movies.forEach((movie, index) => {
          fillMovieInfoAndSearch({ movie });
        });
      }
    );

    // go to filmaffinity movie site
    //cy.visit(`https://www.filmaffinity.com/es/film${ids[0]}.html`);
  });
  /*it("Enter filmaffinity", () => {
    cy.visit('http://localhost:3002/')
  });*/
});

const fillMovieInfoAndSearch = ({
  movie,
  searchByYear = true,
  actual = "",
}) => {
  cy.visit(`https://www.filmaffinity.com/es/advsearch`);
  let recalculatedYear = movie.releaseYear;
  let movieTitle = movie.name;

  if (actual === "INCREASE-ONE-YEAR") {
    recalculatedYear += 1;
  }
  if (actual === "INCREASE-ONE-YEAR") {
    recalculatedYear -= 1;
  }
  if (actual === "NO-SPECIAL-CHARACTERS") {
    movieTitle = movieTitle.replaceAll('¿','').replaceAll('?','').replaceAll(`!`,'').replaceAll('¡','')
  }
  cy.get("#text-option-container")
    .find("[name=stext]")
    .type(`${movieTitle}`, { force: true });
  if (searchByYear) {
    cy.get("[name=fromyear]").select(`${recalculatedYear}`, {
      force: true,
    });
    cy.get("[name=toyear]").select(`${recalculatedYear}`, {
      force: true,
    });
  }

  //cy.get("[value=director]").check({ force: true });
  cy.get("#adv-search-button").click({ force: true });
  cy.get("body").then(($body) => {
    // no results found
    if ($body.find("#adv-search-no-results").length) {
      if (actual === "") {
        if (movie.releaseYear === 2022) {
          fillMovieInfoAndSearch({
            movie,
            searchByYear: true,
            actual: "INCREASE-ONE-YEAR",
          });
        } else {
          fillMovieInfoAndSearch({
            movie,
            searchByYear: true,
            actual: "DECREASE-ONE-YEAR",
          });
        }
      } else if (actual === "INCREASE-ONE-YEAR") {
        fillMovieInfoAndSearch({
          movie,
          searchByYear: true,
          actual: "DECREASE-ONE-YEAR",
        });
      } else if (actual === "DECREASE-ONE-YEAR") {
        fillMovieInfoAndSearch({
          movie,
          searchByYear: false,
          actual: "NO-YEAR",
        });
      } else if (actual === "NO-YEAR") {
        fillMovieInfoAndSearch({
          movie,
          searchByYear: false,
          actual: "NO-SPECIAL-CHARACTERS",
        });
      } else if (actual === "NO-SPECIAL-CHARACTERS") {
        fillMovieInfoAndSearch({
          movie,
          searchByYear: false,
          actual: "LAST",
        });
      } else if (actual === "LAST") {
        cy.request(
          "POST",
          "http://localhost:3002/api/netflix-movie-not-found/create",
          movie
        );
      }
    } else {
      // enter to the movie
      saveMovieToFilmaffinityDatabase();
    }
  });
};

const saveMovieToFilmaffinityDatabase = () => {
  cy.get(".adv-search-result-wrapper")
    .children()
    .eq(1)
    .find(".mc-poster")
    .click();

  const movieInfo = {
    id: 0,
    name: "",
    rating: 0,
    votes: 0,
  };

  // get movie id
  cy.url().then((url) => {
    movieInfo.id = parseInt(url.split("es/film")[1].split(".htm")[0]);
  });

  // get movie spanish title
  cy.get("#main-title")
    .find("span")
    .invoke("text")
    .then((text) => {
      movieInfo.name = text.replace(/\s+$/, '');
    });

  cy.get("body").then(($body) => {
    if ($body.find("#movie-rat-avg").length) {
      // get movie rating
      cy.get("#movie-rat-avg")
        .invoke("text")
        .then((text) => {
          movieInfo.rating = parseFloat(text.replace(",", "."));
        });
      // get movie numvotes
      cy.get("#movie-count-rat")
        .find("span")
        .invoke("text")
        .then((text) => {
          movieInfo.votes = parseInt(text.replace(".", ""));
        });
    } else {
      movieInfo.votes = 0;
      movieInfo.rating = 0;
    }
  });

  cy.request(
    "POST",
    "http://localhost:3002/api/filmaffinity-movie/create",
    movieInfo
  );
};
