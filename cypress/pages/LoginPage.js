import BasePage from "./BasePage";
class LoginPage extends BasePage {
  acceptCookieButton = () => cy.get("button[id='onetrust-accept-btn-handler']");
  rejectCookieButton = () => cy.get("button[id='onetrust-reject-all-handler']");
  customiseCookieButton = () => cy.get("button[id='onetrust-pc-btn-handler']");
  cookiePrivacyNoticeLink = () =>
    cy.get("[data-testid='ot-banner-privacy-notice-link']");
  cookieNoticeLink = () => cy.get("[class='ot-cookie-policy-link']");
  userSignUpLink = () => cy.get("span:contains('Sign up')");
  userNameInput = () => cy.get("input[id='username']");
  submitButton = () => cy.get("button[type='submit']");
  userPasswordInput = () => cy.get("input[id='password']");
  singleSignOnLoginOption = () => cy.get("a[aria-label='Log in with SSO']");
  microSoftLoginOption = () => cy.get("a[aria-label='Log in with Microsoft']");
  faceBookLoginOption = () => cy.get("a[aria-label='Log in with Facebook']");
  linkedInLoginOption = () => cy.get("a[aria-label='Log in with LinkedIn']");
  googleLoginOption = () => cy.get("a[aria-label='Log in with Google']");
  appleLoginOption = () => cy.get("a[aria-label='Log in with Apple']");
  incorrectUserNameOrPassordResponse = () =>
    cy.get("[id='loginPasswordInputError']");

  VerifyCookieHeaderAndText() {
    cy.get("h2[id='onetrust-policy-title']")
      .should("be.visible")
      .and("have.text", "We value your privacy");

    cy.get("div[id='onetrust-policy-text']")
      .should("be.visible")
      .and(
        "have.text",
        "We and our third party partners may use cookies and similar technologies on this site to analyze usage, optimize our services, personalize content, tailor and measure ads and keep this site secure. Privacy NoticeCookies Notice",
      );
  }
  VerifyCookieNoticeLinks() {
    this.cookiePrivacyNoticeLink()
      .should("be.visible")
      .and(
        "have.attr",
        "href",
        "https://uk.surveymonkey.com/mp/legal/privacy/",
      );

    this.cookieNoticeLink()
      .should("be.visible")
      .and(
        "have.attr",
        "href",
        "https://uk.surveymonkey.com/mp/legal/cookies/",
      );
  }
  VerifyCookieButtons() {
    this.acceptCookieButton().should("be.visible").and("be.enabled");
    this.rejectCookieButton().should("be.visible").and("be.enabled");
    this.customiseCookieButton().should("be.visible").and("be.enabled");
  }

  VerifyTextAndButtonsOnLoginScreen() {
    cy.get("title:contains('SurveyMonkey Logo')")
      .parent("svg")
      .should("be.visible");

    cy.get(`div:contains("Don’t have")`)
      .last()
      .should("have.text", "Don’t have an account? Sign up")
      .and("be.visible");

    this.userSignUpLink()
      .parent()
      .should("have.attr", "href", "#/sign-up")
      .and("be.visible");

    cy.get("h1:contains('Log in')")
      .should("have.text", "Log in")
      .and("be.visible");

    this.submitButton()
      .should("have.text", "Next")
      .and("be.disabled")
      .and("be.visible");

    cy.get("span:contains('Or log in with')")
      .should("have.text", "Or log in with")
      .and("be.visible");

    this.singleSignOnLoginOption()
      .should("have.attr", "href", "#/login/sso")
      .and("be.visible");

    this.microSoftLoginOption()
      .should("be.visible")
      .invoke("attr", "href")
      .then((href) => {
        expect(href).to.include("windowslive");
      });

    this.faceBookLoginOption()
      .should("be.visible")
      .invoke("attr", "href")
      .then((href) => {
        expect(href).to.include("facebook");
      });

    this.linkedInLoginOption()
      .should("be.visible")
      .invoke("attr", "href")
      .then((href) => {
        expect(href).to.include("linkedin");
      });

    this.googleLoginOption()
      .should("be.visible")
      .invoke("attr", "href")
      .then((href) => {
        expect(href).to.include("google-oauth2");
      });

    this.appleLoginOption()
      .should("be.visible")
      .invoke("attr", "href")
      .then((href) => {
        expect(href).to.include("apple");
      });
  }

  Login(userName, password) {
    cy.intercept("POST", "https://www.surveymonkey.com/graphql").as(
      "loggedInUser",
    );
    this.userNameInput().clear().type(userName, { delay: 0 });
    this.submitButton()
      .should("have.text", "Next")
      .click()
      .then(() => {
        this.submitButton().should("have.text", "Log in").and("be.disabled");
        this.userPasswordInput().clear().type(password, { delay: 0 });
        this.submitButton().should("have.text", "Log in").click();
      });
  }
}

export default new LoginPage();
