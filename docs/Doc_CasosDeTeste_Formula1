### 📌 Cenário: Cálculo CBS/IBS - Sem Redução de Base - P. Venda (Normal)

**Objetivo:** Validar se a API irá retornar o cálculo dos valores de impostos corretamente.

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
      <b>2.</b> Através do Cypress (no arquivo <code>cypress/e2e/api_reforma.cy.js</code>), enviar uma requisição do tipo POST para a rota de verificação com a seguinte estrutura:<br>
      <code>
      <br>
      &nbsp;&nbsp;cenario: 'padrao',<br>
      &nbsp;&nbsp;pVenda: 50.30,<br>
      &nbsp;&nbsp;cbs: 0.9,<br>
      &nbsp;&nbsp;ibs: 0.1<br>
      </code><br>
      <b>3.</b> Aguardar a resposta do servidor.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>O servidor deve retornar o valor da Base de Cálculo (50.30).</li>
        <li>O servidor deve retornar o valor do CBS (0.45).</li>
        <li>O servidor deve retornar o valor do IBS (0.05).</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Fórmula de Cálculo 1 - Cálculo de Impostos<br>
      &emsp;&emsp;Como um usuário ou sistema cliente<br>
      &emsp;&emsp;Quero enviar os valores de venda e alíquotas<br>
      &emsp;&emsp;Para validar se a API calcula o CBS e IBS corretamente<br>
      <br>
      <b>Contexto:</b><br>
      &emsp;&emsp;<b>Dado</b> que o ambiente Node.js está instalado na máquina<br>
      &emsp;&emsp;<b>E</b> as dependências do projeto estão instaladas<br>
      &emsp;&emsp;<b>E</b> o framework Cypress está configurado para execução<br>
      <br>
      <b>Cenário:</b> Cálculo CBS/IBS - Sem Redução de Base - P. Venda (Normal)<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa localmente rodando o arquivo "server.js" em "http://localhost:3000"<br>
      &emsp;&emsp;<b>Quando</b> eu enviar uma requisição do tipo POST para a rota de verificação com os seguintes dados:<br>
      &emsp;&emsp;&emsp;&emsp;| cenario | padrao |<br>
      &emsp;&emsp;&emsp;&emsp;| pVenda | 50.30 |<br>
      &emsp;&emsp;&emsp;&emsp;| cbs | 0.9 |<br>
      &emsp;&emsp;&emsp;&emsp;| ibs | 0.1 |<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o valor da Base de Cálculo como 50.30<br>
      &emsp;&emsp;<b>E</b> o servidor deve retornar o valor do CBS como 0.45<br>
      &emsp;&emsp;<b>E</b> o servidor deve retornar o valor do IBS como 0.05<br>
    </td>
  </tr>
</table>
