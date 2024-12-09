import login from "../../fixtures/login.json";

describe("API - Login", () => {
  it("Deve realizar login com sucesso", () => {
    cy.realizeLoginAPI(login.email, login.password);
  });

  it("Deve falhar ao tentar login com senha incorreta", () => {
    cy.request({
      method: "POST",
      url: "https://serverest.dev/login", // URL de login da API (substitua pela real)
      body: {
        email: login.email,
        password: "senhaIncorreta", // Senha incorreta
      },
      failOnStatusCode: false, // Não falha no código de status 4xx ou 5xx
    }).then((response) => {
      expect(response.status).to.eq(401); // O status para erro de login geralmente é 401 (não autorizado)
      expect(response.body).to.have.property(
        "message",
        "Email e/ou senha inválidos"
      ); // Verifique a mensagem de erro
    });
  });

  it("Validar a realização do login com falha (Usuário Inexistente)", () => {
    cy.request({
      method: "POST",
      url: "https://serverest.dev/login", // URL de login da API (substitua pela real)
      body: {
        email: login.incorrectEmail,
        password: login.password, // Senha incorreta
      },
      failOnStatusCode: false, // Não falha no código de status 4xx ou 5xx
    }).then((response) => {
      expect(response.status).to.eq(401); // O status para erro de login geralmente é 401 (não autorizado)
      expect(response.body).to.have.property(
        "message",
        "Email e/ou senha inválidos"
      ); // Verifique a mensagem de erro
    });
  });
});
