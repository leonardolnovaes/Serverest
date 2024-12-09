import el from "../elements";

class LoginPage {
  realizeLogin(email, password) {
    cy.get(el.emailInput)
      .should("be.visible")
      .and("have.attr", "placeholder", "Digite seu email")
      .type(email);
    cy.get(el.passwordInput)
      .should("be.visible")
      .and("have.attr", "placeholder", "Digite sua senha")
      .type(password);
    cy.intercept("**/usuarios").as("waitUser");
    cy.get(el.loginButton)
      .should("be.visible")
      .and("exist")
      .and("have.text", "Entrar")
      .click();
    cy.wait("@waitUser");
    return this;
  }

  verifyLoginError(errorMessage) {
    cy.get(el.errorMessage)
      .should("be.visible")
      .and("contain.text", errorMessage);
    return this;
  }

  verifySuccessfulLogin(name) {
    // Exemplo: verificar se a URL mudou após login
    cy.url().should("include", "/admin/home");
    cy.get("h1").should("contain.text", `Bem Vindo  ${name}`); // Verifica se o cabeçalho correto é exibido
    return this;
  }
  realizeLoginAPI(email, password) {
    cy.request({
      method: "POST",
      url: "https://serverest.dev/login", // URL de login da API (substitua pela real)
      body: {
        email: email,
        password: password,
      },
    }).then((response) => {
      return cy.wrap(response.body.authorization);
    });
  }
}

export default new LoginPage();
