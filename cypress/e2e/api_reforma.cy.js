// cypress/e2e/api_reforma.cy.js

describe('Testes de API - Calculadora Reforma Tributária', () => {
  
  it('Deve calcular corretamente o cenário padrão (BASECBSIBS_1)', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/calcular-tributos',
      body: {
        cenario: 'padrao',
        pVenda: 100,
        cbs: 0.9,
        ibs: 0.1
      }
    }).then((response) => {
      // Validações do QA
      expect(response.status).to.eq(200);
      expect(response.body.baseCBS_IBS).to.eq(100);
      expect(response.body.vlCBS).to.eq(0.9);
      expect(response.body.vlIBS).to.eq(0.1);
    });
  });

  it('Deve calcular corretamente o cenário com acréscimos e tributos (BASECBSIBS_2)', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/calcular-tributos',
      body: {
        cenario: 'padraoBase_2',
        pVenda: 100,
        cbs: 0.9,
        ibs: 0.1,
        vlAcres: 30,
        vlTribut: 18
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.baseCBS_IBS).to.eq(112); // (100 + 30) - 18
      expect(response.body.vlCBS).to.eq(1.01);
      expect(response.body.vlIBS).to.eq(0.11);
    });
  });
});