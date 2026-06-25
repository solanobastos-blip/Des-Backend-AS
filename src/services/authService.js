const db = require('../connection');
const jwt = require('jsonwebtoken');

async function ServerLogin(email, senha) {

    const usuario = await db('usuarios')
        .where({ email, senha })
        .first();

    if (!usuario) {
        return {
            status: 401,
            data: { mensagem: 'Não autorizado' }
        };
    }

    const token = jwt.sign(
        { id: usuario.id },
        'segredo',
        { expiresIn: '1h' }
    );

    return {
        status: 200,
        data: { token }
    };
}

module.exports = { ServerLogin };