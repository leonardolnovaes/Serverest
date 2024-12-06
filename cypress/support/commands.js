// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

// cypress/support/commands.js

Cypress.Commands.add('realizeLoginAPI', (email, password) => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login', // URL do login
      body: {
        email: email,
        password: password,
      },
    }).then((response) => {
      // Verifica se o login foi bem-sucedido e se a resposta contém o token
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('authorization'); // Verifica se o token está presente
      Cypress.env('authToken', response.body.authorization); // Armazena o token no Cypress.env
    });
  });
  