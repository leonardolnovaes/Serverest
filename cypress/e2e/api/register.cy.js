// cypress/integration/register.spec.js
import registerPage from '../../support/pages/registerPage';
import login from '../../fixtures/login.json';

describe('Cadastro', () => {
  let user;

  beforeEach(() => {
    cy.generateRandomUser().then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('Validar a realização do cadastro com sucesso', () => {
    cy.createUser(user)
  })
  it('Validar a validação dos campos obrigatórios', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: {
        nome: '',
        email: '',
        password: '',
        administrador: "false"
      },
      failOnStatusCode: false // Não falha caso a resposta seja 4xx ou 5xx
    }).then((response) => {
      // Verificando se o cadastro foi realizado com sucesso
      expect(response.status).to.eq(400); // Status 201 para criação
      expect(response.body.email).to.eq('email não pode ficar em branco');
      expect(response.body.nome).to.eq('nome não pode ficar em branco');
      expect(response.body.password).to.eq('password não pode ficar em branco');

    });
  });

  it('Validar a mensagem de e-mail já sendo utilizado', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios', // URL de cadastro (substitua pelo correto)
      body: {
        nome: user.name,
        email: login.email,
        password: login.password,
        administrador: "false"
      },
      failOnStatusCode: false // Não falha caso a resposta seja 4xx ou 5xx
    }).then((response) => {
      // Verificando se o cadastro foi realizado com sucesso
      expect(response.status).to.eq(400); // Status 201 para criação
      expect(response.body.message).to.eq('Este email já está sendo usado');
    });
  });
});
