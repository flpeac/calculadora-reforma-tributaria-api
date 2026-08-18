const express = require('express');
const app = express();

app.use(express.json());

// Rota de Health Check para a esteira e monitoramento
app.get('/health', (req, res) => {
    res.status(200).json({ status: "UP" });
});

// Função auxiliar estrita para conversão numérica
const toNumber = (val) => {
    if (val === undefined || val === null || val === '') return NaN;
    const num = Number(String(val).replace(',', '.'));
    return isNaN(num) ? NaN : num;
};

// Validação de base não negativa
const baseValida = (valor) => {
    return valor > 0 ? valor : 0;
};

// Validação de alíquotas e redutores (Devem estar estritamente entre 0% e 100%)
const aliquotaValida = (valor) => {
    return valor >= 0 && valor <= 100;
};

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

    // 1. VALIDAÇÃO DE CONTRATO: Cenário obrigatório
    if (!cenario || typeof cenario !== 'string') {
        return res.status(400).json({ erro: "O campo 'cenario' é obrigatório e deve ser uma string." });
    }

    let resultado = { cenario };

    switch (cenario) {
        case 'padrao': {
            const vP = toNumber(pVenda);
            const vCbs = toNumber(cbs);
            const vIbs = toNumber(ibs);

            if (isNaN(vP) || isNaN(vCbs) || isNaN(vIbs)) {
                return res.status(400).json({ erro: "Parâmetros inválidos. 'pVenda', 'cbs' e 'ibs' devem ser numéricos." });
            }
            if (vP <= 0) {
                return res.status(422).json({ erro: "Preço de venda deve ser maior que zero." });
            }
            if (!aliquotaValida(vCbs) || !aliquotaValida(vIbs)) {
                return res.status(422).json({ erro: "As alíquotas de CBS e IBS devem estar entre 0% e 100%." });
            }

            const base = vP;
            resultado.baseCBS_IBS = Number(base.toFixed(2));
            resultado.vlCBS = Number((base * (vCbs / 100)).toFixed(2));
            resultado.vlIBS = Number((base * (vIbs / 100)).toFixed(2));
            break;
        }

        case 'padraoIS_1': {
            const vP = toNumber(pVenda);
            const vIs = toNumber(aliquotaIS);

            if (isNaN(vP) || isNaN(vIs)) {
                return res.status(400).json({ erro: "Parâmetros inválidos. 'pVenda' e 'is' devem ser numéricos." });
            }
            if (vP <= 0) {
                return res.status(422).json({ erro: "Preço de venda deve ser maior que zero." });
            }
            if (!aliquotaValida(vIs)) {
                return res.status(422).json({ erro: "A alíquota do Imposto Seletivo (IS) deve estar entre 0% e 100%." });
            }

            const base = vP;
            resultado.baseIS = Number(base.toFixed(2));
            resultado.vlIS = Number((base * (vIs / 100)).toFixed(2));
            break;
        }

        case 'padraoRedParcial': {
            const vP = toNumber(pVenda);
            const vCbs = toNumber(cbs);
            const vIbs = toNumber(ibs);
            const vCbsRed = toNumber(cbsRed);
            const vIbsRed = toNumber(ibsRed);

            if (isNaN(vP) || isNaN(vCbs) || isNaN(vIbs) || isNaN(vCbsRed) || isNaN(vIbsRed)) {
                return res.status(400).json({ erro: "Parâmetros numéricos obrigatórios ausentes ou inválidos para o cenário de redução." });
            }
            if (vP <= 0) {
                return res.status(422).json({ erro: "Preço de venda deve ser maior que zero." });
            }
            if (!aliquotaValida(vCbs) || !aliquotaValida(vIbs)) {
                return res.status(422).json({ erro: "As alíquotas de CBS e IBS devem estar entre 0% e 100%." });
            }
            if (!aliquotaValida(vCbsRed) || !aliquotaValida(vIbsRed)) {
                return res.status(422).json({ erro: "Os percentuais de redução devem estar entre 0% e 100%." });
            }

            const base = vP;
            const cbsReduzida = vCbs * (1 - vCbsRed / 100);
            const ibsReduzida = vIbs * (1 - vIbsRed / 100);
            
            resultado.baseCBS_IBS = Number(base.toFixed(2));
            resultado.aliquotaCbsReduzida = Number(cbsReduzida.toFixed(4));
            resultado.aliquotaIbsReduzida = Number(ibsReduzida.toFixed(4));
            resultado.vlCBS = Number((base * (cbsReduzida / 100)).toFixed(2));
            resultado.vlIBS = Number((base * (ibsReduzida / 100)).toFixed(2));
            break;
        }

        case 'padraoBase_2': {
            const vP = toNumber(pVenda);
            const vCbs = toNumber(cbs);
            const vIbs = toNumber(ibs);
            const vAcres = toNumber(vlAcres);
            const vTrib = toNumber(vlTribut);

            if (isNaN(vP) || isNaN(vCbs) || isNaN(vIbs) || isNaN(vAcres) || isNaN(vTrib)) {
                return res.status(400).json({ erro: "Parâmetros numéricos obrigatórios ausentes ou inválidos." });
            }
            if (!aliquotaValida(vCbs) || !aliquotaValida(vIbs)) {
                return res.status(422).json({ erro: "As alíquotas de CBS e IBS devem estar entre 0% e 100%." });
            }

            // Regra da Base Composta: (P. Venda + Acréscimos) - Tributos
            const baseCalculada = (vP + vAcres) - vTrib;
            const base = baseValida(baseCalculada);

            resultado.baseCBS_IBS = Number(base.toFixed(2));
            resultado.vlCBS = Number((base * (vCbs / 100)).toFixed(2));
            resultado.vlIBS = Number((base * (vIbs / 100)).toFixed(2));
            break;
        }

        case 'padraoBaseIS_2': {
            const vP = toNumber(pVenda);
            const vIs = toNumber(aliquotaIS);
            const vAcres = toNumber(vlAcres);
            const vTrib = toNumber(vlTribut);

            if (isNaN(vP) || isNaN(vIs) || isNaN(vAcres) || isNaN(vTrib)) {
                return res.status(400).json({ erro: "Parâmetros numéricos obrigatórios ausentes ou inválidos." });
            }
            if (!aliquotaValida(vIs)) {
                return res.status(422).json({ erro: "A alíquota do Imposto Seletivo (IS) deve estar entre 0% e 100%." });
            }

            const baseCalculada = (vP + vAcres) - vTrib;
            const base = baseValida(baseCalculada);

            resultado.baseIS = Number(base.toFixed(2));
            resultado.vlIS = Number((base * (vIs / 100)).toFixed(2));
            break;
        }

        case 'redBase_2': {
            const vP = toNumber(pVenda);
            const vCbs = toNumber(cbs);
            const vIbs = toNumber(ibs);
            const vCbsRed = toNumber(cbsRed);
            const vIbsRed = toNumber(ibsRed);
            const vAcres = toNumber(vlAcres);
            const vTrib = toNumber(vlTribut);

            if (isNaN(vP) || isNaN(vCbs) || isNaN(vIbs) || isNaN(vCbsRed) || isNaN(vIbsRed) || isNaN(vAcres) || isNaN(vTrib)) {
                return res.status(400).json({ erro: "Parâmetros numéricos obrigatórios ausentes ou inválidos." });
            }
            if (!aliquotaValida(vCbs) || !aliquotaValida(vIbs)) {
                return res.status(422).json({ erro: "As alíquotas de CBS e IBS devem estar entre 0% e 100%." });
            }
            if (!aliquotaValida(vCbsRed) || !aliquotaValida(vIbsRed)) {
                return res.status(422).json({ erro: "Os percentuais de redução devem estar entre 0% e 100%." });
            }

            const baseCalculada = (vP + vAcres) - vTrib;
            const base = baseValida(baseCalculada);
            
            const cbsReduzida = vCbs * (1 - vCbsRed / 100);
            const ibsReduzida = vIbs * (1 - vIbsRed / 100);
            
            resultado.baseCBS_IBS = Number(base.toFixed(2));
            resultado.aliquotaCbsReduzida = Number(cbsReduzida.toFixed(4));
            resultado.aliquotaIbsReduzida = Number(ibsReduzida.toFixed(4));
            resultado.vlCBS = Number((base * (cbsReduzida / 100)).toFixed(2));
            resultado.vlIBS = Number((base * (ibsReduzida / 100)).toFixed(2));
            break;
        }

        default:
            return res.status(400).json({ erro: "Cenário de cálculo não reconhecido." });
    }

    return res.json(resultado);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API da Reforma Tributária rodando na porta ${PORT}`);
});