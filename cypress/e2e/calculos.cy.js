import tributosService from '../support/services/tributos.service';
import validadorUtil from '../support/utils/validador.util';

describe('Testes de Motor de Cálculo - Regras Fiscais e Fórmulas', () => {

    // --- FÓRMULA 1: CBS / IBS (Sem Redução) ---

    it('[Cenário 1] - Fórmula 1 - CBS/IBS - Sem redução - P. Venda', () => {
        const payload = {
            cenario: 'padrao',
            pVenda: 50.30,
            cbs: 0.9,
            ibs: 0.1
        };

        const esperado = {
            cenario: 'padrao',
            baseCBS_IBS: 50.30,
            vlCBS: 0.45,
            vlIBS: 0.05
        };

        tributosService.calcular(payload).then((response) => {
            expect(response.status, 'Status Code').to.eq(200);
            validadorUtil.validarCalculo(response.body, esperado);
        });
    });

    it('[Cenário 2] - Fórmula 1 - CBS/IBS - Sem redução - P. Venda (Zerado)', () => {
        const payload = {
            cenario: 'padrao',
            pVenda: 0,
            cbs: 0.9,
            ibs: 0.1
        };

        tributosService.calcular(payload, false).then((response) => {
            expect(response.status, 'Status Code').to.eq(422);
            expect(response.body.erro).to.eq("Preço de venda deve ser maior que zero.");
        });
    });

    it('[Cenário 3] - Fórmula 1 - CBS/IBS - Sem redução - P. Venda (Negativo)', () => {
        const payload = {
            cenario: 'padrao',
            pVenda: -12.50,
            cbs: 0.9,
            ibs: 0.1
        };

        tributosService.calcular(payload, false).then((response) => {
            expect(response.status, 'Status Code').to.eq(422);
            expect(response.body.erro).to.eq("Preço de venda deve ser maior que zero.");
        });
    });

    // --- FÓRMULA 1: CBS / IBS (Com Redução Parcial) ---

    it('[Cenário 4] - Fórmula 1 - CBS/IBS - Com Redução - P. Venda', () => {
        const payload = {
            cenario: 'padraoRedParcial',
            pVenda: 37.50,
            cbs: 0.9,
            ibs: 0.1,
            cbsRed: 40,
            ibsRed: 40
        };

        const esperado = {
            cenario: 'padraoRedParcial',
            baseCBS_IBS: 37.50,
            aliquotaCbsReduzida: 0.54,
            aliquotaIbsReduzida: 0.06,
            vlCBS: 0.2,
            vlIBS: 0.02
        };

        tributosService.calcular(payload).then((response) => {
            expect(response.status, 'Status Code').to.eq(200);
            validadorUtil.validarCalculo(response.body, esperado);
        });
    });

    it('[Cenário 5] - Fórmula 1 - CBS/IBS - Com Redução - P. Venda (Zerado)', () => {
        const payload = {
            cenario: 'padraoRedParcial',
            pVenda: 0,
            cbs: 0.9,
            ibs: 0.1,
            cbsRed: 40,
            ibsRed: 40
        };

        tributosService.calcular(payload, false).then((response) => {
            expect(response.status, 'Status Code').to.eq(422);
            expect(response.body.erro).to.eq("Preço de venda deve ser maior que zero.");
        });
    });

    it('[Cenário 6] - Fórmula 1 - CBS/IBS - Com Redução - P. Venda (Negativo)', () => {
        const payload = {
            cenario: 'padraoRedParcial',
            pVenda: -12.50,
            cbs: 0.9,
            ibs: 0.1,
            cbsRed: 40,
            ibsRed: 40
        };

        tributosService.calcular(payload, false).then((response) => {
            expect(response.status, 'Status Code').to.eq(422);
            expect(response.body.erro).to.eq("Preço de venda deve ser maior que zero.");
        });
    });

    // --- FÓRMULA 1: IMPOSTO SELETIVO (IS) ---

    it('[Cenário 7] - Fórmula 1 - IS - P. Venda', () => {
        const payload = {
            cenario: 'padraoIS_1',
            pVenda: 150.50,
            is: 15
        };

        const esperado = {
            cenario: 'padraoIS_1',
            baseIS: 150.5,
            vlIS: 22.57
        };

        tributosService.calcular(payload).then((response) => {
            expect(response.status, 'Status Code').to.eq(200);
            validadorUtil.validarCalculo(response.body, esperado);
        });
    });

    it('[Cenário 8] - Fórmula 1 - IS - P. Venda (Zerado)', () => {
        const payload = {
            cenario: 'padraoIS_1',
            pVenda: 0,
            is: 15
        };

        tributosService.calcular(payload, false).then((response) => {
            expect(response.status, 'Status Code').to.eq(422);
            expect(response.body.erro).to.eq("Preço de venda deve ser maior que zero.");
        });
    });

    it('[Cenário 9] - Fórmula 1 - IS - P. Venda (Negativo)', () => {
        const payload = {
            cenario: 'padraoIS_1',
            pVenda: -15.75,
            is: 15
        };

        tributosService.calcular(payload, false).then((response) => {
            expect(response.status, 'Status Code').to.eq(422);
            expect(response.body.erro).to.eq("Preço de venda deve ser maior que zero.");
        });
    });

    // --- FÓRMULA 2: BASE COMPOSTA (ACRÉSCIMOS E TRIBUTOS) ---

    it('[Cenário 10] - Fórmula 2 - CBS/IBS - Sem Redução - P. Venda + (Acréscimo + Valor de Tributos)', () => {
        const payload = {
            cenario: 'padraoBase_2',
            pVenda: 83.54,
            cbs: 0.9,
            ibs: 0.1,
            vlAcres: 12.53,
            vlTribut: 7.35
        };

        const esperado = {
            cenario: 'padraoBase_2',
            baseCBS_IBS: 88.72,
            vlCBS: 0.80,
            vlIBS: 0.09
        };

        tributosService.calcular(payload).then((response) => {
            expect(response.status, 'Status Code').to.eq(200);
            validadorUtil.validarCalculo(response.body, esperado);
        });
    });

    it('[Cenário 11] - Fórmula 2 - CBS/IBS - Sem Redução - P.Venda + (Acréscimo + Valor de Tributos(Zerado))', () => {
        const payload = {
            cenario: 'padraoBase_2',
            pVenda: 78.90,
            cbs: 0.9,
            ibs: 0.1,
            vlAcres: 12.32,
            vlTribut: 0
        };

        const esperado = {
            cenario: 'padraoBase_2',
            baseCBS_IBS: 91.22,
            vlCBS: 0.82,
            vlIBS: 0.09
        };

        tributosService.calcular(payload).then((response) => {
            expect(response.status, 'Status Code').to.eq(200);
            validadorUtil.validarCalculo(response.body, esperado);
        });
    });

    it('[Cenário 12] - Fórmula 2 - CBS/IBS - Sem Redução - P.Venda + (Acréscimo (Negativo) + Valor de Tributos', () => {
        const payload = {
            cenario: 'padraoBase_2',
            pVenda: 12.90,
            cbs: 0.9,
            ibs: 0.1,
            vlAcres: -5.40,
            vlTribut: 12.63
        };

        const esperado = {
            cenario: 'padraoBase_2',
            baseCBS_IBS: 0,
            vlCBS: 0,
            vlIBS: 0
        };

        tributosService.calcular(payload).then((response) => {
            expect(response.status, 'Status Code').to.eq(200);
            validadorUtil.validarCalculo(response.body, esperado);
        });
    });

    it('[Cenário 13] - Fórmula 2 - CBS/IBS - Sem redução - P. Venda + (Acréscimo (Zerado) + Valor de Tributos', () => {
        const payload = {
            cenario: 'padraoBase_2',
            pVenda: 8.99,
            cbs: 0.9,
            ibs: 0.1,
            vlAcres: 0,
            vlTribut: 1.13
        };

        const esperado = {
            cenario: 'padraoBase_2',
            baseCBS_IBS: 7.86,
            vlCBS: 0.07,
            vlIBS: 0.01
        };

        tributosService.calcular(payload).then((response) => {
            expect(response.status, 'Code Status').to.eq(200);
            validadorUtil.validarCalculo(response.body, esperado);
        });
    });

    it('[Cenário 14] - Fórmula 2 - CBS/IBS - Sem redução - P. Venda + (Acréscimo (Zerado) + Valor de Tributos (Zerado)', () => {
        const payload = {
            cenario: 'padraoBase_2',
            pVenda: 5.50,
            cbs: 0.9,
            ibs: 0.1,
            vlAcres: 0,
            vlTribut: 0
        };

        const esperado = {
            cenario: 'padraoBase_2',
            baseCBS_IBS: 5.5,
            vlCBS: 0.05,
            vlIBS: 0.01
        };

        tributosService.calcular(payload).then((response) => {
            expect(response.status).to.eq(200);
            validadorUtil.validarCalculo(response.body, esperado);
        });
    });

});