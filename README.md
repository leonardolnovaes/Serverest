# 🧪 Projeto de Testes Automatizados com Cypress

Olá! Este repositório foi desenvolvido como parte do processo seletivo para Mouts. Aqui você encontrará testes automatizados cobrindo cenários de **Frontend (E2E)** e **API**, utilizando **Cypress** como framework principal.

---

## 🛠️ Tecnologias utilizadas
- **Cypress**: Automação de testes end-to-end.
- **Allure Reports**: Geração de relatórios de execução.
- **GitHub Actions**: Configuração do CI/CD.
- **GitHub Pages**: Publicação dos relatórios de teste.

## 📂 Estrutura do Projeto

- **`cypress/e2e/frontend/`**: Contém os testes de interface da aplicação (E2E).  
- **`cypress/e2e/api/`**: Contém os testes dos endpoints da API.  
- **`cypress/fixtures/`**: Armazena dados mockados usados nos testes (ex.: usuários e produtos).  
- **`cypress/support/`**: Inclui comandos customizados e configurações globais do projeto.  

---

## 🚀 Como executar o projeto

### Pré-requisitos

Para rodar este projeto, você precisará de:
- **Node.js** instalado (recomendo a versão 16 ou superior).  
- Um terminal configurado para rodar comandos básicos.  

### Passos para execução

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/leonardolnovaes/Serverest.git
   cd Serverest

   ```
2. **Instale as dependências:**:
   ```bash
    npm install
   ```
3. **Rode os testes:**:
- Para rodar direto no terminal:
    ```bash
    npm run cy:run
    ```
- Para abrir a interface do Cypress e ver os testes acontecendo na sua frente:
    ```bash
    npm run cy:open
    ```

## 🎯 Cenários Cobertos

- **Login:** Testa o fluxo de autenticação de usuários existentes no sistema, garantindo funcionalidade para Frontend e API.  
- **Cadastro de Usuário:** Valida o fluxo de registro de novos usuários, abrangendo interações no Frontend e criação via API.  
- **Cadastro de Produto:** Garante que produtos podem ser cadastrados corretamente, tanto na interface Frontend quanto via API.

---

## 🌟 Diferenciais do Projeto
- **Organização:** Estrutura de pastas clara, separando Frontend e API, facilitando a manutenção e entendimento do projeto.  
- **Boas práticas:** Uso de comandos customizados, mocks e asserções claras nos testes, garantindo robustez e eficiência.  

---

## 🚀 CI/CD - GitHub Actions

Este projeto utiliza **GitHub Actions** para executar os testes e gerar relatórios automaticamente. Há suporte para testes do tipo **API** e **E2E**, que podem ser acionados manualmente via **Workflow Dispatch**.

### **Como disparar o Workflow Dispatch**
1. Acesse a aba **Actions** do repositório.
2. Escolha o workflow chamado **Run Cypress Tests**.
3. Clique em **Run Workflow**.
4. Selecione o tipo de teste:
   - `api`: Executa os testes de API.
   - `e2e`: Executa os testes de interface.
5. O workflow será iniciado, executando os testes e publicando os relatórios automaticamente.

---

## 📊 Relatórios Allure

Os relatórios são gerados automaticamente e disponibilizados via **GitHub Pages**.

### **Links para os relatórios**
- **API Tests**: [https://leonardolnovaes.github.io/Serverest/api](https://leonardolnovaes.github.io/Serverest/api)
- **E2E Tests**: [https://leonardolnovaes.github.io/Serverest/e2e](https://leonardolnovaes.github.io/Serverest/e2e)

---

## 🤝 Agradecimento

Agradeço pela oportunidade de demonstrar minhas habilidades e apresentar este projeto. Espero que os testes atendam às expectativas de qualidade e organização da equipe.  

Fico à disposição para esclarecer qualquer dúvida ou receber feedback.  

[**Leonardo Luiz de Novaes**]  
📧 **E-mail:** leonardoldenovaes@gmail.com
🔗 **LinkedIn:** [https://www.linkedin.com/in/leonardo-novaes-999140151/]
🔗 **GitHub:** [https://github.com/leonardolnovaes]
