# 🧠 Mapa Mental: Validações da API - Reforma Tributária

A qualidade de um software não nasce no teste final, ela começa no entendimento profundo das regras de negócio. Este artefato foi desenvolvido com a mentalidade de **Shift-Left Testing**, buscando mapear cenários de risco, fluxos de exceção e regras fiscais antes do início da automação.

## 🎯 Objetivo da Modelagem
Ter uma visão arquitetural e estruturada para garantir a confiabilidade da API, focando em:
- **Regras Fiscais:** Validação correta dos cálculos e alíquotas da Reforma Tributária.
- **Contratos de API:** Comportamento esperado para diferentes *status codes* (200, 400, 404).
- **Cenários de Exceção:** Identificação de fluxos alternativos, dados inválidos e *edge cases* para evitar falhas silenciosas.

## 🗺️ Visualização

<div align="center">
  <img width="1945" height="2685" alt="Reforma Tributária (3)" src="https://github.com/user-attachments/assets/759c7975-7398-4c20-a146-5507b57bc97c" />


</div>

## 🛠️ Como este mapa guiou a automação?
Todo o planejamento visualizado acima serviu como base direta para a estruturação dos cenários de teste automatizados com **Cypress**. Ao invés de testar às cegas, cada requisição (`cy.request()`) foi desenhada para cobrir um nó crítico mapeado neste documento, garantindo máxima cobertura funcional.

---

<div align="center">
  <a href="../README.md">⬅️ Voltar para o Início (README)</a>
</div>
