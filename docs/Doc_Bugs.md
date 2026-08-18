# 🕷️ Registro de Bugs e Defeitos - API Reforma Tributária

Este documento serve como repositório central para o registro, evidência e acompanhamento de defeitos encontrados durante os ciclos de teste da API. Cada novo bug deve seguir a estrutura abaixo.

---

## 📋 Template de Abertura de Bug
*Copie o bloco abaixo para registrar um novo item:*

> **Título:** [Resumo breve do defeito]
> 
> **Data:** [DD/MM/AAAA]
> 
> **Prioridade:** [Alta/Média/Baixa]
> 
> **Descrição:** [O que acontece vs. O que deveria acontecer]
> 
> **Payload:** [Código JSON do request]
> 
> **Evidências:** [Prints, logs ou links]

---

## 🕷️ Bug Report #001: Cálculo incorreto de tributos (CBS/IBS) ao aplicar Acréscimo Negativo - Cenário Fórmula 2

**Data:** 18/08/2026
**Prioridade:** Alta

### 📝 Descrição do Defeito
Foi identificado um defeito no cálculo da API para o cenário **Fórmula 2 - CBS/IBS - Sem Redução - P.Venda + (Acréscimo (Negativo) + Valor de Tributos)**.
Ao enviar um valor de acréscimo negativo (`vlAcres`), a API está calculando e retornando valores negativos para a base de cálculo e para os tributos (`baseCBS_IBS`, `vlCBS`, `vlIBS`). 

> **Regra de Negócio / Fiscal:** De acordo com a legislação, **não podem existir valores de tributos negativos**. Caso a base de cálculo resulte em valor menor ou igual a zero, os valores de tributos devem ser zerados (`0.00`).

---

## 🔍 Evidências e Payload para Reprodução

### 1. Payload de Entrada (Request enviado para a API)
```json
{
  "cenario": "padraoBase_2",
  "pVenda": 12.90,
  "cbs": 0.9,
  "ibs": 0.1,
  "vlAcres": -5.40,
  "vlTribut": 12.63
}
```

---

### ❌ 2. Comportamento Atual (Response retornado com Erro)
A API calculou a base e os tributos com valores negativos:

```json
{
  "cenario": "padraoBase_2",
  "baseCBS_IBS": -5.13,
  "vlCBS": -0.05,
  "vlIBS": -0.01
}
```

---

### ✅ 3. Comportamento Esperado (Response Correto)
De acordo com a regra fiscal, quando o cálculo resultar em valor negativo ou zero, a API deve retornar:

```json
{
  "cenario": "padraoBase_2",
  "baseCBS_IBS": 0,
  "vlCBS": 0,
  "vlIBS": 0
}
```

---

## 📎 Anexos
<img width="1394" height="946" alt="Cypress" src="https://github.com/user-attachments/assets/a31d577a-b405-4bfd-ae3c-f7841642f802" />
<img width="964" height="700" alt="Postman" src="https://github.com/user-attachments/assets/3746590b-250d-4ffb-a4d9-2ff57dfdcec9" />

