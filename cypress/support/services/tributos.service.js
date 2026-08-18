class TributosService {
    constructor() {
        this.apiURL = 'http://localhost:3000/api/calcular-tributos';
    }

    calcular(body, failStatusCode = true) {
        return cy.request({
            method: 'POST',
            url: this.apiURL,
            failOnStatusCode: failStatusCode,
            body: body
        });
    }

    rotaInexistente(body) {
        return cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/calcular-tributos2',
            failOnStatusCode: false,
            body: body
        });
    }
}

export default new TributosService();