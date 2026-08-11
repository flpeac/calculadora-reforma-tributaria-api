### 📌 Cenário: Status 200 - Sucesso

**Objetivo:** Validar se a API está rodando corretamente.

**Pré-Requisitos:**
* **Ambiente:** Node.js instalado na máquina.
* **Dependências:** Pacotes do projeto instalados (executar comando base no mesmo nível do `package.json`). 
* **Serviço em Execução:** A API deve estar ativa localmente rodando o arquivo `server.js` (`http://localhost:3000`). 
* **Framework de Teste:** Cypress configurado e pronto para execução (conforme arquivo `cypress.config.js`). 

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
      <b>2.</b> Através do Cypress (no arquivo <code>cypress/e2e/api_reforma.cy.js</code>), enviar uma requisição do tipo POST com o nome do cenário e um preço de venda para a rota principal ou rota de verificação (ex: <code>/</code> ou <code>/status</code>).<br><br>
      <b>3.</b> Aguardar a resposta do servidor.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>O servidor deve retornar o Status Code 200 (OK).</li>
        <li>O tempo de resposta deve estar dentro do limite aceitável (opcional, dependendo do critério de aceite).</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Disponibilidade da API (Health Check)<br>
      &emsp;&emsp;Como um desenvolvedor ou analista de testes<br>
      &emsp;&emsp;Quero enviar uma requisição para a rota de verificação<br>
      &emsp;&emsp;Para validar se a API está rodando corretamente<br>
      <br>
      <b>Contexto:</b><br>
      &emsp;&emsp;<b>Dado</b> que o ambiente Node.js está instalado na máquina<br>
      &emsp;&emsp;<b>E</b> as dependências do projeto estão instaladas<br>
      &emsp;&emsp;<b>E</b> o framework Cypress está configurado para execução<br>
      <br>
      <b>Cenário:</b> Status 200 - Sucesso<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa localmente rodando o arquivo "server.js" em "http://localhost:3000"<br>
      &emsp;&emsp;<b>Quando</b> eu enviar uma requisição do tipo POST com o nome do cenário e um preço de venda para a rota principal "/"<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o Status Code 200<br>
      &emsp;&emsp;<b>E</b> o tempo de resposta deve estar dentro do limite aceitável<br>
    </td>
  </tr>
</table>
