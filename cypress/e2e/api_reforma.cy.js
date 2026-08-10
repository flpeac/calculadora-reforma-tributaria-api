describe('Testes de API - Calculadora Reforma Tributária', () => {

    const apiURL = 'http://localhost:3000/api/calcular-tributos'

    it('Status 200 - Sucesso', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            body: {
                cenario: 'padrao',
                pVenda: 100
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Status 400 - Bad Request', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            failOnStatusCode: false,
            body: {
                pVenda: 100
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
        })
    })

    it('Status 400 - Cenário desconhecido', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            failOnStatusCode: false,
            body: {
                pVenda: 100,
                cenario: 'cenario-inválido'
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
        })
    })

    it('Status 500 - Internal Server Error', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/quebra',
            failOnStatusCode: false,
            body: {
                cenario: 'padrao',
                pVenda: 100
            }
        }).then((response) => {
            expect(response.status).to.eq(500)
        })


    })

    it('Deve calcular corretamente o cenário padrão com Preço de Venda Cheio(BASECBSIBS_1)', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            body: {
                cenario: 'padrao',
                pVenda: 100,
                cbs: 0.9,
                ibs: 0.1
            }
        }).then((response) => {
            // Validações do QA
            expect(response.status).to.eq(200)
            expect(response.body.baseCBS_IBS).to.eq(100)
            expect(response.body.vlCBS).to.eq(0.9)
            expect(response.body.vlIBS).to.eq(0.1)
        })
    })

    it('Deve calcular corretamente o cenário padrão com Preço de Venda Quebrado (BASECBSIBS_1', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            body: {
                cenario: 'padrao',
                pVenda: 50.30,
                cbs: 0.9,
                ibs: 0.1
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.baseCBS_IBS).to.eq(50.30)
            expect(response.body.vlCBS).to.eq(0.45)
            expect(response.body.vlIBS).to.eq(0.05)
        })

    })

    it('Deve apresentar mensagem informando erro para preço de venda negativo', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            failOnStatusCode: false,
            body: {
                cenario: 'padrao',
                pVenda: -12.50,
                cbs: 0.9,
                ibs: 0.1
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.erro).to.eq("Preço de venda inválido. O valor deve ser maior que zero.")
        })

    })

    it('Deve calcular corretamente o cenário com acréscimos e tributos (BASECBSIBS_2)', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            body: {
                cenario: 'padraoBase_2',
                pVenda: 100,
                cbs: 0.9,
                ibs: 0.1,
                vlAcres: 30,
                vlTribut: 18
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.baseCBS_IBS).to.eq(112)
            expect(response.body.vlCBS).to.eq(1.01)
            expect(response.body.vlIBS).to.eq(0.11)
        })
    })


    it('Deve retornar erro se o cenário não for enviado', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            failOnStatusCode: false,
            body: {
                pVenda: 100,
                cbs: 0.9,
                ibs: 0.1,
                vlAcres: 30,
                vlTribut: 18
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.erro).to.eq("O campo 'cenario' é obrigatório.")

        })
    })

})