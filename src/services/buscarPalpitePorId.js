const db = require('../connection')

// Busca o palpite para validar se ele existe e quem é o dono
async function buscarPalpitePorId(id) {
    return await db('palpites').where({ id }).first();
}

module.exports = { buscarPalpitePorId };