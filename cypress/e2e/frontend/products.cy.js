// cypress/integration/product.spec.js
import productPage from "../../support/pages/productPage";

describe("Cadastro de Produto", () => {
  let product;

  beforeEach(() => {
    product = productPage.generateRandomProduct(); // Gera um produto aleatório
    productPage.visitProductRegistrationPage(); // Visita a página de cadastro de produto
  });

  it("Validar o cadastro do produto com sucesso", () => {
    productPage
      .fillProductForm(product) // Preenche o formulário com o produto gerado
      .attachProductImage("image.png") // Anexa a imagem do produto
      .submitProductRegistration() // Submete o formulário
      .verifyProductRegistrationSuccess(); // Verifica sucesso no cadastro
  });

  it("Validar a validação dos campos obrigatórios", () => {
    productPage
      .submitProductRegistration() // Tenta submeter o formulário sem dados
      .verifyRequiredFieldErrors(); // Verifica os erros de campo obrigatório
  });
});
