import { loginPage } from '../../support/elements';
import login from '../../fixtures/login.json'

describe('Login', () => {
  beforeEach('', () => {
    cy.visit('https://front.serverest.dev/')
  })
  it('Validar a realização do login com sucesso', () => {
    cy.get(loginPage.emailInput).should("be.visible").type(login.email)
    cy.get(loginPage.passwordInput).should("be.visible").type(login.password)
    cy.get(loginPage.loginButton).should("be.visible").and("exist").click().should("not.exist")
  })
  it('Validar a realização do login com falha (Senha Inválida)', () => {
    cy.get(loginPage.emailInput).should("be.visible").type(login.email)
    cy.get(loginPage.passwordInput).should("be.visible").type(login.incorrectPassword)
    cy.get(loginPage.loginButton).should("be.visible").click()
    cy.get(loginPage.errorMessage).should('contain.text', 'Email e/ou senha inválidos')
  })

  it('Validar a realização do login com falha (Usuário Inexistente)', () => {
    cy.get(loginPage.emailInput).should("be.visible").type(login.incorrectEmail)
    cy.get(loginPage.passwordInput).should("be.visible").type(login.password)
    cy.get(loginPage.loginButton).should("be.visible").click()
    cy.get(loginPage.errorMessage).should('contain.text', 'Email e/ou senha inválidos')
  })
})