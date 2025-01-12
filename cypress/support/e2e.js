// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import LoginPage from "../pages/LoginPage";

// Import commands.js using ES2015 syntax:
import "./commands";
import registerCypressGrep from "@cypress/grep";
registerCypressGrep();

before(() => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
  });
});

beforeEach(() => {
  cy.visit(
    "/create/?sm=li_2B9c5g4tYUmTyRAs2aiT1Nm9OMrdd0DpvgBbYmadGI_3D&tbyb_collect=true",
  );
  cy.url().should("include", "login");

  const currentTestTitle = Cypress.currentTest.title;
  if (currentTestTitle.includes("cookie")) {
    return;
  }

  cy.get("h2[id='onetrust-policy-title']")
    .should("be.visible")
    .and("have.text", "We value your privacy");
  LoginPage.acceptCookieButton().click();
});
