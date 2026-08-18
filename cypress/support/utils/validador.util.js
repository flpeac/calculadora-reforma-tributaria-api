class ValidadorUtil {
    
    /**
     * Valida um objeto de resposta da API comparando com os valores esperados.
     * Caso algum campo não exista no esperado ou venha diferente, acumula os erros e falha o teste de forma amigável.
     * @param {Object} respostaAPI - O objeto response.body retornado pela API.
     * @param {Object} esperado - Objeto contendo os campos e valores exatos que deveriam retornar.
     */
    validarCalculo(respostaAPI, esperado) {
        let errosEncontrados = [];

        Object.keys(esperado).forEach((campo) => {
            const valorEsperado = esperado[campo];
            const valorRecebido = respostaAPI[campo];

            // Se o valor esperado for explicitamente null ou undefined e a API não mandou
            if (valorEsperado === null && (valorRecebido === undefined || valorRecebido === null)) {
                cy.log(`✅ ${campo} está correto (ausente/nulo conforme esperado)`);
                return;
            }

            if (valorRecebido !== valorEsperado) {
                errosEncontrados.push(`❌ ${campo}: esperado [${valorEsperado}], mas veio [${valorRecebido}]`);
            } else {
                cy.log(`✅ ${campo} está correto: ${valorRecebido}`);
            }
        });

        if (errosEncontrados.length > 0) {
            cy.then(() => {
                throw new Error("\nDivergências encontradas nos cálculos:\n\n" + errosEncontrados.join('\n'));
            });
        }
    }
}

export default new ValidadorUtil();