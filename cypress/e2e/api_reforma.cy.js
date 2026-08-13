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
            expect(response.status, 'Status Code').to.eq(200)
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
            expect(response.status, 'Status Code').to.eq(400)
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
            expect(response.status, 'Status Code').to.eq(404)
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
            expect(response.status, 'Status Code').to.eq(200)
            expect(response.body.baseCBS_IBS, 'Base de CBS/IBS').to.eq(50.30)
            expect(response.body.vlCBS, 'Valor de CBS').to.eq(0.45)
            expect(response.body.vlIBS, 'Valor de IBS').to.eq(0.05)
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
            expect(response.status, 'Status Code').to.eq(400)
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
            expect(response.status, 'Status Code').to.eq(400)
            expect(response.body.erro).to.eq("Preço de venda inválido. O valor deve ser maior que zero.")
        })

    })

    it('Fórmula 1 - CBS/IBS - Com Redução - P. Venda', () => {
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
            expect(response.status, 'Status Code').to.eq(200)
            expect(response.body.baseCBS_IBS, 'Base de CBS/IBS').to.eq(37.50)
            expect(response.body.aliquotaCbsReduzida, 'Valor da Alíquota de CBS Reduzida').to.eq(0.54)
            expect(response.body.aliquotaIbsReduzida, 'Valor da Alíquota de IBS Reduzida').to.eq(0.06)
            expect(response.body.vlCBS, 'Valor de CBS').to.eq(0.2)
            expect(response.body.vlIBS, 'Valor de IBS').to.eq(0.02)
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
            expect(response.status, 'Status Code').to.eq(400)
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
            expect(response.status, 'Status Code').to.eq(400)
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
            expect(response.status, 'Status Code').to.eq(200)
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
            expect(response.status, 'Status Code').to.eq(400)
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
            expect(response.status, 'Status Code').to.eq(400)
            expect(response.body.erro).to.eq("Preço de venda inválido. O valor deve ser maior que zero.")
        })
    })

    //INICIO VALIDAÇAO FÓRMULA 2
    it('Fórmula 2 - CBS/IBS - Sem Redução - P. Venda + (Acréscimo + Valor de Tributos)', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            body: {
                cenario: 'padraoBase_2',
                pVenda: 83.54,
                cbs: 0.9,
                ibs: 0.1,
                vlAcres: 12.53,
                vlTribut: 7.35
            }
        }).then((response) => {
            expect(response.status, 'Status Code').to.eq(200)
            expect(response.body.baseCBS_IBS, 'Base de CBS/IBS').to.eq(88.72)
            expect(response.body.vlCBS, 'Valor de CBS').to.eq(0.80)
            expect(response.body.vlIBS, 'Valor de IBS').to.eq(0.09)
        })
    })

    it('Fórmula 2 - CBS/IBS - Sem Redução - P.Venda + (Acréscimo + Valor de Tributos(Zerado))', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            body: {
                cenario: 'padraoBase_2',
                pVenda: 78.90,
                cbs: 0.9,
                ibs: 0.1,
                vlAcres: 12.32,
                vlTribut: 0
            }
        }).then((response) => {
            expect(response.status, 'Status Code').to.eq(200)
            expect(response.body.baseCBS_IBS, 'Base CBS/IBS').to.eq(91.22)
            expect(response.body.vlCBS, 'Valor de CBS').to.eq(0.82)
            expect(response.body.vlIBS, 'Valor de IBS').to.eq(0.09)
        })
    })

    it('Fórmula 2 - CBS/IBS - Sem Redução - P.Venda + (Acréscimo (Negativo) + Valor de Tributos', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            body: {
                cenario: 'padraoBase_2',
                pVenda: 12.90,
                cbs: 0.9,
                ibs: 0.1,
                vlAcres: -5.40,
                vlTribut: 12.63
            }
        }).then((response) => {
            expect(response.status, 'Status Code').to.eq(200);

            // Definindo o valor esperado
            const esperado = {
                baseCBS_IBS: 0,
                vlCBS: 0,
                vlIBS: 0
            }

            //Recebendo e separando os valores
            const recebido = {
                baseCBS_IBS: response.body.baseCBS_IBS,
                vlCBS: response.body.vlCBS,
                vlIBS: response.body.vlIBS
            }

            //Criação de um Array para mostrar todos os valores
            let errosEncontrados = [];

            // Usando o objeto para compara os campos sem travar o teste
            Object.keys(esperado).forEach((campo) => {
                //Comparando o campo recebido com o campo esperado
                if (recebido[campo] !== esperado[campo]) {
                    //Se foi encontrado algum valor diferente do recebido com esperado, esse campo é gravado no Array
                    errosEncontrados.push(`❌ ${campo}: esperado [${esperado[campo]}], mas veio [${recebido[campo]}]`);
                } else {
                    //Se está tudo conforme o esperado, é exibido um log que deu certo
                    cy.log(`✅ ${campo} está correto: ${recebido[campo]}`);
                }
            })

            // Se no array foi identificado algum valor, (ou seja, maior que zero)
            if (errosEncontrados.length > 0) {
                cy.then(() => {
                    //Será exibido os valores gravados que apresentaram divergência 
                    throw new Error("\nDivergências encontradas nos cálculos:\n\n" + errosEncontrados.join('\n'));
                })

            }
        })
    })


    it('Fórmula 2 - CBS/IBS - Sem redução - P. Venda + (Acréscimo (Zerado) + Valor de Tributos', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            body: {
                cenario: 'padraoBase_2',
                pVenda: 8.99,
                cbs: 0.9,
                ibs: 0.1,
                vlAcres: 0,
                vlTribut: 1.13
            }
        }).then((response) => {
            expect(response.status, 'Code Status').to.eq(200)

            const retornoAPI = {
                baseCBS_IBS: response.body.baseCBS_IBS,
                vlCBS: response.body.vlCBS,
                vlIBS: response.body.vlIBS
            }

            const esperado = {
                baseCBS_IBS: 7.86,
                vlCBS: 0.07,
                vlIBS: 0.01
            }

            let errosEncontrados = []

            Object.keys(esperado).forEach((campo) => {
                if (retornoAPI[campo] !== esperado[campo]) {
                    errosEncontrados.push(`❌ ${campo}: esperado [${esperado[campo]}], mas veio [${retornoAPI[campo]}]`)
                } else {
                    cy.log(`✅ ${campo} está correto: ${retornoAPI[campo]}`)
                }
            })

            if (errosEncontrados.length > 0) {
                cy.then(() => {
                    throw new Error("\nDivergências encontradas nos cálculos: \n\n" + errosEncontrados.join('\n'))
                })
            }

        })
    })

    it('Fórmula 2 - CBS/IBS - Sem redução - P. Venda + (Acréscimo (Zerado) + Valor de Tributos (Zerado)', () => {
        cy.request({
            method: 'POST',
            url: apiURL,
            body: {
                cenario: 'padraoBase_2',
                pVenda: 5.50,
                cbs: 0.9,
                ibs: 0.1,
                vlAcres: 0,
                vlTribut: 0
            }
        }).then((response) => {
            expect(response.status).to.eq(200)

            const retornoAPI = {
                baseCBS_IBS: response.body.baseCBS_IBS,
                vlCBS: response.body.vlCBS,
                vlIBS: response.body.vlIBS
            }

            const esperado = {
                baseCBS_IBS: 5.5,
                vlCBS: 0.05,
                vlIBS: 0.01
            }

            let errosEncontrados = []
            
            Object.keys(esperado).forEach((campo) => {
                if(retornoAPI[campo] !== esperado[campo]) {
                    errosEncontrados.push(`❌ ${campo}: esperado [${esperado[campo]}], mas veio [${retornoAPI[campo]}]`)
                }else {
                    cy.log(`✅ ${campo} está correto: ${retornoAPI[campo]}`)
                }
            })

            if(errosEncontrados.length > 0){
                cy.then(() => {
                    throw new Error("\nDivergências encontradas nos cálculos: \n\n" + errosEncontrados.join('\n'))
                })
            }


        })

    })

})