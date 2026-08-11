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
            // Valida o status code
            expect(response.status).to.eq(200)
            // Valida se o tempo de resposta é aceitável (ex: menos de 500ms)
            expect(response.duration).to.be.lessThan(500)
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

    it('Status 404 - Caminho desconhecido', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/calcular-tributos2',
            failOnStatusCode: false,
            body: {
                pVenda: 100,
                cenario: 'cenario-inválido'
            }
        }).then((response) => {
            expect(response.status).to.eq(404)
        })
    })


    it('Fórmula 1 - CBS/IBS - Sem redução - P. Venda', () => {
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
            // Validações do QA
            expect(response.status).to.eq(200)
            expect(response.body.baseCBS_IBS).to.eq(50.30)
            expect(response.body.vlCBS).to.eq(0.45)
            expect(response.body.vlIBS).to.eq(0.05)
        })
    })

    it('Fórmula 1 - CBS/IBS - Sem redução - P. Venda (Zerado)', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            failOnStatusCode: false,
            body: {
                cenario: 'padrao',
                pVenda: 0,
                cbs: 0.9,
                ibs: 0.1
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.erro).to.eq("Preço de venda inválido. O valor deve ser maior que zero.")
        })

    })

    it('Fórmula 1 - CBS/IBS - Sem redução - P. Venda (Negativo)', () => {
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

    it('Fórmula 1 - CBS/IBS - Com Redução - P. Venda', () =>{
        cy.request({
            method: 'POST', 
            url: apiURL,
            body: {
                cenario: 'padraoRedParcial',
                pVenda: 37.50,
                cbs: 0.9,
                ibs: 0.1,
                cbsRed: 40,
                ibsRed: 40
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.baseCBS_IBS).to.eq(37.50)
            expect(response.body.aliquotaCbsReduzida).to.eq(0.54)
            expect(response.body.aliquotaIbsReduzida).to.eq(0.06)
            expect(response.body.vlCBS).to.eq(0.2)
            expect(response.body.vlIBS).to.eq(0.02)
        })
    })

    it('Fórmula 1 - CBS/IBS - Com Redução - P. Venda (Zerado)', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            failOnStatusCode: false,
            body: {
                cenario: 'padraoRedParcial',
                pVenda: 0,
                cbs: 0.9,
                ibs: 0.1,
                cbsRed: 40,
                ibsRed: 40
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.erro).to.eq("Preço de venda inválido. O valor deve ser maior que zero.")
        })
    })

    it('Fórmula 1 - CBS/IBS - Com Redução - P. Venda (Negativo)', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            failOnStatusCode: false,
            body: {
                cenario: 'padraoRedParcial',
                pVenda: -12.50,
                cbs: 0.9,
                ibs: 0.1,
                cbsRed: 40,
                ibsRed: 40
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.erro).to.eq("Preço de venda inválido. O valor deve ser maior que zero.")
        })
    })

    it('Fórmula 1 - IS - P. Venda', () => {
        cy.request({
            method: 'POST', 
            url: apiURL,
            body: {
                    cenario: 'padraoIS_1',
                    pVenda: 150.50,
                    is: 15
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.baseIS).to.eq(150.5)
            expect(response.body.vlIS).to.eq(22.57)
        })
    })

    it('Fórmula 1 - IS - P. Venda (Zerado)', () => {
        cy.request({
            method: 'POST', 
            url: apiURL,
            failOnStatusCode: false,
            body: {
                    cenario: 'padraoIS_1',
                    pVenda: 0,
                    is: 15
            }
        }).then((response) => {
             expect(response.status).to.eq(400)
            expect(response.body.erro).to.eq("Preço de venda inválido. O valor deve ser maior que zero.")
        })
    })

        it('Fórmula 1 - IS - P. Venda (Negativo)', () => {
        cy.request({
            method: 'POST', 
            url: apiURL,
            failOnStatusCode: false,
            body: {
                    cenario: 'padraoIS_1',
                    pVenda: -15.75,
                    is: 15
            }
        }).then((response) => {
             expect(response.status).to.eq(400)
            expect(response.body.erro).to.eq("Preço de venda inválido. O valor deve ser maior que zero.")
        })
    })

})