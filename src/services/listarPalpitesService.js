const db = require('../connection')


async function listaPalpitesService(usuario_id) {

    const resultado = await db('palpites')
        .select('id', 'jogo', 'gols_a', 'gols_b', 'dolar_no_dia', 'dia_de_feriado', 'criado_em')
        .where({ usuario_id });

    return resultado;

};

module.exports = { listaPalpitesService }