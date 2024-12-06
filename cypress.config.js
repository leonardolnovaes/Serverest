const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-allure-plugin")(on, config); // Carrega o plugin Allure

      return config;
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}", // Caminho para os testes
    reporter: "cypress-allure-plugin", // Define o Allure como reporter
    reporterOptions: {
      outputDir: "allure-results", // Diretório onde os resultados dos testes serão salvos
    },
  },
});
