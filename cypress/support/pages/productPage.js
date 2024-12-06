// cypress/support/pages/productPage.js
import el from '../elements'; // Certifique-se de que o caminho está correto
import { faker } from '@faker-js/faker';
import products from '../../fixtures/products.json';
import login from "../../fixtures/login.json";

class ProductPage {
  generateRandomProduct() {
    return {
      name: faker.commerce.productName(), // Gera um nome de produto aleatório
      price: '30', // Preço fixo, você pode ajustar conforme necessário
      description: products.description, // Descrição do produto vinda do fixture
      quantity: '1', // Quantidade fixa, ajuste conforme necessário
    };
  }

  visitProductRegistrationPage() {
    cy.visit('https://front.serverest.dev/');
    cy.get(el.emailInput).should("be.visible").type(login.email);
    cy.get(el.passwordInput).should("be.visible").type(login.password);
    cy.get(el.loginButton).should("be.visible").and("exist").click().should("not.exist");
    cy.get(el.registerProductButtonMenu).should('be.visible').click().should('not.exist');
    return this;
  }

  fillProductForm(product) {
    cy.get(el.nameInput).should('be.visible').type(product.name);
    cy.get(el.priceInput).should('be.visible').type(product.price);
    cy.get(el.descriptionInput).should('be.visible').type(product.description);
    cy.get(el.quantityInput).should('be.visible').type(product.quantity);
    return this;
  }

  attachProductImage(image) {
    cy.fixture('images/image.png', 'base64').then((imageContent) => {
      cy.get(el.imageFile).attachFile({
        fileContent: imageContent,
        fileName: 'image.png',
        mimeType: 'image/png',
      });
    });
    return this;
  }

  submitProductRegistration() {
    cy.get(el.registerProductButton).should('be.visible').click();
    return this;
  }

  verifyProductRegistrationSuccess() {
    cy.url().should('include', '/admin/listarprodutos');
    return this;
  }

  verifyRequiredFieldErrors() {
    cy.get(el.errorMessage).eq(0).should('contain.text', 'Nome é obrigatório');
    cy.get(el.errorMessage).eq(1).should('contain.text', 'Preco é obrigatório');
    cy.get(el.errorMessage).eq(2).should('contain.text', 'Descricao é obrigatório');
    cy.get(el.errorMessage).eq(3).should('contain.text', 'Quantidade é obrigatório');
    return this;
  }
}

export default new ProductPage();
