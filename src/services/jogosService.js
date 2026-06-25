const axios = require('axios');

async function listarJogos() {

    try {
        const resposta = await axios.get('https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=1328');

        const jogos = resposta.data.events.map(jogo => ({
            partida: `${jogo.strHomeTeam} x ${jogo.strAwayTeam}`,
            data: jogo.dateEvent,
            horario: jogo.strTime
        }));

        return jogos;

    } catch (error) {

        return res.status(500).json({
            mensagem: "Erro ao consultar a API."
        });

    }
}

module.exports = { listarJogos }