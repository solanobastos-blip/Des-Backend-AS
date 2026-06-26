const db = require('../connection');

// Atualiza os gols e retorna o palpite atualizado logo em seguida
async function atualizarGolsPalpite(id, gols_a, gols_b) {
    await db('palpites')
        .where({ id })
        .update({ gols_a, gols_b });

    // Busca o palpite atualizado para devolver ao controller
    return await db('palpites').where({ id }).first();
}

module.exports = { atualizarGolsPalpite };