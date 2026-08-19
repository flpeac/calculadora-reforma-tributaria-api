# 🚀 API Automation: Calculadora de Reforma Tributária

[![CI - API Reforma Tributária & Cypress](https://github.com/flpeac/calculadora-reforma-tributaria-api/actions/workflows/ci.yml/badge.svg)](https://github.com/flpeac/calculadora-reforma-tributaria-api/actions/workflows/ci.yml)

Este projeto é um framework de automação de testes E2E desenvolvido para garantir a confiabilidade de uma API Node.js. O foco central não foi apenas a criação de testes, mas a **modelagem de qualidade** para regras fiscais complexas, aplicando conceitos de testes de contrato e integração contínua.

---

## 🧠 O Problema
O desafio central deste projeto foi validar cálculos tributários variáveis em uma API, garantindo que alterações na regra de negócio não quebrem a integridade dos dados nem o contrato esperado (schema). 

## 🛠 Escolhas Arquiteturais & Soluções
Para tornar o projeto escalável e de fácil manutenção, adotei as seguintes práticas:

*   **Arquitetura Modular:** Separei a camada de `services` (chamadas de API) dos arquivos de teste. Isso garante que, se o endpoint mudar, eu altero o serviço em um único lugar, não em múltiplos arquivos de teste.
*   **Testes de Contrato:** Validação rigorosa de *status codes* e estrutura de JSON. Isso evita "falsos positivos" onde o teste passa, mas a estrutura da API mudou, quebrando o consumo por outros sistemas.
*   **Pipeline de Qualidade:** Implementei CI/CD com GitHub Actions. Cada execução valida automaticamente o comportamento da API, garantindo que nenhuma regressão passe despercebida.

## 📈 Resultados Alcançados
*   **Escalabilidade:** Estrutura pronta para suportar novos cenários fiscais sem degradar a performance dos testes.
*   **Rastreabilidade:** Documentação completa (Mapa Mental e Casos de Teste) que conecta o requisito de negócio diretamente ao código de teste.
*   **Autonomia:** Ambiente configurado para permitir que qualquer pessoa entenda as regras fiscais mapeadas em minutos e valide a esteira em tempo real.

## 📚 Documentação e Artefatos (QA)
*   🧠 [Mapa Mental: Validações da API](docs/Doc_MapaMental.md)
*   📄 [Documentação de Casos de Teste - Contratos](docs/Doc_CasosDeTeste_API.md)
*   📄 [Documentação de Casos de Teste - Motor de Cálculo](docs/Doc_CasosDeTeste_C%C3%A1lculos.md)
*   🕷️ [Registro de Bugs](docs/Doc_Bugs.md)

---

## 💻 Tech Stack
*   **Test Runner:** Cypress
*   **API Client:** Node.js / Express
*   **CI/CD:** GitHub Actions
*   **Language:** JavaScript

---

## 🚀 Acesse a Esteira de Testes
Quer ver os testes rodando em tempo real na nuvem do GitHub? 
1. Acesse a aba <a href="https://github.com/flpeac/calculadora-reforma-tributaria-api/actions" target="_blank" rel="noopener noreferrer">GitHub Actions do Projeto</a>.
2. Se quiser disparar uma execução manual, basta clicar no botão **"Run workflow"**.

---

<details>
<summary><h3>⚙️ Como Rodar o Projeto Localmente</h3></summary>


## 📋 Pré-requisitos

* **Node.js**: Versão `v20.x` ou superior
* **npm**: Versão `10.x` ou superior
* **Git**: Para clonar o repositório


---


## ⚙️ Passo a Passo de Instalação e Configuração

### 1. Clonar o Repositório

**Abra o Terminal (CMD ou PowerShell):**
No seu teclado, aperte a tecla `Windows`, digite `cmd` (para o Prompt de Comando) ou `powershell` na barra de pesquisa e pressione `Enter` para abrir a tela do terminal.

Por padrão, o terminal abre na sua pasta de usuário principal. Para organizar e não perder os arquivos de vista, vamos salvar na área de trabalho. Digite o comando abaixo e aperte `Enter`:

```bash
cd Desktop
```

Faça o clone do repositório:

```bash
git clone https://github.com/flpeac/calculadora-reforma-tributaria-api
```

Entre na pasta do projeto clonado:

```bash
cd calculadora-reforma-tributaria-api
```

### 2. Instalar Dependências

Com o terminal dentro da pasta do projeto, instale os pacotes necessários:

```bash
npm install
npm install cypress --save-dev
```

---

## 🚀 Execução da Aplicação

Para iniciar o servidor da API localmente abra o PowerShell e digite o comando abaixo na pasta do projeto:

```bash
npm start
```

> **Nota:** Por padrão, a aplicação estará acessível em `http://localhost:3000`

---

## 🧪 Execução dos Testes Automatizados (Cypress)

### Opção 1: Interface Gráfica (Modo Interativo)

Acesse o **Visual Studio Code** e abra a pasta do projeto. 
Em seguida, clique no Menu **Terminal > Novo Terminal** ou pressione o atalho `Ctrl + Shift + '`.

Execute o comando abaixo:

```bash
npx cypress open
```

1. Selecione **E2E Testing**.
2. Escolha o navegador desejado (ex: Chrome ou Electron).
3. Clique em **Start E2E Testing**.
4. Clique em `api_reforma`.

Os testes serão devidamente executados visualmente.

### Opção 2: Modo Headless (Terminal)

Para rodar os testes ocultamente (ideal para rodar tudo de uma vez rapidamente), execute:

```bash
npx cypress run
```

---

## 📁 Estrutura do Projeto

```plaintext
calculadora-reforma-tributaria-api/
├── .github/
│   └── workflows/
│       └── ci.yml             # Pipeline de CI/CD (GitHub Actions)
├── cypress/
│   ├── e2e/ 
│   │   ├── calculos.cy.js     # Cenários de regras de negócio e fórmulas
│   │   └── contrato.cy.js     # Validações de status codes e exceções
│   └── support/ 
│       ├── services/          # Camada de serviço HTTP (API Client)
│       └── utils/             # Helpers e validadores customizados
├── server.js                  # Servidor Express da API
├── package.json               # Dependências e scripts
└── README.md                  # Documentação
```

---

## 📝 Scripts Úteis no `package.json`

Para facilitar, adicione estes atalhos no bloco `"scripts"` do seu arquivo `package.json`:

```json
"scripts": {
  "start": "node index.js",
  "cypress:open": "cypress open",
  "cypress:run": "cypress run"
}
```

Com isso feito, você poderá utilizar atalhos curtos no terminal:
* `npm run cypress:open` — Abre a interface gráfica.
* `npm run cypress:run` — Roda os testes no terminal.
