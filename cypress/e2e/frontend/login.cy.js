import login from "../../fixtures/login.json";
import loginPage from "../../support/pages/loginPage";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("https://front.serverest.dev/");
    cy.realizeLoginAPI(login.email, login.password)
  });
  it("Validar a realização do login com sucesso", () => {
    loginPage.realizeLogin(login.email, login.password).verifySuccessfulLogin(login.name);
  });
  it("Validar a realização do login com falha (Senha Inválida)", () => {
    loginPage
      .realizeLogin(login.email, login.incorrectPassword)
      .verifyLoginError("Email e/ou senha inválidos");
  });

  it("Validar a realização do login com falha (Usuário Inexistente)", () => {
    loginPage
      .realizeLogin(login.incorrectEmail, login.password)
      .verifyLoginError("Email e/ou senha inválidos");
  });
});
