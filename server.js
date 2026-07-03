// server.js
const express = require('express');
const app = express();

app.use(express.json());

// Funções auxiliares de tratamento e precisão
const v = (valor) => parseFloat(valor) || 0;
const fix = (valor) => Number(v(valor).toFixed(2));

// ENDPOINT PRINCIPAL DE CÁLCULO
app.post('/api/calcular-tributos', (req, res) => {
    const { 
        cenario, 
        pVenda, 
        cbs, 
        ibs, 
        is: aliquotaIS, 
        cbsRed, 
        ibsRed, 
        vlAcres, 
        vlTribut 
    } = req.body;

    // VALIDACÃO 1: Cenário obrigatório
    if (!cenario) {
        return res.status(400).json({ erro: "O campo 'cenario' é obrigatório." });
    }

    // VALIDAÇÃO 2: Preço de venda deve ser maior que zero (Regra do Varejo)
    if (v(pVenda) <= 0) {
        return res.status(400).json({ erro: "Preço de venda inválido. O valor deve ser maior que zero." });
    }

    let resultado = { cenario };

    switch (cenario) {
        
        case 'padrao': // CBS/IBS - BASECBSIBS_1
            resultado.baseCBS_IBS = fix(pVenda);
            resultado.vlCBS = fix(resultado.baseCBS_IBS * (v(cbs) / 100));
            resultado.vlIBS = fix(resultado.baseCBS_IBS * (v(ibs) / 100));
            break;

        case 'padraoIS_1': // IS - BASEIS_1
            resultado.baseIS = fix(pVenda);
            resultado.vlIS = fix(resultado.baseIS * (v(aliquotaIS) / 100));
            break;

        case 'padraoRedParcial': // CBS/IBS - BASECBSIBS_1 com Redução
            resultado.baseCBS_IBS = fix(pVenda);
            
            const cbsReduzida = v(cbs) * (1 - v(cbsRed) / 100);
            const ibsReduzida = v(ibs) * (1 - v(ibsRed) / 100);
            
            resultado.aliquotaCbsReduzida = Number(cbsReduzida.toFixed(4));
            resultado.aliquotaIbsReduzida = Number(ibsReduzida.toFixed(4));
            resultado.vlCBS = fix(resultado.baseCBS_IBS * (cbsReduzida / 100));
            resultado.vlIBS = fix(resultado.baseCBS_IBS * (ibsReduzida / 100));
            break;

        case 'padraoBase_2': // CBS/IBS - BASECBSIBS_2
            resultado.baseCBS_IBS = fix((v(pVenda) + v(vlAcres)) - v(vlTribut));
            resultado.vlCBS = fix(resultado.baseCBS_IBS * (v(cbs) / 100));
            resultado.vlIBS = fix(resultado.baseCBS_IBS * (v(ibs) / 100));
            break;

        case 'padraoBaseIS_2': // IS - BASEIS_2
            resultado.baseIS = fix((v(pVenda) + v(vlAcres)) - v(vlTribut));
            resultado.vlIS = fix(resultado.baseIS * (v(aliquotaIS) / 100));
            break;

        case 'redBase_2': // CBS/IBS - BASECBSIBS_2 com Redução
            resultado.baseCBS_IBS = fix((v(pVenda) + v(vlAcres)) - v(vlTribut));
            
            const cbsReduzida2 = v(cbs) * (1 - v(cbsRed) / 100);
            const ibsReduzida2 = v(ibs) * (1 - v(ibsRed) / 100);
            
            resultado.aliquotaCbsReduzida = Number(cbsReduzida2.toFixed(4));
            resultado.aliquotaIbsReduzida = Number(ibsReduzida2.toFixed(4));
            resultado.vlCBS = fix(resultado.baseCBS_IBS * (cbsReduzida2 / 100));
            resultado.vlIBS = fix(resultado.baseCBS_IBS * (ibsReduzida2 / 100));
            break;

        default:
            return res.status(400).json({ erro: "Cenário de cálculo não reconhecido." });
    }

    return res.json(resultado);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API da Reforma Tributária rodando na porta ${PORT}`);
});