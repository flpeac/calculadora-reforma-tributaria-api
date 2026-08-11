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
      <code>cenario: 'padrao'</code><br>
      <code>pVenda: 50.30</code><br>
      <code>cbs: 0.9</code><br>
      <code>ibs: 0.1</code><br>
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

### 📌 Cenário: Fórmula 1 - CBS/IBS - Sem redução - P. Venda (Zerado)

**Objetivo:** Validar se a API irá retornar erro ao enviar um preço de venda zerado.

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
      <b>2.</b> Através do Cypress (no arquivo <code>cypress/e2e/api_reforma.cy.js</code>), enviar uma requisição do tipo POST para a rota com a seguinte estrutura:<br>
      <code>cenario: 'padrao'</code><br>
      <code>pVenda: 0</code><br>
      <code>cbs: 0.9</code><br>
      <code>ibs: 0.1</code><br>
      <b>3.</b> Aguardar a resposta do servidor.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>O servidor deve retornar o Status Code 400 (Bad Request).</li>
        <li>O servidor deve retornar o erro: "Preço de venda inválido. O valor deve ser maior que zero."</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Fórmula de Cálculo 1 - Validação de Preço de Venda<br>
      &emsp;&emsp;Como um usuário ou sistema cliente<br>
      &emsp;&emsp;Quero enviar o valor de venda zerado<br>
      &emsp;&emsp;Para validar se a API bloqueia a requisição com erro adequado<br>
      <br>
      <b>Contexto:</b><br>
      &emsp;&emsp;<b>Dado</b> que o ambiente Node.js está instalado na máquina<br>
      &emsp;&emsp;<b>E</b> as dependências do projeto estão instaladas<br>
      &emsp;&emsp;<b>E</b> o framework Cypress está configurado para execução<br>
      <br>
      <b>Cenário:</b> Fórmula 1 - CBS/IBS - Sem redução - P. Venda (Zerado)<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa localmente rodando o arquivo "server.js" em "http://localhost:3000"<br>
      &emsp;&emsp;<b>Quando</b> eu enviar uma requisição do tipo POST para a rota com os seguintes dados:<br>
      &emsp;&emsp;&emsp;&emsp;| cenario | padrao |<br>
      &emsp;&emsp;&emsp;&emsp;| pVenda | 0 |<br>
      &emsp;&emsp;&emsp;&emsp;| cbs | 0.9 |<br>
      &emsp;&emsp;&emsp;&emsp;| ibs | 0.1 |<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o Status Code 400<br>
      &emsp;&emsp;<b>E</b> o servidor deve retornar o erro "Preço de venda inválido. O valor deve ser maior que zero."<br>
    </td>
  </tr>
</table>

<br>

### 📌 Cenário: Fórmula 1 - CBS/IBS - Sem redução - P. Venda (Negativo)

**Objetivo:** Validar se a API irá retornar erro ao enviar um preço de venda negativo.

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
      <b>2.</b> Através do Cypress (no arquivo <code>cypress/e2e/api_reforma.cy.js</code>), enviar uma requisição do tipo POST para a rota com a seguinte estrutura:<br>
      <code>cenario: 'padrao'</code><br>
      <code>pVenda: -12.50</code><br>
      <code>cbs: 0.9</code><br>
      <code>ibs: 0.1</code><br>
      <b>3.</b> Aguardar a resposta do servidor.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>O servidor deve retornar o Status Code 400 (Bad Request).</li>
        <li>O servidor deve retornar o erro: "Preço de venda inválido. O valor deve ser maior que zero."</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Fórmula de Cálculo 1 - Validação de Preço de Venda<br>
      &emsp;&emsp;Como um usuário ou sistema cliente<br>
      &emsp;&emsp;Quero enviar o valor de venda negativo<br>
      &emsp;&emsp;Para validar se a API bloqueia a requisição com erro adequado<br>
      <br>
      <b>Contexto:</b><br>
      &emsp;&emsp;<b>Dado</b> que o ambiente Node.js está instalado na máquina<br>
      &emsp;&emsp;<b>E</b> as dependências do projeto estão instaladas<br>
      &emsp;&emsp;<b>E</b> o framework Cypress está configurado para execução<br>
      <br>
      <b>Cenário:</b> Fórmula 1 - CBS/IBS - Sem redução - P. Venda (Negativo)<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa localmente rodando o arquivo "server.js" em "http://localhost:3000"<br>
      &emsp;&emsp;<b>Quando</b> eu enviar uma requisição do tipo POST para a rota com os seguintes dados:<br>
      &emsp;&emsp;&emsp;&emsp;| cenario | padrao |<br>
      &emsp;&emsp;&emsp;&emsp;| pVenda | -12.50 |<br>
      &emsp;&emsp;&emsp;&emsp;| cbs | 0.9 |<br>
      &emsp;&emsp;&emsp;&emsp;| ibs | 0.1 |<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o Status Code 400<br>
      &emsp;&emsp;<b>E</b> o servidor deve retornar o erro "Preço de venda inválido. O valor deve ser maior que zero."<br>
    </td>
  </tr>
</table>

<br>

### 📌 Cenário: Fórmula 1 - CBS/IBS - Com Redução - P. Venda

**Objetivo:** Validar se a API irá retornar o cálculo dos valores de impostos corretamente com cenário de redução parcial.

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
      <b>2.</b> Através do Cypress (no arquivo <code>cypress/e2e/api_reforma.cy.js</code>), enviar uma requisição do tipo POST para a rota com a seguinte estrutura:<br>
      <code>cenario: 'padraoRedParcial'</code><br>
      <code>pVenda: 37.50</code><br>
      <code>cbs: 0.9</code><br>
      <code>ibs: 0.1</code><br>
      <code>cbsRed: 40</code><br>
      <code>ibsRed: 40</code><br>
      <b>3.</b> Aguardar a resposta do servidor.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>O servidor deve retornar o Status Code 200 (OK).</li>
        <li>O servidor deve retornar o valor da Base CBS/IBS (37.50).</li>
        <li>O servidor deve retornar a alíquota CBS reduzida (0.54).</li>
        <li>O servidor deve retornar a alíquota IBS reduzida (0.06).</li>
        <li>O servidor deve retornar o valor do CBS (0.2).</li>
        <li>O servidor deve retornar o valor do IBS (0.02).</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Fórmula de Cálculo 1 - Cálculo de Impostos com Redução<br>
      &emsp;&emsp;Como um usuário ou sistema cliente<br>
      &emsp;&emsp;Quero enviar os valores de venda e parâmetros de redução<br>
      &emsp;&emsp;Para validar se a API calcula os impostos reduzidos corretamente<br>
      <br>
      <b>Contexto:</b><br>
      &emsp;&emsp;<b>Dado</b> que o ambiente Node.js está instalado na máquina<br>
      &emsp;&emsp;<b>E</b> as dependências do projeto estão instaladas<br>
      &emsp;&emsp;<b>E</b> o framework Cypress está configurado para execução<br>
      <br>
      <b>Cenário:</b> Fórmula 1 - CBS/IBS - Com Redução - P. Venda<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa localmente rodando o arquivo "server.js" em "http://localhost:3000"<br>
      &emsp;&emsp;<b>Quando</b> eu enviar uma requisição do tipo POST para a rota com os seguintes dados:<br>
      &emsp;&emsp;&emsp;&emsp;| cenario | padraoRedParcial |<br>
      &emsp;&emsp;&emsp;&emsp;| pVenda | 37.50 |<br>
      &emsp;&emsp;&emsp;&emsp;| cbs | 0.9 |<br>
      &emsp;&emsp;&emsp;&emsp;| ibs | 0.1 |<br>
      &emsp;&emsp;&emsp;&emsp;| cbsRed | 40 |<br>
      &emsp;&emsp;&emsp;&emsp;| ibsRed | 40 |<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o Status Code 200<br>
      &emsp;&emsp;<b>E</b> o servidor deve retornar o valor da base CBS/IBS como 37.50<br>
      &emsp;&emsp;<b>E</b> a alíquota CBS reduzida como 0.54<br>
      &emsp;&emsp;<b>E</b> a alíquota IBS reduzida como 0.06<br>
      &emsp;&emsp;<b>E</b> o valor do CBS como 0.2<br>
      &emsp;&emsp;<b>E</b> o valor do IBS como 0.02<br>
    </td>
  </tr>
</table>

<br>

### 📌 Cenário: Fórmula 1 - CBS/IBS - Com Redução - P. Venda (Zerado)

**Objetivo:** Validar se a API irá retornar erro ao enviar um preço de venda zerado com cenário de redução.

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
      <b>2.</b> Através do Cypress (no arquivo <code>cypress/e2e/api_reforma.cy.js</code>), enviar uma requisição do tipo POST para a rota com a seguinte estrutura:<br>
      <code>cenario: 'padraoRedParcial'</code><br>
      <code>pVenda: 0</code><br>
      <code>cbs: 0.9</code><br>
      <code>ibs: 0.1</code><br>
      <code>cbsRed: 40</code><br>
      <code>ibsRed: 40</code><br>
      <b>3.</b> Aguardar a resposta do servidor.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>O servidor deve retornar o Status Code 400 (Bad Request).</li>
        <li>O servidor deve retornar o erro: "Preço de venda inválido. O valor deve ser maior que zero."</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Fórmula de Cálculo 1 - Validação de Preço de Venda com Redução<br>
      &emsp;&emsp;Como um usuário ou sistema cliente<br>
      &emsp;&emsp;Quero enviar o valor de venda zerado no cenário reduzido<br>
      &emsp;&emsp;Para validar se a API bloqueia a requisição com erro adequado<br>
      <br>
      <b>Contexto:</b><br>
      &emsp;&emsp;<b>Dado</b> que o ambiente Node.js está instalado na máquina<br>
      &emsp;&emsp;<b>E</b> as dependências do projeto estão instaladas<br>
      &emsp;&emsp;<b>E</b> o framework Cypress está configurado para execução<br>
      <br>
      <b>Cenário:</b> Fórmula 1 - CBS/IBS - Com Redução - P. Venda (Zerado)<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa localmente rodando o arquivo "server.js" em "http://localhost:3000"<br>
      &emsp;&emsp;<b>Quando</b> eu enviar uma requisição do tipo POST para a rota com os seguintes dados:<br>
      &emsp;&emsp;&emsp;&emsp;| cenario | padraoRedParcial |<br>
      &emsp;&emsp;&emsp;&emsp;| pVenda | 0 |<br>
      &emsp;&emsp;&emsp;&emsp;| cbs | 0.9 |<br>
      &emsp;&emsp;&emsp;&emsp;| ibs | 0.1 |<br>
      &emsp;&emsp;&emsp;&emsp;| cbsRed | 40 |<br>
      &emsp;&emsp;&emsp;&emsp;| ibsRed | 40 |<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o Status Code 400<br>
      &emsp;&emsp;<b>E</b> o servidor deve retornar o erro "Preço de venda inválido. O valor deve ser maior que zero."<br>
    </td>
  </tr>
</table>

<br>

### 📌 Cenário: Fórmula 1 - CBS/IBS - Com Redução - P. Venda (Negativo)

**Objetivo:** Validar se a API irá retornar erro ao enviar um preço de venda negativo com cenário de redução.

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
      <b>2.</b> Através do Cypress (no arquivo <code>cypress/e2e/api_reforma.cy.js</code>), enviar uma requisição do tipo POST para a rota com a seguinte estrutura:<br>
      <code>cenario: 'padraoRedParcial'</code><br>
      <code>pVenda: -12.50</code><br>
      <code>cbs: 0.9</code><br>
      <code>ibs: 0.1</code><br>
      <code>cbsRed: 40</code><br>
      <code>ibsRed: 40</code><br>
      <b>3.</b> Aguardar a resposta do servidor.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>O servidor deve retornar o Status Code 400 (Bad Request).</li>
        <li>O servidor deve retornar o erro: "Preço de venda inválido. O valor deve ser maior que zero."</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Fórmula de Cálculo 1 - Validação de Preço de Venda com Redução<br>
      &emsp;&emsp;Como um usuário ou sistema cliente<br>
      &emsp;&emsp;Quero enviar o valor de venda negativo no cenário reduzido<br>
      &emsp;&emsp;Para validar se a API bloqueia a requisição com erro adequado<br>
      <br>
      <b>Contexto:</b><br>
      &emsp;&emsp;<b>Dado</b> que o ambiente Node.js está instalado na máquina<br>
      &emsp;&emsp;<b>E</b> as dependências do projeto estão instaladas<br>
      &emsp;&emsp;<b>E</b> o framework Cypress está configurado para execução<br>
      <br>
      <b>Cenário:</b> Fórmula 1 - CBS/IBS - Com Redução - P. Venda (Negativo)<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa localmente rodando o arquivo "server.js" em "http://localhost:3000"<br>
      &emsp;&emsp;<b>Quando</b> eu enviar uma requisição do tipo POST para a rota com os seguintes dados:<br>
      &emsp;&emsp;&emsp;&emsp;| cenario | padraoRedParcial |<br>
      &emsp;&emsp;&emsp;&emsp;| pVenda | -12.50 |<br>
      &emsp;&emsp;&emsp;&emsp;| cbs | 0.9 |<br>
      &emsp;&emsp;&emsp;&emsp;| ibs | 0.1 |<br>
      &emsp;&emsp;&emsp;&emsp;| cbsRed | 40 |<br>
      &emsp;&emsp;&emsp;&emsp;| ibsRed | 40 |<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o Status Code 400<br>
      &emsp;&emsp;<b>E</b> o servidor deve retornar o erro "Preço de venda inválido. O valor deve ser maior que zero."<br>
    </td>
  </tr>
</table>

<br>

### 📌 Cenário: Fórmula 1 - IS - P. Venda

**Objetivo:** Validar se a API irá retornar o cálculo dos valores de Imposto Seletivo (IS) corretamente.

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
      <b>2.</b> Através do Cypress (no arquivo <code>cypress/e2e/api_reforma.cy.js</code>), enviar uma requisição do tipo POST para a rota com a seguinte estrutura:<br>
      <code>cenario: 'padraoIS_1'</code><br>
      <code>pVenda: 150.50</code><br>
      <code>is: 15</code><br>
      <b>3.</b> Aguardar a resposta do servidor.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>O servidor deve retornar o Status Code 200 (OK).</li>
        <li>O servidor deve retornar a Base do IS (150.5).</li>
        <li>O servidor deve retornar o Valor do IS (22.57).</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Fórmula de Cálculo 1 - Cálculo de Imposto Seletivo (IS)<br>
      &emsp;&emsp;Como um usuário ou sistema cliente<br>
      &emsp;&emsp;Quero enviar o valor de venda e alíquota de IS<br>
      &emsp;&emsp;Para validar se a API calcula o imposto seletivo corretamente<br>
      <br>
      <b>Contexto:</b><br>
      &emsp;&emsp;<b>Dado</b> que o ambiente Node.js está instalado na máquina<br>
      &emsp;&emsp;<b>E</b> as dependências do projeto estão instaladas<br>
      &emsp;&emsp;<b>E</b> o framework Cypress está configurado para execução<br>
      <br>
      <b>Cenário:</b> Fórmula 1 - IS - P. Venda<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa localmente rodando o arquivo "server.js" em "http://localhost:3000"<br>
      &emsp;&emsp;<b>Quando</b> eu enviar uma requisição do tipo POST para a rota com os seguintes dados:<br>
      &emsp;&emsp;&emsp;&emsp;| cenario | padraoIS_1 |<br>
      &emsp;&emsp;&emsp;&emsp;| pVenda | 150.50 |<br>
      &emsp;&emsp;&emsp;&emsp;| is | 15 |<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o Status Code 200<br>
      &emsp;&emsp;<b>E</b> o servidor deve retornar a Base IS como 150.5<br>
      &emsp;&emsp;<b>E</b> o servidor deve retornar o Valor IS como 22.57<br>
    </td>
  </tr>
</table>

<br>

### 📌 Cenário: Fórmula 1 - IS - P. Venda (Zerado)

**Objetivo:** Validar se a API irá retornar erro ao enviar um preço de venda zerado no cálculo de IS.

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
      <b>2.</b> Através do Cypress (no arquivo <code>cypress/e2e/api_reforma.cy.js</code>), enviar uma requisição do tipo POST para a rota com a seguinte estrutura:<br>
      <code>cenario: 'padraoIS_1'</code><br>
      <code>pVenda: 0</code><br>
      <code>is: 15</code><br>
      <b>3.</b> Aguardar a resposta do servidor.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>O servidor deve retornar o Status Code 400 (Bad Request).</li>
        <li>O servidor deve retornar o erro: "Preço de venda inválido. O valor deve ser maior que zero."</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Fórmula de Cálculo 1 - Validação de Preço de Venda para IS<br>
      &emsp;&emsp;Como um usuário ou sistema cliente<br>
      &emsp;&emsp;Quero enviar o valor de venda zerado no cálculo de IS<br>
      &emsp;&emsp;Para validar se a API bloqueia a requisição com erro adequado<br>
      <br>
      <b>Contexto:</b><br>
      &emsp;&emsp;<b>Dado</b> que o ambiente Node.js está instalado na máquina<br>
      &emsp;&emsp;<b>E</b> as dependências do projeto estão instaladas<br>
      &emsp;&emsp;<b>E</b> o framework Cypress está configurado para execução<br>
      <br>
      <b>Cenário:</b> Fórmula 1 - IS - P. Venda (Zerado)<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa localmente rodando o arquivo "server.js" em "http://localhost:3000"<br>
      &emsp;&emsp;<b>Quando</b> eu enviar uma requisição do tipo POST para a rota com os seguintes dados:<br>
      &emsp;&emsp;&emsp;&emsp;| cenario | padraoIS_1 |<br>
      &emsp;&emsp;&emsp;&emsp;| pVenda | 0 |<br>
      &emsp;&emsp;&emsp;&emsp;| is | 15 |<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o Status Code 400<br>
      &emsp;&emsp;<b>E</b> o servidor deve retornar o erro "Preço de venda inválido. O valor deve ser maior que zero."<br>
    </td>
  </tr>
</table>

<br>

### 📌 Cenário: Fórmula 1 - IS - P. Venda (Negativo)

**Objetivo:** Validar se a API irá retornar erro ao enviar um preço de venda negativo no cálculo de IS.

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
      <b>2.</b> Através do Cypress (no arquivo <code>cypress/e2e/api_reforma.cy.js</code>), enviar uma requisição do tipo POST para a rota com a seguinte estrutura:<br>
      <code>cenario: 'padraoIS_1'</code><br>
      <code>pVenda: -15.75</code><br>
      <code>is: 15</code><br>
      <b>3.</b> Aguardar a resposta do servidor.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>O servidor deve retornar o Status Code 400 (Bad Request).</li>
        <li>O servidor deve retornar o erro: "Preço de venda inválido. O valor deve ser maior que zero."</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Fórmula de Cálculo 1 - Validação de Preço de Venda para IS<br>
      &emsp;&emsp;Como um usuário ou sistema cliente<br>
      &emsp;&emsp;Quero enviar o valor de venda negativo no cálculo de IS<br>
      &emsp;&emsp;Para validar se a API bloqueia a requisição com erro adequado<br>
      <br>
      <b>Contexto:</b><br>
      &emsp;&emsp;<b>Dado</b> que o ambiente Node.js está instalado na máquina<br>
      &emsp;&emsp;<b>E</b> as dependências do projeto estão instaladas<br>
      &emsp;&emsp;<b>E</b> o framework Cypress está configurado para execução<br>
      <br>
      <b>Cenário:</b> Fórmula 1 - IS - P. Venda (Negativo)<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa localmente rodando o arquivo "server.js" em "http://localhost:3000"<br>
      &emsp;&emsp;<b>Quando</b> eu enviar uma requisição do tipo POST para a rota com os seguintes dados:<br>
      &emsp;&emsp;&emsp;&emsp;| cenario | padraoIS_1 |<br>
      &emsp;&emsp;&emsp;&emsp;| pVenda | -15.75 |<br>
      &emsp;&emsp;&emsp;&emsp;| is | 15 |<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o Status Code 400<br>
      &emsp;&emsp;<b>E</b> o servidor deve retornar o erro "Preço de venda inválido. O valor deve ser maior que zero."<br>
    </td>
  </tr>
</table>
