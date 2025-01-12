const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    failOnStatusCode: false,
    defaultCommandTimeout: 15000,
    setupNodeEvents(on, config) {
      const baseUrl = config.env.baseUrl ?? null;

      if (baseUrl) {
        config.baseUrl = baseUrl;
      }

      return config;
    },
  },
  env: {
    grepOmitFiltered: true,
  },
});
