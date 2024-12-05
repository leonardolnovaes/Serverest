const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}', // Caminho para os testes
    setupNodeEvents(on, config) {
      // Configurações de eventos aqui, se necessário
    },
  },
});
