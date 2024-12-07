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
import "cypress-file-upload";
import "allure-cypress";
import { faker } from "@faker-js/faker";
const fs = require('fs'); // Importa o módulo File System

// cypress/support/commands.js

Cypress.Commands.add("realizeLoginAPI", (email, password) => {
  cy.request({
    method: "POST",
    url: "https://serverest.dev/login", // URL do login
    body: {
      email: email,
      password: password,
    },
    failOnStatusCode: false, // Não falha caso a resposta seja 4xx ou 5xx
  }).then((response) => {
    if (response.status === 401) {
      cy.log("Login falhou, criando novo usuário...");
      cy.generateRandomUser().then((user) => {
        cy.createUser(user).then((newUser) => {
          cy.saveUserToFixture("login", {
            email: newUser.email,
            password: newUser.password,
            name: newUser.name,
          });
          cy.realizeLoginAPI(newUser.email, newUser.password);
        });
      });
    } else if (response.status === 200) {
      cy.log("Login realizado com sucesso.");
      expect(response.body).to.have.property("authorization"); // Certifique-se de que o token foi retornado
      expect(response.body.message).to.eq("Login realizado com sucesso");
      Cypress.env("authToken", response.body.authorization); // Armazena o token no Cypress.env
    } else {
      throw new Error("Erro inesperado no login: " + response.status);
    }
  });
});

// Comando para criar um novo usuário via API
Cypress.Commands.add("createUser", (user) => {
  const newUser = {
    name: user.name, // Gera um nome de usuário único
    password: user.password,
    email: user.email,
  };
  return cy
    .request({
      method: "POST",
      url: "https://serverest.dev/usuarios", // Endpoint de registro
      body: {
        nome: newUser.name,
        email: newUser.email,
        password: newUser.password,
        administrador: "true",
      },
    })
    .then((response) => {
      if (response.status === 201) {
        cy.log("Novo usuário criado com sucesso.");
        expect(response.status).to.eq(201); // Status 201 para criação
        expect(response.body.message).to.eq("Cadastro realizado com sucesso");
        return cy.wrap(newUser)
      } else {
        throw new Error("Falha ao criar novo usuário.");
      }
    });
});

Cypress.Commands.add("generateRandomUser", () => {
  return cy.wrap({
    name: faker.person.fullName(), // Gera nome aleatório
    email: faker.internet.email(), // Gera email aleatório
    password: "password123", // Senha fixa ou aleatória
  });
});

Cypress.Commands.add("saveUserToFixture", (fileName, userData) => {
  const filePath = `cypress/fixtures/${fileName}.json`; // Caminho do arquivo
  
  
  // Lê o conteúdo existente do arquivo
  cy.readFile(filePath).then((existingData) => {
    const updatedData = { ...existingData, ...userData }; // Atualiza os dados existentes com os novos

    // Escreve os dados atualizados no arquivo
    cy.writeFile(filePath, updatedData)
  });
});