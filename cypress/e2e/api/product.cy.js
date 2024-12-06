// cypress/integration/product.spec.js

import login from '../../fixtures/login.json'; // Importando dados de login

describe('Cadastro de Produto (API)', () => {
  let product;

  beforeEach(() => {
    // Realiza o login via API e armazena o token no Cypress.env
    cy.realizeLoginAPI(login.email, login.password);

    // Gera um produto aleatório
    product = {
      name: 'Produto ' + Math.floor(Math.random() * 1000),
      price: 30,
      description: 'Descrição do produto ' + Math.floor(Math.random() * 1000),
      quantity: Math.floor(Math.random() * 100) + 1,
    };
  });

  it('Validar o cadastro do produto com sucesso (via API)', () => {
    const token = Cypress.env('authToken'); // Acessa o token armazenado no Cypress.env

    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos', // Endpoint para cadastro de produto
      body: {
        nome: product.name,
        preco: product.price,
        descricao: product.description,
        quantidade: product.quantity,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`, // Usando o token no cabeçalho
      },
    }).then((response) => {
      // Verifica que a resposta foi um sucesso (status 201)
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('message', "Cadastro realizado com sucesso");
    });
  });
  it("Validar a validação dos campos obrigatórios", () => {
    const token = Cypress.env('authToken'); // Acessa o token armazenado no Cypress.env

    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos', // Endpoint para cadastro de produto
      body: {
        nome: '',
        preco: '',
        descricao: '',
        quantidade: '',
      },
      failOnStatusCode: false ,// Não falha caso a resposta seja 4xx ou 5xx

      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`, // Usando o token no cabeçalho
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('descricao', "descricao não pode ficar em branco");
      expect(response.body).to.have.property('nome', "nome não pode ficar em branco");
      expect(response.body).to.have.property('preco', "preco deve ser um número");
      expect(response.body).to.have.property('quantidade', "quantidade deve ser um número");
    });
  });
});
