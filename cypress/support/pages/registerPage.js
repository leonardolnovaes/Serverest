// cypress/support/pages/registerPage.js
import el from "../elements"; // Certifique-se de que o caminho está correto
class RegisterPage {

  visitRegistrationPage() {
    cy.visit("https://front.serverest.dev/");
    cy.get(el.registerButton)
      .click()
      .url()
      .should("include", "/cadastrarusuarios");
    return this;
  }

  fillRegistrationForm(user) {
    cy.get(el.nameInput).should("be.visible").type(user.name);
    cy.get(el.emailInput).should("be.visible").type(user.email);
    cy.get(el.passwordInputRegister).should("be.visible").type("123456");
    return this;
  }

  submitRegistration() {
    cy.get(el.registerButton).should("be.visible").and("exist").click();
    return this;
  }

  verifySuccessfulRegistration() {
    cy.url().should("include", "/home");
    cy.get(el.registerButton).should("not.exist");
    return this;
  }

  verifyRequiredFieldErrors() {
    cy.get(el.errorMessage).eq(0).should("contain.text", "Nome é obrigatório");
    cy.get(el.errorMessage).eq(1).should("contain.text", "Email é obrigatório");
    cy.get(el.errorMessage)
      .eq(2)
      .should("contain.text", "Password é obrigatório");
    return this;
  }

  verifyEmailInUseError() {
    cy.get(el.errorMessage).should(
      "contain.text",
      "Este email já está sendo usado"
    );
    return this;
  }
}

export default new RegisterPage();
