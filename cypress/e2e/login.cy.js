import LoginPage from "../pages/LoginPage";
import UpgradePlanModal from "../modal/UpgradePlanModal";
describe("Verify user login journey", () => {
  it(
    "Verify user is presented with a cookie option upon accessing the login page",
    { tags: ["@Regression"] },
    () => {
      // When user navigates to the login page
      // Then user should see the correct cookie header and text
      LoginPage.VerifyCookieHeaderAndText();
      // And the correct links should be present for the cookie / privacy notices
      LoginPage.VerifyCookieNoticeLinks();
      // And buttons to accept / reject and customise the cookies should be available
      LoginPage.VerifyCookieButtons();
    },
  );

  it(
    "Verify I am able to login using valid user credentials",
    { tags: ["@Smoke", "@Regression"] },
    () => {
      // Given user is presented with the login screen
      LoginPage.VerifyTextAndButtonsOnLoginScreen();
      // When the user enters valid user name and password credentials
      LoginPage.Login(
        Cypress.env("validUserName"),
        Cypress.env("validPassword"),
      );
      UpgradePlanModal.navigateBackToSurveyOption().click();
      // Then I am able to succesfully login as the correct user
      cy.wait("@loggedInUser").then((interception) => {
        const responseBody = interception.response.body;
        const user = responseBody.find((item) => item.data.user);
        expect(user.data.user.email).to.equal(Cypress.env("validUserName"));
      });
    },
  );

  it(
    "Verify invalid username credential can not be used to gain access into user's account",
    { tags: ["@Regression"] },
    () => {
      cy.fixture("invalidUserNames.json").then((invalidUserNames) => {
        invalidUserNames.forEach((user) => {
          // Given user is presented with the login screen
          LoginPage.VerifyTextAndButtonsOnLoginScreen();
          // When the user enters an invalid user name however enters the correct password
          LoginPage.Login(user.username, Cypress.env("validPassword"));
          // Then the user is presented with an error message
          LoginPage.incorrectUserNameOrPassordResponse()
            .should("be.visible")
            .and("have.text", "Incorrect email or password, please try again.");
          cy.visit("/login");
        });
      });
    },
  );

  it(
    "Verify invalid password credential can not be used to gain access into user's account",
    { tags: ["@Regression"] },
    () => {
      // Given user is presented with the login screen
      LoginPage.VerifyTextAndButtonsOnLoginScreen();
      // When the user enters a valid user name and incorrect password
      LoginPage.Login(Cypress.env("validUserName"), "incorrectPassword");
      // Then the user is presented with an error message
      LoginPage.incorrectUserNameOrPassordResponse()
        .should("be.visible")
        .and("have.text", "Incorrect email or password, please try again.");
    },
  );
});
