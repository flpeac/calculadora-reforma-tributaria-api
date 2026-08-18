import tributosService from '../support/services/tributos.service';

describe('Testes de Contrato, Status e Exceções Básicas', () => {

    it('Status 200 - Sucesso Básico', () => {
        tributosService.calcular({
            cenario: 'padrao',
            pVenda: 100,
            cbs: 1, 
            ibs: 1
        }).then((response) => {
            expect(response.status, 'Status Code').to.eq(200);
            expect(response.duration).to.be.lessThan(500);
        });
    });

    it('Status 400 - Bad Request por Ausência de Dados', () => {
        tributosService.calcular({ pVenda: 100 }, false).then((response) => {
            expect(response.status, 'Status Code').to.eq(400);
        });
    });

    it('Status 404 - Caminho desconhecido', () => {
        tributosService.rotaInexistente({
            pVenda: 100,
            cenario: 'cenario-inválido'
        }).then((response) => {
            expect(response.status, 'Status Code').to.eq(404);
        });
    });
});