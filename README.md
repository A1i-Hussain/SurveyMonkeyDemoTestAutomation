# Introduction

This project provides a demo of test automation for the login journey concerning survey monkey

# Getting Started

## 1. clone the repository

## 2. install project dependencies

```
npm i
```

## 3. update the `cypress.env.json` file in the root folder.

Copy the below and past into `cypress.env.json`. Usually this would be inserted via pipeline variable groups but for demo purpsoes use the following details:

```
{
    "baseUrl": "https://uk.surveymonkey.com",
    "validUserName": "alitest@inboxbear.com",
    "validPassword": "Test123@!"
}
```

> see cypress docs for further [info](https://docs.cypress.io/guides/guides/environment-variables#Option-2-cypressenvjson) on how to override / set env variables in CI

## 4. start the Cypress App UP in ordee to run a test file

```
npx cypress run
```

alternatively you can run all tests through the command line using the following scripts

```
    npm run executeAllSmokeTests
    npm run executeAllSmokeTestsCi
    npm run executeAllRegressionTests
    npm run executeAllRegressionTestsCi
```

# Perform end to end testing

The primary mechanism for a QA engineer to develop and execute the end to end tests is via the scripts: section.

The scripts may well evolve overtime as different requirements surface. However for the time being it is possible to run the
end to end tests locally providing that you are running the submissions site locally.

It is also possible to run the scripts against code that has been deployed into numerous hosted environments.

Dev - Development
QA - Qa or test
tr - Training
tt - Testing
pp - pre production

This is done by updating the values in the cypress.env.json file.

# Contribute

You may be required to add new page object model classes which contain simple selectors using cy.getBySel('') <- the data-testid='my-button'
along with some methods within the class which verify behaviour for cypress commands or within test blocks.

You may be required to create new end to end tests within the e2e folder.

You may be required to create new question sets within the questionSets folder.

You may be required to create new models within the models folder.

You may be required to create new support cypress commands within the support folder.

You may be required to create new fixture files within the fixtures folder.
