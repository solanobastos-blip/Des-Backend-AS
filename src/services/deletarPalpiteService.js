const db = require('../connection');

// Deleta o palpite pelo id dele
async function deletarPalpiteDoBanco(id) {
    return await db('palpites').where({ id }).del();
}

module.exports = { deletarPalpiteDoBanco };