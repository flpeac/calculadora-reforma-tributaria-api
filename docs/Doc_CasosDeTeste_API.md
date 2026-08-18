# 📄 Documentação de Casos de Teste - Contratos e Status de API

Esta documentação detalha as validações de status codes, contratos e tratamento de exceções básicas da API da Reforma Tributária.

---

### 📌 Cenário: Status 200 - Sucesso Básico

**Objetivo:** Validar se a API está rodando corretamente, respondendo com status 200 e tempo de resposta aceitável para requisições válidas.

**Pré-Requisitos:**
* **Ambiente:** Node.js instalado na máquina.
* **Serviço em Execução:** A API ativa localmente (`http://localhost:3000`).

---

<table>
  <tr>
    <th width="50%">📋 Passo a Passo</th>
    <th width="50%">🥒 Gherkin (BDD)</th>
  </tr>
  <tr>
    <td valign="top">
      <br>
      <b>1.</b> Iniciar a execução da API localmente.<br><br>
      <b>2.</b> Através do Cypress (no arquivo <code>contrato.cy.js</code>), enviar uma requisição POST para <code>/api/calcular-tributos</code> com um payload válido (cenario 'padrao', pVenda: 100, cbs: 1, ibs: 1).<br><br>
      <b>3.</b> Aguardar a resposta do servidor.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>O servidor deve retornar o Status Code 200 (OK).</li>
        <li>O tempo de resposta (duration) deve ser inferior a 500ms.</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Disponibilidade e Sucesso Básico (Health/API)<br>
      &emsp;&emsp;Como um analista de testes<br>
      &emsp;&emsp;Quero enviar uma requisição válida para a API<br>
      &emsp;&emsp;Para validar se o serviço responde com sucesso e baixa latência<br>
      <br>
      <b>Cenário:</b> Status 200 - Sucesso Básico<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa em "http://localhost:3000"<br>
      &emsp;&emsp;<b>Quando</b> eu enviar um POST com dados válidos de cálculo<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o Status Code 200<br>
      &emsp;&emsp;<b>E</b> o tempo de resposta deve ser menor que 500ms<br>
    </td>
  </tr>
</table>

---

### 📌 Cenário: Status 400 - Bad Request por Ausência de Dados

**Objetivo:** Validar o contrato da API ao enviar uma requisição omitindo dados obrigatórios fundamentais (como o campo `cenario`).

**Pré-Requisitos:** Servidor ativo em `http://localhost:3000`.

---

<table>
  <tr>
    <th width="50%">📋 Passo a Passo</th>
    <th width="50%">🥒 Gherkin (BDD)</th>
  </tr>
  <tr>
    <td valign="top">
      <br>
      <b>1.</b> Enviar uma requisição POST enviando apenas dados parciais (ex: <code>pVenda: 100</code>, omitindo o <code>cenario</code>) para a API.<br><br>
      <b>2.</b> Aguardar a resposta do servidor.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>O servidor deve rejeitar a requisição retornando o Status Code 400 (Bad Request).</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Validação de Contrato de Entrada<br>
      &emsp;&emsp;Como um analista de testes<br>
      &emsp;&emsp;Quero enviar uma requisição sem os dados obrigatórios do contrato<br>
      &emsp;&emsp;Para garantir que a API proteja seus endpoints retornando Bad Request (400)<br>
      <br>
      <b>Cenário:</b> Status 400 - Bad Request por Ausência de Dados<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa<br>
      &emsp;&emsp;<b>Quando</b> eu enviar um POST omitindo o campo cenário<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o Status Code 400<br>
    </td>
  </tr>
</table>

---

### 📌 Cenário: Status 404 - Caminho Desconhecido

**Objetivo:** Validar se a API lida corretamente com rotas ou endpoints que não existem no mapeamento do servidor.

**Pré-Requisitos:** Servidor ativo em `http://localhost:3000`.

---

<table>
  <tr>
    <th width="50%">📋 Passo a Passo</th>
    <th width="50%">🥒 Gherkin (BDD)</th>
  </tr>
  <tr>
    <td valign="top">
      <br>
      <b>1.</b> Enviar uma requisição POST direcionada para uma rota inexistente (ex: utilizando o método de rota inexistente no serviço do Cypress).<br><br>
      <b>2.</b> Aguardar a resposta do servidor.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>O servidor deve retornar o Status Code 404 (Not Found).</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Validação de Mapeamento de Rotas<br>
      &emsp;&emsp;Como um analista de testes<br>
      &emsp;&emsp;Quero disparar uma requisição para um caminho de URL não mapeado<br>
      &emsp;&emsp;Para validar se a API responde com status 404 Not Found<br>
      <br>
      <b>Cenário:</b> Status 404 - Caminho desconhecido<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa<br>
      &emsp;&emsp;<b>Quando</b> eu enviar um POST para uma rota inválida/inexistente<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o Status Code 404<br>
    </td>
  </tr>
</table>