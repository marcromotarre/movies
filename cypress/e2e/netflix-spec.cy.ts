import { should } from "chai";
import { createStyleRegistry } from "styled-jsx";
import { createNetflixMovie } from "../../lib/mutations";
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

// important class = gallerySpinLoader
const DIRECTION = "za"
//netflix tiene 4368
describe("empty spec", () => {
  it("Enter netflix", () => {
    cy.intercept("POST", "*pathEvaluator*").as("pathEvaluators");

    // go to netflix
    cy.visit("https://www.netflix.com/");

    // accept policies
    cy.get('[data-uia="cookie-disclosure-button-accept"]').click();

    // go to login
    cy.get('[data-uia="header-login-link"]').click();

    // enter credentials
    cy.get('[data-uia="login-field+container"]').click();
    cy.get('[data-uia="login-field"]').type("marcromotarre@gmail.com");
    cy.get('[data-uia="password-field+container"]').click();
    cy.get('[data-uia="password-field"]').type("???????");
    cy.get('[data-uia="login-submit-button"]').click();

    // select profile
    cy.get(".profile-name").first().click();

    // go to list of movies
    cy.get(".tabbed-primary-navigation").children().eq(3).click();
    cy.get(".aro-grid-toggle").click();
    cy.get(".aro-grid").click();
    if(DIRECTION === "az") {
      cy.get(".sub-menu-list").children().eq(2).click();
    } else {
      cy.get(".sub-menu-list").children().eq(3).click();
    }

    scrollDownToBottomAndSaveMovies(0);
  });
});

const scrollDownToBottomAndSaveMovies = (counter) => {
  cy.get(".member-footer", { timeout: 60000 }).scrollIntoView();

  cy.wait("@pathEvaluators", { timeout: 60000 }).then(({ response }) => {
    const body = response?.body;
    if (body?.jsonGraph) {
      if (body?.jsonGraph?.genres) {
        if (body.jsonGraph.genres["34399"][DIRECTION]) {
          const movies = body.jsonGraph.genres["34399"][DIRECTION];
          const keys = Object.keys(movies);

          keys.forEach((key) => {
            const actual = movies[key];

            if (actual.itemSummary?.value) {
              const netflixMovie = actual.itemSummary.value;
              cy.request({
                method: "POST",
                url: "http://localhost:3002/api/netflix-movie/create",
                body: {
                  id: netflixMovie.id,
                  title: netflixMovie.title,
                  releaseYear: netflixMovie.releaseYear,
                  isPlayable: netflixMovie.availability.isPlayable,
                  searchIndex: parseInt(key),
                  orderQuery: DIRECTION,
                },
                failOnStatusCode: false,
              });
            }
          });
        }
      }
    }
  });
  if (counter < 1000) {
    scrollDownToBottomAndSaveMovies(counter + 1);
  }
};
