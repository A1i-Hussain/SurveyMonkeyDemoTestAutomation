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
