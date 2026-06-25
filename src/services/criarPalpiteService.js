const axios = require('axios');
const db = require('../connection');

async function criarPalpite(dados, usuario_id) {
    const {
        jogo,
        gols_a,
        gols_b,
        data_jogo
    } = dados;

    if (gols_a < 0 || gols_b < 0) {
        throw new Error("Os gols não podem ser negativos.");
    }

    const [dolarResponse, feriadosResponse] = await Promise.all([

        axios.get("https://economia.awesomeapi.com.br/json/last/USD-BRL"),

        axios.get("https://brasilapi.com.br/api/feriados/v1/2026")

    ]);

    const dolar_no_dia = dolarResponse.data.USDBRL.bid;

    const dia_de_feriado = feriadosResponse.data.some(
        feriado => feriado.date === data_jogo
    );

    const [id] = await db("palpites").insert({
        usuario_id,
        jogo,
        gols_a,
        gols_b,
        data_jogo,
        dolar_no_dia,
        dia_de_feriado
    });

    return await db("palpites")
        .where({ id })
        .first();
}

module.exports = { criarPalpite };