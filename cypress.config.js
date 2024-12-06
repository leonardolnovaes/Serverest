const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);

      return config;
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}", // Caminho para os testes
    reporter: "cypress-allure-plugin", // Define o Allure como reporter
    reporterOptions: {
      outputDir: "allure-results", // Diretório onde os resultados dos testes serão salvos
    },
  },
});
