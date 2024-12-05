// cypress/support/elements.js
export const loginPage = {
    emailInput: '[data-testid="email"]', // Seletor do campo de e-mail
    passwordInput: '[data-testid="senha"]', // Seletor do campo de senha
    loginButton: '[data-testid="entrar"]', // Botão de login
    errorMessage: '.alert span', // Mensagem de erro
    registerButton: '[data-testid="cadastrar"]'
};