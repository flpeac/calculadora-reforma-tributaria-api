# 📄 Documentação de Casos de Teste - Motor de Cálculo e Regras Fiscais

Esta documentação detalha todos os cenários de teste automatizados de regras de negócio, fórmulas e validações de domínio da API da Reforma Tributária.

---

### 📌 [Cenário 1] - Fórmula 1 - CBS/IBS - Sem redução - P. Venda

**Objetivo:** Validar se a API irá retornar o cálculo dos valores de impostos corretamente no cenário padrão sem redução.

**Pré-Requisitos:**
* **Ambiente:** Node.js instalado na máquina.
* **Serviço em Execução:** A API ativa localmente (`http://localhost:3000`).
* **Framework de Teste:** Cypress configurado.

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
      <b>2.</b> Através do Cypress, enviar uma requisição POST com a seguinte estrutura de payload:<br>
      <code>cenario: 'padrao'</code><br>
      <code>pVenda: 50.30</code><br>
      <code>cbs: 0.9</code><br>
      <code>ibs: 0.1</code><br>
      <b>3.</b> Aguardar a resposta do servidor.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>Status Code 200 (OK).</li>
        <li>Base CBS/IBS: 50.30</li>
        <li>Valor de CBS: 0.45</li>
        <li>Valor de IBS: 0.05</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Fórmula de Cálculo 1 - CBS/IBS Padrão<br>
      &emsp;&emsp;Como um cliente da API<br>
      &emsp;&emsp;Quero enviar preço de venda e alíquotas sem redução<br>
      &emsp;&emsp;Para validar se os tributos são calculados corretamente<br>
      <br>
      <b>Cenário:</b> [Cenário 1] - Fórmula 1 - CBS/IBS - Sem redução - P. Venda<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa em "http://localhost:3000"<br>
      &emsp;&emsp;<b>Quando</b> eu enviar um POST com os dados:<br>
      &emsp;&emsp;&emsp;&emsp;| cenario | padrao |<br>
      &emsp;&emsp;&emsp;&emsp;| pVenda | 50.30 |<br>
      &emsp;&emsp;&emsp;&emsp;| cbs | 0.9 |<br>
      &emsp;&emsp;&emsp;&emsp;| ibs | 0.1 |<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o Status Code 200<br>
      &emsp;&emsp;<b>E</b> baseCBS_IBS como 50.30, vlCBS como 0.45 e vlIBS como 0.05<br>
    </td>
  </tr>
</table>

<br>

### 📌 [Cenário 2] - Fórmula 1 - CBS/IBS - Sem redução - P. Venda (Zerado)

**Objetivo:** Validar se a API irá retornar erro ao enviar um preço de venda zerado.

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
      <b>1.</b> Enviar uma requisição POST com a seguinte estrutura:<br>
      <code>cenario: 'padrao'</code><br>
      <code>pVenda: 0</code><br>
      <code>cbs: 0.9</code><br>
      <code>ibs: 0.1</code><br>
      <b>2.</b> Aguardar a resposta.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>Status Code 422.</li>
        <li>Mensagem de erro: `"Preço de venda deve ser maior que zero."`</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Validação de Domínio - Preço Zerado<br>
      &emsp;&emsp;<b>Cenário:</b> [Cenário 2] - Fórmula 1 - CBS/IBS - Sem redução - P. Venda (Zerado)<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa<br>
      &emsp;&emsp;<b>Quando</b> eu enviar um POST com pVenda igual a 0<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o Status Code 422<br>
      &emsp;&emsp;<b>E</b> a mensagem de erro "Preço de venda deve ser maior que zero."<br>
    </td>
  </tr>
</table>

<br>

### 📌 [Cenário 3] - Fórmula 1 - CBS/IBS - Sem redução - P. Venda (Negativo)

**Objetivo:** Validar se a API irá retornar erro ao enviar um preço de venda negativo.

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
      <b>1.</b> Enviar uma requisição POST com a seguinte estrutura:<br>
      <code>cenario: 'padrao'</code><br>
      <code>pVenda: -12.50</code><br>
      <code>cbs: 0.9</code><br>
      <code>ibs: 0.1</code><br>
      <b>2.</b> Aguardar a resposta.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>Status Code 422.</li>
        <li>Mensagem de erro: `"Preço de venda deve ser maior que zero."`</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Validação de Domínio - Preço Negativo<br>
      &emsp;&emsp;<b>Cenário:</b> [Cenário 3] - Fórmula 1 - CBS/IBS - Sem redução - P. Venda (Negativo)<br>
      &emsp;&emsp;<b>Dado</b> que a API está ativa<br>
      &emsp;&emsp;<b>Quando</b> eu enviar um POST com pVenda negativo (-12.50)<br>
      &emsp;&emsp;<b>Então</b> o servidor deve retornar o Status Code 422<br>
      &emsp;&emsp;<b>E</b> a mensagem de erro "Preço de venda deve ser maior que zero."<br>
    </td>
  </tr>
</table>

<br>

### 📌 [Cenário 4] - Fórmula 1 - CBS/IBS - Com Redução - P. Venda

**Objetivo:** Validar o cálculo com redução parcial de alíquotas para CBS e IBS.

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
      <b>1.</b> Enviar uma requisição POST com a seguinte estrutura:<br>
      <code>cenario: 'padraoRedParcial'</code><br>
      <code>pVenda: 37.50</code><br>
      <code>cbs: 0.9</code>, <code>ibs: 0.1</code><br>
      <code>cbsRed: 40</code>, <code>ibsRed: 40</code><br>
      <b>2.</b> Aguardar a resposta.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>Status Code 200.</li>
        <li>Base CBS/IBS: 37.50 | Alíq. CBS Reduzida: 0.54 | Alíq. IBS Reduzida: 0.06</li>
        <li>Valor de CBS: 0.2 | Valor de IBS: 0.02</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Redução Parcial de Alíquotas (F1)<br>
      &emsp;&emsp;<b>Cenário:</b> [Cenário 4] - Fórmula 1 - CBS/IBS - Com Redução - P. Venda<br>
      &emsp;&emsp;<b>Dado</b> que envio parâmetros com redução de 40%<br>
      &emsp;&emsp;<b>Quando</b> executo o cálculo no cenário "padraoRedParcial"<br>
      &emsp;&emsp;<b>Então</b> o servidor retorna Status 200 com alíquotas e impostos reduzidos<br>
    </td>
  </tr>
</table>

<br>

### 📌 [Cenário 5] - Fórmula 1 - CBS/IBS - Com Redução - P. Venda (Zerado)

**Objetivo:** Validar rejeição por preço zerado no cenário de redução parcial.

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
      <b>1.</b> Enviar POST com <code>cenario: 'padraoRedParcial'</code>, <code>pVenda: 0</code>, alíquotas e reduções de 40%.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>Status Code 422. Mensagem: `"Preço de venda deve ser maior que zero."`</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Validação de Preço Zerado (Com Redução)<br>
      &emsp;&emsp;<b>Cenário:</b> [Cenário 5] - Fórmula 1 - Com Redução (Zerado)<br>
      &emsp;&emsp;<b>Dado</b> que envio pVenda igual a zero com redutores<br>
      &emsp;&emsp;<b>Quando</b> submeto a requisição<br>
      &emsp;&emsp;<b>Então</b> o servidor retorna Status 422 com a mensagem de erro esperada<br>
    </td>
  </tr>
</table>

<br>

### 📌 [Cenário 6] - Fórmula 1 - CBS/IBS - Com Redução - P. Venda (Negativo)

**Objetivo:** Validar rejeição por preço negativo no cenário de redução parcial.

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
      <b>1.</b> Enviar POST com <code>cenario: 'padraoRedParcial'</code>, <code>pVenda: -12.50</code>, redutores de 40%.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>Status Code 422. Mensagem: `"Preço de venda deve ser maior que zero."`</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Validação de Preço Negativo (Com Redução)<br>
      &emsp;&emsp;<b>Cenário:</b> [Cenário 6] - Fórmula 1 - Com Redução (Negativo)<br>
      &emsp;&emsp;<b>Dado</b> que envio pVenda negativo com redutores<br>
      &emsp;&emsp;<b>Quando</b> submeto a requisição<br>
      &emsp;&emsp;<b>Então</b> o servidor retorna Status 422 com a mensagem de erro esperada<br>
    </td>
  </tr>
</table>

<br>

### 📌 [Cenário 7] - Fórmula 1 - IS - P. Venda

**Objetivo:** Validar o cálculo isolado do Imposto Seletivo (IS).

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
      <b>1.</b> Enviar POST com <code>cenario: 'padraoIS_1'</code>, <code>pVenda: 150.50</code>, <code>is: 15</code>.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>Status Code 200. Base IS: 150.5 | Valor de IS: 22.57</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Imposto Seletivo (F1)<br>
      &emsp;&emsp;<b>Cenário:</b> [Cenário 7] - Fórmula 1 - IS - P. Venda<br>
      &emsp;&emsp;<b>Dado</b> que informo pVenda de 150.50 e alíquota IS de 15%<br>
      &emsp;&emsp;<b>Quando</b> executo o cenário "padraoIS_1"<br>
      &emsp;&emsp;<b>Então</b> o servidor retorna Status 200 com base e valor de IS calculados<br>
    </td>
  </tr>
</table>

<br>

### 📌 [Cenário 8] e [Cenário 9] - Fórmula 1 - IS - P. Venda (Zerado e Negativo)

**Objetivo:** Validar bloqueio de preço zerado e negativo no cálculo do Imposto Seletivo.

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
      <b>1.</b> Enviar POST com <code>cenario: 'padraoIS_1'</code> e <code>pVenda: 0</code> (ou <code>-15.75</code>).<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>Status Code 422. Mensagem: `"Preço de venda deve ser maior que zero."`</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Validação de Domínio para IS<br>
      &emsp;&emsp;<b>Cenário:</b> [Cenário 8 e 9] - IS Preço Inválido<br>
      &emsp;&emsp;<b>Dado</b> que envio pVenda inválido para o Imposto Seletivo<br>
      &emsp;&emsp;<b>Quando</b> envio a requisição<br>
      &emsp;&emsp;<b>Então</b> recebo Status 422 informando que o preço deve ser maior que zero<br>
    </td>
  </tr>
</table>

<br>

### 📌 [Cenário 10] a [Cenário 14] - Fórmula 2 - Base Composta (Acréscimos e Tributos)

**Objetivo:** Validar o cálculo com base composta em diferentes combinações de acréscimos (`vlAcres`) e deduções/tributos (`vlTribut`), incluindo cenários zerados, negativos e aplicação de trava de segurança em zero.

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
      <b>1.</b> Enviar POST utilizando o cenário <code>padraoBase_2</code> variando preço de venda, acréscimos e tributos.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>Status Code 200.</li>
        <li>Base calculada como <code>(pVenda + vlAcres) - vlTribut</code> (com piso em 0.00 se as deduções superarem o bruto).</li>
        <li>Impostos CBS e IBS proporcionais à nova base composta.</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Fórmula 2 - Base Composta (F2)<br>
      &emsp;&emsp;<b>Cenário:</b> [Cenário 10 a 14] - Base Composta com Acréscimos e Tributos<br>
      &emsp;&emsp;<b>Dado</b> que informo acréscimos e tributos dedutíveis no cenário "padraoBase_2"<br>
      &emsp;&emsp;<b>Quando</b> a API processa a fórmula composta<br>
      &emsp;&emsp;<b>Então</b> a base e os tributos são calculados com precisão e piso seguro em zero<br>
    </td>
  </tr>
</table>

<br>

### 📌 [Cenário 15] - Fórmula 2 - IS - Base Composta - P. Venda + Acréscimo + Tributos

**Objetivo:** Validar o Imposto Seletivo integrado à regra de Base Composta (`padraoBaseIS_2`).

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
      <b>1.</b> Enviar POST com <code>cenario: 'padraoBaseIS_2'</code>, <code>pVenda: 100.00</code>, <code>is: 15</code>, <code>vlAcres: 20.00</code>, <code>vlTribut: 10.00</code>.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>Status Code 200. Base IS: 110.00 | Valor do IS: 16.50</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Base Composta com Imposto Seletivo<br>
      &emsp;&emsp;<b>Cenário:</b> [Cenário 15] - Fórmula 2 - IS - Base Composta<br>
      &emsp;&emsp;<b>Dado</b> que utilizo o cenário "padraoBaseIS_2" com acréscimos e deduções<br>
      &emsp;&emsp;<b>Quando</b> o cálculo de IS é processado sobre a base composta<br>
      &emsp;&emsp;<b>Então</b> a base resultante é 110.00 e o valor do IS é 16.50<br>
    </td>
  </tr>
</table>

<br>

### 📌 [Cenário 16] - Fórmula 2 - CBS/IBS - Base Composta com Redução Parcial

**Objetivo:** Validar a integração da Base Composta com Redução Parcial de alíquotas (`redBase_2`).

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
      <b>1.</b> Enviar POST com <code>cenario: 'redBase_2'</code>, <code>pVenda: 100.00</code>, <code>cbs: 0.9</code>, <code>ibs: 0.1</code>, <code>cbsRed: 50</code>, <code>ibsRed: 50</code>, <code>vlAcres: 20.00</code>, <code>vlTribut: 10.00</code>.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>Status Code 200. Base: 110.00 | Alíqs. Reduzidas (CBS: 0.45, IBS: 0.05) | Vl. CBS: 0.50 | Vl. IBS: 0.06</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Base Composta com Redução Parcial<br>
      &emsp;&emsp;<b>Cenário:</b> [Cenário 16] - Fórmula 2 - Base Composta com Redução<br>
      &emsp;&emsp;<b>Dado</b> que aplico base composta combinada com redutores de 50%<br>
      &emsp;&emsp;<b>Quando</b> executo o cenário "redBase_2"<br>
      &emsp;&emsp;<b>Então</b> o sistema retorna base de 110.00 e tributos com alíquotas reduzidas corretas<br>
    </td>
  </tr>
</table>

<br>

### 📌 [Cenário 17] - Borda - Alíquotas Quebradas e Decimais Complexas

**Objetivo:** Validar a precisão matemática do motor ao processar alíquotas e preços decimais complexos.

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
      <b>1.</b> Enviar POST com <code>cenario: 'padrao'</code>, <code>pVenda: 123.45</code>, <code>cbs: 1.25</code>, <code>ibs: 0.35</code>.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>Status Code 200. Base: 123.45 | Vl. CBS: 1.54 | Vl. IBS: 0.43</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Teste de Borda - Precisão Decimal<br>
      &emsp;&emsp;<b>Cenário:</b> [Cenário 17] - Borda - Alíquotas Quebradas<br>
      &emsp;&emsp;<b>Dado</b> que informo valores e alíquotas decimais complexos<br>
      &emsp;&emsp;<b>Quando</b> o motor processa o arredondamento de 2 casas decimais<br>
      &emsp;&emsp;<b>Então</b> os resultados numéricos devem manter a precisão exata<br>
    </td>
  </tr>
</table>

<br>

### 📌 [Cenário 18] - Borda - Validação de Alíquotas Negativas

**Objetivo:** Validar se a API bloqueia o envio de alíquotas negativas, retornando erro de regra de negócio.

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
      <b>1.</b> Enviar POST com <code>cenario: 'padrao'</code>, <code>pVenda: 100.00</code>, <code>cbs: -0.9</code>, <code>ibs: -0.1</code>.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>Status Code 422 (Unprocessable Entity).</li>
        <li>Mensagem de erro: `"As alíquotas de CBS e IBS devem estar entre 0% e 100%."`</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Validação Defensiva - Alíquotas Negativas<br>
      &emsp;&emsp;<b>Cenário:</b> [Cenário 18] - Borda - Alíquotas Negativas (Rejeição HTTP 422)<br>
      &emsp;&emsp;<b>Dado</b> que informo alíquotas negativas no payload<br>
      &emsp;&emsp;<b>Quando</b> a requisição é submetida ao motor fiscal<br>
      &emsp;&emsp;<b>Então</b> o sistema deve barrar a operação retornando Status 422 e mensagem de erro de domínio<br>
    </td>
  </tr>
</table>

<br>

### 📌 [Cenário 19] - Borda - Validação de Alíquotas Acima de 100% (> 100%)

**Objetivo:** Validar se a API bloqueia o envio de alíquotas superiores a 100%, retornando erro de regra de negócio.

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
      <b>1.</b> Enviar POST com <code>cenario: 'padrao'</code>, <code>pVenda: 100.00</code>, <code>cbs: 150.00</code>, <code>ibs: 200.00</code>.<br><br>
      <b>Resultado Esperado:</b>
      <ul>
        <li>Status Code 422 (Unprocessable Entity).</li>
        <li>Mensagem de erro: `"As alíquotas de CBS e IBS devem estar entre 0% e 100%."`</li>
      </ul>
    </td>
    <td valign="top">
      <br>
      <b>Funcionalidade:</b> Validação Defensiva - Alíquotas Acima de 100%<br>
      &emsp;&emsp;<b>Cenário:</b> [Cenário 19] - Borda - Alíquotas Abusivas > 100% (Rejeição HTTP 422)<br>
      &emsp;&emsp;<b>Dado</b> que informo alíquotas maiores que 100% no payload<br>
      &emsp;&emsp;<b>Quando</b> a requisição é submetida ao motor fiscal<br>
      &emsp;&emsp;<b>Então</b> o sistema deve barrar a operação retornando Status 422 e mensagem de erro de domínio<br>
    </td>
  </tr>
</table>