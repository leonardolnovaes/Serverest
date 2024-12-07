// cypress/integration/register.spec.js
import registerPage from '../../support/pages/registerPage';
import login from '../../fixtures/login.json';

describe('Cadastro', () => {
  let user;

  beforeEach(() => {
    cy.generateRandomUser().then((generatedUser) => {
      user = generatedUser;
    });
    registerPage.visitRegistrationPage(); // Visita a página de cadastro
  });

  it('Validar a realização do cadastro com sucesso', () => {
    registerPage.fillRegistrationForm(user); // Preenche o formulário
    cy.intercept("**/produtos").as('waitProducts'); // Espera pela requisição de produtos
    registerPage.submitRegistration(); // Submete o cadastro
    cy.wait('@waitProducts'); // Aguarda a resposta
    registerPage.verifySuccessfulRegistration(); // Verifica o sucesso do cadastro
  });

  it('Validar a validação dos campos obrigatórios', () => {
    registerPage.submitRegistration() // Tenta submeter o formulário sem dados
    .verifyRequiredFieldErrors(); // Verifica os erros de campo obrigatório
  });

  it('Validar a mensagem de e-mail já sendo utilizado', () => {
    // Preenche o formulário com dados de login já existentes
    registerPage.fillRegistrationForm(login)
    .submitRegistration() // Submete o cadastro
    .verifyEmailInUseError(); // Verifica o erro de e-mail já utilizado
  });
});
