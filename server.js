// server.js
const express = require('express');
const app = express();

// Permite que a API receba dados em formato JSON
app.use(express.json());

// Função auxiliar para tratar valores numéricos nulos/indefinidos e garantir decimais
const v = (valor) => parseFloat(valor) || 0;

// Função auxiliar para fixar 2 casas decimais e retornar como número
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

    if (!cenario) {
        return res.status(400).json({ erro: "O campo 'cenario' é obrigatório." });
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

        case 'padraoRedParcial': // CBS/IBS - BASECBSIBS_1 com Redução de Alíquota
            resultado.baseCBS_IBS = fix(pVenda);
            
            // Calcula as alíquotas aplicando o percentual de redução
            const cbsReduzida = v(cbs) * (1 - v(cbsRed) / 100);
            const ibsReduzida = v(ibs) * (1 - v(ibsRed) / 100);
            
            resultado.aliquotaCbsReduzida = Number(cbsReduzida.toFixed(4));
            resultado.aliquotaIbsReduzida = Number(ibsReduzida.toFixed(4));
            resultado.vlCBS = fix(resultado.baseCBS_IBS * (cbsReduzida / 100));
            resultado.vlIBS = fix(resultado.baseCBS_IBS * (ibsReduzida / 100));
            break;

        case 'padraoBase_2': // CBS/IBS - BASECBSIBS_2 (Com acréscimos e exclusão de tributos)
            resultado.baseCBS_IBS = fix((v(pVenda) + v(vlAcres)) - v(vlTribut));
            resultado.vlCBS = fix(resultado.baseCBS_IBS * (v(cbs) / 100));
            resultado.vlIBS = fix(resultado.baseCBS_IBS * (v(ibs) / 100));
            break;

        case 'padraoBaseIS_2': // IS - BASEIS_2 (Com acréscimos e exclusão de tributos)
            resultado.baseIS = fix((v(pVenda) + v(vlAcres)) - v(vlTribut));
            resultado.vlIS = fix(resultado.baseIS * (v(aliquotaIS) / 100));
            break;

        case 'redBase_2': // CBS/IBS - BASECBSIBS_2 com Redução de Alíquota
            resultado.baseCBS_IBS = fix((v(pVenda) + v(vlAcres)) - v(vlTribut));
            
            // Calcula as alíquotas aplicando o percentual de redução
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

    // Retorna a resposta final estruturada
    return res.json(resultado);
});

// Inicializa o servidor local na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API da Reforma Tributária rodando na porta ${PORT}`);
});