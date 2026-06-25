const axios = require("axios");

async function listarJogos() {

    try {

        const resposta = await axios.get(
            "https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4328&s=2024-2025"
        );

        const jogos = resposta.data.events.map(jogo => ({
            partida: `${jogo.strHomeTeam} x ${jogo.strAwayTeam}`,
            timeA: jogo.strHomeTeam,
            timeB: jogo.strAwayTeam,
            data: jogo.dateEvent,
            horario: jogo.strTime
        }));

        return jogos;

    } catch (error) {

        throw new Error("Erro ao consultar a API (Service).");

    }

}

module.exports = {
    listarJogos
};